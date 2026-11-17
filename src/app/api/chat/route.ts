import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';
import { getJastipData, getFaqData } from '../../../data';
import { WA_NUMBER } from '../../../utils/whatsapp';

// Gunakan Node.js runtime untuk kompatibilitas groq-sdk di Vercel
export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GROQ_API_KEY;
        
        if (!apiKey || apiKey.trim() === '') {
            console.error('[Chat API] Missing GROQ_API_KEY environment variable');
            return NextResponse.json({ 
                reply: 'Konfigurasi Server Error: API Key tidak ditemukan di dashboard Vercel.',
                debug: 'Missing GROQ_API_KEY'
            }, { status: 500 });
        }

        const groq = new Groq({ apiKey });

        const { message, history } = await req.json();

        if (!message) {
            return NextResponse.json({ reply: 'Pesan kosong.' }, { status: 400 });
        }

        // Batasi history menjadi 10 pesan terakhir agar tidak menguras token
        type ChatRole = 'user' | 'assistant';
        const trimmedHistory: { role: ChatRole; content: string }[] = Array.isArray(history)
            ? history.slice(-10).map((m: { role: string; content: string }) => ({
                role: (m.role === 'user' ? 'user' : 'assistant') as ChatRole,
                content: m.content,
              }))
            : [];

        // --- PREPARASI DATA ---
        const jastip = getJastipData('id');
        const faqs = getFaqData('id');

        const dataJastipText = jastip.routes.map(r => {
            return `
RUTE: ${r.route}
- Harga Minimal: ${r.priceMin || ""}¥ per kg
- Harga Maksimal: ${r.priceMax || ""}¥ per kg
---`;
        }).join('\n');
        const faqText = faqs.map(f => `Tanya: ${f.question}\nJawab: ${f.answer}`).join('\n\n');

        // --- SYSTEM PROMPT ---
        const systemPrompt = `
Kamu adalah Nihong AI, asisten customer service resmi untuk "Nihong Jastip". 
Tugasmu HANYA melayani pertanyaan tentang jasa titip handcarry (titip beli & titip bawa) rute Jepang ⇄ Indonesia, bea cukai handcarry, dan estimasi biaya berdasarkan data di bawah ini.

ATURAN KETAT:
1. TOLAK TOPIK LAIN: Jika ditanya hal di luar jastip handcarry / Nihong Jastip, tolak dengan sopan.
2. FOKUS INDONESIA ⇄ JEPANG HANDCARRY: Nihong Jastip hanya melayani rute Jepang → Indonesia dan Indonesia → Jepang secara handcarry. Jika user menanyakan negara lain selain Indonesia dan Jepang, atau layanan ekspedisi kargo/laut, sampaikan dengan sopan bahwa saat ini layanan hanya fokus pada Jastip Handcarry Jepang ⇄ Indonesia.
3. BARANG TERLARANG: TOLAK TEGAS narkoba, senjata, aerosol, hewan, tanaman, dan barang ilegal.
4. ARAHKAN PEMESANAN: Berikan estimasi harga, lalu arahkan ke WhatsApp Admin.
5. RUTE BOLAK-BALIK: Nihong Jastip melayani rute "Jepang → Indonesia" DAN "Indonesia → Jepang". Pastikan Kakak membaca data rute dengan teliti sesuai permintaan user agar harga tidak tertukar. Jika user tanya rute ke Jepang, gunakan data "Indonesia → Jepang".

ATURAN MATEMATIKA PERHITUNGAN (WAJIB DIIKUTI):
Lakukan langkah-langkah ini secara urut:
1. Tentukan Berat Awal dari user (minimum charge 1 kg; jika di bawah 1 kg, hitung sebagai 1 kg).
2. Lakukan Pembulatan Handcarry: kelipatan 0.5kg ke atas.
3. Ambil "Harga Minimal" dan "Harga Maksimal" dari data rute yang tepat.
4. Hitung: 
   - Estimasi Total Min = (Berat Setelah Pembulatan) x (Harga Minimal)
   - Estimasi Total Max = (Berat Setelah Pembulatan) x (Harga Maksimal)
5. Jabarkan hasilnya ke user dengan format:
   "Berat [X] kg dibulatkan menjadi [Y] kg.
    Estimasi biaya: [Total Min]¥ - [Total Max]¥."

=== INFO KONTAK ===
- WhatsApp: https://wa.me/${WA_NUMBER} 
- Instagram: https://instagram.com/nihongjastip

=== DATA HARGA JASTIP HANDCARRY ===
${dataJastipText}

=== FAQ & INFO ATURAN ===
${faqText}

Sebelum memberikan jawaban akhir, pikirkan dulu di dalam hati (internal monologue) mana rute yang benar dan pastikan angka Minimal lebih kecil dari angka Maksimal.
`;

        // --- LOGIKA FALLBACK MODEL ---
        // Urutan: Cepat & multibahasa -> Ringan -> Kapasitas besar (Backup)
        const fallbackModels = [
            'qwen/qwen3.8-27b',     // Prioritas 1: Cepat (~250ms), multibahasa (ID/EN/JP)
            'openai/gpt-oss-20b',   // Prioritas 2: Ringan & cepat
            'openai/gpt-oss-120b'   // Prioritas 3: Backup kapasitas besar
        ];

        let responseText = "";
        let success = false;
        let lastErrorStatus = 0;

        for (const modelId of fallbackModels) {
            try {
                const chatCompletion = await groq.chat.completions.create({
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...trimmedHistory,
                        { role: 'user', content: message }
                    ],
                    model: modelId,
                    temperature: 0.2, // Low temperature agar jawaban konsisten & tidak ngaco
                    max_tokens: 2048,
                });

                responseText = chatCompletion.choices[0]?.message?.content || "";

                if (responseText) {
                    success = true;
                    console.log(`[Success] Respon menggunakan model: ${modelId}`);
                    break;
                }
            } catch (error: any) {
                lastErrorStatus = error?.status;

                // Jika error 429 (Rate Limit) atau 404 (Model tidak tersedia/deprecated), lanjut ke model berikutnya
                if (error?.status === 429 || error?.status === 404) {
                    console.warn(`[Fallback] Model ${modelId} gagal (${error?.status}). Mencoba model berikutnya...`);
                    continue;
                } else {
                    // Jika error lain (misal API Key salah/Auth), stop dan lempar ke catch utama
                    throw error;
                }
            }
        }

        if (!success) {
            return NextResponse.json(
                { reply: 'Waduh, server kami lagi penuh banget Kak. Coba kirim pesan lagi dalam 1 menit ya!' },
                { status: lastErrorStatus || 500 }
            );
        }

        return NextResponse.json({ reply: responseText });

    } catch (error: any) {
        console.error('Groq API General Error:', error);
        return NextResponse.json(
            { 
                reply: 'Maaf Kak, ada kendala teknis pada sistem AI kami. Boleh dicoba lagi ya?',
                error: error?.message || 'Unknown Error',
                cause: error?.cause || 'No cause provided'
            },
            { status: 500 }
        );
    }
}