import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Globe, ShoppingBag, Package, CheckCircle2, ArrowUpRight } from 'lucide-react';

import { Language } from '../../types';

interface ServicesProps {
  lang: Language;
  onSelect: (service: 'jastip' | 'expedition') => void;
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
            <span className="eyebrow">{lang === 'id' ? 'Pilih sesuai kebutuhan' : lang === 'en' ? 'Choose what you need' : '目的に合わせて選ぶ'}</span>
            <h2>{lang === 'id' ? 'Layanan Jastip Jepang & Kirim Paket' : lang === 'en' ? 'Shopping help or parcel delivery?' : '買い物代行、それとも荷物の発送？'}</h2>
          </div>
          <p>{lang === 'id' ? 'Setiap layanan dilengkapi pengecekan barang dan konsultasi sebelum pengiriman.' : lang === 'en' ? 'Every service includes item checks and pre-shipment consultation.' : 'すべてのサービスで検品と発送前のご相談に対応します。'}</p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Expedition Service */}
          <motion.div variants={itemVariants} className="service-card">
            <span className="service-label">{lang === 'id' ? 'Kirim paket' : lang === 'en' ? 'Send a parcel' : '荷物を送る'}</span>
            <div className="service-icon-wrapper">
              <Globe size={32} />
            </div>
            <h3>{lang === 'id' ? 'Via Ekspedisi' : lang === 'en' ? 'Via Expedition' : '配送経由'}</h3>
            <p>{lang === 'id' ? 'Layanan ekspedisi internasional ke 64 negara dengan jaminan keamanan dan harga terbaik' : lang === 'en' ? 'International expedition service to 64 countries with guaranteed security and best prices' : '安全性とベストプライスが保証された64カ国への国際配送サービス'}</p>
            <ul>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Pengiriman ke Asia, Timur Tengah, Eropa' : lang === 'en' ? 'Shipment to Asia, Middle East, Europe' : 'アジア、中東、ヨーロッパへの発送'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Estimasi pengiriman 7-14 hari' : lang === 'en' ? 'Estimated delivery 7-14 days' : '推定配達日数7〜14日'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Asuransi barang tersedia' : lang === 'en' ? 'Item insurance available' : '商品保険が利用可能'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Real-time tracking' : lang === 'en' ? 'Real-time tracking' : 'リアルタイム追跡'}</li>
            </ul>
            <button className="service-link" onClick={() => onSelect('expedition')}>
              {lang === 'id' ? 'Lihat tarif ekspedisi' : lang === 'en' ? 'View shipping rates' : '配送料金を見る'} <ArrowUpRight size={18} />
            </button>
          </motion.div>

          {/* Jastip Service */}
          <motion.div variants={itemVariants} className="service-card featured">
            <span className="service-label">{lang === 'id' ? 'Paling populer' : lang === 'en' ? 'Most popular' : '人気No.1'}</span>
            <div className="service-icon-wrapper">
              <ShoppingBag size={32} />
            </div>
            <h3>{lang === 'id' ? 'Via Jastip' : lang === 'en' ? 'Via Jastip' : '買い物代行'}</h3>
            <p>{lang === 'id' ? 'Layanan jasa titip khusus antara Jepang dan Indonesia dengan harga kompetitif dan proses yang transparan' : lang === 'en' ? 'Special personal shopper service between Japan and Indonesia with competitive prices and transparent processes' : '日本とインドネシアの間の特別な買い物代行サービス'}</p>
            <ul>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Jepang → Indonesia: 1300¥ - 1700¥ / kg' : lang === 'en' ? 'Japan → Indonesia: 1300¥ - 1700¥ / kg' : '日本 → インドネシア: 1kg 1300¥ - 1700¥'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Indonesia → Jepang: 1100¥ - 1500¥ / kg' : lang === 'en' ? 'Indonesia → Japan: 1100¥ - 1500¥ / kg' : 'インドネシア → 日本: 1kg 1100¥ - 1500¥'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Bantuan pembelian produk Jepang' : lang === 'en' ? 'Assistance purchasing Japanese products' : '日本の製品の購入サポート'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Konsultasi gratis' : lang === 'en' ? 'Free consultation' : '無料相談'}</li>
            </ul>
            <button className="service-link" onClick={() => onSelect('jastip')}>
              {lang === 'id' ? 'Lihat tarif jastip' : lang === 'en' ? 'View jastip rates' : '代行料金を見る'} <ArrowUpRight size={18} />
            </button>
          </motion.div>

          {/* Additional Service */}
          <motion.div variants={itemVariants} className="service-card">
            <span className="service-label">{lang === 'id' ? 'Butuh bantuan ekstra' : lang === 'en' ? 'Extra help' : '追加サポート'}</span>
            <div className="service-icon-wrapper">
              <Package size={32} />
            </div>
            <h3>{lang === 'id' ? 'Layanan Tambahan' : lang === 'en' ? 'Additional Services' : '追加サービス'}</h3>
            <p>{lang === 'id' ? 'Fasilitas pendukung untuk pengalaman pengiriman yang lebih baik' : lang === 'en' ? 'Supporting facilities for a better shipping experience' : 'より良い配送体験のためのサポート機能'}</p>
            <ul>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Packing profesional' : lang === 'en' ? 'Professional packing' : 'プロフェッショナルな梱包'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Asuransi pengiriman' : lang === 'en' ? 'Shipping insurance' : '配送保険'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Konsolidasi paket' : lang === 'en' ? 'Package consolidation' : 'パッケージの統合'}</li>
              <li><CheckCircle2 size={18} /> {lang === 'id' ? 'Layanan bea cukai' : lang === 'en' ? 'Customs service' : '通関サービス'}</li>
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
