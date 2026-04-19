import React from 'react';
import { FaqItem } from '../../data';

interface FAQProps {
  lang: string;
  faqData: FaqItem[];
  activeFaqs: number[];
  toggleFaq: (index: number) => void;
}

const FAQ: React.FC<FAQProps> = ({ lang, faqData, activeFaqs, toggleFaq }) => {
  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2>{lang === 'id' ? 'Pertanyaan Umum' : lang === 'en' ? 'Frequently Asked Questions' : 'よくある質問'}</h2>
          <p>{lang === 'id' ? 'Semua yang perlu Anda ketahui tentang layanan kami' : lang === 'en' ? 'Everything you need to know about our services' : '当社のサービスについて知っておくべきことすべて'}</p>
        </div>
        <div className="faq-container">
          {faqData.map((item, index) => (
            <div key={index} className={`faq-item ${activeFaqs.includes(index) ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <h4>{item.question}</h4>
                <span className="faq-toggle">{activeFaqs.includes(index) ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
