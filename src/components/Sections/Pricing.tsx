import React from 'react';
import { Language, JastipData, ExpeditionCountry } from '../../types';

interface PricingProps {
  lang: Language;
  activeTab: 'jastip' | 'expedition';
  setActiveTab: (tab: 'jastip' | 'expedition') => void;
  jastipData: JastipData;
  expeditionData: ExpeditionCountry[];
}

const Pricing: React.FC<PricingProps> = ({
  lang,
  activeTab,
  setActiveTab,
  jastipData,
  expeditionData
}) => {
  return (
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
  );
};

export default Pricing;
