import { render, screen } from '@testing-library/react';
import Services from '../Services';
describe('Services Section', () => {
  it('renders services list in Indonesian', () => {
    render(<Services lang="id" onSelect={jest.fn()} openWhatsApp={jest.fn()} />);
    expect(screen.getByRole('heading', { name: /Layanan Jastip Handcarry/i })).toBeInTheDocument();
  });

  it('displays handcarry service categories', () => {
    render(<Services lang="id" onSelect={jest.fn()} openWhatsApp={jest.fn()} />);
    expect(screen.getByRole('heading', { name: 'Jastip Handcarry' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Layanan Tambahan' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Lihat tarif handcarry/i })).toBeInTheDocument();
  });
});
