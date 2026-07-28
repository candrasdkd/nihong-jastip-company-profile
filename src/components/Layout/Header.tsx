"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

import { Language, NavClickHandlers } from '../../types';

interface HeaderProps extends Pick<NavClickHandlers, 'handleNavClick'> {
  lang: Language;
  activeMenu: string;
  handleLangChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  toggleSidebar: () => void;
  openWhatsApp: () => void;
}

const Header: React.FC<HeaderProps> = ({
  lang,
  activeMenu,
  handleNavClick,
  handleLangChange,
  toggleSidebar,
  openWhatsApp
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`header ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className="container">
        <a className="logo-section" href="#home" onClick={handleNavClick('home')} aria-label="Nihong Jastip home">
          <Image src="/logo-64.png" width={44} height={44} alt="" className="brand-mark" />
          <span className="brand-copy">
            <strong className="logo">Nihong Jastip</strong>
            <span className="tagline">
              {lang === 'id' ? 'Jepang ⇄ Indonesia' : lang === 'en' ? 'Japan ⇄ Indonesia' : '日本 ⇄ インドネシア'}
            </span>
          </span>
        </a>

        <nav className="nav" aria-label="Primary navigation">
          <a href="#home" onClick={handleNavClick('home')} className={activeMenu === 'home' ? 'active' : ''}>
            {lang === 'id' ? 'Beranda' : lang === 'en' ? 'Home' : 'ホーム'}
          </a>
          <a href="#process" onClick={handleNavClick('process')} className={activeMenu === 'process' ? 'active' : ''}>
            {lang === 'id' ? 'Cara Kerja' : lang === 'en' ? 'How It Works' : 'ご利用の流れ'}
          </a>
          <a href="#pricing" onClick={handleNavClick('pricing')} className={activeMenu === 'pricing' ? 'active' : ''}>
            {lang === 'id' ? 'Cek Tarif' : lang === 'en' ? 'Rates' : '料金'}
          </a>
          <a href="#faq" onClick={handleNavClick('faq')} className={activeMenu === 'faq' ? 'active' : ''}>
            FAQ
          </a>
        </nav>

        <div className="header-controls">
          <div className="custom-lang-switcher">
            <select value={lang} onChange={handleLangChange} className="hidden-select" aria-label="Select Language">
              <option value="id">ID</option>
              <option value="en">EN</option>
              <option value="jp">JP</option>
            </select>
            <div className="lang-display">
              <span className={`flag-icon flag-${lang}`}>
                {lang === 'en' && (
                  <>
                    <span className="flag-en-cross"></span>
                    <span className="flag-en-cross-vertical"></span>
                  </>
                )}
              </span>
              <span className="lang-text">{lang.toUpperCase()}</span>
              <span className="dropdown-caret">▼</span>
            </div>
          </div>

          <button className="header-wa-button" onClick={openWhatsApp}>
            <MessageCircle size={17} />
            <span>{lang === 'id' ? 'Mulai titip' : lang === 'en' ? 'Start order' : '相談する'}</span>
          </button>

          <button
            className="hamburger-btn"
            onClick={toggleSidebar}
            aria-label={lang === 'id' ? 'Buka menu' : lang === 'en' ? 'Open menu' : 'メニューを開く'}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
