import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle, Plane, ShoppingBag } from 'lucide-react';
import { Language, JastipData, ExpeditionCountry } from '../../types';

interface PricingProps {
  lang: Language;
  activeTab: 'jastip' | 'expedition';
  setActiveTab: (tab: 'jastip' | 'expedition') => void;
  jastipData: JastipData;
  expeditionData: ExpeditionCountry[];
  openWhatsApp: () => void;
}

const Pricing: React.FC<PricingProps> = ({
  lang,
  activeTab,
  setActiveTab,
  jastipData,
  expeditionData,
  openWhatsApp
}) => {
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <motion.div 
          className="section-heading pricing-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">{lang === 'id' ? 'Tarif transparan' : lang === 'en' ? 'Clear rates' : 'わかりやすい料金'}</span>
          <h2>{lang === 'id' ? 'Cek tarif sebelum mulai.' : lang === 'en' ? 'Check rates before you start.' : 'ご利用前に料金を確認。'}</h2>
          <p>{lang === 'id' ? 'Pilih layanan untuk melihat estimasi biaya. Kami akan konfirmasi total final sebelum diproses.' : lang === 'en' ? 'Choose a service to view estimated pricing. We confirm the final total before processing.' : 'サービスを選んで料金の目安をご確認ください。確定金額は処理前にご案内します。'}</p>
        </motion.div>

        <motion.div 
          className="tab-buttons"
          role="tablist"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            className={`tab-button ${activeTab === 'jastip' ? 'active' : ''}`}
            onClick={() => setActiveTab('jastip')}
            role="tab"
            aria-selected={activeTab === 'jastip'}
          >
            <ShoppingBag size={18} />
            {lang === 'id' ? 'Via Jastip' : lang === 'en' ? 'Via Jastip' : '買い物代行'}
          </button>
          <button
            className={`tab-button ${activeTab === 'expedition' ? 'active' : ''}`}
            onClick={() => setActiveTab('expedition')}
            role="tab"
            aria-selected={activeTab === 'expedition'}
          >
            <Plane size={18} />
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
                <div className="jastip-rate-grid">
                  {jastipData.routes.map((route, index) => (
                    <article key={index} className="jastip-rate-card">
                      <div className="route-visual">
                        <span>{index === 0 ? 'JPN' : 'IDN'}</span>
                        <ArrowRight size={18} />
                        <span>{index === 0 ? 'IDN' : 'JPN'}</span>
                      </div>
                      <h3>{route.route}</h3>
                      <div className="price">{route.price}</div>
                      <p>{lang === 'id' ? 'Sudah termasuk biaya handling' : lang === 'en' ? 'Handling fee included' : '手数料込み'}</p>
                    </article>
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

        <div className="pricing-help">
          <div>
            <MessageCircle size={24} />
            <span>
              <strong>{lang === 'id' ? 'Butuh hitungan yang lebih akurat?' : lang === 'en' ? 'Need a more accurate quote?' : 'より正確なお見積りが必要ですか？'}</strong>
              <small>{lang === 'id' ? 'Kirim foto atau link barang. Konsultasinya gratis.' : lang === 'en' ? 'Send the item photo or link. Consultation is free.' : '商品の写真やリンクをお送りください。ご相談は無料です。'}</small>
            </span>
          </div>
          <button onClick={openWhatsApp}>{lang === 'id' ? 'Minta estimasi' : lang === 'en' ? 'Request a quote' : '見積りを依頼'}</button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
