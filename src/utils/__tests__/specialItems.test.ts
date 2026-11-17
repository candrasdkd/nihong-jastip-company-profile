import { mentionsSpecialItem } from '../specialItems';

describe('mentionsSpecialItem', () => {
  it.each([
    'kirim sepatu 2 pasang dari Jepang',
    'Can I ship a laptop?',
    'titip hp iPhone 1 unit',
    'ada barang besar, kira-kira 5 kg',
    'PS5 bisa?',
    'スニーカーを送りたい',
    'oversize luggage',
    'titip figure anime 2 biji',
    'フィギュアを送りたい',
  ])('mendeteksi: %s', (t) => expect(mentionsSpecialItem(t)).toBe(true));

  it.each([
    'hoodie 2 buah sekitar 1.5 kg',
    'berapa ongkir 3 kg Jepang ke Indonesia?',
    'skincare dan snack, berat 2 kg',
    'berapa besar biayanya?',
    'kartu pokemon 0.3 kg',
  ])('tidak salah deteksi: %s', (t) => expect(mentionsSpecialItem(t)).toBe(false));
});
