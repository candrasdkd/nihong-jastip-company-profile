import React from 'react';

interface HeaderProps {
  lang: string;
  activeMenu: string;
  handleNavClick: (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => void;
  handleLangChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  lang,
  activeMenu,
  handleNavClick,
  handleLangChange,
  toggleSidebar
}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo-section">
          <h1 className="logo">Nihong Jastip</h1>
          <span className="tagline">
            {lang === 'id' ? 'Mitra Pengiriman Internasional Terpercaya' : lang === 'en' ? 'Your Trusted International Shipping Partner' : '信頼できる国際配送パートナー'}
          </span>
        </div>

        <nav className="nav">
          <a href="#home" onClick={handleNavClick('home')} className={activeMenu === 'home' ? 'active' : ''}>
            {lang === 'id' ? 'Beranda' : lang === 'en' ? 'Home' : 'ホーム'}
          </a>
          <a href="#services" onClick={handleNavClick('services')} className={activeMenu === 'services' ? 'active' : ''}>
            {lang === 'id' ? 'Layanan' : lang === 'en' ? 'Services' : 'サービス'}
          </a>
          <a href="#pricing" onClick={handleNavClick('pricing')} className={activeMenu === 'pricing' ? 'active' : ''}>
            {lang === 'id' ? 'Harga' : lang === 'en' ? 'Pricing' : '料金'}
          </a>
          <a href="#faq" onClick={handleNavClick('faq')} className={activeMenu === 'faq' ? 'active' : ''}>
            FAQ
          </a>
          <a href="#contact" onClick={handleNavClick('contact')} className={activeMenu === 'contact' ? 'active' : ''}>
            {lang === 'id' ? 'Kontak' : lang === 'en' ? 'Contact' : 'お問い合わせ'}
          </a>
        </nav>

        <div className="header-controls">
          <div className="lang-switcher">
            <select value={lang} onChange={handleLangChange} className="lang-select">
              <option value="id">🇮🇩 ID</option>
              <option value="en">🇬🇧 EN</option>
              <option value="jp">🇯🇵 JP</option>
            </select>
          </div>

          <button
            className="hamburger-btn"
            onClick={toggleSidebar}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
