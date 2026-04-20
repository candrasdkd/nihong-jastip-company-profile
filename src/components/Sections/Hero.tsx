"use client";

import React from 'react';

import { Language } from '../../types';

interface HeroProps {
  lang: Language;
  openWhatsApp: () => void;
  setActiveMenu: (id: string) => void;
  scrollToId: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ lang, openWhatsApp, setActiveMenu, scrollToId }) => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 data-aos="fade-up">
            {lang === 'id' ? (
              <>Jasa Titip & Ekspedisi <br /><span className="highlight">Jepang ⇄ Indonesia</span></>
            ) : lang === 'en' ? (
              <>Japan ⇄ Indonesia <br /><span className="highlight">Personal Shopper & Logistics</span></>
            ) : (
              <>日本 ⇄ インドネシア <br /><span className="highlight">買い物代行および配送</span></>
            )}
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" className="hero-description">
            {lang === 'id' ? (
              <>
                Solusi pengiriman aman ke 64 negara. <br />
                <span className="locations">Osaka • Semarang • Depok • Jakarta</span>
              </>
            ) : lang === 'en' ? (
              <>
                Secure shipping solutions to 64 countries. <br />
                <span className="locations">Osaka • Semarang • Depok • Jakarta</span>
              </>
            ) : (
              <>
                64カ国への安全な配送ソリューション。 <br />
                <span className="locations">大阪 • スマラン • デポック • ジャカルタ</span>
              </>
            )}
          </p>
          <div className="hero-cta" data-aos="fade-up" data-aos-delay="400">
            <button className="cta-button primary" onClick={openWhatsApp}>
              {lang === 'id' ? 'Konsultasi Gratis' : lang === 'en' ? 'Free Consultation' : '無料相談'}
            </button>
            <button
              className="cta-button secondary"
              onClick={() => { setActiveMenu('services'); scrollToId('services'); }}
            >
              {lang === 'id' ? 'Lihat Layanan' : lang === 'en' ? 'View Services' : 'サービスを見る'}
            </button>
          </div>
          <div className="hero-stats" data-aos="fade-up" data-aos-delay="600">
            <div className="stat">
              <span className="stat-number">2+</span>
              <span className="stat-label">
                {lang === 'id' ? 'Tahun Pengalaman' : lang === 'en' ? 'Years Experience' : '年の経験'}
              </span>
            </div>
            <div className="stat">
              <span className="stat-number">64</span>
              <span className="stat-label">
                {lang === 'id' ? 'Negara Tujuan' : lang === 'en' ? 'Destination Countries' : '対象国'}
              </span>
            </div>
            <div className="stat">
              <span className="stat-number">200+</span>
              <span className="stat-label">
                {lang === 'id' ? 'Pelanggan Puas' : lang === 'en' ? 'Happy Customers' : '満足なお客様'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
