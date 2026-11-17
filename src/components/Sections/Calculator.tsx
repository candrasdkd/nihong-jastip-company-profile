"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, MessageCircle, RotateCcw } from 'lucide-react';

import { Language } from '../../types';
import { JASTIP_ROUTES_BASE } from '../../data/jastip';
import { openWhatsApp } from '../../utils/whatsapp';

interface CalculatorProps {
  lang: Language;
}

type Dir = 'japan_to_id' | 'id_to_japan';

// Perkiraan bobot barang populer (kg) — hanya untuk membantu menebak total berat.
const PRESETS = [
  { id: 'shoes', kg: 1.2, label: { id: 'Sepatu', en: 'Shoes', jp: '靴' } },
  { id: 'hoodie', kg: 0.8, label: { id: 'Jaket / Hoodie', en: 'Jacket / Hoodie', jp: 'ジャケット' } },
  { id: 'figure', kg: 0.6, label: { id: 'Figure', en: 'Figure', jp: 'フィギュア' } },
  { id: 'skincare', kg: 0.3, label: { id: 'Skincare', en: 'Skincare', jp: 'スキンケア' } },
  { id: 'snack', kg: 0.5, label: { id: 'Snack / Oleh-oleh', en: 'Snacks', jp: 'お菓子' } },
  { id: 'gadget', kg: 0.7, label: { id: 'Gadget', en: 'Gadget', jp: 'ガジェット' } },
] as const;

const DEFAULT_RATE = 114; // Rp per ¥ — cadangan jika kurs live gagal dimuat

const Calculator: React.FC<CalculatorProps> = ({ lang }) => {
  const [dir, setDir] = useState<Dir>('japan_to_id');
  const [kg, setKg] = useState(3);
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [live, setLive] = useState<{ updatedAt: string } | null>(null);
  const edited = useRef(false);

  // Ambil kurs terbaru; jangan timpa kalau customer sudah mengisi manual.
  useEffect(() => {
    let cancelled = false;
    fetch('/api/rate')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (cancelled || typeof d.rate !== 'number') return;
        if (!edited.current) setRate(Math.round(d.rate * 100) / 100);
        setLive({ updatedAt: d.updatedAt });
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const t = (id: string, en: string, jp: string) => (lang === 'id' ? id : lang === 'en' ? en : jp);
  const route = JASTIP_ROUTES_BASE.find((r) => r.key === dir)!;

  const result = useMemo(() => {
    const min = Math.round(kg * route.priceMin);
    const max = Math.round(kg * route.priceMax);
    return { min, max, rpMin: min * rate, rpMax: max * rate };
  }, [kg, route, rate]);

  const fmtYen = (n: number) => `¥${n.toLocaleString('en-US')}`;
  const fmtRp = (n: number) => `Rp ${Math.round(n / 1000).toLocaleString('id-ID')}rb`;
  const addKg = (v: number) => setKg((k) => Math.min(30, Math.round((k + v) * 10) / 10));
  const roundedKg = Math.max(1, Math.ceil(kg * 2) / 2);

  const routeLabel =
    dir === 'japan_to_id'
      ? t('Jepang → Indonesia', 'Japan → Indonesia', '日本 → インドネシア')
      : t('Indonesia → Jepang', 'Indonesia → Japan', 'インドネシア → 日本');

  const sendQuote = () => {
    const msg = t(
      `Halo Nihong Jastip, saya mau handcarry ${routeLabel} sekitar ${roundedKg} kg. Estimasi dari kalkulator: ${fmtYen(result.min)} - ${fmtYen(result.max)}. Mohon info jadwal flight terdekat.`,
      `Hello Nihong Jastip, I'd like a handcarry ${routeLabel}, about ${roundedKg} kg. Calculator estimate: ${fmtYen(result.min)} - ${fmtYen(result.max)}. Please share the nearest flight schedule.`,
      `Nihong Jastipさん、${routeLabel}のハンドキャリーを約${roundedKg}kgで希望します。目安: ${fmtYen(result.min)}〜${fmtYen(result.max)}。直近のフライト予定を教えてください。`
    );
    openWhatsApp(msg);
  };

  return (
    <section id="calculator" className="calculator">
      <div className="container">
        <motion.div
          className="section-heading split-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <span className="eyebrow">{t('Kalkulator ongkos', 'Cost calculator', '料金シミュレーター')}</span>
            <h2>{t('Hitung sendiri, tanpa nunggu balasan.', 'Work out your cost in seconds.', 'その場で料金をチェック。')}</h2>
          </div>
          <p>{t('Geser berat barangmu, lihat kisaran biayanya langsung. Mau lebih akurat? Kirim hasilnya ke WhatsApp dan kami konfirmasi.', 'Slide the weight and see the range instantly. Send it to WhatsApp and we will confirm the final total.', '重量を動かすだけで料金の目安がわかります。WhatsAppに送れば確定金額をご案内します。')}</p>
        </motion.div>

        <motion.div
          className="calc-card"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <div className="calc-controls">
            <div className="calc-block">
              <span className="calc-label">{t('Arah pengiriman', 'Direction', '方向')}</span>
              <div className="calc-toggle" role="tablist">
                <button role="tab" aria-selected={dir === 'japan_to_id'} className={dir === 'japan_to_id' ? 'on' : ''} onClick={() => setDir('japan_to_id')}>
                  JPN <ArrowLeftRight size={14} style={{ transform: 'scaleX(1)' }} /> IDN
                </button>
                <button role="tab" aria-selected={dir === 'id_to_japan'} className={dir === 'id_to_japan' ? 'on' : ''} onClick={() => setDir('id_to_japan')}>
                  IDN <ArrowLeftRight size={14} /> JPN
                </button>
              </div>
            </div>

            <div className="calc-block">
              <div className="calc-label-row">
                <span className="calc-label">{t('Berat barang', 'Item weight', '荷物の重さ')}</span>
                <strong className="calc-kg">{kg.toFixed(1)} kg</strong>
              </div>
              <input
                className="calc-slider"
                type="range"
                min={0.5}
                max={30}
                step={0.5}
                value={kg}
                onChange={(e) => setKg(parseFloat(e.target.value))}
                aria-label={t('Berat barang dalam kilogram', 'Item weight in kilograms', '荷物の重さ（kg）')}
                style={{ ['--fill' as string]: `${((kg - 0.5) / 29.5) * 100}%` }}
              />
              <div className="calc-ticks"><span>0,5</span><span>10</span><span>20</span><span>30 kg</span></div>
            </div>

            <div className="calc-block">
              <div className="calc-label-row">
                <span className="calc-label">{t('Tebak berat dari isi koper', 'Guess weight from your items', 'アイテムから重さを推定')}</span>
                <button className="calc-reset" onClick={() => setKg(0.5)}><RotateCcw size={13} /> Reset</button>
              </div>
              <div className="calc-chips">
                {PRESETS.map((p) => (
                  <button key={p.id} onClick={() => addKg(p.kg)}>
                    + {p.label[lang]} <small>~{p.kg} kg</small>
                  </button>
                ))}
              </div>
            </div>

            <label className="calc-rate">
              <span>
                {t('Kurs Rp per ¥1', 'IDR per ¥1 rate', '¥1あたりのRpレート')}
                <small className={`calc-live ${live ? 'on' : ''}`}>
                  {live ? t('● Live, update harian', '● Live, updated daily', '● ライブ（毎日更新）') : t('Perkiraan, bisa diubah', 'Estimate, editable', '目安・変更可')}
                </small>
              </span>
              <input type="number" min={50} max={300} step="0.1" value={rate} onChange={(e) => { edited.current = true; setRate(Math.max(1, Number(e.target.value) || DEFAULT_RATE)); }} />
            </label>
          </div>

          <div className="calc-result" aria-live="polite">
            <span className="calc-route">{routeLabel}</span>
            <span className="calc-result-label">{t('Estimasi ongkos handcarry', 'Estimated handcarry cost', 'ハンドキャリー料金の目安')}</span>
            <motion.strong key={`${dir}-${kg}`} className="calc-total" initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              {fmtYen(result.min)} <em>–</em> {fmtYen(result.max)}
            </motion.strong>
            <span className="calc-rp">≈ {fmtRp(result.rpMin)} – {fmtRp(result.rpMax)}</span>
            <ul className="calc-notes">
              <li>{t(`Dihitung ${roundedKg} kg (pembulatan per 0,5 kg, min. 1 kg)`, `Billed at ${roundedKg} kg (rounded per 0.5 kg, min. 1 kg)`, `${roundedKg}kgで計算（0.5kg単位切り上げ、最低1kg）`)}</li>
              <li>{t(`Tarif ${fmtYen(route.priceMin)}–${fmtYen(route.priceMax)} per kg, sudah termasuk handling`, `Rate ${fmtYen(route.priceMin)}–${fmtYen(route.priceMax)} per kg, handling included`, `1kgあたり${fmtYen(route.priceMin)}〜${fmtYen(route.priceMax)}、手数料込み`)}</li>
              <li>{t('Belum termasuk harga barang (untuk titip beli)', 'Excludes item price (for buy-for-me orders)', '商品代金は含まれません（買い付けの場合）')}</li>
            </ul>
            <button className="calc-cta" onClick={sendQuote}>
              <MessageCircle size={19} />
              {t('Kirim estimasi ke WhatsApp', 'Send this estimate on WhatsApp', 'この見積りをWhatsAppで送る')}
            </button>
          </div>
        </motion.div>

        <ul className="calc-disclaimer">
          <li>{t('Minimum charge 1 kg dan dibulatkan ke atas per kelipatan 0,5 kg.', 'Minimum charge 1 kg, rounded up to the nearest 0.5 kg.', '最低料金1kg、0.5kg単位で切り上げ計算となります。')}</li>
          <li>{t('Harga dapat bervariasi tergantung jenis barang, jadwal flight, dan ketentuan bea cukai. Total final kami konfirmasi sebelum diproses.', 'Prices may vary by item type, flight schedule, and customs rules. We confirm the final total before processing.', '商品の種類、フライト状況、税関規定により価格が変動する場合があります。確定金額は処理前にご案内します。')}</li>
        </ul>
      </div>
    </section>
  );
};

export default Calculator;
