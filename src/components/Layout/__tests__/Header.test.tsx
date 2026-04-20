import { render, screen } from '@testing-library/react';
import Header from '../Header';

// PENJELASAN MOCKING (STRATEGI PROXY):
// Kita menggunakan 'Proxy' untuk menangani semua pemanggilan elemen 'motion' di Header.
// Header memiliki banyak motion element (motion.header, motion.nav, dll).
// Proxy membolehkan kita me-mock semuanya sekaligus tanpa harus mendaftarkan satu per satu.
// Setiap pemanggilan properti pada object 'motion' akan dialihkan menjadi render elemen <div> biasa.
jest.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: () => ({ children, ...props }: any) => <div {...props}>{children}</div>
  }),
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Header Component', () => {
  // PENJELASAN SETUP:
  // Prop 'handleNavClick' di Header bertipe function yang mengembalikan function (currying).
  // Mock 'jest.fn(() => jest.fn())' memastikan bahwa pemanggilan handleNavClick('home') 
  // tidak melempar error "is not a function" saat komponen merender event handler onClick.
  const mockHandleNavClick = jest.fn(() => jest.fn());

  // PENJELASAN TEST 1 (Navigasi):
  // Memastikan menu navigasi utama muncul dengan label bahasa Indonesia yang benar.
  // Menu "Home" seharusnya tampil sebagai "Beranda". 
  // Jika teks ini tidak ditemukan, ada kemungkinan sistem i18n atau prop 'lang' bermasalah.
  it('renders navigation links', () => {
    render(
      <Header 
        lang="id" 
        activeMenu="home" 
        handleNavClick={mockHandleNavClick} 
        handleLangChange={jest.fn()}
        toggleSidebar={jest.fn()} 
      />
    );
    expect(screen.getByText(/Beranda/i)).toBeInTheDocument();
  });

  // PENJELASAN TEST 2 (Multi-bahasa):
  // Memastikan pemilih bahasa (Language Selector) merender opsi bahasa yang tersedia.
  // Kita mengecek keberadaan teks "ID" yang menandakan bendera/label bahasa Indonesia ada di dalam dropdown.
  it('renders language selector', () => {
    render(
      <Header 
        lang="id" 
        activeMenu="home" 
        handleNavClick={mockHandleNavClick} 
        handleLangChange={jest.fn()}
        toggleSidebar={jest.fn()} 
      />
    );
    expect(screen.getByText(/ID/i)).toBeInTheDocument();
  });
});
