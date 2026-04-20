import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';



describe('Sidebar Component', () => {
  // PENJELASAN SETUP:
  // Kita me-mock 'handleNavClickWithClose' yang merupakan Higher-Order Function (HOF).
  // Mock ini didesain mengembalikan fungsi (mock lagi) karena dipanggil seperti:
  // onClick={handleNavClickWithClose('id')}
  const mockHandleNavClick = jest.fn(() => jest.fn());

  // PENJELASAN TEST:
  // Test ini fokus memvalidasi bahwa Sidebar benar-benar "muncul" di layar saat 
  // prop 'sidebarOpen' bernilai TRUE. 
  // Kita mencari teks "Beranda" untuk memastikan bahwa list menu navigasi telah 
  // berhasil dirender dengan lokalisasi (i18n) Bahasa Indonesia yang tepat.
  it('renders correctly when open', () => {
    render(
      <Sidebar 
        sidebarOpen={true} 
        lang="id" 
        activeMenu="home" 
        handleNavClickWithClose={mockHandleNavClick} 
        toggleSidebar={jest.fn()} 
      />
    );
    // Jika teks "Beranda" ditemukan, berarti komponen berhasil merender menu mobile-nya.
    expect(screen.getByText(/Beranda/i)).toBeInTheDocument();
  });
});
