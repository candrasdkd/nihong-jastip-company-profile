import { redirect } from 'next/navigation';

// Root redirect: / → /id (default locale)
// Menggantikan fungsi proxy.ts (middleware) yang tidak kompatibel dengan Cloudflare Workers
export default function RootPage() {
  redirect('/id');
}
