import { render, screen, fireEvent } from '@testing-library/react';
import OrderBuilder from '../OrderBuilder';
import { openWhatsApp } from '../../../utils/whatsapp';

jest.mock('../../../utils/whatsapp', () => ({ openWhatsApp: jest.fn(), WA_NUMBER: '628000000000' }));

describe('OrderBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({ ok: false, json: async () => ({}) }) as unknown as typeof fetch;
  });

  const nameInput = () => screen.getAllByPlaceholderText('Link atau nama barang')[0];
  const priceInput = () => screen.getAllByPlaceholderText('0')[0];
  const sendBtn = () => screen.getByRole('button', { name: /Kirim daftar ke WhatsApp/i });

  it('tombol kirim nonaktif saat daftar masih kosong', () => {
    render(<OrderBuilder lang="id" />);
    expect(sendBtn()).toBeDisabled();
  });

  it('menghitung total yen dari harga x jumlah dan mengirim pesan terstruktur', () => {
    render(<OrderBuilder lang="id" />);
    fireEvent.change(nameInput(), { target: { value: 'Hoodie Uniqlo' } });
    fireEvent.change(priceInput(), { target: { value: '3000' } });
    fireEvent.change(screen.getAllByDisplayValue('1')[0], { target: { value: '2' } });

    expect(screen.getByText('¥6,000')).toBeInTheDocument();
    fireEvent.click(sendBtn());

    expect(openWhatsApp).toHaveBeenCalledTimes(1);
    const msg = (openWhatsApp as jest.Mock).mock.calls[0][0] as string;
    expect(msg).toContain('1. Hoodie Uniqlo | x2 | ¥3,000');
    expect(msg).toContain('¥6,000');
  });

  it('memblokir pengiriman bila ada barang terlarang', () => {
    render(<OrderBuilder lang="id" />);
    fireEvent.change(nameInput(), { target: { value: 'parfum semprot' } });
    expect(sendBtn()).toBeDisabled();
    expect(screen.getAllByText(/tidak bisa dititip/i).length).toBeGreaterThan(0);
    fireEvent.click(sendBtn());
    expect(openWhatsApp).not.toHaveBeenCalled();
  });

  it('pengecek barang menampilkan status harga khusus untuk sepatu', () => {
    render(<OrderBuilder lang="id" />);
    fireEvent.change(screen.getByLabelText('Nama barang yang ingin dicek'), { target: { value: 'sepatu nike' } });
    expect(screen.getByText('Bisa, tapi harga khusus')).toBeInTheDocument();
  });
});
