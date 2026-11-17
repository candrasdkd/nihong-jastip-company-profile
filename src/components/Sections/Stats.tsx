import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Globe2, MapPin, Users } from 'lucide-react';

import { Language } from '../../types';
import CountUp from '../UI/CountUp';

const Stats: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = (id: string, en: string, jp: string) => (lang === 'id' ? id : lang === 'en' ? en : jp);

  const items = [
    {
      tone: 'orange',
      icon: CalendarCheck,
      value: 2,
      suffix: '+',
      label: t('tahun melayani', 'years serving', '年の実績'),
      note: t('Handcarry rutin 2–5 flight per bulan', 'Regular handcarry, 2–5 flights a month', '月2〜5回の定期フライト'),
    },
    {
      tone: 'navy',
      icon: Globe2,
      value: 2,
      suffix: '',
      label: t('negara, dua arah', 'countries, both ways', 'カ国・双方向'),
      note: t('Jepang ⇄ Indonesia, titip beli & titip bawa', 'Japan ⇄ Indonesia, buy & carry', '日本 ⇄ インドネシア（買い付け・持ち込み）'),
    },
    {
      tone: 'sky',
      icon: MapPin,
      value: 3,
      suffix: '',
      label: t('hub operasional', 'operation hubs', '拠点'),
      note: 'Osaka · Jakarta · Depok',
    },
    {
      tone: 'white',
      icon: Users,
      value: 500,
      suffix: '+',
      label: t('customer', 'customers', 'お客様'),
      note: t('Konsultasi gratis sebelum order', 'Free consultation before you order', 'ご注文前の相談は無料'),
    },
  ];

  return (
    <section className="stats" aria-label={t('Keunggulan layanan', 'Service highlights', 'サービスの特長')}>
      <div className="container">
        <div className="stats-grid">
          {items.map(({ tone, icon: Icon, value, suffix, label, note }, i) => (
            <motion.div
              key={label}
              className={`stat ${tone}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <span className="stat-icon"><Icon size={22} /></span>
              <CountUp value={value} suffix={suffix} />
              <span className="stat-label">{label}</span>
              <small>{note}</small>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
