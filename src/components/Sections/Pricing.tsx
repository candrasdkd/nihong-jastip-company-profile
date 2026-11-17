import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Language, JastipData } from '../../types';

interface PricingProps {
  lang: Language;
  jastipData: JastipData;
  openWhatsApp: () => void;
}

const Pricing: React.FC<PricingProps> = ({
  lang,
  jastipData,
  openWhatsApp
}) => {
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
          <h2>{lang === 'id' ? 'Tarif Jastip Handcarry Jepang ⇄ Indonesia' : lang === 'en' ? 'Japan ⇄ Indonesia Handcarry Rates' : '日本 ⇄ インドネシア ハンドキャリー料金'}</h2>
          <p>{lang === 'id' ? 'Estimasi biaya per kg sudah termasuk handling bandara & bagasi. Kami konfirmasi total final sebelum diproses.' : lang === 'en' ? 'Estimated per-kg rates include airport handling and luggage fee. We confirm the final total before processing.' : '1kgあたりの目安料金には空港ハンドリング・手荷物費用が含まれます。確定金額は処理前にご案内します。'}</p>
        </motion.div>

        <div className="pricing-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                  <p>{lang === 'id' ? 'Sudah termasuk biaya handling handcarry' : lang === 'en' ? 'Handcarry handling fee included' : 'ハンドキャリー手数料込み'}</p>
                </article>
              ))}
            </div>
            <div className="pricing-note">
              <p>*{lang === 'id' ? 'Minimum charge 1 kg dan dibulatkan ke atas per kelipatan 0,5 kg' : lang === 'en' ? 'Minimum charge 1 kg, rounded up to the nearest 0.5 kg' : '最低料金1kg、0.5kg単位で切り上げ計算となります'}</p>
              <p>*{lang === 'id' ? 'Harga dapat bervariasi tergantung jenis barang, jadwal flight, dan ketentuan bea cukai' : lang === 'en' ? 'Prices may vary depending on item type, flight schedule, and customs rules' : '商品の種類、フライト状況、税関規定によって価格が変動する場合があります'}</p>
            </div>
          </motion.div>
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
