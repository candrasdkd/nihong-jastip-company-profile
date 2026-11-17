import { NextResponse } from 'next/server';
import { fetchJpyIdr } from '../../../utils/rate';

// Kurs JPY -> IDR, di-cache 1 jam di sisi server.
export const revalidate = 3600;

export async function GET() {
  const data = await fetchJpyIdr();
  if (!data) return NextResponse.json({ error: 'rate_unavailable' }, { status: 502 });
  return NextResponse.json(data);
}
