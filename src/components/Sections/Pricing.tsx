import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>{lang === 'id' ? 'Daftar Harga' : lang === 'en' ? 'Pricing List' : '料金表'}</h2>
          <p>{lang === 'id' ? 'Transparan dan kompetitif tanpa biaya tersembunyi' : lang === 'en' ? 'Transparent and competitive with no hidden fees' : '隠し費用なしで透明性と競争力があります'}</p>
        </motion.div>

        <motion.div 
          className="tab-buttons"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
        </motion.div>

        <div className="pricing-wrapper">
          <AnimatePresence mode="wait">
            {activeTab === 'jastip' ? (
              <motion.div 
                key="jastip"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="pricing-content"
              >
                <div className="price-table">
                  <div className="table-header">
                    <div>{lang === 'id' ? 'Rute Pengiriman' : lang === 'en' ? 'Shipping Route' : '配送ルート'}</div>
                    <div style={{ textAlign: 'right' }}>{lang === 'id' ? 'Harga' : lang === 'en' ? 'Price' : '料金'}</div>
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
                  <p>*{lang === 'id' ? 'Harga dapat bervariasi tergantung jenis barang dan nilai bea cukai' : lang === 'en' ? 'Prices may vary depending on item type and customs value' : '商品の種類や税関価格によって価格が変動する場合があります'}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="expedition"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="pricing-content"
              >
                <div className="expedition-selection">
                  <div className="dropdown-container">
                    <label htmlFor="country-select">
                      {lang === 'id' ? 'Pilih Negara Tujuan:' : lang === 'en' ? 'Select Destination Country:' : '目的国を選択:'}
                    </label>
                    <div className="custom-select-wrapper">
                      <select 
                        id="country-select"
                        className="country-dropdown"
                        value={selectedCountryIndex}
                        onChange={(e) => setSelectedCountryIndex(Number(e.target.value))}
                      >
                        {expeditionData.map((country, index) => (
                          <option key={index} value={index}>
                            {country.country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {expeditionData[selectedCountryIndex] && (
                      <motion.div 
                        key={selectedCountryIndex} 
                        className="single-country-card"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="country-card-header">
                          <h3>{expeditionData[selectedCountryIndex].country}</h3>
                          {expeditionData[selectedCountryIndex].estimates && (
                            <span className="estimates-badge">
                              {expeditionData[selectedCountryIndex].estimates}
                            </span>
                          )}
                        </div>
                        <div className="price-list">
                          {expeditionData[selectedCountryIndex].prices.map((price, idx) => (
                            <div key={idx} className="price-item">
                              <span className="weight">{price.range}</span>
                              <span className="price-value">{price.price}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pricing-note">
                  <p>*{lang === 'id' ? 'Harga belum termasuk packing dan asuransi' : lang === 'en' ? 'Prices do not include packing and insurance' : '料金には梱包費と保険料は含まれていません'}</p>
                  <p>*{lang === 'id' ? 'Untuk barang dengan dimensi besar, akan dikenakan charge volumetrik' : lang === 'en' ? 'For large items, volumetric charges will apply' : '大きな品目の場合、容積重量料金が適用されます'}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
