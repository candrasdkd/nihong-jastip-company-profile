import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ShoppingBag, Package, CheckCircle2, ArrowUpRight } from 'lucide-react';

import { Language } from '../../types';

interface ServicesProps {
  lang: Language;
  onSelect: () => void;
  openWhatsApp: () => void;
}

const Services: React.FC<ServicesProps> = ({ lang, onSelect, openWhatsApp }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="services" className="services">
      <div className="container">
        <motion.div
          className="section-heading split-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="eyebrow">{lang === 'id' ? 'Fokus layanan kami' : lang === 'en' ? 'Our core focus' : 'サービス内容'}</span>
            <h2>{lang === 'id' ? 'Layanan Jastip Handcarry Jepang ⇄ Indonesia' : lang === 'en' ? 'Japan ⇄ Indonesia Handcarry Service' : '日本 ⇄ インドネシア ハンドキャリー代行'}</h2>
          </div>
          <p>{lang === 'id' ? 'Semua pesanan ditangani langsung lewat bagasi tim kami dengan pengecekan barang dan konsultasi sebelum berangkat.' : lang === 'en' ? 'All orders are carried personally in our team luggage with item inspection and pre-flight consultation.' : 'すべての荷物をスタッフの手荷物として直接持ち運び、検品・事前相談に対応します。'}</p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Jastip Handcarry Service */}
          <motion.div variants={itemVariants} className="service-card featured">
            <span className="service-label">{lang === 'id' ? 'Layanan utama' : lang === 'en' ? 'Core service' : 'メインサービス'}</span>
            <div className="service-icon-wrapper">
              <ShoppingBag size={32} />
            </div>
            <h3>{lang === 'id' ? 'Jastip Handcarry' : lang === 'en' ? 'Jastip Handcarry' : 'ハンドキャリー代行'}</h3>
            <p>{lang === 'id' ? 'Layanan titip beli dan titip bawa langsung di koper tim kami khusus rute Jepang ⇄ Indonesia yang cepat, aman, dan transparan' : lang === 'en' ? 'Personal shopper and handcarry luggage service exclusively between Japan and Indonesia with fast, safe, and transparent pricing' : '日本とインドネシア専用のスピード・安心ハンドキャリー買い物＆持ち込み代行サービス'}</p>
            <ul>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Jepang → Indonesia: 1300¥ - 1700¥ / kg' : lang === 'en' ? 'Japan → Indonesia: 1300¥ - 1700¥ / kg' : '日本 → インドネシア: 1kg 1300¥ - 1700¥'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Indonesia → Jepang: 1100¥ - 1500¥ / kg' : lang === 'en' ? 'Indonesia → Japan: 1100¥ - 1500¥ / kg' : 'インドネシア → 日本: 1kg 1100¥ - 1500¥'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Titip beli (Mercari, Amazon JP, Anime, Fashion) & titip bawa' : lang === 'en' ? 'Buy-for-me (Mercari, Amazon JP, Anime, Fashion) & carry-for-me' : '買い付け代行（メルカリ・Amazon等）＆持ち込み代行'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Penerbangan rutin 2–5 kali setiap bulan' : lang === 'en' ? 'Scheduled flights 2–5 times per month' : '月2〜5回の定期フライト便'}</li>
            </ul>
            <button className="service-link" onClick={onSelect}>
              {lang === 'id' ? 'Lihat tarif handcarry' : lang === 'en' ? 'View handcarry rates' : 'ハンドキャリー料金を見る'} <ArrowUpRight size={18} />
            </button>
          </motion.div>

          {/* Additional Service */}
          <motion.div variants={itemVariants} className="service-card">
            <span className="service-label">{lang === 'id' ? 'Butuh bantuan ekstra' : lang === 'en' ? 'Extra help' : '追加サポート'}</span>
            <div className="service-icon-wrapper">
              <Package size={32} />
            </div>
            <h3>{lang === 'id' ? 'Layanan Tambahan' : lang === 'en' ? 'Additional Services' : '追加サービス'}</h3>
            <p>{lang === 'id' ? 'Fasilitas pendukung agar barang handcarry kamu aman di bandara hingga sampai ke alamat tujuan' : lang === 'en' ? 'Supporting facilities so your handcarry items travel safely from airport check-in to your doorstep' : '空港での梱包からご自宅まで安全にお届けするためのサポート機能'}</p>
            <ul>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Packing aman standar bandara' : lang === 'en' ? 'Airport-grade protective packing' : '空港基準の丁寧な梱包'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Pengecekan kondisi barang sebelum flight' : lang === 'en' ? 'Pre-flight item inspection' : 'フライト前の検品対応'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Konsolidasi paket di warehouse' : lang === 'en' ? 'Warehouse package consolidation' : '倉庫での荷物おまとめ'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Pengurusan kuota bagasi & bea cukai' : lang === 'en' ? 'Luggage quota & customs handling' : '手荷物枠・通関サポート'}</li>
            </ul>
            <button className="service-link" onClick={openWhatsApp}>
              {lang === 'id' ? 'Tanya kebutuhan khusus' : lang === 'en' ? 'Ask about special handling' : '特別対応を相談する'} <ArrowUpRight size={18} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
