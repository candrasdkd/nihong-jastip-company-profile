import { generateWhatsAppUrl, openWhatsApp } from '../whatsapp';

describe('whatsapp utils', () => {
  describe('generateWhatsAppUrl', () => {
    // PENJELASAN TEST 1:
    // Mengecek apakah fungsi generateWhatsAppUrl dapat membuat URL (link)
    // yang valid untuk memanggil API WhatsApp (wa.me) dengan pesan khusus.
    it('should generate correct URL with text', () => {
      const text = 'Halo Jastip';
      const url = generateWhatsAppUrl(text);
      
      // %20 adalah representasi encoding karakter "spasi" pada format URL di browser.
      // Kita memastikan function mengubah teks spasi menjadi URL parameter '?text=Halo%20Jastip'
      expect(url).toContain('https://wa.me/628157162517?text=Halo%20Jastip');
    });

    // PENJELASAN TEST 2:
    // Mengecek apakah karakter-karakter spesial (misalnya tanda tanya "?", newline "\n", dsb.)
    // di-encode dengan benar menggunakan encodeURIComponent.
    // Hal ini krusial agar pesan yang kita kirimkan dari Website bisa dibaca sempurna oleh WhatsApp App.
    it('should encode special characters in URL', () => {
      const text = 'Halo! Mau pesan dong?';
      const url = generateWhatsAppUrl(text);
      
      // Karakter "!" tidak diencode, tapi "?" menjadi "%3F"
      expect(url).toContain('%3F');
    });
  });

  describe('openWhatsApp', () => {
    let openSpy: jest.SpyInstance;

    beforeEach(() => {
      // Sama seperti di useAppLogic, kita melumpuhkan (mocking) API window.open
      // agar browser (di environment JSDOM) tidak melempar error dan tidak membuka popup baru
      // setiap kali unit test ini berjalan.
      openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    });

    afterEach(() => {
      // Me-reset hasil mata-mata (spy)
      openSpy.mockRestore();
    });

    // PENJELASAN TEST 3:
    // Menguji interaksi akhir: Memastikan bahwa kalau kita panggil openWhatsApp('Halo'),
    // website akan mengaktifkan browser tab baru (window.open dipanggil) yang mengarah ke link WA.
    it('should call window.open with correct URL', () => {
      openWhatsApp('Halo');
      
      // Memvalidasi window.open dieksekusi tepat 1x saja
      expect(openSpy).toHaveBeenCalledTimes(1);
      
      // Memvalidasi URL tujuan yang dipanggil oleh parameter ke-1 di window.open(...)
      expect(openSpy.mock.calls[0][0]).toContain('https://wa.me/628157162517?text=Halo');
      
      // Memvalidasi parameter ke-2, targetnya '_blank' (artinya buka tab baru)
      expect(openSpy.mock.calls[0][1]).toBe('_blank');
      
      // Memvalidasi parameter ke-3 'noopener,noreferrer' demi alasan Security (keamanan web)
      expect(openSpy.mock.calls[0][2]).toBe('noopener,noreferrer');
    });
  });
});
