import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Check, MessageCircle, ShieldCheck } from 'lucide-react';

import HeroArt from '../UI/HeroArt';

import { Language } from '../../types';

interface HeroProps {
  lang: Language;
  openWhatsApp: () => void;
  setActiveMenu: (id: string) => void;
  scrollToId: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ lang, openWhatsApp, setActiveMenu, scrollToId }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-grid">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial={false}
          animate="visible"
        >
          <motion.div variants={itemVariants} className="hero-badge">
            <span className="badge-dot" aria-hidden="true" />
            {lang === 'id' ? 'Dipercaya 500+ customer' : lang === 'en' ? 'Trusted by 500+ customers' : '200人以上のお客様に選ばれています'}
          </motion.div>

          <motion.h1 variants={itemVariants}>
            {lang === 'id' ? (
              <>Jastip Jepang Terpercaya — <span className="highlight">Titip Belanja Tanpa Ribet.</span></>
            ) : lang === 'en' ? (
              <>Shop from Japan, <span className="highlight">without the hassle.</span></>
            ) : (
              <>日本のお買い物を、<span className="highlight">もっとかんたんに。</span></>
            )}
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-description">
            {lang === 'id'
              ? 'Layanan Jastip Jepang & Jasa Titip Indonesia ⇄ Jepang terpercaya. Kirim link atau foto barang yang kamu mau (Mercari, Amazon, Anime, Fashion), tim kami bantu beli & kirim sampai ke alamatmu.'
              : lang === 'en'
                ? 'Send us a product link or photo. We will purchase, check, and ship it from Japan to your address with clear, upfront pricing.'
                : '欲しい商品のリンクや写真を送るだけ。購入・検品・日本からご自宅までの配送を、わかりやすい料金でサポートします。'}
          </motion.p>

          <motion.div variants={itemVariants} className="hero-cta">
            <button className="cta-button primary" onClick={openWhatsApp}>
              <MessageCircle size={20} />
              {lang === 'id' ? 'Kirim daftar belanja' : lang === 'en' ? 'Send shopping list' : '欲しい商品を送る'}
            </button>
            <button
              className="cta-button secondary"
              onClick={() => { setActiveMenu('calculator'); scrollToId('calculator'); }}
            >
              {lang === 'id' ? 'Cek tarif dulu' : lang === 'en' ? 'Check rates' : '料金を見る'}
              <ArrowRight size={20} />
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-assurances">
            <span><Check size={16} /> {lang === 'id' ? 'Konsultasi gratis' : lang === 'en' ? 'Free consultation' : '相談無料'}</span>
            <span><Check size={16} /> {lang === 'id' ? 'Biaya transparan' : lang === 'en' ? 'Clear pricing' : '明瞭な料金'}</span>
            <span><ShieldCheck size={16} /> {lang === 'id' ? 'Barang dicek' : lang === 'en' ? 'Items checked' : '検品対応'}</span>
          </motion.div>
        </motion.div>

        <div className="hero-art-wrap">
          <HeroArt
            label={lang === 'id' ? 'Ilustrasi koper handcarry dengan stiker bendera Jepang dan Indonesia' : lang === 'en' ? 'Illustration of a handcarry suitcase with Japan and Indonesia flag stickers' : '日本とインドネシアの国旗ステッカーが貼られたハンドキャリーのスーツケース'}
          />
        </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
