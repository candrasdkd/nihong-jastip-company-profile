import { detectLang } from '../detectLang';

describe('detectLang', () => {
  it('Jepang', () => expect(detectLang('ハンドキャリーの料金は？')).toBe('jp'));
  it('Inggris', () => expect(detectLang('How much to ship 2 kg from Japan?')).toBe('en'));
  it('Indonesia', () => expect(detectLang('Berapa ongkos kirim dari Jepang ke Indonesia?', 'en')).toBe('id'));
  it('tidak meyakinkan → bahasa halaman', () => expect(detectLang('ok', 'jp')).toBe('jp'));
});
