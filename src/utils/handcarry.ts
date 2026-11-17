import { JASTIP_ROUTES_BASE, JastipRouteBase } from '../data/jastip';

export type Direction = JastipRouteBase['key'];

export interface HandcarryEstimate {
  direction: Direction;
  inputKg: number;
  billedKg: number;
  ratePerKgMin: number;
  ratePerKgMax: number;
  totalMin: number;
  totalMax: number;
}

/** Berat tertagih: minimum 1 kg, dibulatkan ke atas per kelipatan 0,5 kg. */
export const billedWeight = (kg: number): number => Math.max(1, Math.ceil(kg * 2) / 2);

/** Satu-satunya sumber hitungan ongkos handcarry (dipakai chatbot). */
export const estimateHandcarry = (kg: number, direction: Direction): HandcarryEstimate | null => {
  const route = JASTIP_ROUTES_BASE.find((r) => r.key === direction);
  if (!route || !Number.isFinite(kg) || kg <= 0) return null;
  const billedKg = billedWeight(kg);
  return {
    direction,
    inputKg: kg,
    billedKg,
    ratePerKgMin: route.priceMin,
    ratePerKgMax: route.priceMax,
    totalMin: Math.round(billedKg * route.priceMin),
    totalMax: Math.round(billedKg * route.priceMax),
  };
};
