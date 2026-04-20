import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShoppingBag, Package, CheckCircle2 } from 'lucide-react';

import { Language } from '../../types';

interface ServicesProps {
  lang: Language;
}

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
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
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>{lang === 'id' ? 'Layanan Kami' : lang === 'en' ? 'Our Services' : '当社のサービス'}</h2>
          <p>{lang === 'id' ? 'Berbagai solusi pengiriman internasional untuk kebutuhan bisnis dan pribadi Anda' : lang === 'en' ? 'Various international shipping solutions for your business and personal needs' : 'お客様のビジネスや個人のニーズに合わせた様々な国際配送ソリューション'}</p>
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
          </motion.div>

          {/* Jastip Service */}
          <motion.div variants={itemVariants} className="service-card featured">
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
          </motion.div>

          {/* Additional Service */}
          <motion.div variants={itemVariants} className="service-card">
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
