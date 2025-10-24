import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('jastip');
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeMenu, setActiveMenu] = useState('home');
  // State untuk sidebar
  // State untuk sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fungsi toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const jastipData = {
    title: "Via Jastip",
    routes: [
      { route: "Jepang → Indonesia", price: "1300¥ - 1700¥ / kg" },
      { route: "Indonesia → Jepang", price: "1100¥ - 1500¥ / kg" }
    ]
  };

  const expeditionData = [
    {
      country: "Singapura",
      estimates: "Estimasi 7 hari",
      prices: [
        { range: "1-5 kg", price: "95.000/kg" },
        { range: "6-10 kg", price: "85.000/kg" },
        { range: "11-20 kg", price: "75.000/kg" },
        { range: "20-30 kg", price: "60.000/kg" }
      ]
    },
    {
      country: "Brunei",
      estimates: "Estimasi 7 hari",
      prices: [
        { range: "1-5 kg", price: "165.000/kg" },
        { range: "6-10 kg", price: "155.000/kg" },
        { range: "20-30 kg", price: "150.000/kg" }
      ]
    },
    {
      country: "Malaysia",
      estimates: "Estimasi 7 hari",
      prices: [
        { range: "1-10 kg", price: "95.000/kg" },
        { range: "11-25 kg", price: "85.000/kg" },
        { range: "26-30 kg", price: "80.000/kg" }
      ]
    },
    {
      country: "Malaysia Timur (Sabah Serawak)",
      estimates: "Estimasi 7 hari",
      prices: [
        { range: "1-10 kg", price: "115.000/kg" },
        { range: "11-25 kg", price: "105.000/kg" },
        { range: "26-30 kg", price: "100.000/kg" }
      ]
    },
    {
      country: "Hongkong",
      estimates: "Estimasi 7 hari",
      prices: [
        { range: "1-10 kg", price: "155.000/kg" },
        { range: "11-25 kg", price: "145.000/kg" },
        { range: "26-30 kg", price: "140.000/kg" }
      ]
    },
    {
      country: "Taiwan",
      estimates: "Estimasi 7 hari",
      prices: [
        { range: "1-10 kg", price: "105.000/kg" },
        { range: "11-20 kg", price: "95.000/kg" },
        { range: "21-30 kg", price: "90.000/kg" }
      ]
    },
    {
      country: "Jepang",
      estimates: "",
      prices: [
        { range: "0,5 kg", price: "2.500¥/kg" },
        { range: "1 kg", price: "3.700¥/kg" },
        { range: "2-3 kg", price: "2.600¥/kg" },
        { range: "4-8 kg", price: "2.100¥/kg" },
        { range: "9-12 kg", price: "1.900¥/kg" },
        { range: "13-20 kg", price: "1.800¥/kg" },
        { range: "21-30 kg", price: "1.600¥/kg" }
      ]
    },
    {
      country: "Arab Saudi",
      estimates: "Estimasi 7 hari",
      prices: [
        { range: "1 kg", price: "395.000" },
        { range: "2 kg", price: "495.000" },
        { range: "3 kg", price: "610.000" },
        { range: "4 kg", price: "740.000" },
        { range: "5 kg", price: "850.000" },
        { range: "6 kg", price: "960.000" },
        { range: "7 kg", price: "1.100.000" },
        { range: "8 kg", price: "1.200.000" },
        { range: "9 kg", price: "1.300.000" },
        { range: "10 kg", price: "1.400.000" },
        { range: "11-30 kg", price: "Per kg tambahan 100.000" }
      ]
    }
  ];

  const faqData = [
    {
      question: "Apa itu Nihong Jastip?",
      answer: "Nihong Jastip adalah layanan jasa titip dan ekspedisi internasional yang mengkhususkan diri dalam pengiriman barang antara Indonesia dan Jepang, serta ke berbagai negara lainnya. Kami membantu Anda mendapatkan produk dari Jepang atau mengirimkan barang ke berbagai tujuan internasional."
    },
    {
      question: "Bagaimana cara memesan layanan jastip?",
      answer: "Anda dapat memesan melalui website kami dengan mengisi formulir kontak, menghubungi kami via WhatsApp, atau melalui media sosial. Kami akan memandu Anda melalui proses pemesanan, mulai dari pemilihan produk hingga pengiriman."
    },
    {
      question: "Berapa lama waktu pengiriman?",
      answer: "Waktu pengiriman bervariasi tergantung negara tujuan. Untuk layanan ekspedisi, estimasi umumnya 7-14 hari. Untuk layanan jastip khusus Indonesia-Jepang, biasanya membutuhkan waktu 2-3 minggu tergantung proses customs dan ketersediaan barang."
    },
    {
      question: "Apakah ada biaya tambahan selain yang tertera?",
      answer: "Harga yang tertera sudah termasuk biaya pengiriman dasar. Namun, mungkin ada biaya tambahan untuk packing khusus, asuransi, atau bea cukai di negara tujuan yang akan kami informasikan terlebih dahulu sebelum proses pengiriman."
    },
    {
      question: "Bagaimana dengan barang yang rusak atau hilang?",
      answer: "Kami menyediakan asuransi pengiriman untuk barang bernilai tinggi. Untuk klaim kerusakan atau kehilangan, harap laporkan dalam waktu 3 hari setelah barang diterima dengan menyertakan bukti foto/video untuk proses klaim."
    },
    {
      question: "Apakah ada batasan barang yang bisa dikirim?",
      answer: "Ya, kami tidak melayani pengiriman barang terlarang seperti narkoba, senjata, bahan mudah meledak, hewan hidup, dan barang ilegal lainnya. Beberapa negara juga memiliki restriksi khusus untuk makanan, obat-obatan, dan produk tertentu."
    },
    {
      question: "Bagaimana sistem pembayaran?",
      answer: "Kami menerima pembayaran melalui transfer bank, e-wallet, dan untuk layanan jastip bisa melalui sistem DP (down payment) dengan pelunasan sebelum pengiriman. Detail pembayaran akan disampaikan setelah konfirmasi pesanan."
    },
    {
      question: "Apakah bisa tracking pengiriman?",
      answer: "Ya, untuk semua layanan ekspedisi kami menyediakan nomor resi yang dapat digunakan untuk melacak status pengiriman melalui website resmi kurir atau melalui sistem tracking kami."
    }
  ];

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
    setActiveFaq(activeFaq === index ? null : index);
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

  // Set awal dari hash (kalau user buka dengan #pricing dll)
  useEffect(() => {
    const hash = window.location.hash?.replace('#', '');
    if (hash) {
      setActiveMenu(hash);
      setTimeout(() => scrollToId(hash), 0);
    }
  }, []);

  return (
    <div className="App">
      {/* Header */}
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo-section">
            <h1 className="logo">Nihong Jastip</h1>
            <span className="tagline">Your Trusted International Shipping Partner</span>
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

          <nav className="nav">
            <a href="#home" onClick={handleNavClick('home')} className={activeMenu === 'home' ? 'active' : ''}>Beranda</a>
            <a href="#services" onClick={handleNavClick('services')} className={activeMenu === 'services' ? 'active' : ''}>Layanan</a>
            <a href="#pricing" onClick={handleNavClick('pricing')} className={activeMenu === 'pricing' ? 'active' : ''}>Harga</a>
            <a href="#faq" onClick={handleNavClick('faq')} className={activeMenu === 'faq' ? 'active' : ''}>FAQ</a>
            <a href="#contact" onClick={handleNavClick('contact')} className={activeMenu === 'contact' ? 'active' : ''}>Kontak</a>
          </nav>
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
          <a href="#home" onClick={handleNavClickWithClose('home')} className={activeMenu === 'home' ? 'active' : ''}>Beranda</a>
          <a href="#services" onClick={handleNavClickWithClose('services')} className={activeMenu === 'services' ? 'active' : ''}>Layanan</a>
          <a href="#pricing" onClick={handleNavClickWithClose('pricing')} className={activeMenu === 'pricing' ? 'active' : ''}>Harga</a>
          <a href="#faq" onClick={handleNavClickWithClose('faq')} className={activeMenu === 'faq' ? 'active' : ''}>FAQ</a>
          <a href="#contact" onClick={handleNavClickWithClose('contact')} className={activeMenu === 'contact' ? 'active' : ''}>Kontak</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">Terpercaya Sejak 2024</div>
            <h1>Jasa Titip & Ekspedisi Internasional</h1>
            <p>Melayani pengiriman barang dari Jepang ke Indonesia dan sebaliknya, serta ekspedisi ke 64 negara dengan jaminan keamanan dan ketepatan waktu</p>
            <div className="hero-cta">
              <button className="cta-button primary" onClick={openWhatsApp}>
                Konsultasi Gratis
              </button>
              <button
                className="cta-button secondary"
                onClick={() => { setActiveMenu('services'); scrollToId('services'); }}
              >
                Lihat Layanan
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">1+</span>
                <span className="stat-label">Tahun Pengalaman</span>
              </div>
              <div className="stat">
                <span className="stat-number">64</span>
                <span className="stat-label">Negara Tujuan</span>
              </div>
              <div className="stat">
                <span className="stat-number">100+</span>
                <span className="stat-label">Pelanggan Puas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2>Layanan Kami</h2>
            <p>Berbagai solusi pengiriman internasional untuk kebutuhan bisnis dan pribadi Anda</p>
          </div>
          <div className="services-grid">

            <div className="service-card">
              <div className="service-icon">🌍</div>
              <h3>Via Ekspedisi</h3>
              <p>Layanan ekspedisi internasional ke 64 negara dengan jaminan keamanan dan harga terbaik</p>
              <ul>
                <li>✓ Pengiriman ke berbagai negara di Asia, Timur Tengah, Eropa</li>
                <li>✓ Estimasi pengiriman 7-14 hari</li>
                <li>✓ Asuransi barang tersedia</li>
                <li>✓ Real-time tracking</li>
              </ul>
            </div>
            <div className="service-card featured">
              <div className="service-icon">🇯🇵⇄🇮🇩</div>
              <h3>Via Jastip</h3>
              <p>Layanan jasa titip khusus antara Jepang dan Indonesia dengan harga kompetitif dan proses yang transparan</p>
              <ul>
                <li>✓ Jepang → Indonesia: 1300¥ - 1700¥ / kg</li>
                <li>✓ Indonesia → Jepang: 1100¥ - 1500¥ / kg</li>
                <li>✓ Bantuan pembelian produk Jepang</li>
                <li>✓ Konsultasi gratis</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">📦</div>
              <h3>Layanan Tambahan</h3>
              <p>Fasilitas pendukung untuk pengalaman pengiriman yang lebih baik</p>
              <ul>
                <li>✓ Packing profesional</li>
                <li>✓ Asuransi pengiriman</li>
                <li>✓ Konsolidasi paket</li>
                <li>✓ Layanan bea cukai</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <h2>Daftar Harga</h2>
            <p>Transparan dan kompetitif tanpa biaya tersembunyi</p>
          </div>
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === 'jastip' ? 'active' : ''}`}
              onClick={() => setActiveTab('jastip')}
            >
              Via Jastip
            </button>
            <button
              className={`tab-button ${activeTab === 'expedition' ? 'active' : ''}`}
              onClick={() => setActiveTab('expedition')}
            >
              Via Ekspedisi
            </button>
          </div>

          {activeTab === 'jastip' && (
            <div className="pricing-content">
              <h3>{jastipData.title}</h3>
              <div className="price-table">
                <div className="table-header">
                  <div>Rute Pengiriman</div>
                  <div>Harga per kg</div>
                </div>
                {jastipData.routes.map((route, index) => (
                  <div key={index} className="table-row">
                    <div>
                      <strong>{route.route}</strong>
                      <small>Termasuk biaya handling</small>
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
            <div className="pricing-content">
              <h3>Via Ekspedisi Internasional</h3>
              <p className="info-note">
                * Harga berikut untuk negara yang paling sering dikirim. Untuk negara lainnya, silakan hubungi kami untuk penawaran khusus.
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
                <p>* Harga belum termasuk packing dan asuransi</p>
                <p>* Untuk barang dengan dimensi besar, akan dikenakan charge volumetrik</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <div className="section-header">
            <h2>Pertanyaan Umum</h2>
            <p>Semua yang perlu Anda ketahui tentang layanan kami</p>
          </div>
          <div className="faq-container">
            {faqData.map((item, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <h4>{item.question}</h4>
                  <span className="faq-toggle">{activeFaq === index ? '−' : '+'}</span>
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
          <div className="cta-content">
            <h2>Siap Mengirimkan Barang Anda?</h2>
            <p>Dapatkan penawaran khusus untuk pengiriman pertama Anda</p>
            <button className="cta-button primary large" onClick={openWhatsApp}>
              Hubungi Kami Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Hubungi Kami</h2>
            <p>Tim customer service kami siap membantu 7 hari seminggu</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Informasi Kontak</h3>
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
                  <strong>Alamat</strong>
                  <p>- Jl. Petukangan Utara, Jakarta Selatan</p>
                  <p>- Jl. Garuda I Gg Acim II No 58, Depok</p>
                  <p>- Gadukan, Kutoharjo, Kec. Kaliwungu, Kabupaten Kendal</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true"><ClockIcon /></div>
                <div>
                  <strong>Jam Operasional</strong>
                  <p>Senin - Minggu: 08:00 - 18:00 WIB</p>
                </div>
              </div>

              <div className="social-links">
                <h4>Follow Kami</h4>
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
            <div className="contact-form">
              <h3>Kirim Pesan</h3>
              <form onSubmit={submitContactToWhatsApp} noValidate>
                <div className="form-group">
                  <input name="name" type="text" placeholder="Nama Lengkap" required />
                </div>
                <div className="form-group">
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Nomor Telepon"
                    inputMode="numeric"
                    maxLength={15}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Detail pesan atau pertanyaan Anda"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">Kirim Pesan</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Nihong Jastip</h3>
              <p>Layanan jasa titip dan ekspedisi internasional terpercaya sejak 2024. Komitmen kami adalah memberikan pengalaman pengiriman yang aman, cepat, dan terjangkau.</p>
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
