import type { Metadata } from "next";
import { headers } from "next/headers";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "../globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["600", "700", "800"] });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
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
    id: "Nihong Jastip — Jastip Handcarry Jepang ⇄ Indonesia Terpercaya",
    en: "Nihong Jastip — Japan ⇄ Indonesia Handcarry Personal Shopper",
    jp: "Nihong Jastip — 日本 ⇄ インドネシア ハンドキャリー買い物代行"
  };

  const descriptions = {
    id: "Layanan Jastip Handcarry Jepang ⇄ Indonesia terpercaya. Titip beli & titip bawa barang (Mercari, Amazon, Anime, Fashion) berlokasi di Osaka, Depok, dan Jakarta.",
    en: "Japan ⇄ Indonesia two-way handcarry personal shopper. Secure services in Osaka, Depok, and Jakarta.",
    jp: "日本 ⇄ インドネシアのハンドキャリー買い物代行。大阪、デポック、ジャカルタ拠点で安心・迅速に対応します。"
  };

  return {
    metadataBase: siteUrl,
    title: titles[lang] || titles.id,
    description: descriptions[lang] || descriptions.id,
    keywords: [
      'Jastip Jepang',
      'Jasa Titip Jepang',
      'Jastip Handcarry Jepang',
      'Jastip Jepang Terpercaya',
      'Jastip Barang Jepang',
      'Jastip Mercari Jepang',
      'Jastip Anime Jepang',
      'Jastip Indonesia Jepang',
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
    <html lang={lang} data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Schema lang={lang as Language} />
        {children}
        <ChatBot lang={lang as Language} />
      </body>
    </html>
  );
}
