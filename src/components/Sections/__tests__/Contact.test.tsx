import { render, screen } from '@testing-library/react';
import Contact from '../Contact';



describe('Contact Section', () => {
  // PENJELASAN TEST:
  // Memastikan input field yang dibutuhkan user untuk mengirim pesan tersedia.
  // Kita menggunakan 'getByPlaceholderText' karena itu yang langsung dilihat user di layar.
  // Jika placeholder berubah atau input hilang, test ini akan gagal.
  it('renders contact form fields', () => {
    // Kita berikan mock function untuk prop 'submitContactToWhatsApp'
    render(<Contact lang="id" submitContactToWhatsApp={jest.fn()} />);
    
    // Verifikasi input Nama dan Pesan (menggunakan teks Bahasa Indonesia)
    expect(screen.getByPlaceholderText('Nama Lengkap')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Detail pesan atau pertanyaan Anda')).toBeInTheDocument();
  });
});
