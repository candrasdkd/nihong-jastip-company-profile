import { useState, useEffect } from 'react';
import AOS from 'aos';
import { getExpeditionData, getFaqData, getJastipData } from '../data';
import { openWhatsApp, generateWhatsAppUrl } from '../utils/whatsapp';
import { Language } from '../types';

export const useAppLogic = () => {
  const [lang, setLang] = useState<Language>('id');
  const [activeTab, setActiveTab] = useState<'jastip' | 'expedition'>('jastip');
  const [activeFaqs, setActiveFaqs] = useState<number[]>([]);
  const [activeMenu, setActiveMenu] = useState<string>('home');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const jastipData = getJastipData(lang);
  const expeditionData = getExpeditionData(lang);
  const faqData = getFaqData(lang);

  const toggleSidebar = (): void => setSidebarOpen(!sidebarOpen);

  const handleOpenWhatsApp = (): void => {
    openWhatsApp('Halo Nihong Jastip, saya ingin konsultasi');
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

    const url = generateWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
    form.reset();
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setLang(e.target.value as Language);
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

  return {
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
  };
};
