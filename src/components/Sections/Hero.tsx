import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, MessageCircle, Globe, Zap, Users } from 'lucide-react';
import Image from 'next/image';

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
    <section id="home" className="hero mesh-bg">
      <div className="container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="hero-badge">
            <span className="dot"></span>
            {lang === 'id' ? 'Tersedia Pengiriman ke 64+ Negara' : lang === 'en' ? 'Shipping available to 64+ Countries' : '64カ国以上への配送が可能'}
          </motion.div>

          <motion.h1 variants={itemVariants}>
            {lang === 'id' ? (
              <>Jasa Titip & Ekspedisi <br /><span className="highlight">Jepang ⇄ Indonesia</span></>
            ) : lang === 'en' ? (
              <>Japan ⇄ Indonesia <br /><span className="highlight">Personal Shopper</span></>
            ) : (
              <>日本 ⇄ インドネシア <br /><span className="highlight">買い物代行</span></>
            )}
          </motion.h1>

          <motion.div variants={itemVariants} className="hero-description">
            {lang === 'id' ? (
              <>
                Solusi belanja dan pengiriman aman dari Jepang langsung ke depan pintu Anda. Cepat, transparan, dan terpercaya.
                <div className="locations">
                  <span>📍 Osaka</span>
                  <span>📍 Semarang</span>
                  <span>📍 Depok</span>
                  <span>📍 Jakarta</span>
                </div>
              </>
            ) : lang === 'en' ? (
              <>
                Secure shopping and shipping solutions from Japan directly to your doorstep. Fast, transparent, and reliable.
                <div className="locations">
                  <span>📍 Osaka</span>
                  <span>📍 Semarang</span>
                  <span>📍 Depok</span>
                  <span>📍 Jakarta</span>
                </div>
              </>
            ) : (
              <>
                日本からあなたのご自宅まで、安全なショッピングと配送ソリューションを直接お届けします。迅速、透明、そして信頼。
                <div className="locations">
                  <span>📍 大阪</span>
                  <span>📍 スマラン</span>
                  <span>📍 デポック</span>
                  <span>📍 ジャカルタ</span>
                </div>
              </>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="hero-cta">
            <button className="cta-button primary" onClick={openWhatsApp}>
              <MessageCircle size={20} />
              {lang === 'id' ? 'Konsultasi Gratis' : lang === 'en' ? 'Free Consultation' : '無料相談'}
            </button>
            <button
              className="cta-button secondary"
              onClick={() => { setActiveMenu('services'); scrollToId('services'); }}
            >
              {lang === 'id' ? 'Lihat Layanan' : lang === 'en' ? 'View Services' : 'サービスを見る'}
              <ArrowRight size={20} />
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-stats">
            <div className="stat">
              <span className="stat-number">2+</span>
              <span className="stat-label">
                {lang === 'id' ? 'Tahun Pengalaman' : lang === 'en' ? 'Years Experience' : '年の経験'}
              </span>
            </div>
            <div className="stat">
              <span className="stat-number">64</span>
              <span className="stat-label">
                {lang === 'id' ? 'Negara Tujuan' : lang === 'en' ? 'Destinations' : '対象国'}
              </span>
            </div>
            <div className="stat">
              <span className="stat-number">200+</span>
              <span className="stat-label">
                {lang === 'id' ? 'Pelanggan Puas' : lang === 'en' ? 'Happy Customers' : '満足なお客様'}
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Image 
              src="/images/hero_3d.png" 
              alt="Nihong Jastip 3D" 
              width={600} 
              height={600} 
              priority
              style={{ objectFit: 'contain' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
