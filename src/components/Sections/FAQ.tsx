import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Language, FaqItem } from '../../types';

interface FAQProps {
  lang: Language;
  faqData: FaqItem[];
  activeFaqs: number[];
  toggleFaq: (index: number) => void;
}

const FAQ: React.FC<FAQProps> = ({ lang, faqData, activeFaqs, toggleFaq }) => {
  return (
    <section id="faq" className="faq">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>{lang === 'id' ? 'Pertanyaan Umum' : lang === 'en' ? 'Frequently Asked Questions' : 'よくある質問'}</h2>
          <p>{lang === 'id' ? 'Semua yang perlu Anda ketahui tentang layanan kami' : lang === 'en' ? 'Everything you need to know about our services' : '当社のサービスについて知っておくべきことすべて'}</p>
        </motion.div>

        <div className="faq-container">
          {faqData.map((item, index) => {
            const isOpen = activeFaqs.includes(index);
            return (
              <motion.div 
                key={index} 
                className={`faq-item ${isOpen ? 'active' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <h4>{item.question}</h4>
                  <div className="faq-toggle-icon">
                    <ChevronDown size={20} />
                  </div>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="faq-answer"
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
