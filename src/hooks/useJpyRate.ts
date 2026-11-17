import { useEffect, useState } from 'react';

export const FALLBACK_JPY_IDR = 114; // dipakai kalau kurs live gagal dimuat

/** Kurs JPY→IDR live dari /api/rate, dengan nilai cadangan. */
export const useJpyRate = () => {
  const [rate, setRate] = useState(FALLBACK_JPY_IDR);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/rate')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (cancelled || typeof d.rate !== 'number') return;
        setRate(Math.round(d.rate * 100) / 100);
        setLive(true);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return { rate, live };
};
