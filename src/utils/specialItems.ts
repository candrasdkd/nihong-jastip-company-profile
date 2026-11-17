/**
 * Barang yang tarifnya BERBEDA dari tarif per kg biasa (sepatu, elektronik, bulky).
 * Untuk barang ini chatbot tidak boleh memberi estimasi angka; arahkan ke admin.
 */
const SPECIAL_PATTERN = new RegExp(
  [
    // sepatu
    'sepatu', 'sneakers?', 'shoes?', 'boots?', 'sandal', '靴', 'スニーカー', 'ブーツ',
    // figure
    'figure', 'figurine', 'nendoroid', 'gunpla', 'フィギュア', 'ねんどろいど',
    // elektronik
    'elektronik', 'electronics?', 'laptop', 'macbook', 'tablet', 'ipad', 'handphone', 'smartphone', 'iphone', '\\bhp\\b', 'kamera', 'camera',
    '\\btv\\b', 'televisi', 'monitor', 'konsol', 'console', 'ps5', 'playstation', 'nintendo', 'switch', 'speaker', 'printer', 'drone', 'kulkas', 'mesin cuci', 'vacuum', 'rice cooker',
    '電化製品', '家電', 'パソコン', 'ゲーム機', 'カメラ', 'スマホ',
    // bulky
    'bulky', 'oversize', 'jumbo', 'barang besar', 'paket besar', 'ukuran besar', 'kardus besar', 'koper besar', 'large item', 'big item', 'bulky item', 'sepeda', 'kursi', 'かさばる', '大型', '大きな荷物',
  ].join('|'),
  'i'
);

export const mentionsSpecialItem = (...texts: string[]): boolean => texts.some((t) => SPECIAL_PATTERN.test(t));
