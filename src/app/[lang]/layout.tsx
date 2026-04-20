import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Language } from "../../types";
import Schema from "../../components/SEO/Schema";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }): Promise<Metadata> {
  const lang = (await params).lang;
  
  const titles = {
    id: "Nihong Jastip — Jasa Titip Jepang ⇄ Indonesia & Ekspedisi",
    en: "Nihong Jastip — Japan ⇄ Indonesia Personal Shopper & Expedition",
    jp: "Nihong Jastip — 日本 ⇄ インドネシア 買い物代行および配送"
  };

  const descriptions = {
    id: "Jasa Titip (Jastip) Jepang ⇄ Indonesia. Layanan aman di Osaka, Semarang, Depok, dan Jakarta. Pengiriman ke 64 negara cepat & transparan.",
    en: "Japan ⇄ Indonesia Personal Shopper. Secure services in Osaka, Semarang, Depok, and Jakarta. Fast shipping to 64 countries.",
    jp: "日本 ⇄ インドネシアの買い物代行。大阪、スマラン、デポック、ジャカルタで安全なサービスを提供。64カ国への迅速な配送。"
  };

  return {
    metadataBase: new URL('https://www.nihongjastip.com'),
    title: titles[lang] || titles.id,
    description: descriptions[lang] || descriptions.id,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'id-ID': '/id',
        'en-US': '/en',
        'ja-JP': '/jp',
      },
    },
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      type: "website",
      locale: lang === 'jp' ? 'ja_JP' : lang === 'en' ? 'en_US' : 'id_ID',
    }
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const lang = (await params).lang;
  
  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body className={inter.className}>
        <Schema lang={lang as Language} />
        {children}
      </body>
    </html>
  );
}
