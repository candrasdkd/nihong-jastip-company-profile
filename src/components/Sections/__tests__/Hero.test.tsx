import { render, screen } from '@testing-library/react';
import Hero from '../Hero';
describe('Hero Section', () => {
  it('renders correctly in Indonesian', () => {
    render(<Hero lang="id" openWhatsApp={jest.fn()} setActiveMenu={jest.fn()} scrollToId={jest.fn()} />);
    expect(screen.getByRole('heading', { name: /Titip belanja dari Jepang/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Kirim daftar belanja/i })).toBeInTheDocument();
  });

  it('renders correctly in English', () => {
    render(<Hero lang="en" openWhatsApp={jest.fn()} setActiveMenu={jest.fn()} scrollToId={jest.fn()} />);
    expect(screen.getByRole('heading', { name: /Shop from Japan/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Check rates/i })).toBeInTheDocument();
  });
});
