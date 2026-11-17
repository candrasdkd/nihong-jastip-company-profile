import { NextResponse } from 'next/server';

// Kurs JPY -> IDR. Sumber utama open.er-api.com (update harian, tanpa API key),
// cadangan frankfurter.dev (data ECB). Di-cache 1 jam di sisi server.
export const revalidate = 3600;

async function fromErApi() {
  const r = await fetch('https://open.er-api.com/v6/latest/JPY', { next: { revalidate: 3600 } });
  if (!r.ok) throw new Error('er-api');
  const d = await r.json();
  const rate = d?.rates?.IDR;
  if (typeof rate !== 'number') throw new Error('er-api shape');
  return { rate, updatedAt: d.time_last_update_utc as string, source: 'open.er-api.com' };
}

async function fromFrankfurter() {
  const r = await fetch('https://api.frankfurter.dev/v1/latest?base=JPY&symbols=IDR', { next: { revalidate: 3600 } });
  if (!r.ok) throw new Error('frankfurter');
  const d = await r.json();
  const rate = d?.rates?.IDR;
  if (typeof rate !== 'number') throw new Error('frankfurter shape');
  return { rate, updatedAt: d.date as string, source: 'frankfurter.dev' };
}

export async function GET() {
  try {
    return NextResponse.json(await fromErApi());
  } catch {
    try {
      return NextResponse.json(await fromFrankfurter());
    } catch {
      return NextResponse.json({ error: 'rate_unavailable' }, { status: 502 });
    }
  }
}
