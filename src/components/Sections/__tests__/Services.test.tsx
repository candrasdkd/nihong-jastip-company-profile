import { render, screen } from '@testing-library/react';
import Services from '../Services';

// PENJELASAN MOCKING:
// Sama seperti Hero, kita menonaktifkan animasi framer-motion.
// Tujuannya agar kita bisa fokus mengetes konten teks di dalam grid layanan.
jest.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: () => ({ children, ...props }: any) => <div {...props}>{children}</div>
  }),
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Services Section', () => {
  // PENJELASAN TEST 1:
  // Memastikan judul section "Layanan Kami" tampil saat bahasa adalah Indonesia.
  it('renders services list in Indonesian', () => {
    render(<Services lang="id" />);
    expect(screen.getByText(/Layanan Kami/i)).toBeInTheDocument();
  });

  // PENJELASAN TEST 2:
  // Memastikan dua kategori layanan utama (Jastip dan Ekspedisi) tampil di layar.
  // Jika salah satu hilang, berarti ada kesalahan pada iterasi data atau filter bahasa.
  it('displays core service categories', () => {
    render(<Services lang="id" />);
    expect(screen.getByText(/Via Jastip/i)).toBeInTheDocument();
    expect(screen.getByText(/Via Ekspedisi/i)).toBeInTheDocument();
  });
});
