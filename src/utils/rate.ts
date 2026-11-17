export interface JpyIdrRate {
  rate: number;
  updatedAt: string;
  source: string;
}

const get = async (url: string) => {
  const r = await fetch(url, { next: { revalidate: 3600 } });
  if (!r.ok) throw new Error(`rate ${r.status}`);
  return r.json();
};

/** Kurs JPY -> IDR: open.er-api.com, cadangan frankfurter.dev. null kalau keduanya gagal. */
export const fetchJpyIdr = async (): Promise<JpyIdrRate | null> => {
  try {
    const d = await get('https://open.er-api.com/v6/latest/JPY');
    if (typeof d?.rates?.IDR === 'number') return { rate: d.rates.IDR, updatedAt: String(d.time_last_update_utc), source: 'open.er-api.com' };
  } catch { /* coba cadangan */ }
  try {
    const d = await get('https://api.frankfurter.dev/v1/latest?base=JPY&symbols=IDR');
    if (typeof d?.rates?.IDR === 'number') return { rate: d.rates.IDR, updatedAt: String(d.date), source: 'frankfurter.dev' };
  } catch { /* gagal */ }
  return null;
};
