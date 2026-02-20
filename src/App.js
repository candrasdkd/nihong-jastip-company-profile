import React, { useState, useEffect } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getExpeditionData, getFaqData, getJastipData } from './data';

const App = () => {
  const [lang, setLang] = useState('id'); // id, en, jp
  const [activeTab, setActiveTab] = useState('jastip');
  const [activeFaqs, setActiveFaqs] = useState([]);
  const [activeMenu, setActiveMenu] = useState('home');
  // State untuk sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const jastipData = getJastipData(lang);
  const expeditionData = getExpeditionData(lang);
  const faqData = getFaqData(lang);

  // Fungsi toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // --- Icons (inline SVG, no deps) ---
  const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
      <polyline points="3,7 12,13 21,7" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="7" y="3" width="10" height="18" rx="2" ry="2" />
      <circle cx="12" cy="18" r="1" />
    </svg>
  );

  const MapPinIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="10" r="3" />
      <path d="M12 13 L9 19 H15 Z" />
    </svg>
  );

  const ClockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );


  // WhatsApp
  const WA_NUMBER = '628157162517'; // tanpa '+'
  const openWhatsApp = () => {
    const msg = `Halo Nihong Jastip, saya ingin konsultasi`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // FAQ toggle
  const toggleFaq = (index) => {
    setActiveFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Smooth scroll helpers + active menu
  const scrollToId = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    setActiveMenu(id);
    scrollToId(id);
    // Update hash optional
    // history.replaceState(null, '', `#${id}`);
  };
  const handleNavClickWithClose = (id) => (e) => {
    e.preventDefault();
    setActiveMenu(id);
    setSidebarOpen(false);
    scrollToId(id);
  };
  // Kirim data form "Kirim Pesan" ke WhatsApp (terpisah dari openWhatsApp)
  const submitContactToWhatsApp = (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const name = (fd.get('name') || '').trim();
    const phone = (fd.get('phone') || '').trim();
    const message = (fd.get('message') || '').trim();

    // (opsional) normalisasi nomor telepon user agar rapi di pesan
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

    // buka WhatsApp di tab baru
    window.open(url, '_blank', 'noopener,noreferrer');

    // reset form biar bersih setelah submit
    e.target.reset();
  };

  const handleLangChange = (e) => {
    setLang(e.target.value);
  };

  // Observe sections to auto-set active menu saat scroll
  useEffect(() => {
    const ids = ['home', 'services', 'pricing', 'faq', 'contact'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

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

  // Update AOS when accordion changes height
  useEffect(() => {
    // Wait for the CSS transition to complete (0.3s)
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 300);
    return () => clearTimeout(timer);
  }, [activeFaqs]);

  // Set awal dari hash (kalau user buka dengan #pricing dll)
  useEffect(() => {
    const hash = window.location.hash?.replace('#', '');
    if (hash) {
      setActiveMenu(hash);
      setTimeout(() => scrollToId(hash), 0);
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="App">
      {/* Header */}
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo-section">
            <h1 className="logo">Nihong Jastip</h1>
            <span className="tagline">
              {lang === 'id' ? 'Mitra Pengiriman Internasional Terpercaya' : lang === 'en' ? 'Your Trusted International Shipping Partner' : '信頼できる国際配送パートナー'}
            </span>
          </div>

          <nav className="nav">
            <a href="#home" onClick={handleNavClick('home')} className={activeMenu === 'home' ? 'active' : ''}>
              {lang === 'id' ? 'Beranda' : lang === 'en' ? 'Home' : 'ホーム'}
            </a>
            <a href="#services" onClick={handleNavClick('services')} className={activeMenu === 'services' ? 'active' : ''}>
              {lang === 'id' ? 'Layanan' : lang === 'en' ? 'Services' : 'サービス'}
            </a>
            <a href="#pricing" onClick={handleNavClick('pricing')} className={activeMenu === 'pricing' ? 'active' : ''}>
              {lang === 'id' ? 'Harga' : lang === 'en' ? 'Pricing' : '料金'}
            </a>
            <a href="#faq" onClick={handleNavClick('faq')} className={activeMenu === 'faq' ? 'active' : ''}>
              FAQ
            </a>
            <a href="#contact" onClick={handleNavClick('contact')} className={activeMenu === 'contact' ? 'active' : ''}>
              {lang === 'id' ? 'Kontak' : lang === 'en' ? 'Contact' : 'お問い合わせ'}
            </a>
          </nav>

          <div className="header-controls">
            <div className="lang-switcher">
              <select value={lang} onChange={handleLangChange} className="lang-select">
                <option value="id">🇮🇩 ID</option>
                <option value="en">🇬🇧 EN</option>
                <option value="jp">🇯🇵 JP</option>
              </select>
            </div>

            {/* Hamburger Button untuk Mobile */}
            <button
              className="hamburger-btn"
              onClick={toggleSidebar}
              aria-label="Toggle Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      {/* Mobile Sidebar */}
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

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            {/* <div className="hero-badge" data-aos="fade-down">Terpercaya Sejak 2024</div> */}
            <h1 data-aos="fade-up">
              {lang === 'id' ? 'Jasa Titip & Ekspedisi Internasional' : lang === 'en' ? 'International Personal Shopper & Expedition' : '国際買い物代行および配送サービス'}
            </h1>
            <p data-aos="fade-up" data-aos-delay="200">
              {lang === 'id' ? 'Melayani pengiriman barang dari Jepang ke Indonesia dan sebaliknya, serta ekspedisi ke 64 negara dengan jaminan keamanan dan ketepatan waktu' : lang === 'en' ? 'Serving shipments from Japan to Indonesia and vice versa, as well as expedition to 64 countries with a guarantee of security and timeliness' : '日本からインドネシアへの商品配送、およびその逆、さらには64カ国への安全で時間厳守の配送サービスを提供しています'}
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
                <span className="stat-number">1+</span>
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
                <span className="stat-number">100+</span>
                <span className="stat-label">
                  {lang === 'id' ? 'Pelanggan Puas' : lang === 'en' ? 'Happy Customers' : '満足なお客様'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>{lang === 'id' ? 'Layanan Kami' : lang === 'en' ? 'Our Services' : '当社のサービス'}</h2>
            <p>{lang === 'id' ? 'Berbagai solusi pengiriman internasional untuk kebutuhan bisnis dan pribadi Anda' : lang === 'en' ? 'Various international shipping solutions for your business and personal needs' : 'お客様のビジネスや個人のニーズに合わせた様々な国際配送ソリューション'}</p>
          </div>
          <div className="services-grid">

            <div className="service-card" data-aos="fade-up" data-aos-delay="0">
              <div className="service-icon">🌍</div>
              <h3>{lang === 'id' ? 'Via Ekspedisi' : lang === 'en' ? 'Via Expedition' : '配送経由'}</h3>
              <p>{lang === 'id' ? 'Layanan ekspedisi internasional ke 64 negara dengan jaminan keamanan dan harga terbaik' : lang === 'en' ? 'International expedition service to 64 countries with guaranteed security and best prices' : '安全性とベストプライスが保証された64カ国への国際配送サービス'}</p>
              <ul>
                <li>✓ {lang === 'id' ? 'Pengiriman ke berbagai negara di Asia, Timur Tengah, Eropa' : lang === 'en' ? 'Shipment to various countries in Asia, Middle East, Europe' : 'アジア、中東、ヨーロッパのさまざまな国への発送'}</li>
                <li>✓ {lang === 'id' ? 'Estimasi pengiriman 7-14 hari' : lang === 'en' ? 'Estimated delivery 7-14 days' : '推定配達日数7〜14日'}</li>
                <li>✓ {lang === 'id' ? 'Asuransi barang tersedia' : lang === 'en' ? 'Item insurance available' : '商品保険が利用可能'}</li>
                <li>✓ {lang === 'id' ? 'Real-time tracking' : lang === 'en' ? 'Real-time tracking' : 'リアルタイム追跡'}</li>
              </ul>
            </div>
            <div className="service-card featured" data-aos="fade-up" data-aos-delay="200">
              <div className="service-icon">🇯🇵⇄🇮🇩</div>
              <h3>{lang === 'id' ? 'Via Jastip' : lang === 'en' ? 'Via Jastip' : '買い物代行'}</h3>
              <p>{lang === 'id' ? 'Layanan jasa titip khusus antara Jepang dan Indonesia dengan harga kompetitif dan proses yang transparan' : lang === 'en' ? 'Special personal shopper service between Japan and Indonesia with competitive prices and transparent processes' : '競争力のある価格と透明性のあるプロセスを備えた、日本とインドネシアの間の特別な買い物代行サービス'}</p>
              <ul>
                <li>✓ {lang === 'id' ? 'Jepang → Indonesia: 1300¥ - 1700¥ / kg' : lang === 'en' ? 'Japan → Indonesia: 1300¥ - 1700¥ / kg' : '日本 → インドネシア: 1kgあたり 1300¥ - 1700¥'}</li>
                <li>✓ {lang === 'id' ? 'Indonesia → Jepang: 1100¥ - 1500¥ / kg' : lang === 'en' ? 'Indonesia → Japan: 1100¥ - 1500¥ / kg' : 'インドネシア → 日本: 1kgあたり 1100¥ - 1500¥'}</li>
                <li>✓ {lang === 'id' ? 'Bantuan pembelian produk Jepang' : lang === 'en' ? 'Assistance purchasing Japanese products' : '日本の製品の購入サポート'}</li>
                <li>✓ {lang === 'id' ? 'Konsultasi gratis' : lang === 'en' ? 'Free consultation' : '無料相談'}</li>
              </ul>
            </div>
            <div className="service-card" data-aos="fade-up" data-aos-delay="400">
              <div className="service-icon">📦</div>
              <h3>{lang === 'id' ? 'Layanan Tambahan' : lang === 'en' ? 'Additional Services' : '追加サービス'}</h3>
              <p>{lang === 'id' ? 'Fasilitas pendukung untuk pengalaman pengiriman yang lebih baik' : lang === 'en' ? 'Supporting facilities for a better shipping experience' : 'より良い配送体験のためのサポート機能'}</p>
              <ul>
                <li>✓ {lang === 'id' ? 'Packing profesional' : lang === 'en' ? 'Professional packing' : 'プロフェッショナルな梱包'}</li>
                <li>✓ {lang === 'id' ? 'Asuransi pengiriman' : lang === 'en' ? 'Shipping insurance' : '配送保険'}</li>
                <li>✓ {lang === 'id' ? 'Konsolidasi paket' : lang === 'en' ? 'Package consolidation' : 'パッケージの統合'}</li>
                <li>✓ {lang === 'id' ? 'Layanan bea cukai' : lang === 'en' ? 'Customs service' : '通関サービス'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>{lang === 'id' ? 'Daftar Harga' : lang === 'en' ? 'Pricing List' : '料金表'}</h2>
            <p>{lang === 'id' ? 'Transparan dan kompetitif tanpa biaya tersembunyi' : lang === 'en' ? 'Transparent and competitive with no hidden fees' : '隠し費用なしで透明性と競争力があります'}</p>
          </div>
          <div className="tab-buttons" data-aos="fade-up" data-aos-delay="200">
            <button
              className={`tab-button ${activeTab === 'jastip' ? 'active' : ''}`}
              onClick={() => setActiveTab('jastip')}
            >
              {lang === 'id' ? 'Via Jastip' : lang === 'en' ? 'Via Jastip' : '買い物代行'}
            </button>
            <button
              className={`tab-button ${activeTab === 'expedition' ? 'active' : ''}`}
              onClick={() => setActiveTab('expedition')}
            >
              {lang === 'id' ? 'Via Ekspedisi' : lang === 'en' ? 'Via Expedition' : '配送経由'}
            </button>
          </div>

          {activeTab === 'jastip' && (
            <div className="pricing-content" data-aos="fade-up" data-aos-delay="400">
              <h3>{jastipData.title}</h3>
              <div className="price-table">
                <div className="table-header">
                  <div>{lang === 'id' ? 'Rute Pengiriman' : lang === 'en' ? 'Shipping Route' : '配送ルート'}</div>
                  <div>{lang === 'id' ? 'Harga' : lang === 'en' ? 'Price' : '料金'}</div>
                </div>
                {jastipData.routes.map((route, index) => (
                  <div key={index} className="table-row">
                    <div>
                      <strong>{route.route}</strong>
                      <small>{lang === 'id' ? 'Termasuk biaya handling' : lang === 'en' ? 'Including handling fee' : '手数料込み'}</small>
                    </div>
                    <div className="price">{route.price}</div>
                  </div>
                ))}
              </div>
              <div className="pricing-note">
                <p>* Harga dapat bervariasi tergantung jenis barang dan nilai bea cukai</p>
              </div>
            </div>
          )}

          {activeTab === 'expedition' && (
            <div className="pricing-content" data-aos="fade-up" data-aos-delay="400">
              <h3>{lang === 'id' ? 'Via Ekspedisi Internasional' : lang === 'en' ? 'Via International Expedition' : '国際配送経由'}</h3>
              <p className="info-note">
                *{lang === 'id' ? ' Harga berikut untuk negara yang paling sering dikirim. Untuk negara lainnya, silakan hubungi kami untuk penawaran khusus.' : lang === 'en' ? ' The following prices are for the most frequently shipped countries. For other countries, please contact us for a special offer.' : ' 以下の料金は最も頻繁に発送される国向けのものです。その他の国については、特別オファーについてお問い合わせください。'}
              </p>
              <div className="expedition-grid">
                {expeditionData.map((country, index) => (
                  <div key={index} className="country-card">
                    <div className="country-header">
                      <h4>{country.country}</h4>
                      {country.estimates && <span className="estimates-badge">{country.estimates}</span>}
                    </div>
                    <div className="price-list">
                      {country.prices.map((price, idx) => (
                        <div key={idx} className="price-item">
                          <span className="weight">{price.range}</span>
                          <span className="price-value">{price.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="pricing-note">
                <p>*{lang === 'id' ? ' Harga belum termasuk packing dan asuransi' : lang === 'en' ? ' Prices do not include packing and insurance' : ' 料金には梱包費と保険料は含まれていません'}</p>
                <p>*{lang === 'id' ? ' Untuk barang dengan dimensi besar, akan dikenakan charge volumetrik' : lang === 'en' ? ' For large items, volumetric charges will apply' : ' 大きな品目の場合、容積重量料金が適用されます'}</p>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Terms Section */}
      <section id="terms" className="terms">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>{lang === 'id' ? 'Syarat & Ketentuan Handcarry' : lang === 'en' ? 'Handcarry Terms & Conditions' : 'ハンドキャリー利用規約'}</h2>
            <p>{lang === 'id' ? 'Mohon dibaca sebelum menggunakan layanan kami' : lang === 'en' ? 'Please read before using our services' : '当社のサービスをご利用になる前にお読みください'}</p>
          </div>

          <div className="terms-grid">

            {/* Jepang → Indonesia */}
            <div className="terms-card" data-aos="fade-right">
              <h3>🇯🇵 → 🇮🇩 {lang === 'id' ? 'Jepang ke Indonesia' : lang === 'en' ? 'Japan to Indonesia' : '日本からインドネシアへ'}</h3>

              <h4>{lang === 'id' ? 'Titip Beli' : lang === 'en' ? 'Buy for Me' : '買い付け依頼'}</h4>
              <ul>
                <li>{lang === 'id' ? 'Full payment / DP 50% di awal (kecuali kesepakatan khusus)' : lang === 'en' ? 'Full payment / 50% DP upfront (unless otherwise agreed)' : '全額支払い / 前払い50%（別途合意がない限り）'}</li>
                <li>{lang === 'id' ? 'Pesanan diproses setelah pembayaran lunas' : lang === 'en' ? 'Orders are processed after payment is complete' : '支払いが完了した後に注文が処理されます'}</li>
              </ul>

              <h4>{lang === 'id' ? 'Titip Bawa' : lang === 'en' ? 'Carry for Me' : '持ち込み依頼'}</h4>
              <ul>
                <li>{lang === 'id' ? 'Barang tersedia di warehouse minimal H-2 sebelum keberangkatan' : lang === 'en' ? 'Items available at warehouse at least D-2 before departure' : '商品は出発の少なくとも2日前に倉庫に到着している必要があります'}</li>
                <li>{lang === 'id' ? 'Termasuk packing bandara, bagasi pesawat, dan dibawa sampai tujuan' : lang === 'en' ? 'Includes airport packing, airplane baggage, and carried to destination' : '空港での梱包、航空機への預け入れ、目的地までの持ち込みが含まれます'}</li>
              </ul>

              <h4>{lang === 'id' ? 'Pengiriman' : lang === 'en' ? 'Shipping' : '発送'}</h4>
              <ul>
                <li>{lang === 'id' ? 'Ongkir domestik setelah landing Jakarta ditanggung penerima' : lang === 'en' ? 'Domestic shipping fee after landing in Jakarta is borne by the recipient' : 'ジャカルタ到着後の国内送料は受取人負担です'}</li>
                <li>{lang === 'id' ? 'Barang dikirim 1–3 hari setelah landing' : lang === 'en' ? 'Items are shipped 1–3 days after landing' : '商品は到着後1〜3日で発送されます'}</li>
                <li>{lang === 'id' ? 'Estimasi tiba 2–3 hari (tergantung flight)' : lang === 'en' ? 'Estimated arrival 2–3 days (depending on flight)' : '到着目安2〜3日（フライトによります）'}</li>
              </ul>

              <h4>{lang === 'id' ? 'Biaya & Kebijakan' : lang === 'en' ? 'Fees & Policies' : '料金とポリシー'}</h4>
              <ul>
                <li>{lang === 'id' ? 'Sistem hitung per kg (dibulatkan ke atas)' : lang === 'en' ? 'Per kg calculation system (rounded up)' : '1kg単位の計算システム（切り上げ）'}</li>
                <li>{lang === 'id' ? 'Minimum charge 1 kg' : lang === 'en' ? 'Minimum charge 1 kg' : '最低料金1kg'}</li>
                <li>{lang === 'id' ? 'Fee bisa nego sesuai kesepakatan' : lang === 'en' ? 'Fee is negotiable upon agreement' : '料金は合意により交渉可能です'}</li>
                <li>{lang === 'id' ? 'Pembatalan setelah dikirim tidak dapat refund' : lang === 'en' ? 'Cancellations after shipping cannot be refunded' : '発送後のキャンセルは返金できません'}</li>
              </ul>
            </div>

            {/* Indonesia → Jepang */}
            <div className="terms-card" data-aos="fade-left">
              <h3>🇮🇩 → 🇯🇵 {lang === 'id' ? 'Indonesia ke Jepang' : lang === 'en' ? 'Indonesia to Japan' : 'インドネシアから日本へ'}</h3>

              <h4>{lang === 'id' ? 'Ketentuan Barang' : lang === 'en' ? 'Item Conditions' : '商品の条件'}</h4>
              <ul>
                <li>{lang === 'id' ? 'Hanya menerima barang yang tidak dilarang' : lang === 'en' ? 'Only accept items that are not prohibited' : '禁止されていない商品のみを受け付けます'}</li>
                <li>{lang === 'id' ? 'Kami berhak menolak barang berbahaya/berisiko' : lang === 'en' ? 'We have the right to refuse dangerous/risky items' : '危険なアイテムを拒否する権利があります'}</li>
                <li>{lang === 'id' ? 'Semua paket diperiksa & dibuka terlebih dahulu demi keamanan' : lang === 'en' ? 'All packages are inspected & opened first for safety' : '安全のため、すべてのパッケージは事前に検査および開封されます'}</li>
              </ul>

              <h4>{lang === 'id' ? 'Warehouse & Tanggung Jawab' : lang === 'en' ? 'Warehouse & Responsibility' : '倉庫と責任'}</h4>
              <ul>
                <li>{lang === 'id' ? 'Tanggung jawab kami setelah barang diterima di warehouse' : lang === 'en' ? 'Our responsibility starts after the item is received at the warehouse' : '当社の責任は、商品が倉庫に到着した後に開始されます'}</li>
                <li>{lang === 'id' ? 'Kerusakan/kehilangan dari ekspedisi lokal bukan tanggung jawab kami' : lang === 'en' ? 'Damage/loss from local expedition is not our responsibility' : '現地の配送業者による破損/紛失は当社の責任ではありません'}</li>
                <li>{lang === 'id' ? 'Berat dihitung termasuk box/kemasan' : lang === 'en' ? 'Weight is calculated including box/packaging' : '重量は箱/梱包を含めて計算されます'}</li>
              </ul>

              <h4>{lang === 'id' ? 'Pengiriman' : lang === 'en' ? 'Shipping' : '発送'}</h4>
              <ul>
                <li>{lang === 'id' ? 'Alamat wajib dicantumkan sebelum keberangkatan' : lang === 'en' ? 'Address must be provided before departure' : '出発前に住所を必ず提供する必要があります'}</li>
                <li>{lang === 'id' ? 'Dikirim 1–3 hari setelah landing Jepang/Korea/Indonesia' : lang === 'en' ? 'Shipped 1–3 days after landing in Japan/Korea/Indonesia' : '日本/韓国/インドネシア到着後1〜3日で発送'}</li>
                <li>{lang === 'id' ? 'Estimasi 2–4 hari tergantung flight' : lang === 'en' ? 'Estimate 2–4 days depending on flight' : 'フライトにより推定2〜4日'}</li>
                <li>{lang === 'id' ? 'Jika delay penerbangan, waktu pengiriman menyesuaikan' : lang === 'en' ? 'If flight is delayed, delivery time will adjust' : 'フライトが遅延した場合、配送時間は調整されます'}</li>
              </ul>

              <h4>{lang === 'id' ? 'Pembayaran' : lang === 'en' ? 'Payment' : '支払い'}</h4>
              <ul>
                <li>{lang === 'id' ? 'DP 50% untuk titip beli (kecuali kesepakatan)' : lang === 'en' ? '50% DP for buy for me (unless otherwise agreed)' : '買い付け依頼の50％のDP（別途合意がない限り）'}</li>
                <li>{lang === 'id' ? 'Sistem per kg dibulatkan ke atas' : lang === 'en' ? 'Per kg system rounded up' : '1kg単位のシステム（切り上げ）'}</li>
                <li>{lang === 'id' ? 'Minimum charge 1 kg' : lang === 'en' ? 'Minimum charge 1 kg' : '最低料金1kg'}</li>
                <li>{lang === 'id' ? 'Penerbangan rutin 2–5 kali per bulan' : lang === 'en' ? 'Routine flights 2–5 times a month' : '月に2〜5回の定期便'}</li>
              </ul>
            </div>

          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>{lang === 'id' ? 'Pertanyaan Umum' : lang === 'en' ? 'Frequently Asked Questions' : 'よくある質問'}</h2>
            <p>{lang === 'id' ? 'Semua yang perlu Anda ketahui tentang layanan kami' : lang === 'en' ? 'Everything you need to know about our services' : '当社のサービスについて知っておくべきことすべて'}</p>
          </div>
          <div className="faq-container">
            {faqData.map((item, index) => (
              <div key={index} className={`faq-item ${activeFaqs.includes(index) ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <h4>{item.question}</h4>
                  <span className="faq-toggle">{activeFaqs.includes(index) ? '−' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
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

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2>{lang === 'id' ? 'Hubungi Kami' : lang === 'en' ? 'Contact Us' : 'お問い合わせ'}</h2>
            <p>{lang === 'id' ? 'Tim customer service kami siap membantu 7 hari seminggu' : lang === 'en' ? 'Our customer service team is ready to help 7 days a week' : 'カスタマーサービスチームが週7日ご対応いたします'}</p>
          </div>
          <div className="contact-content">
            <div className="contact-info" data-aos="fade-right">
              <h3>{lang === 'id' ? 'Informasi Kontak' : lang === 'en' ? 'Contact Information' : '連絡先情報'}</h3>
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true"><MailIcon /></div>
                <div>
                  <strong>Email</strong>
                  <p>jastipnihong@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true"><PhoneIcon /></div>
                <div>
                  <strong>WhatsApp</strong>
                  <p>+62 815-7162-517</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true"><MapPinIcon /></div>
                <div>
                  <strong>{lang === 'id' ? 'Alamat' : lang === 'en' ? 'Address' : '住所'}</strong>
                  <p>- Jl. Petukangan Utara, Jakarta Selatan</p>
                  <p>- Jl. Garuda I Gg Acim II No 58, Depok</p>
                  <p>- Gadukan, Kutoharjo, Kec. Kaliwungu, Kabupaten Kendal</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true"><ClockIcon /></div>
                <div>
                  <strong>{lang === 'id' ? 'Jam Operasional' : lang === 'en' ? 'Operating Hours' : '営業時間'}</strong>
                  <p>{lang === 'id' ? 'Senin - Minggu' : lang === 'en' ? 'Monday - Sunday' : '月曜日 - 日曜日'}: 08:00 - 18:00 WIB</p>
                </div>
              </div>

              <div className="social-links">
                <h4>{lang === 'id' ? 'Follow Kami' : lang === 'en' ? 'Follow Us' : 'フォローする'}</h4>
                <div className="social-links">
                  <div className="social-icons logos-only">
                    <a
                      href="https://instagram.com/nihongjastip"
                      aria-label="Instagram"
                      className="social-icon"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@nihongjastip"
                      aria-label="TikTok"
                      className="social-icon"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="https://cdn.simpleicons.org/tiktok/000000" alt="TikTok" />
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61556636232972"
                      aria-label="Facebook"
                      className="social-icon"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="https://cdn.simpleicons.org/facebook/1877F2" alt="Facebook" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
            <div className="contact-form" data-aos="fade-left">
              <h3>{lang === 'id' ? 'Kirim Pesan' : lang === 'en' ? 'Send Message' : 'メッセージを送る'}</h3>
              <form onSubmit={submitContactToWhatsApp} noValidate>
                <div className="form-group">
                  <input name="name" type="text" placeholder={lang === 'id' ? 'Nama Lengkap' : lang === 'en' ? 'Full Name' : '氏名'} required />
                </div>
                <div className="form-group">
                  <input
                    name="phone"
                    type="tel"
                    placeholder={lang === 'id' ? 'Nomor Telepon' : lang === 'en' ? 'Phone Number' : '電話番号'}
                    inputMode="numeric"
                    maxLength={15}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder={lang === 'id' ? 'Detail pesan atau pertanyaan Anda' : lang === 'en' ? 'Details of your message or question' : 'メッセージまたはご質問の詳細'}
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">{lang === 'id' ? 'Kirim Pesan' : lang === 'en' ? 'Send Message' : 'メッセージを送る'}</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" data-aos="fade-up">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Nihong Jastip</h3>
              <p>
                {lang === 'id' ? 'Layanan jasa titip dan ekspedisi internasional terpercaya sejak 2024. Komitmen kami adalah memberikan pengalaman pengiriman yang aman, cepat, dan terjangkau.' : lang === 'en' ? 'Trusted international personal shopper and expedition service since 2024. Our commitment is to provide a safe, fast, and affordable shipping experience.' : '2024年以来の信頼できる国際的な買い物代行および配送サービス。私たちのコミットメントは、安全で迅速、そして手頃な配送体験を提供することです。'}
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Nihong Jastip. All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
