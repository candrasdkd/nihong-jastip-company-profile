import React from 'react';
import { motion, Variants } from 'framer-motion';
import { MessageSquareText, BadgeCheck, Plane, House } from 'lucide-react';
import { Language } from '../../types';

interface ProcessProps {
  lang: Language;
}

const Process: React.FC<ProcessProps> = ({ lang }) => {
  const steps = lang === 'id'
    ? [
        { title: 'Kirim detail barang', text: 'Kirim link, foto, jumlah, dan tujuan melalui WhatsApp.', icon: MessageSquareText },
        { title: 'Terima rincian biaya', text: 'Kami konfirmasi ketersediaan, estimasi, dan total biaya.', icon: BadgeCheck },
        { title: 'Kami beli & kirim', text: 'Barang dibeli, dicek, dikemas, lalu berangkat sesuai jadwal.', icon: Plane },
        { title: 'Tiba di alamatmu', text: 'Paket diteruskan ke alamat tujuan dan bisa kamu pantau.', icon: House },
      ]
    : lang === 'en'
      ? [
          { title: 'Send item details', text: 'Share the link, photo, quantity, and destination via WhatsApp.', icon: MessageSquareText },
          { title: 'Get a clear quote', text: 'We confirm availability, timing, and the total cost.', icon: BadgeCheck },
          { title: 'We buy & ship', text: 'Your items are purchased, checked, packed, and dispatched.', icon: Plane },
          { title: 'Delivered to you', text: 'The parcel is forwarded to your address with tracking.', icon: House },
        ]
      : [
          { title: '商品情報を送る', text: 'リンク・写真・数量・配送先をWhatsAppでお送りください。', icon: MessageSquareText },
          { title: 'お見積りを確認', text: '在庫、スケジュール、合計金額をご案内します。', icon: BadgeCheck },
          { title: '購入・発送', text: '購入後に検品・梱包し、スケジュールに沿って発送します。', icon: Plane },
          { title: 'ご自宅に到着', text: '追跡情報とともに、ご指定の住所までお届けします。', icon: House },
        ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  return (
    <section id="process" className="process">
      <div className="container">
        <div className="section-heading split-heading">
          <div>
            <span className="eyebrow">{lang === 'id' ? 'Mudah dari awal' : lang === 'en' ? 'Simple from day one' : 'はじめから簡単'}</span>
            <h2>{lang === 'id' ? 'Empat langkah, lalu beres.' : lang === 'en' ? 'Four steps. Done.' : '4ステップで完了。'}</h2>
          </div>
          <p>{lang === 'id' ? 'Tidak perlu bingung soal pembelian, konsolidasi, atau pengiriman internasional—kami bantu di setiap tahap.' : lang === 'en' ? 'No need to figure out purchasing, consolidation, or international shipping on your own.' : '購入・同梱・国際配送まで、すべてのステップをサポートします。'}</p>
        </div>

        <motion.div className="process-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {steps.map((step, index) => (
            <motion.article className="process-step" variants={itemVariants} key={step.title}>
              <div className="step-top">
                <span className="step-icon"><step.icon size={22} /></span>
                <span className="step-number">0{index + 1}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
