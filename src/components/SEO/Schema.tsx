import React from 'react';
import { Language } from '../../types';

interface SchemaProps {
  lang: Language;
}

export default function Schema({ lang }: SchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": lang === 'id' ? "Nihong Jastip - Jasa Titip Jepang ⇄ Indonesia" : lang === 'en' ? "Nihong Jastip - Japan ⇄ Indonesia Personal Shopper" : "Nihong Jastip - 日本 ⇄ インドネシア 買い物代行",
    "description": lang === 'id' ? "Layanan Jasa Titip (Jastip) dua arah Jepang ⇄ Indonesia dan Ekspedisi Internasional ke 64 negara. Berlokasi di Osaka, Semarang, Depok, dan Jakarta." : lang === 'en' ? "Two-way Japan ⇄ Indonesia Personal Shopper and International Expedition. Located in Osaka, Semarang, Depok, and Jakarta." : "日本 ⇄ インドネシアの両方向買い物代行、および64カ国への国際配送。大阪、スマラン、デポック、ジャカルタに拠点を置いています。",
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
    "areaServed": ["ID", "JP", "US", "SG", "MY"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": lang === 'id' ? "Layanan Jastip Jepang - Indonesia" : "Japan - Indonesia Jastip Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Jastip Jepang ke Indonesia"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Jastip Indonesia ke Jepang"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ekspedisi Internasional 64 Negara"
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
