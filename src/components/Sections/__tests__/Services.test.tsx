import { render, screen } from '@testing-library/react';
import Services from '../Services';



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
