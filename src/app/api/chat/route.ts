import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';
import { getJastipData, getExpeditionData, getFaqData } from '../../../data';
import { WA_NUMBER } from '../../../utils/whatsapp';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    try {
        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json({ reply: 'Server Error: API Key hilang.' }, { status: 500 });
        }

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
        const expedition = getExpeditionData('id');
        const faqs = getFaqData('id');

        const dataJastipText = jastip.routes.map(r => {
            return `
RUTE: ${r.route}
- Harga Minimal: ${r.priceMin || ""}¥ per kg
- Harga Maksimal: ${r.priceMax || ""}¥ per kg
---`;
        }).join('\n');
        const dataEkspedisiText = expedition.map(e => `
Negara: ${e.country} (${e.estimates})
Tarif:
${e.prices.map(p => `  - ${p.range}: ${p.price}`).join('\n')}`).join('\n');
        const faqText = faqs.map(f => `Tanya: ${f.question}\nJawab: ${f.answer}`).join('\n\n');

        // --- SYSTEM PROMPT ---
        const systemPrompt = `
Kamu adalah Nihong AI, asisten customer service resmi untuk "Nihong Jastip". 
Tugasmu HANYA melayani pertanyaan tentang jasa titip, pengiriman, bea cukai, dan harga ongkir berdasarkan data di bawah ini.

ATURAN KETAT:
1. TOLAK TOPIK LAIN: Jika ditanya hal di luar pengiriman/Nihong Jastip, tolak dengan sopan.
2. JANGAN MENGARANG: Jika negara tidak ada di daftar, katakan belum tersedia.
3. BARANG TERLARANG: TOLAK TEGAS narkoba, senjata, aerosol, hewan, tanaman, dan barang ilegal.
4. ARAHKAN PEMESANAN: Berikan estimasi harga, lalu arahkan ke WhatsApp Admin.
5. RUTE BOLAK-BALIK: Nihong Jastip melayani rute "Jepang ke Indonesia" DAN "Indonesia ke Jepang". Pastikan Kakak membaca data rute dengan teliti sesuai permintaan user agar harga tidak tertukar. Jika user tanya rute ke Jepang, gunakan data "Indonesia → Jepang".

ATURAN MATEMATIKA PERHITUNGAN (WAJIB DIIKUTI):
Lakukan langkah-langkah ini secara urut:
1. Tentukan Berat Awal dari user.
2. Lakukan Pembulatan (Handcarry: kelipatan 0.5kg ke atas | Ekspedisi: ke 1kg bulat ke atas).
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

=== DATA HARGA VIA EKSPEDISI ===
${dataEkspedisiText}

=== FAQ & INFO ATURAN ===
${faqText}

Sebelum memberikan jawaban akhir, pikirkan dulu di dalam hati (internal monologue) mana rute yang benar dan pastikan angka Minimal lebih kecil dari angka Maksimal.
`;

        // --- LOGIKA FALLBACK MODEL ---
        // Urutan: Paling Murah -> Paling Cepat -> Paling Pintar (Backup)
        const fallbackModels = [
            'llama-3.1-8b-instant',      // Prioritas 1: Sangat Murah & Cepat
            'openai/gpt-oss-20b',        // Prioritas 2: Keseimbangan Harga & Kecepatan
            'llama-3.3-70b-versatile'    // Prioritas 3: Paling Pintar & Limit TPM Besar
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
                    max_tokens: 1024,
                });

                responseText = chatCompletion.choices[0]?.message?.content || "";

                if (responseText) {
                    success = true;
                    console.log(`[Success] Respon menggunakan model: ${modelId}`);
                    break;
                }
            } catch (error: any) {
                lastErrorStatus = error?.status;

                // Jika error 429 (Rate Limit), lanjut ke model berikutnya
                if (error?.status === 429) {
                    console.warn(`[Fallback] Model ${modelId} kena limit. Mencoba model berikutnya...`);
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
        console.error('Groq API Error:', error);
        return NextResponse.json(
            { reply: 'Maaf Kak, ada kendala teknis sebentar. Boleh dicoba lagi ya?' },
            { status: 500 }
        );
    }
}