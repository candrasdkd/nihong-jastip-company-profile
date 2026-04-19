import React, { useState, useEffect } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getExpeditionData, getFaqData, getJastipData } from './data';

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
  const [lang, setLang] = useState<string>('id');
  const [activeTab, setActiveTab] = useState<'jastip' | 'expedition'>('jastip');
  const [activeFaqs, setActiveFaqs] = useState<number[]>([]);
  const [activeMenu, setActiveMenu] = useState<string>('home');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const jastipData = getJastipData(lang);
  const expeditionData = getExpeditionData(lang);
  const faqData = getFaqData(lang);

  const WA_NUMBER = '628157162517';

  const toggleSidebar = (): void => setSidebarOpen(!sidebarOpen);

  const openWhatsApp = (): void => {
    const msg = `Halo Nihong Jastip, saya ingin konsultasi`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleFaq = (index: number): void => {
    setActiveFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const scrollToId = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setActiveMenu(id);
    scrollToId(id);
  };

  const handleNavClickWithClose = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setActiveMenu(id);
    setSidebarOpen(false);
    scrollToId(id);
  };

  const submitContactToWhatsApp = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = (fd.get('name') as string || '').trim();
    const phone = (fd.get('phone') as string || '').trim();
    const message = (fd.get('message') as string || '').trim();
    const cleanPhone = phone.replace(/[^\d+]/g, '');

    const text = [
      'Halo Nihong Jastip, saya mengirim pesan via Form Website 👋',
      '',
      `Nama: ${name}`,
      `Telepon: ${cleanPhone}`,
      '',
      'Pesan:',
      message
    ].join('\n');

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    form.reset();
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setLang(e.target.value);
  };

  useEffect(() => {
    const ids = ['home', 'services', 'pricing', 'faq', 'contact'];
    const sections = ids.map((id) => document.getElementById(id)).filter((sec): sec is HTMLElement => sec !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveMenu(entry.target.id);
        });
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0.1 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => AOS.refresh(), 300);
    return () => clearTimeout(timer);
  }, [activeFaqs]);

  useEffect(() => {
    const hash = window.location.hash?.replace('#', '');
    if (hash) {
      setActiveMenu(hash);
      setTimeout(() => scrollToId(hash), 0);
    }
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

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
        openWhatsApp={openWhatsApp}
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
            <button className="cta-button primary large" onClick={openWhatsApp}>
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
