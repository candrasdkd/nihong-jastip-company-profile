import { mentionsSpecialItem } from './specialItems';

export type ItemStatus = 'prohibited' | 'special' | 'ok';

/**
 * Barang terlarang sesuai FAQ: narkoba, senjata, bahan mudah meledak, aerosol,
 * hewan hidup, tanaman, dan barang ilegal.
 */
const PROHIBITED = new RegExp(
  [
    'narkoba', 'narkotika', 'ganja', '\\bsabu\\b', '\\bdrugs?\\b', 'cannabis', 'weed',
    'senjata', 'senapan', 'pistol', 'airsoft', 'weapons?', '\\bguns?\\b', 'firearms?',
    'peledak', 'petasan', 'mercon', 'kembang api', '\\bbom\\b', '\\bbombs?\\b', 'explosives?', 'fireworks?',
    'aerosol', 'spray', 'semprot', 'hairspray',
    'hewan', 'binatang', '\\banimals?\\b(?!\\s*crossing)', 'live pets?',
    'tanaman', '\\bbibit\\b', 'benih', '\\bplants?\\b', '\\bseeds?\\b',
    'ilegal', 'illegal', 'bajakan', 'counterfeit', 'palsu',
    '麻薬', '武器', '銃', '爆発物', '花火', 'スプレー', '動物', '植物',
  ].join('|'),
  'i'
);

export const checkItem = (text: string): ItemStatus => {
  const t = text.trim();
  if (!t) return 'ok';
  if (PROHIBITED.test(t)) return 'prohibited';
  if (mentionsSpecialItem(t)) return 'special';
  return 'ok';
};
