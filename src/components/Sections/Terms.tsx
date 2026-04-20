import React from 'react';

import { Language } from '../../types';

interface TermsProps {
  lang: Language;
}

const Terms: React.FC<TermsProps> = ({ lang }) => {
  return (
    <section id="terms" className="terms">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <h2>{lang === 'id' ? 'Syarat & Ketentuan Handcarry' : lang === 'en' ? 'Handcarry Terms & Conditions' : 'ハンドキャリー利用規約'}</h2>
          <p>{lang === 'id' ? 'Mohon dibaca sebelum menggunakan layanan kami' : lang === 'en' ? 'Please read before using our services' : '当社のサービスをご利用になる前にお読みください'}</p>
        </div>

        <div className="terms-grid">
          {/* Jepang → Indonesia */}
          <div className="terms-card" data-aos="fade-right">
            <h3>🇯🇵 → 🇮🇩 {lang === 'id' ? 'Jepang ke Indonesia' : lang === 'en' ? 'Japan to Indonesia' : '日本からインドネシアへ'}</h3>

            <h4>{lang === 'id' ? 'Titip Beli' : lang === 'en' ? 'Buy for Me' : '買い付け依頼'}</h4>
            <ul>
              <li>{lang === 'id' ? 'Full payment / DP 50% di awal (kecuali kesepakatan khusus)' : lang === 'en' ? 'Full payment / 50% DP upfront (unless otherwise agreed)' : '全額支払い / 前払い50%（別途合意がない限り）'}</li>
              <li>{lang === 'id' ? 'Pesanan diproses setelah pembayaran lunas' : lang === 'en' ? 'Orders are processed after payment is complete' : '支払いが完了した後に注文が処理されます'}</li>
            </ul>

            <h4>{lang === 'id' ? 'Titip Bawa' : lang === 'en' ? 'Carry for Me' : '持ち込み依頼'}</h4>
            <ul>
              <li>{lang === 'id' ? 'Barang tersedia di warehouse minimal H-2 sebelum keberangkatan' : lang === 'en' ? 'Items available at warehouse at least D-2 before departure' : '商品は出発の少なくとも2日前に倉庫に到着している必要があります'}</li>
              <li>{lang === 'id' ? 'Termasuk packing bandara, bagasi pesawat, dan dibawa sampai tujuan' : lang === 'en' ? 'Includes airport packing, airplane baggage, and carried to destination' : '空港での梱包、航空機への預け入れ、目的地までの持ち込みが含まれます'}</li>
            </ul>

            <h4>{lang === 'id' ? 'Pengiriman' : lang === 'en' ? 'Shipping' : '発送'}</h4>
            <ul>
              <li>{lang === 'id' ? 'Ongkir domestik setelah landing Jakarta ditanggung penerima' : lang === 'en' ? 'Domestic shipping fee after landing in Jakarta is borne by the recipient' : 'ジャカルタ到着後の国内送料は受取人負担です'}</li>
              <li>{lang === 'id' ? 'Barang dikirim 1–3 hari setelah landing' : lang === 'en' ? 'Items are shipped 1–3 days after landing' : '商品は到着後1〜3日で発送されます'}</li>
              <li>{lang === 'id' ? 'Estimasi tiba 2–3 hari (tergantung flight)' : lang === 'en' ? 'Estimated arrival 2–3 days (depending on flight)' : '到着目安2〜3日（フライトによります）'}</li>
            </ul>

            <h4>{lang === 'id' ? 'Biaya & Kebijakan' : lang === 'en' ? 'Fees & Policies' : '料金とポリシー'}</h4>
            <ul>
              <li>{lang === 'id' ? 'Sistem hitung per kg (dibulatkan ke atas)' : lang === 'en' ? 'Per kg calculation system (rounded up)' : '1kg単位の計算システム（切り上げ）'}</li>
              <li>{lang === 'id' ? 'Minimum charge 1 kg' : lang === 'en' ? 'Minimum charge 1 kg' : '最低料金1kg'}</li>
              <li>{lang === 'id' ? 'Fee bisa nego sesuai kesepakatan' : lang === 'en' ? 'Fee is negotiable upon agreement' : '料金は合意により交渉可能です'}</li>
              <li>{lang === 'id' ? 'Pembatalan setelah dikirim tidak dapat refund' : lang === 'en' ? 'Cancellations after shipping cannot be refunded' : '発送後のキャンセルは返金できません'}</li>
            </ul>
          </div>

          {/* Indonesia → Jepang */}
          <div className="terms-card" data-aos="fade-left">
            <h3>🇮🇩 → 🇯🇵 {lang === 'id' ? 'Indonesia ke Jepang' : lang === 'en' ? 'Indonesia to Japan' : 'インドネシアから日本へ'}</h3>

            <h4>{lang === 'id' ? 'Ketentuan Barang' : lang === 'en' ? 'Item Conditions' : '商品の条件'}</h4>
            <ul>
              <li>{lang === 'id' ? 'Hanya menerima barang yang tidak dilarang' : lang === 'en' ? 'Only accept items that are not prohibited' : '禁止されていない商品のみを受け付けます'}</li>
              <li>{lang === 'id' ? 'Kami berhak menolak barang berbahaya/berisiko' : lang === 'en' ? 'We have the right to refuse dangerous/risky items' : '危険なアイテムを拒否する権利があります'}</li>
              <li>{lang === 'id' ? 'Semua paket diperiksa & dibuka terlebih dahulu demi keamanan' : lang === 'en' ? 'All packages are inspected & opened first for safety' : '安全のため、すべてのパッケージは事前に検査および開封されます'}</li>
            </ul>

            <h4>{lang === 'id' ? 'Warehouse & Tanggung Jawab' : lang === 'en' ? 'Warehouse & Responsibility' : '倉庫と責任'}</h4>
            <ul>
              <li>{lang === 'id' ? 'Tanggung jawab kami setelah barang diterima di warehouse' : lang === 'en' ? 'Our responsibility starts after the item is received at the warehouse' : '当社の責任は、商品が倉庫に到着した後に開始されます'}</li>
              <li>{lang === 'id' ? 'Kerusakan/kehilangan dari ekspedisi lokal bukan tanggung jawab kami' : lang === 'en' ? 'Damage/loss from local expedition is not our responsibility' : '現地の配送業者による破損/紛失は当社の責任ではありません'}</li>
              <li>{lang === 'id' ? 'Berat dihitung termasuk box/kemasan' : lang === 'en' ? 'Weight is calculated including box/packaging' : '重量は箱/梱包を含めて計算されます'}</li>
            </ul>

            <h4>{lang === 'id' ? 'Pengiriman' : lang === 'en' ? 'Shipping' : '発送'}</h4>
            <ul>
              <li>{lang === 'id' ? 'Alamat wajib dicantumkan sebelum keberangkatan' : lang === 'en' ? 'Address must be provided before departure' : '出発前に住所を必ず提供する必要があります'}</li>
              <li>{lang === 'id' ? 'Dikirim 1–3 hari setelah landing Jepang/Korea/Indonesia' : lang === 'en' ? 'Shipped 1–3 days after landing in Japan/Korea/Indonesia' : '日本/韓国/インドネシア到着後1〜3日で発送'}</li>
              <li>{lang === 'id' ? 'Estimasi 2–4 hari tergantung flight' : lang === 'en' ? 'Estimate 2–4 days depending on flight' : 'フライトにより推定2〜4日'}</li>
              <li>{lang === 'id' ? 'Jika delay penerbangan, waktu pengiriman menyesuaikan' : lang === 'en' ? 'If flight is delayed, delivery time will adjust' : 'フライトが遅延した場合、配送時間は調整されます'}</li>
            </ul>

            <h4>{lang === 'id' ? 'Pembayaran' : lang === 'en' ? 'Payment' : '支払い'}</h4>
            <ul>
              <li>{lang === 'id' ? 'DP 50% untuk titip beli (kecuali kesepakatan)' : lang === 'en' ? '50% DP for buy for me (unless otherwise agreed)' : '買い付け依頼の50％のDP（別途合意がない限り）'}</li>
              <li>{lang === 'id' ? 'Sistem per kg dibulatkan ke atas' : lang === 'en' ? 'Per kg system rounded up' : '1kg単位のシステム（切り上げ）'}</li>
              <li>{lang === 'id' ? 'Minimum charge 1 kg' : lang === 'en' ? 'Minimum charge 1 kg' : '最低料金1kg'}</li>
              <li>{lang === 'id' ? 'Penerbangan rutin 2–5 kali per bulan' : lang === 'en' ? 'Routine flights 2–5 times a month' : '月に2〜5回の定期便'}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
