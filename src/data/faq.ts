import { FaqItem } from '../types';

const FAQ_DATA: Record<string, FaqItem[]> = {
  id: [
    {
      question: 'Apa itu layanan Jastip Handcarry Jepang ⇄ Indonesia?',
      answer: 'Jastip Handcarry adalah layanan titip beli maupun titip bawa barang antara Jepang dan Indonesia yang dibawa langsung oleh tim kami di dalam koper/bagasi pribadi saat penerbangan. Prosesnya lebih cepat, aman dari risiko cargo, dan umumnya sudah all-in.',
    },
    {
      question: 'Berapa lama waktu pengiriman Jastip Handcarry?',
      answer: 'Penerbangan rutin kami berjalan 2–5 kali setiap bulan. Barang tiba di Indonesia atau Jepang segera setelah tim kami mendarat, lalu diteruskan ke alamat penerima dalam 1–3 hari kerja.',
    },
    {
      question: 'Apakah pengiriman bisa dipantau?',
      answer: 'Ya, tim kami akan memberikan update status secara personal mulai dari pembelian atau penerimaan barang di warehouse, keberangkatan flight, hingga paket tiba di tangan Anda.',
    },
    {
      question: 'Bagaimana dengan urusan pajak dan bea cukai?',
      answer: 'Untuk Jastip Handcarry, biaya biasanya sudah all-in karena kami mengurusnya sebagai barang bawaan pribadi (selama masih dalam batas kuota dan jenis barang yang diizinkan).',
    },
    {
      question: 'Apakah ada batasan barang yang bisa dikirim?',
      answer: 'Ya, kami tidak melayani pengiriman barang terlarang seperti narkoba, senjata, bahan mudah meledak, aerosol, hewan hidup, tanaman, dan barang ilegal lainnya. Ukuran barang juga menyesuaikan kapasitas koper/bagasi.',
    },
    {
      question: 'Bagaimana sistem pembayaran?',
      answer: 'Kami menerima pembayaran melalui transfer bank dan e-wallet. Untuk layanan titip beli tersedia sistem DP 50% di awal (kecuali kesepakatan khusus) dengan pelunasan sebelum pengiriman.',
    },
    {
      question: 'Bagaimana sistem perhitungan dan pembulatan berat barang?',
      answer: 'Untuk Jastip Handcarry, berat dihitung per kilogram (minimum charge 1 kg) dan dibulatkan ke atas per kelipatan 0,5 kg (contoh: 1,2 kg dihitung 1,5 kg, 1,7 kg dihitung 2 kg).',
    },
    {
      question: 'Mengapa harga Jastip Handcarry memiliki rentang minimum dan maksimum (min-max)?',
      answer: 'Harga Jastip Handcarry bersifat fluktuatif karena sangat bergantung pada biaya operasional, terutama harga tiket pesawat tim kami. Saat harga tiket sedang promo atau murah, kami bisa memberikan harga batas bawah (min), namun saat tiket pesawat sedang mahal (bisa karena musim liburan, ketersediaan kursi, atau momen tertentu lainnya), harga akan menyesuaikan ke batas atas (max).',
    },
  ],
  en: [
    {
      question: 'What is the Japan ⇄ Indonesia Jastip Handcarry service?',
      answer: 'Jastip Handcarry is a personal shopper and carry-on delivery service between Japan and Indonesia where items are brought directly by our team in personal luggage during flights. It is faster, safer from cargo risks, and usually all-in.',
    },
    {
      question: 'How long does Jastip Handcarry delivery take?',
      answer: 'We operate 2–5 scheduled flights per month. Items arrive in Indonesia or Japan as soon as our team lands, then are forwarded to your address within 1–3 business days.',
    },
    {
      question: 'Can the shipment be tracked?',
      answer: 'Yes, our team provides personal status updates from item purchase or warehouse receipt, flight departure, until your package arrives.',
    },
    {
      question: 'What about taxes and customs?',
      answer: 'For Jastip Handcarry, the cost is usually all-in as we handle it as personal luggage (within permitted quotas and item types).',
    },
    {
      question: 'Are there limitations on items that can be carried?',
      answer: 'Yes, we do not accept prohibited items such as drugs, weapons, explosives, aerosols, live animals, plants, and other illegal goods. Item dimensions are also subject to suitcase/luggage capacity.',
    },
    {
      question: 'What is the payment system like?',
      answer: 'We accept payments via bank transfer and e-wallets. For buy-for-me requests, a 50% DP (down payment) system is available (unless agreed otherwise) with final settlement before dispatch.',
    },
    {
      question: 'How is the weight calculated and rounded?',
      answer: 'For Jastip Handcarry, weight is calculated per kilogram (1 kg minimum charge) and rounded up to the nearest 0.5 kg interval (e.g., 1.2 kg is calculated as 1.5 kg, 1.7 kg as 2 kg).',
    },
    {
      question: 'Why is there a min-max price range for Jastip Handcarry?',
      answer: 'Jastip Handcarry prices fluctuate because they are highly dependent on operational costs, especially airline ticket prices. When ticket prices are on promo or low, we can offer the minimum rate. However, when flight tickets are expensive (not only during peak holiday seasons, but also depending on seat availability or other specific moments), the price will adjust toward the maximum rate.',
    },
  ],
  jp: [
    {
      question: '日本⇄インドネシアのJastip Handcarry（手荷物代行）とは何ですか？',
      answer: 'Jastip Handcarryは、日本とインドネシア間で当社のチームがフライト時の個人用手荷物として商品を直接持ち込む買い物代行・持ち込みサービスです。貨物リスクがなく迅速で、通常はオールイン料金です。',
    },
    {
      question: 'ハンドキャリーの配送にはどのくらいの時間がかかりますか？',
      answer: '月に2〜5回の定期便を運航しています。チームが日本またはインドネシアに到着次第、1〜3営業日以内にご指定の住所へ国内配送します。',
    },
    {
      question: '配送状況を確認できますか？',
      answer: 'はい、商品の購入・倉庫での受領からフライト出発、ご到着まで、チームが個別に進捗をアップデートいたします。',
    },
    {
      question: '税金や関税についてはどうなりますか？',
      answer: 'Jastip Handcarryの場合、個人用手荷物として処理するため（免税範囲および許可品目内）、通常はオールイン価格となっています。',
    },
    {
      question: '持ち込み・発送できないものはありますか？',
      answer: 'はい、麻薬、武器、爆発物、エアゾール類、生きている動物、植物、その他の違法品はお取り扱いできません。また、スーツケース・手荷物の容量内に限られます。',
    },
    {
      question: '支払い方法はどうなっていますか？',
      answer: '銀行振込・電子マネーに対応しています。買い付け代行の場合は原則50%の前払い（DP）をご利用いただけ、残金は発送前にお支払いいただきます。',
    },
    {
      question: '荷物の重量計算と切り上げはどうなりますか？',
      answer: 'Jastip Handcarryは最低料金1kgから、0.5kg単位で切り上げて計算します（例：1.2kgは1.5kg、1.7kgは2kgとして計算）。',
    },
    {
      question: 'なぜJastip Handcarryの価格には最小・最大（min-max）の幅があるのですか？',
      answer: 'Jastip Handcarryの料金は、航空券の価格などの運営コストに大きく左右されるため、変動制となっています。航空券がプロモーションなどで安い時期は最小料金（min）で提供できますが、航空券が高騰する時期（旅行シーズンだけでなく、空席状況や特定の時期など）は最大料金（max）に近い設定となります。',
    },
  ],
};

export const getFaqData = (lang: string = 'id'): FaqItem[] =>
  FAQ_DATA[lang] || FAQ_DATA['id'];
