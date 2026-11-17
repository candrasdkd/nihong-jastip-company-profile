import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';
import { buildSystemPrompt } from '../../../data/knowledge';
import { estimateHandcarry, Direction } from '../../../utils/handcarry';
import { fetchJpyIdr } from '../../../utils/rate';
import { detectLang, LANG_NAME, ChatLang } from '../../../utils/detectLang';
import { mentionsSpecialItem } from '../../../utils/specialItems';

// Node.js runtime untuk kompatibilitas groq-sdk di Vercel
export const runtime = 'nodejs';

// ---------- Batasan & pengaman ----------
const MAX_MESSAGE_CHARS = 600;
const MAX_HISTORY = 10;
const MAX_HISTORY_CHARS = 1200;
const MAX_TOOL_ROUNDS = 3;
const RATE_LIMIT = { max: 20, windowMs: 5 * 60 * 1000 };

// Pembatas sederhana per IP (best-effort: di serverless tiap instance punya memori sendiri).
const hits = new Map<string, number[]>();
const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT.max;
};

const FALLBACK_MODELS = [
  'openai/gpt-oss-20b', // cepat & mendukung tool calling
  'openai/gpt-oss-120b', // cadangan berkapasitas besar
  'qwen/qwen3-32b', // cadangan multibahasa
];

const TOOLS: Groq.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'estimate_handcarry_cost',
      description:
        'Hitung estimasi ongkos handcarry BARANG UMUM Nihong Jastip (yen & rupiah) dari berat dan arah. Jangan dipakai untuk sepatu, figure, elektronik, atau barang bulky (harganya berbeda, tanya admin). Selalu gunakan ini untuk pertanyaan biaya barang umum; jangan menghitung sendiri.',
      parameters: {
        type: 'object',
        properties: {
          weight_kg: { type: 'number', description: 'Berat total barang dalam kilogram, termasuk kemasan.' },
          direction: {
            type: 'string',
            enum: ['japan_to_id', 'id_to_japan'],
            description: 'japan_to_id = Jepang ke Indonesia, id_to_japan = Indonesia ke Jepang.',
          },
        },
        required: ['weight_kg', 'direction'],
      },
    },
  },
];

const runTool = async (name: string, rawArgs: string, lang: ChatLang): Promise<string> => {
  if (name !== 'estimate_handcarry_cost') return JSON.stringify({ error: 'unknown_tool' });
  let args: { weight_kg?: number; direction?: Direction };
  try {
    args = JSON.parse(rawArgs || '{}');
  } catch {
    return JSON.stringify({ error: 'invalid_arguments' });
  }
  const est = estimateHandcarry(Number(args.weight_kg), args.direction as Direction);
  if (!est) return JSON.stringify({ error: 'invalid_weight_or_direction' });

  const fx = await fetchJpyIdr();
  const rp = (yen: number) => (fx ? Math.round((yen * fx.rate) / 1000) * 1000 : null);
  const yen = (n: number) => `¥${n.toLocaleString('en-US')}`;
  const idr = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
  const dirText = {
    id: est.direction === 'japan_to_id' ? 'Jepang → Indonesia' : 'Indonesia → Jepang',
    en: est.direction === 'japan_to_id' ? 'Japan → Indonesia' : 'Indonesia → Japan',
    jp: est.direction === 'japan_to_id' ? '日本 → インドネシア' : 'インドネシア → 日本',
  }[lang];
  const rupiah = fx ? ` ≈ ${idr(rp(est.totalMin)!)} – ${idr(rp(est.totalMax)!)}` : '';

  // Teks jadi dengan angka final dari kode; model hanya boleh menyalinnya (angka tidak boleh diubah).
  const readyText = {
    id: `Rute ${dirText}. Berat ${est.inputKg} kg dibulatkan menjadi ${est.billedKg} kg. Tarif ${yen(est.ratePerKgMin)}–${yen(est.ratePerKgMax)} per kg. Estimasi total: ${yen(est.totalMin)} – ${yen(est.totalMax)}${rupiah}.`,
    en: `Route ${dirText}. Weight ${est.inputKg} kg is rounded up to ${est.billedKg} kg. Rate ${yen(est.ratePerKgMin)}–${yen(est.ratePerKgMax)} per kg. Estimated total: ${yen(est.totalMin)} – ${yen(est.totalMax)}${rupiah}.`,
    jp: `ルート: ${dirText}。重量${est.inputKg}kgは${est.billedKg}kgに切り上げ。料金は1kgあたり${yen(est.ratePerKgMin)}〜${yen(est.ratePerKgMax)}。合計の目安: ${yen(est.totalMin)} 〜 ${yen(est.totalMax)}${rupiah}。`,
  }[lang];

  return JSON.stringify({
    ready_text: readyText,
    instruction: 'Sampaikan ready_text ini dengan angka PERSIS seperti tertulis (jangan ubah/hitung ulang). Boleh dirapikan jadi daftar poin dan diterjemahkan ke bahasa user.',
    note: 'Hanya ongkos handcarry untuk barang umum. Harga barang tidak termasuk. Total final dikonfirmasi admin.',
  });
};

type ChatMsg = Groq.Chat.Completions.ChatCompletionMessageParam;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      console.error('[Chat API] GROQ_API_KEY tidak ditemukan');
      return NextResponse.json({ reply: 'Maaf Kak, asisten AI sedang tidak tersedia. Silakan hubungi admin lewat WhatsApp ya.' }, { status: 503 });
    }

    const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
    if (isRateLimited(ip)) {
      return NextResponse.json({ reply: 'Pesannya terlalu cepat Kak, coba lagi beberapa menit lagi ya.' }, { status: 429 });
    }

    const body = await req.json().catch(() => null);
    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    const lang = ['id', 'en', 'jp'].includes(body?.lang) ? (body.lang as string) : 'id';

    if (!message) return NextResponse.json({ reply: 'Pesan kosong.' }, { status: 400 });
    if (message.length > MAX_MESSAGE_CHARS) {
      return NextResponse.json({ reply: `Pesannya terlalu panjang Kak (maksimal ${MAX_MESSAGE_CHARS} karakter). Boleh dipersingkat ya.` }, { status: 413 });
    }

    const history: ChatMsg[] = Array.isArray(body?.history)
      ? body.history
          .filter((m: unknown): m is { role: string; content: string } => typeof (m as { content?: unknown })?.content === 'string')
          .slice(-MAX_HISTORY)
          .map((m: { role: string; content: string }) => ({
            role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
            content: m.content.slice(0, MAX_HISTORY_CHARS),
          }))
      : [];

    const groq = new Groq({ apiKey });
    // Deteksi bahasa user di server lalu suntikkan perintah eksplisit tepat sebelum pesan terakhir
    const replyLang = detectLang(message, lang as ChatLang);
    const langRule =
      replyLang === 'id'
        ? 'Balas dalam bahasa Indonesia dengan sapaan "Kak".'
        : `PENTING: user menulis dalam bahasa ${LANG_NAME[replyLang]}. Balas SELURUHNYA dalam bahasa ${LANG_NAME[replyLang]}, jangan bahasa Indonesia, jangan pakai sapaan "Kak". Terjemahkan juga isi hasil tool.`;

    // Barang khusus (sepatu/figure/elektronik/bulky): tarif beda, jangan beri angka. Cek pesan ini + beberapa pesan user sebelumnya.
    const recentUserText = history.filter((m) => m.role === 'user').slice(-3).map((m) => String(m.content));
    const special = mentionsSpecialItem(message, ...recentUserText);
    const specialRule = special
      ? 'PERHATIAN: percakapan ini menyebut barang khusus (sepatu/figure/elektronik/bulky). Tarif per kg TIDAK berlaku untuk barang itu. JANGAN beri estimasi angka; jelaskan harganya berbeda dan arahkan ke admin WhatsApp sesuai aturan BARANG KHUSUS.'
      : '';

    const baseMessages: ChatMsg[] = [
      { role: 'system', content: buildSystemPrompt(lang) },
      ...history,
      { role: 'system', content: langRule },
      ...(specialRule ? [{ role: 'system' as const, content: specialRule }] : []),
      { role: 'user', content: message },
    ];

    let lastStatus = 0;

    for (const model of FALLBACK_MODELS) {
      try {
        const messages: ChatMsg[] = [...baseMessages];

        for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
          const completion = await groq.chat.completions.create({
            model,
            messages,
            tools: TOOLS,
            tool_choice: special || round >= MAX_TOOL_ROUNDS ? 'none' : 'auto',
            temperature: 0.2,
            max_tokens: 900,
          });

          const msg = completion.choices[0]?.message;
          if (!msg) break;

          if (msg.tool_calls?.length) {
            messages.push({ role: 'assistant', content: msg.content || '', tool_calls: msg.tool_calls });
            for (const call of msg.tool_calls) {
              messages.push({
                role: 'tool',
                tool_call_id: call.id,
                content: await runTool(call.function.name, call.function.arguments, replyLang),
              });
            }
            continue;
          }

          const reply = (msg.content || '').trim();
          if (reply) return NextResponse.json({ reply });
          break;
        }
      } catch (error) {
        const status = (error as { status?: number })?.status ?? 0;
        lastStatus = status;
        // Rate limit / model hilang / tool-call gagal di model ini → coba model berikutnya
        if ([400, 404, 413, 429, 500, 503].includes(status)) {
          console.warn(`[Chat API] Model ${model} gagal (${status}), mencoba berikutnya`);
          continue;
        }
        throw error;
      }
    }

    console.error('[Chat API] Semua model gagal, status terakhir:', lastStatus);
    return NextResponse.json(
      { reply: 'Waduh, server kami lagi penuh Kak. Coba kirim lagi sebentar lagi, atau langsung chat admin lewat WhatsApp ya.' },
      { status: 503 }
    );
  } catch (error) {
    // Jangan bocorkan detail error ke pengguna
    console.error('[Chat API] Error:', error);
    return NextResponse.json({ reply: 'Maaf Kak, ada kendala teknis pada sistem AI kami. Boleh dicoba lagi ya?' }, { status: 500 });
  }
}
