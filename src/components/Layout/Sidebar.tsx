import React from 'react';

interface SidebarProps {
  sidebarOpen: boolean;
  activeMenu: string;
  lang: string;
  toggleSidebar: () => void;
  handleNavClickWithClose: (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  activeMenu,
  lang,
  toggleSidebar,
  handleNavClickWithClose
}) => {
  return (
    <>
      {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Nihong Jastip</h2>
          <button className="close-btn" onClick={toggleSidebar} aria-label="Close Menu">
            &times;
          </button>
        </div>
        <div className="sidebar-links">
          <a href="#home" onClick={handleNavClickWithClose('home')} className={activeMenu === 'home' ? 'active' : ''}>
            {lang === 'id' ? 'Beranda' : lang === 'en' ? 'Home' : 'ホーム'}
          </a>
          <a href="#services" onClick={handleNavClickWithClose('services')} className={activeMenu === 'services' ? 'active' : ''}>
            {lang === 'id' ? 'Layanan' : lang === 'en' ? 'Services' : 'サービス'}
          </a>
          <a href="#pricing" onClick={handleNavClickWithClose('pricing')} className={activeMenu === 'pricing' ? 'active' : ''}>
            {lang === 'id' ? 'Harga' : lang === 'en' ? 'Pricing' : '料金'}
          </a>
          <a href="#faq" onClick={handleNavClickWithClose('faq')} className={activeMenu === 'faq' ? 'active' : ''}>
            FAQ
          </a>
          <a href="#contact" onClick={handleNavClickWithClose('contact')} className={activeMenu === 'contact' ? 'active' : ''}>
            {lang === 'id' ? 'Kontak' : lang === 'en' ? 'Contact' : 'お問い合わせ'}
          </a>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
