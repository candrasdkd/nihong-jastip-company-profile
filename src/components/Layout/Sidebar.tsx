import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ListChecks, DollarSign, HelpCircle, Mail, X, MessageCircle } from 'lucide-react';

import { Language, NavClickHandlers } from '../../types';

interface SidebarProps extends Pick<NavClickHandlers, 'handleNavClickWithClose'> {
  sidebarOpen: boolean;
  activeMenu: string;
  lang: Language;
  toggleSidebar: () => void;
  openWhatsApp: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  activeMenu,
  lang,
  toggleSidebar,
  handleNavClickWithClose,
  openWhatsApp
}) => {
  const menuItems = [
    { id: 'home', label: lang === 'id' ? 'Beranda' : lang === 'en' ? 'Home' : 'ホーム', icon: Home },
    { id: 'process', label: lang === 'id' ? 'Cara Kerja' : lang === 'en' ? 'How It Works' : 'ご利用の流れ', icon: ListChecks },
    { id: 'pricing', label: lang === 'id' ? 'Cek Tarif' : lang === 'en' ? 'Rates' : '料金', icon: DollarSign },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contact', label: lang === 'id' ? 'Kontak' : lang === 'en' ? 'Contact' : 'お問い合わせ', icon: Mail },
  ];

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          <motion.div 
            className="sidebar-overlay" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
          <motion.nav 
            className="sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            aria-label="Mobile navigation"
          >
            <div className="sidebar-header">
              <h2>Nihong Jastip</h2>
              <button className="close-btn" onClick={toggleSidebar} aria-label="Close Menu">
                <X size={24} />
              </button>
            </div>
            <div className="sidebar-links">
              {menuItems.map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  onClick={handleNavClickWithClose(item.id as any)} 
                  className={activeMenu === item.id ? 'active' : ''}
                >
                  <item.icon size={20} />
                  {item.label}
                </a>
              ))}
            </div>
            <div className="sidebar-cta">
              <p>{lang === 'id' ? 'Belum yakin layanan yang cocok?' : lang === 'en' ? 'Not sure which service fits?' : 'どのサービスが最適かお悩みですか？'}</p>
              <button onClick={() => { openWhatsApp(); toggleSidebar(); }}>
                <MessageCircle size={18} />
                {lang === 'id' ? 'Konsultasi gratis' : lang === 'en' ? 'Free consultation' : '無料相談'}
              </button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
