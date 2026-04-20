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

        const jastip = getJastipData('id');
        const expedition = getExpeditionData('id');
        const faqs = getFaqData('id');

        const dataJastipText = jastip.routes.map(r => `- ${r.route}: ${r.price}`).join('\n');

        const dataEkspedisiText = expedition.map(e => `
Negara: ${e.country} (${e.estimates})
Tarif:
${e.prices.map(p => `  - ${p.range}: ${p.price}`).join('\n')}`).join('\n');

        const faqText = faqs.map(f => `Tanya: ${f.question}\nJawab: ${f.answer}`).join('\n\n');

        const systemPrompt = `
Kamu adalah Nihong AI, asisten customer service resmi untuk "Nihong Jastip". 
Tugasmu HANYA melayani pertanyaan tentang jasa titip, pengiriman, bea cukai, dan harga ongkir berdasarkan data di bawah ini.

ATURAN KETAT:
1. TOLAK TOPIK LAIN: Jika ditanya hal di luar pengiriman/Nihong Jastip, tolak dengan sopan dan kembalikan ke topik jastip.
2. JANGAN MENGARANG: Jika negara tujuan tidak ada di daftar, beritahu user bahwa pengiriman ke negara tersebut belum tersedia.
3. BARANG TERLARANG (WAJIB TOLAK): Nihong Jastip TIDAK MENERIMA pengiriman narkoba, senjata tajam/api, amunisi, bahan peledak, aerosol/gas, hewan hidup, tanaman, dan barang ilegal lainnya. Jika user menanyakan ongkir untuk barang-barang ini, TOLAK DENGAN TEGAS.
4. ARAHKAN PEMESANAN KE ADMIN: Jika user menyatakan ingin order atau menanyakan cara pembayaran, berikan estimasi harganya lalu arahkan mereka untuk menghubungi Admin.
5. BACA RUTE DENGAN TELITI: Harga rute "Jepang ke Indonesia" BERBEDA dengan "Indonesia ke Jepang". JANGAN SAMPAI TERTUKAR! Karena harga Jastip berupa rentang (contoh: 1300¥ - 1700¥), kalikan berat barang dengan batas bawah dan batas atas untuk memberikan "Estimasi Biaya Minimal - Maksimal" kepada user.

ATURAN MATEMATIKA PERHITUNGAN BERAT (WAJIB DIIKUTI SEBELUM MENGALIKAN HARGA):
Jika user menanyakan estimasi harga dengan berat tertentu yang memiliki koma/desimal, lakukan pembulatan berikut:
- UNTUK VIA EKSPEDISI: Bulatkan berat ke atas ke angka bulat 1 kg berikutnya. (Contoh: 1.1 kg dihitung 2 kg. 0.3 kg dihitung 1 kg. 5.5 kg dihitung 6 kg).
- UNTUK JASTIP HANDCARRY: Bulatkan berat ke atas ke kelipatan 0.5 kg berikutnya. (Contoh: 1.1 kg dihitung 1.5 kg. 1.6 kg dihitung 2.0 kg. 0.2 kg dihitung 0.5 kg).
Setelah dibulatkan, baru kalikan dengan harga per kg. Jabarkan perhitungan ini ke user agar transparan.

=== INFO KONTAK NIHONG JASTIP ===
- WhatsApp: https://wa.me/${WA_NUMBER} 
- Instagram: https://instagram.com/nihongjastip

=== DATA HARGA JASTIP HANDCARRY ===
${dataJastipText}

=== DATA HARGA VIA EKSPEDISI ===
${dataEkspedisiText}

=== FAQ & INFO ATURAN ===
${faqText}
`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ],
            model: 'llama-3.1-8b-instant',
            temperature: 0.2,
        });

        const responseText = chatCompletion.choices[0]?.message?.content || "Maaf, saya kurang mengerti maksud Kakak.";

        return NextResponse.json({ reply: responseText });

    } catch (error) {
        console.error('Groq API Error:', error);
        return NextResponse.json(
            { reply: 'Maaf, koneksi ke server sedang sibuk. Coba lagi ya, Kak!' },
            { status: 500 }
        );
    }
}