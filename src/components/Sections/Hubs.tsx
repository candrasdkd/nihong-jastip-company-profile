import React from 'react';
import { motion } from 'framer-motion';

import { Language } from '../../types';

const HUBS = [
  { name: 'Osaka', x: 150, y: 215, side: 'jp' },
  { name: 'Jakarta', x: 720, y: 120, side: 'id' },
  { name: 'Depok', x: 770, y: 225, side: 'id' },
] as const;

const arc = (x: number, y: number) => `M150 215 Q ${(150 + x) / 2} ${Math.min(215, y) - 120} ${x} ${y}`;

const Hubs: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = (id: string, en: string, jp: string) => (lang === 'id' ? id : lang === 'en' ? en : jp);
  const dest = HUBS.slice(1);

  return (
    <section id="hubs" className="hubs">
      <div className="container">
        <motion.div
          className="section-heading split-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <span className="eyebrow">{t('Jalur & hub kami', 'Our route & hubs', 'ルートと拠点')}</span>
            <h2>{t('Satu jalur langsung, tiga titik layanan.', 'One direct route, three service points.', '直行ルート、3つの拠点。')}</h2>
          </div>
          <p>{t('Dari Osaka, barangmu dibawa langsung di bagasi tim kami lalu diteruskan lewat hub di Jakarta dan Depok.', 'From Osaka, your items ride in our team luggage and are passed on through our hubs in Jakarta and Depok.', '大阪からスタッフの手荷物で直接運び、ジャカルタ・デポックの拠点からお届けします。')}</p>
        </motion.div>

        <motion.div
          className="hubs-map"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <svg viewBox="0 20 900 290" role="img" aria-label={t('Rute Osaka ke Jakarta dan Depok', 'Route from Osaka to Jakarta and Depok', '大阪からジャカルタ・デポックへのルート')}>
            <defs>
              {dest.map((h) => (
                <path key={h.name} id={`route-${h.name}`} d={arc(h.x, h.y)} />
              ))}
            </defs>
            {dest.map((h) => (
              <use key={h.name} href={`#route-${h.name}`} className="hubs-line" />
            ))}
            {dest.map((h, i) => (
              <g key={`plane-${h.name}`} className="hubs-plane">
                <circle r="7" />
                <animateMotion dur="5s" begin={`${i * 1.6}s`} repeatCount="indefinite" rotate="auto">
                  <mpath href={`#route-${h.name}`} />
                </animateMotion>
              </g>
            ))}
            {HUBS.map((h) => (
              <g key={h.name} className={`hubs-node ${h.side}`} transform={`translate(${h.x} ${h.y})`}>
                <circle className="pulse" r="18" />
                <circle className="dot" r="9" />
                <text y={h.side === 'jp' ? 38 : -22} textAnchor="middle">{h.name}</text>
              </g>
            ))}
          </svg>
          <div className="hubs-badges">
            <span><b>JP</b> {t('Hub keberangkatan', 'Departure hub', '出発拠点')}</span>
            <span><b>ID</b> {t('2 hub penerusan', '2 delivery hubs', '2つの配送拠点')}</span>
            <span>{t('2–5 flight / bulan', '2–5 flights / month', '月2〜5回のフライト')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hubs;
