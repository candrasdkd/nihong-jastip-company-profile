export const WA_NUMBER = '628157162517';

export const generateWhatsAppUrl = (message: string): string => {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (message: string = 'Halo Nihong Jastip, saya ingin konsultasi'): void => {
  const url = generateWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
};
