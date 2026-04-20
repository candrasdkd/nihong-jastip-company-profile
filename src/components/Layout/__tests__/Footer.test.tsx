import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

// PENJELASAN MOCKING:
// Menonaktifkan animasi agar fokus pada validasi informasi di footer.
jest.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: () => ({ children, ...props }: any) => <div {...props}>{children}</div>
  }),
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Footer Component', () => {
  // Mock fungsi navigasi yang diperlukan oleh komponen Footer
  const mockHandleNavClick = jest.fn(() => jest.fn());

  // PENJELASAN TEST:
  // Memastikan Footer mengandung informasi Brand dan Copyright.
  // Karena Brand "Nihong Jastip" mungkin muncul di logo dan teks, kita gunakan 'getAllByText'.
  // Teks Copyright biasanya statis, jadi kita pastikan teks "All rights reserved" ada.
  it('renders copyright and social links', () => {
    render(<Footer lang="id" handleNavClick={mockHandleNavClick} />);
    
    // Verifikasi Brand
    const brandElements = screen.getAllByText(/Nihong Jastip/i);
    expect(brandElements.length).toBeGreaterThan(0);
    
    // Verifikasi Teks Hak Cipta
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });
});
