import { renderText } from '../textUtils';

describe('textUtils', () => {
  describe('renderText', () => {
    // PENJELASAN TEST 1:
    // Fungsi ini bertujuan untuk mengubah string yang mengandung URL (contoh: https://google.com)
    // agar dirender sebagai tag anchor (<a>) yang bisa diklik.
    // Test ini memastikan bahwa URL biasa dikenali dan diubah menjadi React JSX Element <a>.
    it('should convert URLs to clickable links', () => {
      const text = 'Kunjungi https://google.com untuk detailnya';
      const result = renderText(text);
      
      // Karena mengembalikan Array of JSX Elements
      expect(Array.isArray(result)).toBe(true);
      
      // Node 0: teks biasa sebelum URL
      expect((result[0] as any).props.children).toBe('Kunjungi ');
      
      // Node 1: adalah Fragment yang berisi <a> link
      // Di dalam fragment (result[1]), anak pertamanya (children[0]) adalah elemen <a>
      const anchorTag = (result[1] as any).props.children[0];
      expect(anchorTag.type).toBe('a');
      expect(anchorTag.props.href).toBe('https://google.com');
      expect(anchorTag.props.children).toBe('https://google.com');
      
      // Node 2: teks biasa sesudah URL
      expect((result[2] as any).props.children).toBe(' untuk detailnya');
    });

    // PENJELASAN TEST 2:
    // Mengetes perilaku regex agar jika URL berada di akhir kalimat dan berakhiran tanda baca (titik, koma, dll),
    // maka tanda baca tersebut TIDAK dimasukkan ke dalam link tujuan (href).
    // Misal: "Lihat https://web.com." -> link harusnya hanya "https://web.com" (tanpa titik).
    it('should handle URLs with trailing punctuation', () => {
      const text = 'Coba buka https://example.com/test, ya!';
      const result = renderText(text);
      
      // Ekstrak elemen <a> dari dalam Fragment (node 1)
      const anchorTag = (result[1] as any).props.children[0];
      const punctuation = (result[1] as any).props.children[1];
      
      // Link aslinya tidak boleh mengandung koma
      expect(anchorTag.props.href).toBe('https://example.com/test');
      
      // Tanda baca (koma) dipisahkan menjadi elemen JSX mandiri agar tidak hilang dari teks
      expect(punctuation).toBe(','); 
    });

    // PENJELASAN TEST 3:
    // Menguji perilaku jika sama sekali TIDAK ADA URL di dalam teks masukan.
    // Outputnya haruslah array berisi satu elemen <span> biasa.
    it('should return plain text in span if no URLs are present', () => {
      const text = 'Belanja dari luar negeri lebih mudah tanpa link';
      const result = renderText(text);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1); 
      // Karena tak ada URL, seluruh string dibungkus tag span tunggal
      expect((result[0] as any).props.children).toBe(text);
    });
  });
});
