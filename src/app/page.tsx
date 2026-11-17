import { redirect } from 'next/navigation';

// Root redirect: / → /id (default locale)
export default function RootPage() {
  redirect('/id');
}
