import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

// PENJELASAN MOCKING:
// Kita memalsukan 'framer-motion' menggunakan Proxy.
// Mengapa? Karena di dalam Hero banyak sekali elemen motion (h1, p, div, a) 
// yang memiliki animasi kompleks. Tanpa mock ini, JSDOM akan kewalahan 
// dan test akan berjalan lambat atau bahkan error.
jest.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: () => ({ children, ...props }: any) => <div {...props}>{children}</div>
  }),
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Hero Section', () => {
  // PENJELASAN TEST 1:
  // Memastikan bahwa saat bahasa disetel ke Indonesia ('id'),
  // teks utama "Jasa Titip & Ekspedisi" muncul di layar.
  // Ini memverifikasi bahwa sistem i18n/kondisional rendering bahasa bekerja.
  it('renders correctly in Indonesian', () => {
    render(<Hero lang="id" openWhatsApp={jest.fn()} setActiveMenu={jest.fn()} scrollToId={jest.fn()} />);
    expect(screen.getByText(/Jasa Titip & Ekspedisi/i)).toBeInTheDocument();
  });

  // PENJELASAN TEST 2:
  // Memastikan bahwa saat bahasa disetel ke Inggris ('en'),
  // teks berganti menjadi "Personal Shopper". 
  // Ini penting agar user internasional mendapatkan informasi yang tepat.
  it('renders correctly in English', () => {
    render(<Hero lang="en" openWhatsApp={jest.fn()} setActiveMenu={jest.fn()} scrollToId={jest.fn()} />);
    expect(screen.getByText(/Personal Shopper/i)).toBeInTheDocument();
  });
});
