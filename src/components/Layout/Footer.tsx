import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { Language, NavClickHandlers } from '../../types';

interface FooterProps extends Pick<NavClickHandlers, 'handleNavClick'> {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang, handleNavClick }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div className="footer-section brand" variants={itemVariants}>
            <h3>Nihong Jastip</h3>
            <p>
              {lang === 'id'
                ? 'Mitra pengiriman internasional terpercaya Anda. Menghubungkan Jepang dan Indonesia dengan layanan aman dan cepat.'
                : lang === 'en'
                  ? 'Your trusted international shipping partner. Connecting Japan and Indonesia with safe and fast services.'
                  : '信頼できる国際配送パートナー。日本とインドネシアを安全かつ迅速なサービスで結びます。'}
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com/nihongjastip" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.76-.54-1.43-1.25-1.93-2.07-.03 2.14-.02 4.29-.02 6.43 0 1.64-.32 3.32-1.2 4.7-1.01 1.62-2.78 2.73-4.63 3.1-1.63.34-3.38.25-4.94-.42-1.68-.73-3.08-2.15-3.8-3.83-.82-1.89-.78-4.13.14-5.96.93-1.84 2.82-3.19 4.87-3.52 1.17-.19 2.38-.11 3.5.25v4.13c-1.34-.45-2.89-.25-4.04.57-1.15.83-1.74 2.33-1.42 3.73.28 1.25 1.3 2.3 2.53 2.55 1.2.25 2.5-.1 3.33-.99.78-.83 1.08-2.01 1.08-3.13-.01-4.22-.01-8.45-.01-12.67z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="footer-section links" variants={itemVariants}>
            <h4>{lang === 'id' ? 'Tautan Cepat' : lang === 'en' ? 'Quick Links' : 'クイックリンク'}</h4>
            <ul>
              <li><a href="#home" onClick={handleNavClick('home')}>{lang === 'id' ? 'Beranda' : lang === 'en' ? 'Home' : 'ホーム'}</a></li>
              <li><a href="#services" onClick={handleNavClick('services')}>{lang === 'id' ? 'Layanan' : lang === 'en' ? 'Services' : 'サービス'}</a></li>
              <li><a href="#pricing" onClick={handleNavClick('pricing')}>{lang === 'id' ? 'Harga' : lang === 'en' ? 'Pricing' : '料金'}</a></li>
              <li><a href="#faq" onClick={handleNavClick('faq')}>FAQ</a></li>
              <li><a href="#terms" onClick={handleNavClick('terms')}>{lang === 'id' ? 'Ketentuan' : lang === 'en' ? 'Terms' : '規約'}</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="footer-section contact-footer" variants={itemVariants}>
            <h4>{lang === 'id' ? 'Hubungi Kami' : lang === 'en' ? 'Contact Us' : 'お問い合わせ'}</h4>
            <ul className="footer-contact-list">
              <li>
                <Mail size={16} />
                <span>jastipnihong@gmail.com</span>
              </li>
              <li>
                <Phone size={16} />
                <span>+62 815-7162-517</span>
              </li>
              <li>
                <MapPin size={16} />
                <span>Jakarta - Depok - Kendal - Osaka</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>Copyright ©2024 Nihong Jastip. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
