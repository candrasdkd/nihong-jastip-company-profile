import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { ArrowRight, Check, MessageCircle, ShieldCheck, Star } from 'lucide-react';
import Image from 'next/image';

import { Language } from '../../types';

interface HeroProps {
  lang: Language;
  openWhatsApp: () => void;
  setActiveMenu: (id: string) => void;
  scrollToId: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ lang, openWhatsApp, setActiveMenu, scrollToId }) => {
  const shouldReduceMotion = useReducedMotion();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="hero-badge">
            <Star size={15} fill="currentColor" />
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
              onClick={() => { setActiveMenu('pricing'); scrollToId('pricing'); }}
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

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-image-container">
            <Image
              src="/images/hero_3d.png"
              alt={lang === 'id' ? 'Ilustrasi pengiriman Jepang ke Indonesia' : lang === 'en' ? 'Japan to Indonesia shipping illustration' : '日本からインドネシアへの配送イラスト'}
              width={600}
              height={600}
              priority
            />
          </div>
          <motion.div
            className="route-price-card route-price-card-top"
            animate={shouldReduceMotion ? { y: 0 } : { y: [0, -6, 0] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>JPN → IDN</span>
            <strong>¥1.300–1.700<small>/kg</small></strong>
          </motion.div>
          <motion.div
            className="route-price-card route-price-card-bottom"
            animate={shouldReduceMotion ? { y: 0 } : { y: [0, 5, 0] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <span>IDN → JPN</span>
            <strong>¥1.100–1.500<small>/kg</small></strong>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
