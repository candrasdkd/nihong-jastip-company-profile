export type ChatLang = 'id' | 'en' | 'jp';

const EN = /\b(the|how|much|to|from|is|are|can|could|what|when|where|do|does|i|you|my|of|in|for|with|shipping|ship|price|cost|rate|rates|hello|hi|please|need|want|japan|indonesia|item|items|weight|days|long|take)\b/gi;
const ID = /\b(yang|apa|berapa|dan|di|ke|dari|bisa|untuk|saya|aku|kak|kakak|ongkos|ongkir|kalau|itu|ini|tidak|bagaimana|gimana|kapan|berat|barang|kirim|titip|jepang|indonesia|harga|tarif|mau|ada|dengan|atau|sama|dong|ya)\b/gi;

/** Deteksi bahasa pesan user; kalau tidak meyakinkan pakai bahasa halaman. */
export const detectLang = (text: string, pageLang: ChatLang = 'id'): ChatLang => {
  if (/[぀-ヿ一-鿿]/.test(text)) return 'jp';
  const en = (text.match(EN) || []).length;
  const id = (text.match(ID) || []).length;
  if (en > id) return 'en';
  if (id > en) return 'id';
  return pageLang;
};

export const LANG_NAME: Record<ChatLang, string> = { id: 'Indonesia', en: 'Inggris (English)', jp: 'Jepang (日本語)' };
