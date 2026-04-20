import React from 'react';
import './App.css';
import 'aos/dist/aos.css';

// Hooks
import { useAppLogic } from './hooks/useAppLogic';

// Layout Components
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';

// Section Components
import Hero from './components/Sections/Hero';
import Services from './components/Sections/Services';
import Pricing from './components/Sections/Pricing';
import Terms from './components/Sections/Terms';
import FAQ from './components/Sections/FAQ';
import Contact from './components/Sections/Contact';

const App: React.FC = () => {
  const {
    lang,
    activeTab,
    setActiveTab,
    activeFaqs,
    activeMenu,
    setActiveMenu,
    sidebarOpen,
    toggleSidebar,
    jastipData,
    expeditionData,
    faqData,
    handleOpenWhatsApp,
    toggleFaq,
    scrollToId,
    handleNavClick,
    handleNavClickWithClose,
    submitContactToWhatsApp,
    handleLangChange
  } = useAppLogic();

  return (
    <div className="App">
      <Header
        lang={lang}
        activeMenu={activeMenu}
        handleNavClick={handleNavClick}
        handleLangChange={handleLangChange}
        toggleSidebar={toggleSidebar}
      />

      <Sidebar
        sidebarOpen={sidebarOpen}
        activeMenu={activeMenu}
        lang={lang}
        toggleSidebar={toggleSidebar}
        handleNavClickWithClose={handleNavClickWithClose}
      />

      <Hero
        lang={lang}
        openWhatsApp={handleOpenWhatsApp}
        setActiveMenu={setActiveMenu}
        scrollToId={scrollToId}
      />

      <Services lang={lang} />

      <Pricing
        lang={lang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        jastipData={jastipData}
        expeditionData={expeditionData}
      />

      <Terms lang={lang} />

      <FAQ
        lang={lang}
        faqData={faqData}
        activeFaqs={activeFaqs}
        toggleFaq={toggleFaq}
      />

      <section className="cta-section">
        <div className="container">
          <div className="cta-content" data-aos="zoom-in">
            <h2>{lang === 'id' ? 'Siap Mengirimkan Barang Anda?' : lang === 'en' ? 'Ready to Ship Your Items?' : '商品を発送する準備はできましたか？'}</h2>
            <p>{lang === 'id' ? 'Dapatkan penawaran khusus untuk pengiriman pertama Anda' : lang === 'en' ? 'Get a special offer for your first shipment' : '初めての発送で特別割引を受けましょう'}</p>
            <button className="cta-button primary large" onClick={handleOpenWhatsApp}>
              {lang === 'id' ? 'Hubungi Kami Sekarang' : lang === 'en' ? 'Contact Us Now' : '今すぐお問い合わせ'}
            </button>
          </div>
        </div>
      </section>

      <Contact
        lang={lang}
        submitContactToWhatsApp={submitContactToWhatsApp}
      />

      <Footer lang={lang} />
    </div>
  );
};

export default App;
