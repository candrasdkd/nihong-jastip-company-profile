import { ExpeditionCountry } from '../types';

// ============================================================
// BASE DATA — Harga tidak berulang! Cukup ubah di sini.
// ============================================================
interface ExpeditionBase {
  key: string;
  estimates_days: number | null; // null = tidak ada estimasi (contoh: Jepang)
  prices: { range: string; price: string }[];
}

const EXPEDITION_BASE: ExpeditionBase[] = [
  {
    key: 'singapore',
    estimates_days: 7,
    prices: [
      { range: '1-5 kg',   price: '95.000/kg' },
      { range: '6-10 kg',  price: '85.000/kg' },
      { range: '11-20 kg', price: '75.000/kg' },
      { range: '20-30 kg', price: '60.000/kg' },
    ],
  },
  {
    key: 'brunei',
    estimates_days: 7,
    prices: [
      { range: '1-5 kg',   price: '165.000/kg' },
      { range: '6-10 kg',  price: '155.000/kg' },
      { range: '20-30 kg', price: '150.000/kg' },
    ],
  },
  {
    key: 'malaysia',
    estimates_days: 7,
    prices: [
      { range: '1-10 kg',  price: '95.000/kg' },
      { range: '11-25 kg', price: '85.000/kg' },
      { range: '26-30 kg', price: '80.000/kg' },
    ],
  },
  {
    key: 'east_malaysia',
    estimates_days: 7,
    prices: [
      { range: '1-10 kg',  price: '115.000/kg' },
      { range: '11-25 kg', price: '105.000/kg' },
      { range: '26-30 kg', price: '100.000/kg' },
    ],
  },
  {
    key: 'hongkong',
    estimates_days: 7,
    prices: [
      { range: '1-10 kg',  price: '155.000/kg' },
      { range: '11-25 kg', price: '145.000/kg' },
      { range: '26-30 kg', price: '140.000/kg' },
    ],
  },
  {
    key: 'taiwan',
    estimates_days: 7,
    prices: [
      { range: '1-10 kg',  price: '105.000/kg' },
      { range: '11-20 kg', price: '95.000/kg' },
      { range: '21-30 kg', price: '90.000/kg' },
    ],
  },
  {
    key: 'japan',
    estimates_days: null,
    prices: [
      { range: '0.5 kg',   price: '2.500¥/kg' },
      { range: '1 kg',     price: '3.700¥/kg' },
      { range: '2-3 kg',   price: '2.600¥/kg' },
      { range: '4-8 kg',   price: '2.100¥/kg' },
      { range: '9-12 kg',  price: '1.900¥/kg' },
      { range: '13-20 kg', price: '1.800¥/kg' },
      { range: '21-30 kg', price: '1.600¥/kg' },
    ],
  },
  {
    key: 'saudi',
    estimates_days: 7,
    prices: [
      { range: '1 kg',     price: '395.000' },
      { range: '2 kg',     price: '495.000' },
      { range: '3 kg',     price: '610.000' },
      { range: '4 kg',     price: '740.000' },
      { range: '5 kg',     price: '850.000' },
      { range: '6 kg',     price: '960.000' },
      { range: '7 kg',     price: '1.100.000' },
      { range: '8 kg',     price: '1.200.000' },
      { range: '9 kg',     price: '1.300.000' },
      { range: '10 kg',    price: '1.400.000' },
      { range: '11-30 kg', price: 'PER_KG_EXTRA' }, // diisi via label
    ],
  },
];

// ============================================================
// LABEL — Hanya nama negara, estimasi, dan teks khusus per bahasa
// ============================================================
interface CountryLabel {
  name: string;
  extra?: Record<string, string>; // override harga teks khusus per bahasa (ex: Saudi per-kg label)
}

const EXPEDITION_LABELS: Record<string, Record<string, CountryLabel>> = {
  id: {
    singapore:    { name: 'Singapura' },
    brunei:       { name: 'Brunei' },
    malaysia:     { name: 'Malaysia' },
    east_malaysia:{ name: 'Malaysia Timur (Sabah Serawak)' },
    hongkong:     { name: 'Hongkong' },
    taiwan:       { name: 'Taiwan' },
    japan:        { name: 'Jepang' },
    saudi:        { name: 'Arab Saudi', extra: { 'PER_KG_EXTRA': 'Per kg tambahan 100.000' } },
  },
  en: {
    singapore:    { name: 'Singapore' },
    brunei:       { name: 'Brunei' },
    malaysia:     { name: 'Malaysia' },
    east_malaysia:{ name: 'East Malaysia (Sabah Sarawak)' },
    hongkong:     { name: 'Hong Kong' },
    taiwan:       { name: 'Taiwan' },
    japan:        { name: 'Japan' },
    saudi:        { name: 'Saudi Arabia', extra: { 'PER_KG_EXTRA': 'Additional kg 100.000' } },
  },
  jp: {
    singapore:    { name: 'シンガポール' },
    brunei:       { name: 'ブルネイ' },
    malaysia:     { name: 'マレーシア' },
    east_malaysia:{ name: '東マレーシア（サバ・サラワク）' },
    hongkong:     { name: '香港' },
    taiwan:       { name: '台湾' },
    japan:        { name: '日本' },
    saudi:        { name: 'サウジアラビア', extra: { 'PER_KG_EXTRA': '追加1kgあたり 100.000' } },
  },
};

// Template estimasi per bahasa
const ESTIMATES_TEMPLATE: Record<string, (days: number) => string> = {
  id: (d) => `Estimasi ${d} hari`,
  en: (d) => `Estimated ${d} days`,
  jp: (d) => `推定${d}日`,
};

export const getExpeditionData = (lang: string = 'id'): ExpeditionCountry[] => {
  const labels = EXPEDITION_LABELS[lang] || EXPEDITION_LABELS['id'];
  const estimateFn = ESTIMATES_TEMPLATE[lang] || ESTIMATES_TEMPLATE['id'];

  return EXPEDITION_BASE.map((base) => {
    const label = labels[base.key];

    return {
      country: label.name,
      estimates: base.estimates_days !== null ? estimateFn(base.estimates_days) : '',
      // Resolusi teks khusus per bahasa (misalnya label "Per kg tambahan")
      prices: base.prices.map((p) => ({
        range: p.range,
        price: label.extra?.[p.price] ?? p.price,
      })),
    };
  });
};
