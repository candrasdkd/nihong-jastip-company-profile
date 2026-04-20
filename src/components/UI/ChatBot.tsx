'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { Language } from '../../types';
import { getFaqData, getExpeditionData, getJastipData } from '../../data';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  lang: Language;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const normalize = (s: string) =>
  s.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();

const hasAny = (query: string, tokens: readonly string[]): boolean =>
  tokens.some((t) => query.includes(t));

const tokenScore = (query: string, tokens: string[]): number =>
  tokens.reduce((acc, t) => acc + (query.includes(t) ? 1 : 0), 0);

// ─── Intent tokens ────────────────────────────────────────────────────────────
const INTENTS = {
  greeting: ['halo', 'hai', 'hello', 'hi', 'hey', 'ohayo', 'selamat pagi', 'selamat siang'],

  // Price signals — checked FIRST to avoid FAQ intercept
  price: ['harga', 'biaya', 'tarif', 'ongkir', 'ongkos', 'cost', 'price', 'rate',
    'berapa', 'how much', 'いくら', '料金', '値段'],

  handcarry: ['handcarry', 'hand carry', 'koper', 'bagasi', 'bawa langsung',
    'titip bawa', 'jastip handcarry', 'via jastip'],

  // "jastip" alone is ambiguous — only use as handcarry signal when paired
  jastipAlone: ['jastip'],

  expedition: ['ekspedisi', 'expedition', 'via ekspedisi', 'kurir', 'cargo',
    'paket', 'kirim lewat', 'pengiriman'],

  duration: ['lama', 'estimasi', 'berapa hari', 'berapa minggu', 'how long',
    'waktu kirim', 'days', 'weeks', '何日', '期間'],

  tracking: ['lacak', 'tracking', 'resi', 'nomor resi', 'track', 'status kiriman', '追跡'],

  tax: ['pajak', 'bea cukai', 'customs', 'tax', 'duty', 'cukai', '税金', '関税'],

  // ← FIX: tambah 'terlarang', 'tidak bisa dikirim', 'apa yang boleh'
  prohibited: ['larangan', 'dilarang', 'terlarang', 'barang terlarang',
    'prohibited', 'banned', 'tidak boleh', 'tidak bisa dikirim',
    'apa yang boleh', 'apa saja', 'narkoba', 'senjata', 'peledak', '禁止'],

  payment: ['bayar', 'pembayaran', 'payment', 'dp', 'down payment',
    'transfer', 'ewallet', 'gopay', 'ovo', '支払い'],

  order: ['cara order', 'cara pesan', 'how to order', 'mau order',
    'mau pesan', 'gimana order', '注文', '申し込み'],

  contact: ['kontak', 'contact', 'wa', 'whatsapp', 'instagram', 'hubungi', '連絡'],

  // Country tokens
  singapore: ['singapura', 'singapore', 'sgp', 'シンガポール'],
  brunei: ['brunei', 'ブルネイ'],
  malaysia: ['malaysia', 'kl', 'kuala lumpur', 'マレーシア'],
  hongkong: ['hongkong', 'hong kong', 'hk', '香港'],
  taiwan: ['taiwan', '台湾'],
  japan: ['jepang', 'japan', 'jp', '日本', 'tokyo', 'osaka'],
  saudi: ['arab saudi', 'saudi', 'ksa', 'サウジアラビア'],
} as const;

type IntentKey = keyof typeof INTENTS;
const hi = (q: string, intent: IntentKey) => hasAny(q, INTENTS[intent]);

// ─── Weight & Price Calculation ───────────────────────────────────────────────

// Extract weight value from query: "3 kg", "3kg", "3 kilo", "0,5 kg", "setengah"
const extractWeight = (q: string): number | null => {
  const m = q.match(/(\d+[,.]?\d*)\s*k(g|ilo|ilogram)?(\b|$)/i);
  if (m) return parseFloat(m[1].replace(',', '.'));
  if (q.includes('setengah') || q.includes('half')) return 0.5;
  return null;
};

// Parse "1-5 kg" → {min:1, max:5} | "0,5 kg" → {min:0.5, max:0.5}
const parseRange = (rangeStr: string): { min: number; max: number } => {
  const s = rangeStr.toLowerCase().replace(/[kg\s]/g, '').replace(',', '.');
  if (s.includes('-')) {
    const [a, b] = s.split('-').map(Number);
    return { min: a, max: b };
  }
  const v = parseFloat(s);
  return { min: v, max: v };
};

const findTier = (weight: number, prices: { range: string; price: string }[]) =>
  prices.find(({ range }) => {
    const { min, max } = parseRange(range);
    return weight >= min && weight <= max;
  });

// Parse ID-formatted price: "95.000/kg" → {value:95000, currency:'Rp', isPerKg:true}
// "2.500¥/kg" → {value:2500, currency:'¥', isPerKg:true}
// "610.000"   → {value:610000, currency:'Rp', isPerKg:false}
const parsePriceStr = (p: string) => {
  const isYen = p.includes('¥');
  const isPerKg = /\/\s*kg/i.test(p) || /per\s*kg/i.test(p);
  const numMatch = p.match(/[\d.]+/);
  if (!numMatch) return null;
  // Dots are thousands separators in ID format → remove them
  const value = parseFloat(numMatch[0].replace(/\./g, ''));
  return { value, currency: isYen ? '¥' : 'Rp', isPerKg };
};

const fmtNum = (n: number, currency: string) =>
  currency === '¥' ? `¥${n.toLocaleString('ja-JP')}` : `Rp ${n.toLocaleString('id-ID')}`;

const calcCostText = (
  weight: number,
  tier: { range: string; price: string },
  lang: Language
): string => {
  const parsed = parsePriceStr(tier.price);
  if (!parsed) return `${tier.range}: ${tier.price}`;
  const { value, currency, isPerKg } = parsed;

  if (isPerKg) {
    const total = Math.round(value * weight);
    const label = { id: 'Total', en: 'Total', jp: '合計' }[lang];
    return `  Tier ${tier.range} → ${fmtNum(value, currency)}/kg\n  ${label}: ${weight} × ${fmtNum(value, currency)} = ${fmtNum(total, currency)}`;
  }
  // Flat rate (Saudi style)
  const label = { id: 'Tarif flat', en: 'Flat rate', jp: '定額' }[lang];
  return `  ${label} ${tier.range}: ${fmtNum(value, currency)}`;
};

// ─── Response Engine ──────────────────────────────────────────────────────────
const generateResponse = (input: string, lang: Language): string => {
  const q = normalize(input);
  const faqs = getFaqData(lang);
  const expeditions = getExpeditionData(lang);
  const jastip = getJastipData(lang);

  // ── 1. Greeting ─────────────────────────────────────────────────────────────
  if (hi(q, 'greeting')) {
    return {
      id: 'Halo! Ada yang bisa saya bantu? Tanyakan soal harga, metode pengiriman, atau cara order ya 😊',
      en: 'Hello! How can I help? Ask me about pricing, shipping methods, or how to place an order!',
      jp: 'こんにちは！料金、発送方法、注文方法などについてお気軽にどうぞ！',
    }[lang];
  }

  // ── 2. WEIGHT CALCULATION — weight + country detected ────────────────────────
  const weight = extractWeight(q);
  const countryKeys: IntentKey[] = ['singapore', 'brunei', 'malaysia', 'hongkong', 'taiwan', 'japan', 'saudi'];
  const matchedCountryKey = countryKeys.find((ck) => hi(q, ck));

  if (weight !== null && matchedCountryKey) {
    const wantsHandcarry = hi(q, 'handcarry') || (hi(q, 'jastipAlone') && !hi(q, 'expedition'));

    // Jastip handcarry calculation (Japan only, price is a range "1300¥ - 1700¥ / kg")
    if (wantsHandcarry && matchedCountryKey === 'japan') {
      const sections = jastip.routes.map((r) => {
        const nums = [...r.price.matchAll(/(\d[\d.]*)/g)].map((m) =>
          parseFloat(m[1].replace(/\./g, ''))
        );
        if (nums.length >= 2) {
          const [lo, hi_] = nums;
          const isYen = r.price.includes('¥');
          const cur = isYen ? '¥' : 'Rp';
          return `${r.route}:\n  Min: ${weight} × ${fmtNum(lo, cur)} = ${fmtNum(Math.round(weight * lo), cur)}\n  Max: ${weight} × ${fmtNum(hi_, cur)} = ${fmtNum(Math.round(weight * hi_), cur)}`;
        }
        return `${r.route}: ${r.price}`;
      }).join('\n\n');
      return {
        id: `Estimasi Jastip Handcarry ${weight} kg:\n\n${sections}`,
        en: `Estimated Jastip Handcarry cost for ${weight} kg:\n\n${sections}`,
        jp: `手荷物代行 ${weight}kgの料金目安:\n\n${sections}`,
      }[lang];
    }

    // Expedition cost calculation
    const matchedExps = expeditions.filter((e) =>
      INTENTS[matchedCountryKey].some((kw) => normalize(e.country).includes(kw))
    );
    if (matchedExps.length > 0) {
      const sections = matchedExps.map((exp) => {
        const tier = findTier(weight, exp.prices);
        if (!tier) {
          return {
            id: `${exp.country}: Berat ${weight} kg di luar range tersedia (maks ${exp.prices[exp.prices.length - 1].range}).`,
            en: `${exp.country}: ${weight} kg is out of available range (max ${exp.prices[exp.prices.length - 1].range}).`,
            jp: `${exp.country}: ${weight}kgは対応範囲外です（最大 ${exp.prices[exp.prices.length - 1].range}）。`,
          }[lang];
        }
        const est = exp.estimates ? `\n  ⏱ ${exp.estimates}` : '';
        return `${exp.country}:\n${calcCostText(weight, tier, lang)}${est}`;
      }).join('\n\n');
      return {
        id: `Estimasi biaya kirim ${weight} kg:\n\n${sections}`,
        en: `Estimated shipping cost for ${weight} kg:\n\n${sections}`,
        jp: `${weight}kgの配送料金目安:\n\n${sections}`,
      }[lang];
    }
  }

  // ── 3. PRICE INTENT — checked before FAQ to prevent interception ─────────────

  // Country token alone → treat as price query
  const isPriceQuery = hi(q, 'price') || hi(q, 'handcarry') || hi(q, 'expedition') || !!matchedCountryKey;

  if (isPriceQuery) {
    const matchedKey = matchedCountryKey;

    if (matchedKey) {
      // If user also mentions handcarry/jastip → show jastip rates (for Japan)
      const wantsHandcarry = hi(q, 'handcarry') || hi(q, 'jastipAlone');

      if (wantsHandcarry && matchedKey === 'japan') {
        const rows = jastip.routes.map((r) => `• ${r.route}: ${r.price}`).join('\n');
        return {
          id: `Tarif Jastip Handcarry (Jepang ↔ Indonesia):\n${rows}\n\nHarga sudah termasuk layanan titip & bawa langsung.`,
          en: `Jastip Handcarry rates (Japan ↔ Indonesia):\n${rows}\n\nPrice includes personal shopping & carry service.`,
          jp: `手荷物代行料金 (日本 ↔ インドネシア):\n${rows}\n\n買い物代行・手荷物持ち込み込みの料金です。`,
        }[lang];
      }

      // filter (bukan find) supaya Malaysia + Malaysia Timur keduanya muncul
      const matchedExps = expeditions.filter((e) =>
        INTENTS[matchedKey].some((kw) => normalize(e.country).includes(kw))
      );
      if (matchedExps.length > 0) {
        const sections = matchedExps.map((exp) => {
          const rows = exp.prices.map((p) => `  • ${p.range}: ${p.price}`).join('\n');
          const est = exp.estimates ? ` (${exp.estimates})` : '';
          return `${exp.country}${est}:\n${rows}`;
        }).join('\n\n');
        return {
          id: `Tarif ekspedisi:\n\n${sections}`,
          en: `Expedition rates:\n\n${sections}`,
          jp: `配送料金:\n\n${sections}`,
        }[lang];
      }
    }

    // 2b. Handcarry-specific (no country, or Japan implied)
    if (hi(q, 'handcarry') || (hi(q, 'jastipAlone') && !hi(q, 'expedition'))) {
      const rows = jastip.routes.map((r) => `• ${r.route}: ${r.price}`).join('\n');
      return {
        id: `Tarif Jastip Handcarry (Jepang ↔ Indonesia):\n${rows}\n\nHarga sudah termasuk layanan titip & bawa langsung.`,
        en: `Jastip Handcarry rates (Japan ↔ Indonesia):\n${rows}\n\nPrice includes personal shopping & carry service.`,
        jp: `手荷物代行料金 (日本 ↔ インドネシア):\n${rows}\n\n買い物代行・手荷物持ち込み込みの料金です。`,
      }[lang];
    }

    // 2c. Expedition-specific (no country)
    if (hi(q, 'expedition')) {
      const countryList = expeditions.map((e) => `• ${e.country}`).join('\n');
      return {
        id: `Via Ekspedisi tersedia ke negara-negara berikut:\n${countryList}\n\nMau cek tarif ke negara mana?`,
        en: `Via Expedition is available to:\n${countryList}\n\nWhich country would you like rates for?`,
        jp: `配送サービスの対応国:\n${countryList}\n\nどの国の料金を知りたいですか？`,
      }[lang];
    }

    // 2d. Generic price overview
    const jRows = jastip.routes.map((r) => `• ${r.route}: ${r.price}`).join('\n');
    return {
      id: `Kami punya dua layanan:\n\n📦 Jastip Handcarry (Jepang ↔ Indonesia)\n${jRows}\n\n✈️ Via Ekspedisi ke 64+ negara\nTanya "tarif ke [negara]" untuk detail.`,
      en: `We offer two services:\n\n📦 Jastip Handcarry (Japan ↔ Indonesia)\n${jRows}\n\n✈️ Via Expedition to 64+ countries\nAsk "rates to [country]" for details.`,
      jp: `2つのサービスがあります:\n\n📦 手荷物代行 (日本 ↔ インドネシア)\n${jRows}\n\n✈️ 配送サービス 64カ国以上\n「[国]への料金」と聞いてください。`,
    }[lang];
  }

  // ── 3. FAQ scoring — only runs when NOT a price query ────────────────────────
  const faqScores = faqs.map((f) => {
    const tokens = normalize(f.question).split(' ').filter((w) => w.length > 3);
    return { faq: f, score: tokenScore(q, tokens) };
  });
  const bestFaq = faqScores.sort((a, b) => b.score - a.score)[0];
  if (bestFaq?.score >= 2) return bestFaq.faq.answer;

  // ── 4. Single-intent handlers ─────────────────────────────────────────────────
  if (hi(q, 'duration')) {
    return {
      id: 'Estimasi waktu pengiriman:\n• Handcarry: tiba saat tim kami mendarat\n• Ekspedisi Udara: 1–3 minggu\n• Ekspedisi Laut: 1–2 bulan',
      en: 'Delivery estimates:\n• Handcarry: arrives when our team lands\n• Air Freight: 1–3 weeks\n• Sea Freight: 1–2 months',
      jp: '配送目安:\n• 手荷物代行: チームが到着次第\n• 航空便: 1〜3週間\n• 船便: 1〜2ヶ月',
    }[lang];
  }

  if (hi(q, 'tracking')) {
    const f = faqs.find((faq) => tokenScore(normalize(faq.question), ['lacak', 'track', 'resi']) > 0);
    return f?.answer ?? {
      id: 'Via Ekspedisi dilengkapi nomor resi untuk tracking. Jastip Handcarry mendapat update status personal dari tim kami.',
      en: 'Via Expedition includes a tracking number. Jastip Handcarry gets personal status updates from our team.',
      jp: '配送サービスには追跡番号があります。手荷物代行はチームから個別にお知らせします。',
    }[lang];
  }

  if (hi(q, 'tax')) {
    const f = faqs.find((faq) => tokenScore(normalize(faq.question), ['pajak', 'cukai', 'tax']) > 0);
    return f?.answer ?? {
      id: 'Handcarry biasanya all-in termasuk pajak (dalam kuota). Ekspedisi mengikuti bea cukai negara tujuan.',
      en: 'Handcarry is usually all-in including tax (within quota). Expedition follows destination country customs.',
      jp: '手荷物代行は通常税金込み（免税範囲内）。配送は目的国の関税に従います。',
    }[lang];
  }

  // ← FIX: prohibited now catches 'terlarang', 'barang terlarang', 'apa saja', dll
  if (hi(q, 'prohibited')) {
    const f = faqs.find((faq) =>
      tokenScore(normalize(faq.question), ['batasan', 'larangan', 'prohibited', 'limit']) > 0
    );
    return f?.answer ?? {
      id: 'Barang yang TIDAK bisa dikirim:\n• Narkoba / obat terlarang\n• Senjata & amunisi\n• Bahan peledak\n• Hewan hidup\n• Barang ilegal lainnya\n\nVia Ekspedisi lebih fleksibel untuk barang besar, Handcarry terbatas kapasitas koper.',
      en: 'Items that CANNOT be shipped:\n• Drugs / narcotics\n• Weapons & ammunition\n• Explosives\n• Live animals\n• Other illegal goods\n\nVia Expedition is more flexible for large items; Handcarry is limited to luggage capacity.',
      jp: '発送できない品目:\n• 麻薬・違法薬物\n• 武器・弾薬\n• 爆発物\n• 生き物\n• その他の違法品\n\n配送サービスは大型品に柔軟対応、手荷物代行はスーツケースの容量に制限されます。',
    }[lang];
  }

  if (hi(q, 'payment')) {
    const f = faqs.find((faq) => tokenScore(normalize(faq.question), ['bayar', 'payment']) > 0);
    return f?.answer ?? {
      id: 'Pembayaran via transfer bank, e-wallet, atau sistem DP dengan pelunasan sebelum pengiriman.',
      en: 'Payment via bank transfer, e-wallet, or DP system with balance paid before shipment.',
      jp: '銀行振込、電子マネー、または前払い（DP）システムでお支払いいただけます。',
    }[lang];
  }

  if (hi(q, 'order')) {
    return {
      id: 'Untuk order, hubungi kami via WhatsApp atau DM Instagram. Tim kami bantu dari awal sampai barang tiba 📦',
      en: 'To order, contact us via WhatsApp or Instagram DM. Our team will guide you start to finish 📦',
      jp: 'ご注文はWhatsAppまたはInstagramのDMからどうぞ。チームがサポートします 📦',
    }[lang];
  }

  if (hi(q, 'contact')) {
    return {
      id: 'Hubungi kami:\n• WhatsApp: lihat di website\n• Instagram: @nihongjastip',
      en: 'Contact us:\n• WhatsApp: see our website\n• Instagram: @nihongjastip',
      jp: 'お問い合わせ:\n• WhatsApp: ウェブサイトをご確認ください\n• Instagram: @nihongjastip',
    }[lang];
  }

  // ── 5. Fallback ───────────────────────────────────────────────────────────────
  return {
    id: 'Maaf, saya belum mengerti. Coba tanyakan:\n• "Berapa ongkir ke Jepang?"\n• "Harga jastip handcarry?"\n• "Barang apa yang tidak boleh dikirim?"\n• "Estimasi berapa hari?"',
    en: "Sorry, I didn't understand. Try:\n• \"Shipping cost to Japan?\"\n• \"Jastip handcarry rates?\"\n• \"What items are prohibited?\"\n• \"How many days?\"",
    jp: 'うまく理解できませんでした。こちらをお試しください:\n• 「日本への送料は？」\n• 「手荷物代行の料金は？」\n• 「禁止品は何ですか？」\n• 「何日かかる？」',
  }[lang];
};

// ─── Component (unchanged structure) ─────────────────────────────────────────
const ChatBot: React.FC<ChatBotProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const greetings: Record<Language, string> = {
    id: 'Halo! Saya asisten AI Nihong Jastip. Ada yang bisa saya bantu hari ini?',
    en: "Hello! I'm your Nihong Jastip AI assistant. How can I help you today?",
    jp: 'こんにちは！Nihong JastipのAIアシスタントです。何かお手伝いできることはありますか？',
  };

  useEffect(() => {
    setMessages([{ id: '1', text: greetings[lang] || greetings.id, sender: 'bot', timestamp: new Date() }]);
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    const userMessage: Message = {
      id: Date.now().toString(), text: inputValue, sender: 'user', timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: generateResponse(userMessage.text, lang), sender: 'bot', timestamp: new Date() },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const placeholders: Record<Language, string> = {
    id: 'Ketik pesan...', en: 'Type a message...', jp: 'メッセージを入力...',
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 10000 }}>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)}
        style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', color: 'white', border: 'none', boxShadow: '0 10px 25px rgba(1, 46, 108, 0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={28} /></motion.div>
            : <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={28} /></motion.div>}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass"
            style={{ position: 'absolute', bottom: '80px', right: '0', width: '380px', height: '500px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(20px)', background: 'rgba(255, 255, 255, 0.85)' }}>

            {/* Header */}
            <div style={{ padding: '20px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bot size={24} /></div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Nihong AI</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }} />
                  <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ padding: '12px 16px', borderRadius: msg.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0', background: msg.sender === 'user' ? 'var(--primary)' : 'white', color: msg.sender === 'user' ? 'white' : 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.5, whiteSpace: 'pre-wrap', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', border: msg.sender === 'bot' ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-light)', marginTop: '4px' }}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'white', padding: '10px 15px', borderRadius: '18px 18px 18px 0', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  <Loader2 size={16} style={{ color: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '15px', borderTop: '1px solid rgba(0,0,0,0.05)', background: 'white' }}>
              <div style={{ display: 'flex', gap: '10px', background: 'var(--bg-light)', padding: '8px 12px', borderRadius: 'var(--radius-full)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder={placeholders[lang]}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '0.9rem', color: 'var(--text-main)' }} />
                <button onClick={handleSend} disabled={!inputValue.trim() || isTyping}
                  style={{ background: 'var(--primary)', color: 'white', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'var(--transition)', opacity: !inputValue.trim() || isTyping ? 0.5 : 1 }}>
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default ChatBot;