import { generateWhatsAppUrl, openWhatsApp, WA_NUMBER } from '../whatsapp';

describe('whatsapp utils', () => {
  describe('generateWhatsAppUrl', () => {
    it('should generate a valid WhatsApp URL with encoded message', () => {
      const message = 'Hello, this is a test!';
      const expectedUrl = `https://wa.me/${WA_NUMBER}?text=Hello%2C%20this%20is%20a%20test!`;
      expect(generateWhatsAppUrl(message)).toBe(expectedUrl);
    });

    it('should handle empty message correctly', () => {
      const message = '';
      const expectedUrl = `https://wa.me/${WA_NUMBER}?text=`;
      expect(generateWhatsAppUrl(message)).toBe(expectedUrl);
    });
  });

  describe('openWhatsApp', () => {
    let windowOpenSpy: jest.SpyInstance;

    beforeEach(() => {
      // Mock window.open
      windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    });

    afterEach(() => {
      windowOpenSpy.mockRestore();
    });

    it('should call window.open with the correct URL and default message', () => {
      openWhatsApp();
      const expectedUrl = `https://wa.me/${WA_NUMBER}?text=Halo%20Nihong%20Jastip%2C%20saya%20ingin%20konsultasi`;
      expect(windowOpenSpy).toHaveBeenCalledWith(expectedUrl, '_blank', 'noopener,noreferrer');
    });

    it('should call window.open with the correct URL for a custom message', () => {
      const customMessage = 'Tanya harga jastip dong';
      openWhatsApp(customMessage);
      const expectedUrl = `https://wa.me/${WA_NUMBER}?text=Tanya%20harga%20jastip%20dong`;
      expect(windowOpenSpy).toHaveBeenCalledWith(expectedUrl, '_blank', 'noopener,noreferrer');
    });
  });
});
