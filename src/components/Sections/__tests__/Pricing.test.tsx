import { render, screen } from '@testing-library/react';
import Pricing from '../Pricing';
describe('Pricing Section', () => {
  // Data simulasi untuk rute jastip (Handcarry)
  const mockJastipData = {
    title: 'Jastip Handcarry',
    routes: [
      { route: 'Jepang → Indonesia', price: '1300¥ - 1700¥ / kg', priceMin: 1300, priceMax: 1700 },
      { route: 'Indonesia → Jepang', price: '1100¥ - 1500¥ / kg', priceMin: 1100, priceMax: 1500 }
    ]
  };

  it('renders handcarry routes and rates correctly', () => {
    render(
      <Pricing 
        lang="id" 
        jastipData={mockJastipData as any} 
        openWhatsApp={jest.fn()}
      />
    );
    
    expect(screen.getByRole('heading', { name: /Tarif Jastip Handcarry/i })).toBeInTheDocument();
    expect(screen.getByText('Jepang → Indonesia')).toBeInTheDocument();
    expect(screen.getByText('Indonesia → Jepang')).toBeInTheDocument();
    expect(screen.getByText('1300¥ - 1700¥ / kg')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Minta estimasi' })).toBeInTheDocument();
  });
});
