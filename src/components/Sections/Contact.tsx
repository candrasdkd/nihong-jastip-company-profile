import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon } from '../UI/Icons';

interface ContactProps {
  lang: string;
  submitContactToWhatsApp: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Contact: React.FC<ContactProps> = ({ lang, submitContactToWhatsApp }) => {
  return (
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
                  rows={5}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">{lang === 'id' ? 'Kirim Pesan' : lang === 'en' ? 'Send Message' : 'メッセージを送る'}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
