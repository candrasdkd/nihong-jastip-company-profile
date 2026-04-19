import React from 'react';

interface FooterProps {
  lang: string;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
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
  );
};

export default Footer;
