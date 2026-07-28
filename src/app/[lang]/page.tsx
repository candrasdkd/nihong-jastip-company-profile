"use client";

import React, { use } from 'react';
import { motion } from 'framer-motion';
// Hooks
import { useAppLogic } from '../../hooks/useAppLogic';
import { Language } from '../../types';

// Layout Components
import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar';
import Footer from '../../components/Layout/Footer';

// Section Components
import Hero from '../../components/Sections/Hero';
import Process from '../../components/Sections/Process';
import Services from '../../components/Sections/Services';
import Pricing from '../../components/Sections/Pricing';
import Terms from '../../components/Sections/Terms';
import FAQ from '../../components/Sections/FAQ';
import Contact from '../../components/Sections/Contact';
import { useRouter } from 'next/navigation';

export default function Home({ params }: { params: Promise<{ lang: Language }> }) {
  const resolvedParams = use(params);
  const lang = resolvedParams.lang;
  const router = useRouter();

  const {
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
  } = useAppLogic(lang);

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newLang = e.target.value;
    router.push(`/${newLang}`);
  };

  return (
    <div className="App">
      <Header
        lang={lang}
        activeMenu={activeMenu}
        handleNavClick={handleNavClick}
        handleLangChange={handleLangChange}
        toggleSidebar={toggleSidebar}
        openWhatsApp={handleOpenWhatsApp}
      />

      <Sidebar
        sidebarOpen={sidebarOpen}
        activeMenu={activeMenu}
        lang={lang}
        toggleSidebar={toggleSidebar}
        handleNavClickWithClose={handleNavClickWithClose}
        openWhatsApp={handleOpenWhatsApp}
      />

      <Hero
        lang={lang}
        openWhatsApp={handleOpenWhatsApp}
        setActiveMenu={setActiveMenu}
        scrollToId={scrollToId}
      />

      <div className="trust-strip" aria-label={lang === 'id' ? 'Keunggulan layanan' : 'Service highlights'}>
        <div className="container">
          <span><strong>2+</strong> {lang === 'id' ? 'tahun melayani' : lang === 'en' ? 'years serving' : '年の実績'}</span>
          <span><strong>64</strong> {lang === 'id' ? 'negara tujuan' : lang === 'en' ? 'destinations' : '配送対象国'}</span>
          <span><strong>4</strong> {lang === 'id' ? 'hub operasional' : lang === 'en' ? 'operation hubs' : '拠点'}</span>
          <span><strong>200+</strong> {lang === 'id' ? 'customer' : lang === 'en' ? 'customers' : 'お客様'}</span>
        </div>
      </div>

      <Process lang={lang} />

      <Services
        lang={lang}
        openWhatsApp={handleOpenWhatsApp}
        onSelect={(service) => {
          setActiveTab(service);
          setActiveMenu('pricing');
          scrollToId('pricing');
        }}
      />

      <Pricing
        lang={lang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        jastipData={jastipData}
        expeditionData={expeditionData}
        openWhatsApp={handleOpenWhatsApp}
      />

      <Terms lang={lang} />

      <FAQ
        lang={lang}
        faqData={faqData}
        activeFaqs={activeFaqs}
        toggleFaq={toggleFaq}
      />

      <motion.section 
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="cta-kicker">{lang === 'id' ? 'Konsultasi tanpa biaya' : lang === 'en' ? 'Free consultation' : '相談無料'}</span>
            <h2>{lang === 'id' ? 'Barang incaranmu tinggal satu chat lagi.' : lang === 'en' ? 'Your Japan wishlist is one chat away.' : '欲しい商品まで、あと一度のチャットだけ。'}</h2>
            <p>{lang === 'id' ? 'Kirim link atau foto barang. Kami bantu cek ketersediaan dan estimasi totalnya.' : lang === 'en' ? 'Send the item link or photo. We will check availability and estimate the total.' : '商品のリンクや写真を送るだけ。在庫と合計金額の目安をご案内します。'}</p>
            <button className="cta-button primary large" onClick={handleOpenWhatsApp}>
              {lang === 'id' ? 'Chat via WhatsApp' : lang === 'en' ? 'Chat on WhatsApp' : 'WhatsAppで相談'}
            </button>
          </motion.div>
        </div>
      </motion.section>

      <Contact
        lang={lang}
        submitContactToWhatsApp={submitContactToWhatsApp}
      />

      <Footer 
        lang={lang} 
        handleNavClick={handleNavClick}
      />
    </div>
  );
}
