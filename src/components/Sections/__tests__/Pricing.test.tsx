import { render, screen } from '@testing-library/react';
import Pricing from '../Pricing';

// PENJELASAN MOCKING:
// Library 'framer-motion' seringkali menyebabkan error di lingkungan testing (JSDOM) 
// karena ia mencoba menghitung posisi elemen dan menjalankan animasi CSS.
// Di sini kita men-disable animasi tersebut agar test berjalan cepat dan stabil.
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Pricing Section', () => {
  // Data simulasi untuk rute jastip (Handcarry)
  const mockJastipData = {
    title: 'Harga Jastip',
    routes: [
      { id: '1', route: 'Jepang -> Indonesia', price: '100¥', priceMin: 100, priceMax: 200 }
    ]
  };

  // Data simulasi untuk pengiriman via Ekspedisi Internasional
  const mockExpeditionData = [
    { country: 'Jepang', estimates: '3-5 hari', prices: [{ range: '1kg', price: '1000¥' }] }
  ];

  // PENJELASAN TEST 1:
  // Mengetes tampilan Tab "Via Jastip". 
  // Kita memastikan data yang kita oper via props (jastipData) dirender dengan benar 
  // oleh komponen ke dalam elemen HTML (DOM).
  it('renders jastip tab correctly', () => {
    render(
      <Pricing 
        lang="id" 
        activeTab="jastip" 
        setActiveTab={jest.fn()} 
        jastipData={mockJastipData as any} 
        expeditionData={mockExpeditionData as any} 
      />
    );
    
    // Memastikan judul section dan nama rute muncul di layar
    expect(screen.getByText('Harga Jastip')).toBeInTheDocument();
    expect(screen.getByText('Jepang -> Indonesia')).toBeInTheDocument();
  });

  // PENJELASAN TEST 2:
  // Mengetes tampilan Tab "Via Ekspedisi".
  // Kita mengubah prop `activeTab` menjadi 'expedition' dan memastikan komponen 
  // merubah tampilannya untuk menunjukkan daftar negara (misal: Jepang) dan harganya.
  it('renders expedition tab correctly', () => {
    render(
      <Pricing 
        lang="id" 
        activeTab="expedition" 
        setActiveTab={jest.fn()} 
        jastipData={mockJastipData as any} 
        expeditionData={mockExpeditionData as any} 
      />
    );
    
    // Memastikan nama negara dan harga ekspedisinya muncul di layar
    expect(screen.getByText('Jepang')).toBeInTheDocument();
    expect(screen.getByText('1000¥')).toBeInTheDocument();
  });
});
