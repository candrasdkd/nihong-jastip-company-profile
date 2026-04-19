import React from 'react';

interface HeroProps {
  lang: string;
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
            {lang === 'id' ? 'Jasa Titip & Ekspedisi Internasional' : lang === 'en' ? 'International Personal Shopper & Expedition' : '国際買い物代行および配送サービス'}
          </h1>
          <p data-aos="fade-up" data-aos-delay="200">
            {lang === 'id' ? 'Melayani pengiriman barang dari Jepang ke Indonesia dan sebaliknya, serta ekspedisi ke 64 negara dengan jaminan keamanan dan ketepatan waktu' : lang === 'en' ? 'Serving shipments from Japan to Indonesia and vice versa, as well as expedition to 64 countries with a guarantee of security and timeliness' : '日本からインドネシアへの商品配送、およびその逆、さらには64カ国への安全で時間厳守 hostの配送サービスを提供しています'}
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
