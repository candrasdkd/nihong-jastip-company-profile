import { render, screen } from '@testing-library/react';
import Contact from '../Contact';
describe('Contact Section', () => {
  it('renders contact form fields', () => {
    render(<Contact lang="id" submitContactToWhatsApp={jest.fn()} />);
    
    expect(screen.getByLabelText('Nama')).toBeInTheDocument();
    expect(screen.getByLabelText('WhatsApp')).toBeInTheDocument();
    expect(screen.getByLabelText('Kebutuhan')).toBeInTheDocument();
    expect(screen.getByLabelText('Detail barang')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Lanjut ke WhatsApp/i })).toBeInTheDocument();
  });
});
