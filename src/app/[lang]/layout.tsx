export const runtime = 'edge';
import type { Metadata } from "next";
import { headers } from "next/headers";
import "../globals.css";
import { Language } from "../../types";
import Schema from "../../components/SEO/Schema";
import ChatBot from "../../components/UI/ChatBot";

export async function generateMetadata({ params }: { params: Promise<{ lang: Language }> }): Promise<Metadata> {
  const lang = (await params).lang;
  const requestHeaders = await headers();
  const host = requestHeaders.get('x-forwarded-host') || requestHeaders.get('host') || 'www.nihongjastip.com';
  const protocol = requestHeaders.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
  const siteUrl = new URL(`${protocol}://${host}`);
  
  const titles = {
    id: "Nihong Jastip — Jastip Jepang & Jasa Titip Jepang Terpercaya",
    en: "Nihong Jastip — Japan ⇄ Indonesia Personal Shopper & Expedition",
    jp: "Nihong Jastip — 日本 ⇄ インドネシア 買い物代行および配送"
  };

  const descriptions = {
    id: "Layanan Jastip Jepang & Jasa Titip Jepang ke Indonesia terpercaya. Titip beli barang Jepang (Mercari, Amazon, Anime, Fashion) & ekspedisi aman berlokasi di Osaka, Semarang, Depok, dan Jakarta.",
    en: "Japan ⇄ Indonesia Personal Shopper & Expedition. Secure services in Osaka, Semarang, Depok, and Jakarta. Fast shipping to 64 countries.",
    jp: "日本 ⇄ インドネシアの買い物代行。大阪、スマラン、デポック、ジャカルタで安全なサービスを提供。64カ国への迅速な配送。"
  };

  return {
    metadataBase: siteUrl,
    title: titles[lang] || titles.id,
    description: descriptions[lang] || descriptions.id,
    keywords: [
      'Jastip Jepang',
      'Jasa Titip Jepang',
      'Jastip Jepang Terpercaya',
      'Jastip Barang Jepang',
      'Jastip Mercari Jepang',
      'Jastip Anime Jepang',
      'Jastip Indonesia Jepang',
      'Ekspedisi Jepang Indonesia',
      'Nihong Jastip'
    ],
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
      images: [{
        url: new URL('/og-v2.png', siteUrl).toString(),
        width: 1731,
        height: 909,
        alt: 'Nihong Jastip — Jastip Jepang & Jasa Titip Jepang Terpercaya',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang],
      description: descriptions[lang],
      images: [new URL('/og-v2.png', siteUrl).toString()],
    },
    verification: {
      google: "gL6EiGFnxFj2_G7kHqDOHMs3KJjrsvTLWXAjQmdD0Bg",
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
      <body>
        <Schema lang={lang as Language} />
        {children}
        <ChatBot lang={lang as Language} />
      </body>
    </html>
  );
}
