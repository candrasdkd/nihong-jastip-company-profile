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

        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ reply: 'Pesan kosong.' }, { status: 400 });
        }

        // --- PREPARASI DATA ---
        const jastip = getJastipData('id');
        const expedition = getExpeditionData('id');
        const faqs = getFaqData('id');

        const dataJastipText = jastip.routes.map(r => `- ${r.route}: ${r.price}`).join('\n');
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
5. RUTE JEPANG vs INDONESIA: Jangan tertukar! Gunakan rentang harga untuk "Estimasi Min - Max".

MATEMATIKA PEMBULATAN (WAJIB):
- EKSPEDISI: Bulatkan ke atas ke 1 kg berikutnya (1.1kg -> 2kg).
- HANDCARRY: Bulatkan ke atas ke kelipatan 0.5 kg berikutnya (1.1kg -> 1.5kg).
Jabarkan perhitungannya ke user.

=== INFO KONTAK ===
- WhatsApp: https://wa.me/${WA_NUMBER} 
- Instagram: https://instagram.com/nihongjastip

=== DATA HARGA JASTIP HANDCARRY ===
${dataJastipText}

=== DATA HARGA VIA EKSPEDISI ===
${dataEkspedisiText}

=== FAQ & INFO ATURAN ===
${faqText}
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