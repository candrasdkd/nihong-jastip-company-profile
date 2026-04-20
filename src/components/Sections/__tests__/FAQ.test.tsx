import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from '../FAQ';

// PENJELASAN MOCKING:
// Mematikan animasi framer-motion agar transisi buka/tutup FAQ tidak mengganggu 
// timing eksekusi test kita.
jest.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: () => ({ children, ...props }: any) => <div {...props}>{children}</div>
  }),
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('FAQ Section', () => {
  // Data simulasi untuk pengetesan FAQ
  const mockFaqs = [
    { question: 'Apa itu Jastip?', answer: 'Jasa Titip Beli' }
  ];

  // PENJELASAN TEST 1:
  // Memastikan daftar pertanyaan yang diberikan melalui props muncul di layar.
  it('renders FAQ list correctly', () => {
    render(<FAQ lang="id" faqData={mockFaqs} activeFaqs={[]} toggleFaq={jest.fn()} />);
    expect(screen.getByText('Apa itu Jastip?')).toBeInTheDocument();
  });

  // PENJELASAN TEST 2:
  // Memastikan bahwa saat user mengklik pertanyaan, fungsi 'toggleFaq' dipanggil.
  // Ini memverifikasi bahwa interaksi klik sudah terpasang dengan benar pada elemen UI.
  it('calls toggleFaq when a question is clicked', () => {
    const mockToggle = jest.fn();
    render(<FAQ lang="id" faqData={mockFaqs} activeFaqs={[]} toggleFaq={mockToggle} />);
    
    // Cari elemen pertanyaan dan simulasikan klik
    const question = screen.getByText('Apa itu Jastip?');
    fireEvent.click(question);
    
    // Pastikan fungsi toggle dipanggil dengan index yang benar (0)
    expect(mockToggle).toHaveBeenCalledWith(0);
  });
});
