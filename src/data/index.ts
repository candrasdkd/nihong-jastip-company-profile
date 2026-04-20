import { JastipData, ExpeditionCountry, FaqItem, Language } from '../types';

export const getJastipData = (lang: string = 'id'): JastipData => {
  const data: Record<string, JastipData> = {
    id: {
      title: "Via Jastip",
      routes: [
        { route: "Jepang → Indonesia", price: "1300¥ - 1700¥ / kg" },
        { route: "Indonesia → Jepang", price: "1100¥ - 1500¥ / kg" }
      ]
    },
    en: {
      title: "Via Jastip",
      routes: [
        { route: "Japan → Indonesia", price: "1300¥ - 1700¥ / kg" },
        { route: "Indonesia → Japan", price: "1100¥ - 1500¥ / kg" }
      ]
    },
    jp: {
      title: "買い物代行",
      routes: [
        { route: "日本 → インドネシア", price: "1kgあたり 1300¥ - 1700¥" },
        { route: "インドネシア → 日本", price: "1kgあたり 1100¥ - 1500¥" }
      ]
    }
  };
  return data[lang] || data['id'];
};

export const getExpeditionData = (lang: string = 'id'): ExpeditionCountry[] => {
  const data: Record<string, ExpeditionCountry[]> = {
    id: [
      { country: "Singapura", estimates: "Estimasi 7 hari", prices: [{ range: "1-5 kg", price: "95.000/kg" }, { range: "6-10 kg", price: "85.000/kg" }, { range: "11-20 kg", price: "75.000/kg" }, { range: "20-30 kg", price: "60.000/kg" }] },
      { country: "Brunei", estimates: "Estimasi 7 hari", prices: [{ range: "1-5 kg", price: "165.000/kg" }, { range: "6-10 kg", price: "155.000/kg" }, { range: "20-30 kg", price: "150.000/kg" }] },
      { country: "Malaysia", estimates: "Estimasi 7 hari", prices: [{ range: "1-10 kg", price: "95.000/kg" }, { range: "11-25 kg", price: "85.000/kg" }, { range: "26-30 kg", price: "80.000/kg" }] },
      { country: "Malaysia Timur (Sabah Serawak)", estimates: "Estimasi 7 hari", prices: [{ range: "1-10 kg", price: "115.000/kg" }, { range: "11-25 kg", price: "105.000/kg" }, { range: "26-30 kg", price: "100.000/kg" }] },
      { country: "Hongkong", estimates: "Estimasi 7 hari", prices: [{ range: "1-10 kg", price: "155.000/kg" }, { range: "11-25 kg", price: "145.000/kg" }, { range: "26-30 kg", price: "140.000/kg" }] },
      { country: "Taiwan", estimates: "Estimasi 7 hari", prices: [{ range: "1-10 kg", price: "105.000/kg" }, { range: "11-20 kg", price: "95.000/kg" }, { range: "21-30 kg", price: "90.000/kg" }] },
      { country: "Jepang", estimates: "", prices: [{ range: "0,5 kg", price: "2.500¥/kg" }, { range: "1 kg", price: "3.700¥/kg" }, { range: "2-3 kg", price: "2.600¥/kg" }, { range: "4-8 kg", price: "2.100¥/kg" }, { range: "9-12 kg", price: "1.900¥/kg" }, { range: "13-20 kg", price: "1.800¥/kg" }, { range: "21-30 kg", price: "1.600¥/kg" }] },
      { country: "Arab Saudi", estimates: "Estimasi 7 hari", prices: [{ range: "1 kg", price: "395.000" }, { range: "2 kg", price: "495.000" }, { range: "3 kg", price: "610.000" }, { range: "4 kg", price: "740.000" }, { range: "5 kg", price: "850.000" }, { range: "6 kg", price: "960.000" }, { range: "7 kg", price: "1.100.000" }, { range: "8 kg", price: "1.200.000" }, { range: "9 kg", price: "1.300.000" }, { range: "10 kg", price: "1.400.000" }, { range: "11-30 kg", price: "Per kg tambahan 100.000" }] }
    ],
    en: [
      { country: "Singapore", estimates: "Estimated 7 days", prices: [{ range: "1-5 kg", price: "95.000/kg" }, { range: "6-10 kg", price: "85.000/kg" }, { range: "11-20 kg", price: "75.000/kg" }, { range: "20-30 kg", price: "60.000/kg" }] },
      { country: "Brunei", estimates: "Estimated 7 days", prices: [{ range: "1-5 kg", price: "165.000/kg" }, { range: "6-10 kg", price: "155.000/kg" }, { range: "20-30 kg", price: "150.000/kg" }] },
      { country: "Malaysia", estimates: "Estimated 7 days", prices: [{ range: "1-10 kg", price: "95.000/kg" }, { range: "11-25 kg", price: "85.000/kg" }, { range: "26-30 kg", price: "80.000/kg" }] },
      { country: "East Malaysia (Sabah Sarawak)", estimates: "Estimated 7 days", prices: [{ range: "1-10 kg", price: "115.000/kg" }, { range: "11-25 kg", price: "105.000/kg" }, { range: "26-30 kg", price: "100.000/kg" }] },
      { country: "Hong Kong", estimates: "Estimated 7 days", prices: [{ range: "1-10 kg", price: "155.000/kg" }, { range: "11-25 kg", price: "145.000/kg" }, { range: "26-30 kg", price: "140.000/kg" }] },
      { country: "Taiwan", estimates: "Estimated 7 days", prices: [{ range: "1-10 kg", price: "105.000/kg" }, { range: "11-20 kg", price: "95.000/kg" }, { range: "21-30 kg", price: "90.000/kg" }] },
      { country: "Japan", estimates: "", prices: [{ range: "0.5 kg", price: "2.500¥/kg" }, { range: "1 kg", price: "3.700¥/kg" }, { range: "2-3 kg", price: "2.600¥/kg" }, { range: "4-8 kg", price: "2.100¥/kg" }, { range: "9-12 kg", price: "1.900¥/kg" }, { range: "13-20 kg", price: "1.800¥/kg" }, { range: "21-30 kg", price: "1.600¥/kg" }] },
      { country: "Saudi Arabia", estimates: "Estimated 7 days", prices: [{ range: "1 kg", price: "395.000" }, { range: "2 kg", price: "495.000" }, { range: "3 kg", price: "610.000" }, { range: "4 kg", price: "740.000" }, { range: "5 kg", price: "850.000" }, { range: "6 kg", price: "960.000" }, { range: "7 kg", price: "1.100.000" }, { range: "8 kg", price: "1.200.000" }, { range: "9 kg", price: "1.300.000" }, { range: "10 kg", price: "1.400.000" }, { range: "11-30 kg", price: "Additional kg 100.000" }] }
    ],
    jp: [
      { country: "シンガポール", estimates: "推定7日", prices: [{ range: "1-5 kg", price: "95.000/kg" }, { range: "6-10 kg", price: "85.000/kg" }, { range: "11-20 kg", price: "75.000/kg" }, { range: "20-30 kg", price: "60.000/kg" }] },
      { country: "ブルネイ", estimates: "推定7日", prices: [{ range: "1-5 kg", price: "165.000/kg" }, { range: "6-10 kg", price: "155.000/kg" }, { range: "20-30 kg", price: "150.000/kg" }] },
      { country: "マレーシア", estimates: "推定7日", prices: [{ range: "1-10 kg", price: "95.000/kg" }, { range: "11-25 kg", price: "85.000/kg" }, { range: "26-30 kg", price: "80.000/kg" }] },
      { country: "東マレーシア（サバ・サラワク）", estimates: "推定7日", prices: [{ range: "1-10 kg", price: "115.000/kg" }, { range: "11-25 kg", price: "105.000/kg" }, { range: "26-30 kg", price: "100.000/kg" }] },
      { country: "香港", estimates: "推定7日", prices: [{ range: "1-10 kg", price: "155.000/kg" }, { range: "11-25 kg", price: "145.000/kg" }, { range: "26-30 kg", price: "140.000/kg" }] },
      { country: "台湾", estimates: "推定7日", prices: [{ range: "1-10 kg", price: "105.000/kg" }, { range: "11-20 kg", price: "95.000/kg" }, { range: "21-30 kg", price: "90.000/kg" }] },
      { country: "日本", estimates: "", prices: [{ range: "0.5 kg", price: "1kgあたり 2.500¥" }, { range: "1 kg", price: "1kgあたり 3.700¥" }, { range: "2-3 kg", price: "1kgあたり 2.600¥" }, { range: "4-8 kg", price: "1kgあたり 2.100¥" }, { range: "9-12 kg", price: "1kgあたり 1.900¥" }, { range: "13-20 kg", price: "1kgあたり 1.800¥" }, { range: "21-30 kg", price: "1kgあたり 1.600¥" }] },
      { country: "サウジアラビア", estimates: "推定7日", prices: [{ range: "1 kg", price: "395.000" }, { range: "2 kg", price: "495.000" }, { range: "3 kg", price: "610.000" }, { range: "4 kg", price: "740.000" }, { range: "5 kg", price: "850.000" }, { range: "6 kg", price: "960.000" }, { range: "7 kg", price: "1.100.000" }, { range: "8 kg", price: "1.200.000" }, { range: "9 kg", price: "1.300.000" }, { range: "10 kg", price: "1.400.000" }, { range: "11-30 kg", price: "追加1kgあたり 100.000" }] }
    ]
  };
  return data[lang] || data['id'];
};

export const getFaqData = (lang: string = 'id'): FaqItem[] => {
  const data: Record<string, FaqItem[]> = {
    id: [
      {
        question: "Apa perbedaan antara Jastip Handcarry dan Via Ekspedisi?",
        answer: "Jastip Handcarry adalah barang yang dibawa langsung oleh tim kami di dalam koper/bagasi pribadi saat traveling, sehingga lebih cepat, aman dari risiko cargo, dan biasanya harga sudah all-in termasuk pajak. Sedangkan Via Ekspedisi adalah pengiriman melalui jasa kurir/pos internasional yang cocok untuk barang berukuran besar, kapasitas banyak, dan menjangkau hingga 64 negara dengan bukti resi pengiriman."
      },
      {
        question: "Berapa lama waktu pengiriman untuk masing-masing metode?",
        answer: "Untuk Jastip Handcarry, barang tiba segera setelah tim kami mendarat di negara tujuan. Untuk Via Ekspedisi, estimasi jalur udara adalah 1-3 minggu, sedangkan jalur laut memakan waktu 1-2 bulan."
      },
      {
        question: "Apakah pengiriman bisa dilacak?",
        answer: "Ya, untuk layanan Via Ekspedisi kami menyediakan nomor resi atau bukti tanda terima (fisik/digital) dari jasa kurir. Untuk Jastip Handcarry, tim kami akan memberikan update status secara personal mulai dari pembelian barang hingga ketibaan."
      },
      {
        question: "Bagaimana dengan urusan pajak dan bea cukai?",
        answer: "Untuk Jastip Handcarry, biaya biasanya sudah all-in karena kami mengurusnya sebagai barang bawaan pribadi (selama di bawah kuota). Untuk Via Ekspedisi, pajak mengikuti ketentuan bea cukai yang berlaku di negara tujuan."
      },
      {
        question: "Apakah ada batasan barang yang bisa dikirim?",
        answer: "Ya, kami tidak melayani pengiriman barang terlarang seperti narkoba, senjata, bahan mudah meledak, hewan hidup, dan barang ilegal lainnya. Via Ekspedisi lebih fleksibel untuk barang ukuran besar, sementara Handcarry terbatas pada kapasitas koper."
      },
      {
        question: "Bagaimana sistem pembayaran?",
        answer: "Kami menerima pembayaran melalui transfer bank, e-wallet, dan untuk layanan jastip bisa melalui sistem DP (down payment) dengan pelunasan sebelum pengiriman. Detail pembayaran akan disampaikan setelah konfirmasi pesanan."
      },
      {
        question: "Bagaimana sistem perhitungan dan pembulatan berat barang?",
        answer: "Untuk Via Ekspedisi, setiap kelebihan berat sekecil apapun akan dibulatkan ke atas ke 1 kg berikutnya (contoh: 1,1 kg dihitung 2 kg, 0,2 kg dihitung 1 kg). Untuk Jastip Handcarry, berat dibulatkan ke atas per kelipatan 0,5 kg (contoh: 1,2 kg dihitung 1,5 kg, 1,7 kg dihitung 2 kg)."
      }
    ],
    en: [
      {
        question: "What is the difference between Jastip Handcarry and Via Expedition?",
        answer: "Jastip Handcarry involves items brought directly by our team in personal luggage while traveling, making it faster, safer from cargo risks, and usually all-in including taxes. Via Expedition is shipping through international courier/postal services, suitable for large items, high volume, and reaches up to 64 countries with tracking receipts."
      },
      {
        question: "How long does shipping take for each method?",
        answer: "For Jastip Handcarry, items arrive as soon as our team lands in the destination country. For Via Expedition, the estimated time for air freight is 1-3 weeks, while sea freight takes 1-2 months."
      },
      {
        question: "Can the shipment be tracked?",
        answer: "Yes, for Via Expedition services, we provide a tracking number or proof of receipt (physical/digital) from the courier. For Jastip Handcarry, our team will provide personal status updates from purchase to arrival."
      },
      {
        question: "What about taxes and customs?",
        answer: "For Jastip Handcarry, the cost is usually all-in as we handle it as personal luggage (within quotas). For Via Expedition, taxes follow the customs regulations applicable in the destination country."
      },
      {
        question: "Are there limitations on items that can be shipped?",
        answer: "Yes, we do not handle shipments of prohibited items such as drugs, weapons, explosives, live animals, and other illegal goods. Via Expedition is more flexible for large items, while Handcarry is limited to suitcase capacity."
      },
      {
        question: "What is the payment system like?",
        answer: "We accept payments via bank transfer, e-wallets, and for jastip services, a DP (down payment) system with the rest paid before shipment is available. Payment details will be provided upon order confirmation."
      },
      {
        question: "How is the weight calculated and rounded?",
        answer: "For Via Expedition, any excess weight will be rounded up to the next full 1 kg (e.g., 1.1 kg is calculated as 2 kg, 0.2 kg as 1 kg). For Jastip Handcarry, the weight is rounded up to the nearest 0.5 kg interval (e.g., 1.2 kg is calculated as 1.5 kg, 1.7 kg as 2 kg)."
      }
    ],
    jp: [
      {
        question: "Jastip Handcarry（手荷物）とVia Expedition（配送）の違いは何ですか？",
        answer: "Jastip Handcarryは、当社のチームが旅行中に個人用手荷物として直接持ち込むもので、迅速で貨物リスクがなく、通常は税金込みのオールイン価格です。一方、Via Expeditionは国際宅配便/郵便サービスを利用した発送で、大型の商品や大量の発送に適しており、追跡番号付きで64カ国まで対応可能です。"
      },
      {
        question: "それぞれの配送方法でどのくらいの時間がかかりますか？",
        answer: "Jastip Handcarryの場合、チームが目的地の国に着陸次第、商品が到着します。Via Expeditionの場合、航空便の目安は1〜3週間、船便は1〜2ヶ月かかります。"
      },
      {
        question: "配送状況を追跡できますか？",
        answer: "はい、Via Expeditionサービスについては、宅配業者からの追跡番号または受領証（物理/デジタル）を提供します。Jastip Handcarryについては、購入から到着までチームが個別に状況をアップデートします。"
      },
      {
        question: "税金や関税についてはどうなりますか？",
        answer: "Jastip Handcarryの場合、個人用手荷物として処理するため（免税範囲内）、通常はオールイン価格です。Via Expeditionの場合、税金は目的地の国の関税規制に従います。"
      },
      {
        question: "発送できるものに制限はありますか？",
        answer: "はい、麻薬、武器、爆発物、生きている動物、その他の違法な商品などの禁止品目の発送は取り扱いません。Via Expeditionは大型の商品に対して柔軟ですが、Handcarryはスーツケースの容量に制限されます。"
      },
      {
        question: "支払いシステムはどのようになっていますか？",
        answer: "銀行振込、電子マネーによる支払いを受け付けています。買い物代行サービスの場合は、前払い（DP）システムを利用し、残金は発送前にお支払いいただきます。支払いの詳細は注文の確認時に提供されます。"
      },
      {
        question: "荷物の重量計算と切り上げのシステムはどうなっていますか？",
        answer: "配送サービス（Via Expedition）の場合、わずかな超過でも次の1kgに切り上げられます（例：1.1kgは2kg、0.2kgは1kgとして計算）。手荷物代行（Jastip Handcarry）の場合、重量は0.5kg単位で切り上げられます（例：1.2kgは1.5kg、1.7kgは2kgとして計算）。"
      }
    ]
  };
  return data[lang] || data['id'];
};