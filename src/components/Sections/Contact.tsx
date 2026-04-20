import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook } from 'lucide-react';

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
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>{lang === 'id' ? 'Hubungi Kami' : lang === 'en' ? 'Contact Us' : 'お問い合わせ'}</h2>
          <p>{lang === 'id' ? 'Tim customer service kami siap membantu 7 hari seminggu' : lang === 'en' ? 'Our customer service team is ready to help 7 days a week' : 'カスタマーサービスチームが週7日ご対応いたします'}</p>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>{lang === 'id' ? 'Informasi Kontak' : lang === 'en' ? 'Contact Information' : '連絡先情報'}</h3>
            
            <div className="contact-item">
              <div className="contact-icon"><Mail size={20} /></div>
              <div>
                <strong>Email</strong>
                <p>jastipnihong@gmail.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><Phone size={20} /></div>
              <div>
                <strong>WhatsApp</strong>
                <p>+62 815-7162-517</p>
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
            <h3>{lang === 'id' ? 'Kirim Pesan' : lang === 'en' ? 'Send Message' : 'メッセージを送る'}</h3>
            <form onSubmit={submitContactToWhatsApp} noValidate>
              <div className="form-group">
                <input name="name" type="text" placeholder={lang === 'id' ? 'Nama Lengkap' : lang === 'en' ? 'Full Name' : '氏名'} required />
              </div>
              <div className="form-group">
                <input name="phone" type="tel" placeholder={lang === 'id' ? 'Nomor Telepon' : lang === 'en' ? 'Phone Number' : '電話番号'} required />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder={lang === 'id' ? 'Detail pesan atau pertanyaan Anda' : lang === 'en' ? 'Details of your message or question' : 'メッセージの詳細'} rows={4} required></textarea>
              </div>
              <button type="submit" className="submit-button">
                <Send size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                {lang === 'id' ? 'Kirim Pesan' : lang === 'en' ? 'Send Message' : 'メッセージを送る'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
