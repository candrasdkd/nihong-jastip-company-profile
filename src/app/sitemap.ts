import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.nihongjastip.com';
  const locales = ['id', 'en', 'jp'];
  
  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: locale === 'id' ? 1 : 0.8,
  }));
}
