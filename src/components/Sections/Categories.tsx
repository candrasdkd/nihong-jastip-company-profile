import React from 'react';
import { Gamepad2, Shirt, Sparkles, Footprints, Cookie, Smartphone, Layers, ShoppingBag, Camera, Gift } from 'lucide-react';

import { Language } from '../../types';

const ITEMS = [
  { icon: ShoppingBag, id: 'Mercari', en: 'Mercari', jp: 'メルカリ' },
  { icon: Gamepad2, id: 'Anime & Figure', en: 'Anime & Figures', jp: 'アニメ・フィギュア' },
  { icon: Layers, id: 'Kartu Pokémon', en: 'Pokémon cards', jp: 'ポケカ' },
  { icon: Shirt, id: 'Fashion Jepang', en: 'Japanese fashion', jp: '日本ファッション' },
  { icon: Footprints, id: 'Sneakers', en: 'Sneakers', jp: 'スニーカー' },
  { icon: Sparkles, id: 'Skincare & Beauty', en: 'Skincare & beauty', jp: 'スキンケア' },
  { icon: Cookie, id: 'Snack & Oleh-oleh', en: 'Snacks & souvenirs', jp: 'お菓子・お土産' },
  { icon: Smartphone, id: 'Gadget', en: 'Gadgets', jp: 'ガジェット' },
  { icon: Camera, id: 'Kamera & Hobi', en: 'Cameras & hobby', jp: 'カメラ・趣味' },
  { icon: Gift, id: 'Amazon JP', en: 'Amazon JP', jp: 'Amazon JP' },
];

const Categories: React.FC<{ lang: Language }> = ({ lang }) => {
  const label = lang === 'id' ? 'Bisa dititipkan: ' : lang === 'en' ? 'We can carry: ' : '対応アイテム: ';
  return (
    <div className="marquee" aria-label={label + ITEMS.map((i) => i[lang]).join(', ')}>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((dup) => (
          <ul key={dup}>
            {ITEMS.map(({ icon: Icon, ...names }) => (
              <li key={names.en}>
                <Icon size={20} />
                {names[lang]}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Categories;
