import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, MessageCircle, Check } from 'lucide-react';

import { Language } from '../../types';

interface ContactProps {
  lang: Language;
  submitContactToWhatsApp: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Contact: React.FC<ContactProps> = ({ lang, submitContactToWhatsApp }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div 
          className="section-heading contact-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">{lang === 'id' ? 'Kami siap bantu' : lang === 'en' ? 'We are here to help' : 'お気軽にご相談ください'}</span>
          <h2>{lang === 'id' ? 'Ceritakan barang yang ingin kamu kirim.' : lang === 'en' ? 'Tell us what you want to ship.' : '送りたい商品について教えてください。'}</h2>
          <p>{lang === 'id' ? 'Isi detail singkat, lalu percakapan dilanjutkan langsung di WhatsApp.' : lang === 'en' ? 'Share a few details and continue the conversation directly on WhatsApp.' : '簡単な情報を入力すると、WhatsAppでそのままご相談いただけます。'}</p>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="contact-kicker"><MessageCircle size={17} /> {lang === 'id' ? 'Customer care' : lang === 'en' ? 'Customer care' : 'カスタマーケア'}</span>
            <h3>{lang === 'id' ? 'Ada pertanyaan? Jangan ragu.' : lang === 'en' ? 'Questions? Just ask.' : 'ご不明点はお気軽に。'}</h3>
            <p className="contact-intro">{lang === 'id' ? 'Kami bantu memilih layanan, mengecek barang, dan menjelaskan biaya sebelum kamu memutuskan.' : lang === 'en' ? 'We help choose the right service, check the item, and explain costs before you decide.' : 'サービス選び、商品確認、料金のご説明まで、ご依頼前にサポートします。'}</p>
            <ul className="contact-benefits">
              <li><Check size={16} /> {lang === 'id' ? 'Konsultasi awal gratis' : lang === 'en' ? 'Free initial consultation' : '初回相談無料'}</li>
              <li><Check size={16} /> {lang === 'id' ? 'Buka setiap hari' : lang === 'en' ? 'Open every day' : '毎日営業'}</li>
            </ul>
            
            <div className="contact-item">
              <div className="contact-icon"><Mail size={20} /></div>
              <div>
                <strong>Email</strong>
                <a href="mailto:jastipnihong@gmail.com">jastipnihong@gmail.com</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><Phone size={20} /></div>
              <div>
                <strong>WhatsApp</strong>
                <a href="https://wa.me/628157162517" target="_blank" rel="noreferrer">+62 815-7162-517</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><MapPin size={20} /></div>
              <div>
                <strong>{lang === 'id' ? 'Alamat' : lang === 'en' ? 'Address' : '住所'}</strong>
                <p>- Jl. Petukangan Utara, Jakarta Selatan</p>
                <p>- Jl. Garuda I Gg Acim II No 58, Depok</p>
                <p>- Gadukan, Kutoharjo, Kec. Kaliwungu, Kabupaten Kendal</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><Clock size={20} /></div>
              <div>
                <strong>{lang === 'id' ? 'Jam Operasional' : lang === 'en' ? 'Operating Hours' : '営業時間'}</strong>
                <p>{lang === 'id' ? 'Senin - Minggu' : lang === 'en' ? 'Monday - Sunday' : '月曜日 - 日曜日'}: 08:00 - 18:00 WIB</p>
              </div>
            </div>

            <div className="social-links">
              <h4>{lang === 'id' ? 'Follow Kami' : lang === 'en' ? 'Follow Us' : 'フォローする'}</h4>
              <div className="social-icons">
                <a href="https://instagram.com/nihongjastip" className="social-icon" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61556636232972" className="social-icon" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="https://www.tiktok.com/@nihongjastip" className="social-icon" target="_blank" rel="noreferrer" aria-label="TikTok">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.76-.54-1.43-1.25-1.93-2.07-.03 2.14-.02 4.29-.02 6.43 0 1.64-.32 3.32-1.2 4.7-1.01 1.62-2.78 2.73-4.63 3.1-1.63.34-3.38.25-4.94-.42-1.68-.73-3.08-2.15-3.8-3.83-.82-1.89-.78-4.13.14-5.96.93-1.84 2.82-3.19 4.87-3.52 1.17-.19 2.38-.11 3.5.25v4.13c-1.34-.45-2.89-.25-4.04.57-1.15.83-1.74 2.33-1.42 3.73.28 1.25 1.3 2.3 2.53 2.55 1.2.25 2.5-.1 3.33-.99.78-.83 1.08-2.01 1.08-3.13-.01-4.22-.01-8.45-.01-12.67z"/></svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="form-step">{lang === 'id' ? 'Mulai konsultasi' : lang === 'en' ? 'Start a consultation' : '相談を始める'}</span>
            <h3>{lang === 'id' ? 'Isi detail singkat' : lang === 'en' ? 'Share a few details' : '簡単な情報を入力'}</h3>
            <form onSubmit={submitContactToWhatsApp} noValidate>
              <div className="form-group">
                <label htmlFor="contact-name">{lang === 'id' ? 'Nama' : lang === 'en' ? 'Name' : 'お名前'}</label>
                <input id="contact-name" name="name" type="text" placeholder={lang === 'id' ? 'Nama lengkap kamu' : lang === 'en' ? 'Your full name' : '氏名'} required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-phone">WhatsApp</label>
                <input id="contact-phone" name="phone" type="tel" placeholder="08xx xxxx xxxx" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-service">{lang === 'id' ? 'Kebutuhan' : lang === 'en' ? 'Service needed' : 'ご希望のサービス'}</label>
                <select id="contact-service" name="service" defaultValue="" required>
                  <option value="" disabled>{lang === 'id' ? 'Pilih layanan' : lang === 'en' ? 'Choose a service' : 'サービスを選択'}</option>
                  <option value="Jastip Jepang → Indonesia">Jastip Jepang → Indonesia</option>
                  <option value="Jastip Indonesia → Jepang">Jastip Indonesia → Jepang</option>
                  <option value="Ekspedisi internasional">{lang === 'id' ? 'Ekspedisi internasional' : lang === 'en' ? 'International shipping' : '国際配送'}</option>
                  <option value="Lainnya">{lang === 'id' ? 'Lainnya / belum yakin' : lang === 'en' ? 'Other / not sure yet' : 'その他 / まだ未定'}</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">{lang === 'id' ? 'Detail barang' : lang === 'en' ? 'Item details' : '商品の詳細'}</label>
                <textarea id="contact-message" name="message" placeholder={lang === 'id' ? 'Contoh: link barang, jumlah, perkiraan berat, dan kota tujuan' : lang === 'en' ? 'Example: item link, quantity, estimated weight, and destination' : '例：商品リンク、数量、予想重量、配送先'} rows={4} required></textarea>
              </div>
              <button type="submit" className="submit-button">
                <Send size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                {lang === 'id' ? 'Lanjut ke WhatsApp' : lang === 'en' ? 'Continue on WhatsApp' : 'WhatsAppで続ける'}
              </button>
              <small className="form-privacy">{lang === 'id' ? 'Data hanya digunakan untuk membantu konsultasi kamu.' : lang === 'en' ? 'Your details are only used to assist your consultation.' : '入力情報はご相談対応のみに使用します。'}</small>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
