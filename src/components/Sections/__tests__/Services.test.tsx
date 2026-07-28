import { render, screen } from '@testing-library/react';
import Services from '../Services';
describe('Services Section', () => {
  it('renders services list in Indonesian', () => {
    render(<Services lang="id" onSelect={jest.fn()} openWhatsApp={jest.fn()} />);
    expect(screen.getByRole('heading', { name: /Layanan Jastip Jepang/i })).toBeInTheDocument();
  });

  it('displays core service categories', () => {
    render(<Services lang="id" onSelect={jest.fn()} openWhatsApp={jest.fn()} />);
    expect(screen.getByRole('heading', { name: 'Via Jastip' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Via Ekspedisi' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Lihat tarif jastip/i })).toBeInTheDocument();
  });
});
