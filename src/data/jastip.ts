// Data harga Jastip Handcarry (SUMBER TUNGGAL — ubah di sini, berlaku semua bahasa)
export interface JastipRouteBase {
  key: 'japan_to_id' | 'id_to_japan';
  priceMin: number;
  priceMax: number;
  currency: '¥';
  unit: 'kg';
}

export const JASTIP_ROUTES_BASE: JastipRouteBase[] = [
  { key: 'japan_to_id', priceMin: 1300, priceMax: 1700, currency: '¥', unit: 'kg' },
  { key: 'id_to_japan', priceMin: 1100, priceMax: 1500, currency: '¥', unit: 'kg' },
];

// Terjemahan label rute per bahasa
const JASTIP_LABELS: Record<string, { title: string; routes: Record<string, string> }> = {
  id: {
    title: 'Via Jastip',
    routes: { japan_to_id: 'Jepang → Indonesia', id_to_japan: 'Indonesia → Jepang' },
  },
  en: {
    title: 'Via Jastip',
    routes: { japan_to_id: 'Japan → Indonesia', id_to_japan: 'Indonesia → Japan' },
  },
  jp: {
    title: '買い物代行',
    routes: { japan_to_id: '日本 → インドネシア', id_to_japan: 'インドネシア → 日本' },
  },
};

import { JastipData } from '../types';

export const getJastipData = (lang: string = 'id'): JastipData => {
  const labels = JASTIP_LABELS[lang] || JASTIP_LABELS['id'];

  return {
    title: labels.title,
    routes: JASTIP_ROUTES_BASE.map((r) => ({
      route: labels.routes[r.key],
      // Format harga sebagai string display untuk UI komponen yang sudah ada
      price: `${r.priceMin}${r.currency} - ${r.priceMax}${r.currency} / ${r.unit}`,
      // Data numerik juga tersedia untuk perhitungan AI/logika
      priceMin: r.priceMin,
      priceMax: r.priceMax,
      currency: r.currency,
    })),
  };
};
