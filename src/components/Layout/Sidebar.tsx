import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Globe, DollarSign, HelpCircle, Mail, X } from 'lucide-react';

import { Language, NavClickHandlers } from '../../types';

interface SidebarProps extends Pick<NavClickHandlers, 'handleNavClickWithClose'> {
  sidebarOpen: boolean;
  activeMenu: string;
  lang: Language;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  activeMenu,
  lang,
  toggleSidebar,
  handleNavClickWithClose
}) => {
  const menuItems = [
    { id: 'home', label: lang === 'id' ? 'Beranda' : lang === 'en' ? 'Home' : 'ホーム', icon: Home },
    { id: 'services', label: lang === 'id' ? 'Layanan' : lang === 'en' ? 'Services' : 'サービス', icon: Globe },
    { id: 'pricing', label: lang === 'id' ? 'Harga' : lang === 'en' ? 'Pricing' : '料金', icon: DollarSign },
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
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
