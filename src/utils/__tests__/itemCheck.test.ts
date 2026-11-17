import { checkItem } from '../itemCheck';

describe('checkItem', () => {
  it.each([
    'parfum semprot', 'hairspray 2 botol', 'kembang api', 'airsoft gun', 'bibit tanaman', 'hewan peliharaan', '麻薬', 'live animals',
  ])('terlarang: %s', (t) => expect(checkItem(t)).toBe('prohibited'));

  it.each(['sepatu nike', 'figure anime', 'laptop', 'PS5', 'barang besar'])('harga khusus: %s', (t) => expect(checkItem(t)).toBe('special'));

  it.each(['hoodie uniqlo', 'sabun muka', 'bomber jacket', 'Animal Crossing', 'Gundam model kit', 'skincare', 'snack kitkat', 'kartu pokemon', '', 'https://jp.mercari.com/item/m123'])('umum: %s', (t) =>
    expect(checkItem(t)).toBe('ok')
  );

  it('game Switch dianggap harga khusus, bukan terlarang', () => expect(checkItem('Animal Crossing Switch game')).toBe('special'));

  it('terlarang menang atas harga khusus', () => expect(checkItem('sepatu dan spray')).toBe('prohibited'));
});
