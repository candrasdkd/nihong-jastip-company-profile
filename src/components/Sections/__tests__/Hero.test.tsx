import { render, screen } from '@testing-library/react';
import Hero from '../Hero';



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
