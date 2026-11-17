import React from 'react';
import { Language } from '../../types';

interface SchemaProps {
  lang: Language;
}

export default function Schema({ lang }: SchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": lang === 'id' ? "Nihong Jastip — Jastip Handcarry Jepang ⇄ Indonesia Terpercaya" : lang === 'en' ? "Nihong Jastip - Japan ⇄ Indonesia Handcarry Personal Shopper" : "Nihong Jastip - 日本 ⇄ インドネシア ハンドキャリー買い物代行",
    "description": lang === 'id' ? "Layanan Jastip Handcarry Jepang ⇄ Indonesia terpercaya. Melayani titip beli dan titip bawa barang Jepang (Mercari, Amazon, Anime, Fashion) dan Indonesia." : lang === 'en' ? "Two-way Japan ⇄ Indonesia Handcarry Personal Shopper. Located in Osaka, Semarang, Depok, and Jakarta." : "日本 ⇄ インドネシアの双方向ハンドキャリー買い物代行。大阪、スマラン、デポック、ジャカルタに拠点を置いています。",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Nihong Jastip",
      "image": "https://www.nihongjastip.com/og-image.png",
      "address": [
        {
          "@type": "PostalAddress",
          "addressLocality": "Osaka",
          "addressCountry": "JP"
        },
        {
          "@type": "PostalAddress",
          "addressLocality": "Semarang",
          "addressCountry": "ID"
        },
        {
          "@type": "PostalAddress",
          "addressLocality": "Depok",
          "addressCountry": "ID"
        },
        {
          "@type": "PostalAddress",
          "addressLocality": "Jakarta",
          "addressCountry": "ID"
        }
      ]
    },
    "areaServed": ["ID", "JP"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": lang === 'id' ? "Layanan Jastip Handcarry Jepang - Indonesia" : "Japan - Indonesia Handcarry Jastip Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Jastip Handcarry Jepang ke Indonesia"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Jastip Handcarry Indonesia ke Jepang"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
