"use client";

import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

import { Language } from '../../types';

interface StickyCtaProps {
  lang: Language;
  onClick: () => void;
}

// Bar CTA WhatsApp yang menempel di bawah layar mobile setelah user scroll melewati hero.
const StickyCta: React.FC<StickyCtaProps> = ({ lang, onClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const show = scrolled && !atEnd;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sembunyikan saat Contact / footer terlihat: tombol WhatsApp sudah ada di sana.
  useEffect(() => {
    const targets = ['contact', 'footer']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length || typeof IntersectionObserver === 'undefined') return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setAtEnd(visible.size > 0);
    }, { threshold: 0.15 });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`sticky-cta ${show ? 'show' : ''}`} aria-hidden={!show}>
      <span>
        <strong>{lang === 'id' ? 'Ada barang incaran?' : lang === 'en' ? 'Got a wishlist?' : '欲しい物は？'}</strong>
        <small>{lang === 'id' ? 'Konsultasi gratis' : lang === 'en' ? 'Free consultation' : '相談無料'}</small>
      </span>
      <button onClick={onClick} tabIndex={show ? 0 : -1}>
        <MessageCircle size={18} />
        WhatsApp
      </button>
    </div>
  );
};

export default StickyCta;
