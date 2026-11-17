import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Language, FaqItem } from '../../types';

interface FAQProps {
  lang: Language;
  faqData: FaqItem[];
  activeFaqs: number[];
  toggleFaq: (index: number) => void;
  openWhatsApp?: () => void;
}

const FAQ: React.FC<FAQProps> = ({ lang, faqData, activeFaqs, toggleFaq, openWhatsApp }) => {
  const t = (id: string, en: string, jp: string) => (lang === 'id' ? id : lang === 'en' ? en : jp);

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="faq-side">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.4 }}
          >
            <span className="eyebrow">{t('Sering ditanyakan', 'Common questions', 'よくあるご質問')}</span>
            <h2>{t('Pertanyaan Umum seputar Jastip Jepang', 'Frequently Asked Questions', 'よくある質問')}</h2>
            <p>{t('Semua yang perlu Anda ketahui tentang layanan kami', 'Everything you need to know about our services', '当社のサービスについて知っておくべきことすべて')}</p>
          </motion.div>

          {openWhatsApp && (
            <motion.div
              className="faq-help"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <strong>{t('Pertanyaanmu belum ada?', "Can't find your question?", 'お探しの質問がありませんか？')}</strong>
              <span>{t('Tanya langsung, kami balas di WhatsApp.', 'Ask us directly, we reply on WhatsApp.', 'WhatsAppで直接ご質問ください。')}</span>
              <button onClick={openWhatsApp}><MessageCircle size={18} />{t('Tanya via WhatsApp', 'Ask on WhatsApp', 'WhatsAppで質問')}</button>
            </motion.div>
          )}
        </div>

        <div className="faq-container">
          {faqData.map((item, index) => {
            const isOpen = activeFaqs.includes(index);
            return (
              <motion.div
                key={index}
                className={`faq-item ${isOpen ? 'active' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ delay: Math.min(index, 4) * 0.06 }}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="faq-num">{String(index + 1).padStart(2, '0')}</span>
                  <h4>{item.question}</h4>
                  <div className="faq-toggle-icon">
                    <ChevronDown size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="faq-answer"
                      id={`faq-answer-${index}`}
                    >
                      <div className="faq-answer-inner">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
