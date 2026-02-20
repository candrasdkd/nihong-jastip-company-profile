export const getJastipData = (lang = 'id') => {
    const data = {
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

export const getExpeditionData = (lang = 'id') => {
    const data = {
        id: [
            {
                country: "Singapura",
                estimates: "Estimasi 7 hari",
                prices: [
                    { range: "1-5 kg", price: "95.000/kg" },
                    { range: "6-10 kg", price: "85.000/kg" },
                    { range: "11-20 kg", price: "75.000/kg" },
                    { range: "20-30 kg", price: "60.000/kg" }
                ]
            },
            {
                country: "Brunei",
                estimates: "Estimasi 7 hari",
                prices: [
                    { range: "1-5 kg", price: "165.000/kg" },
                    { range: "6-10 kg", price: "155.000/kg" },
                    { range: "20-30 kg", price: "150.000/kg" }
                ]
            },
            {
                country: "Malaysia",
                estimates: "Estimasi 7 hari",
                prices: [
                    { range: "1-10 kg", price: "95.000/kg" },
                    { range: "11-25 kg", price: "85.000/kg" },
                    { range: "26-30 kg", price: "80.000/kg" }
                ]
            },
            {
                country: "Malaysia Timur (Sabah Serawak)",
                estimates: "Estimasi 7 hari",
                prices: [
                    { range: "1-10 kg", price: "115.000/kg" },
                    { range: "11-25 kg", price: "105.000/kg" },
                    { range: "26-30 kg", price: "100.000/kg" }
                ]
            },
            {
                country: "Hongkong",
                estimates: "Estimasi 7 hari",
                prices: [
                    { range: "1-10 kg", price: "155.000/kg" },
                    { range: "11-25 kg", price: "145.000/kg" },
                    { range: "26-30 kg", price: "140.000/kg" }
                ]
            },
            {
                country: "Taiwan",
                estimates: "Estimasi 7 hari",
                prices: [
                    { range: "1-10 kg", price: "105.000/kg" },
                    { range: "11-20 kg", price: "95.000/kg" },
                    { range: "21-30 kg", price: "90.000/kg" }
                ]
            },
            {
                country: "Jepang",
                estimates: "",
                prices: [
                    { range: "0,5 kg", price: "2.500¥/kg" },
                    { range: "1 kg", price: "3.700¥/kg" },
                    { range: "2-3 kg", price: "2.600¥/kg" },
                    { range: "4-8 kg", price: "2.100¥/kg" },
                    { range: "9-12 kg", price: "1.900¥/kg" },
                    { range: "13-20 kg", price: "1.800¥/kg" },
                    { range: "21-30 kg", price: "1.600¥/kg" }
                ]
            },
            {
                country: "Arab Saudi",
                estimates: "Estimasi 7 hari",
                prices: [
                    { range: "1 kg", price: "395.000" },
                    { range: "2 kg", price: "495.000" },
                    { range: "3 kg", price: "610.000" },
                    { range: "4 kg", price: "740.000" },
                    { range: "5 kg", price: "850.000" },
                    { range: "6 kg", price: "960.000" },
                    { range: "7 kg", price: "1.100.000" },
                    { range: "8 kg", price: "1.200.000" },
                    { range: "9 kg", price: "1.300.000" },
                    { range: "10 kg", price: "1.400.000" },
                    { range: "11-30 kg", price: "Per kg tambahan 100.000" }
                ]
            }
        ],
        en: [
            {
                country: "Singapore",
                estimates: "Estimated 7 days",
                prices: [
                    { range: "1-5 kg", price: "95.000/kg" },
                    { range: "6-10 kg", price: "85.000/kg" },
                    { range: "11-20 kg", price: "75.000/kg" },
                    { range: "20-30 kg", price: "60.000/kg" }
                ]
            },
            {
                country: "Brunei",
                estimates: "Estimated 7 days",
                prices: [
                    { range: "1-5 kg", price: "165.000/kg" },
                    { range: "6-10 kg", price: "155.000/kg" },
                    { range: "20-30 kg", price: "150.000/kg" }
                ]
            },
            {
                country: "Malaysia",
                estimates: "Estimated 7 days",
                prices: [
                    { range: "1-10 kg", price: "95.000/kg" },
                    { range: "11-25 kg", price: "85.000/kg" },
                    { range: "26-30 kg", price: "80.000/kg" }
                ]
            },
            {
                country: "East Malaysia (Sabah Sarawak)",
                estimates: "Estimated 7 days",
                prices: [
                    { range: "1-10 kg", price: "115.000/kg" },
                    { range: "11-25 kg", price: "105.000/kg" },
                    { range: "26-30 kg", price: "100.000/kg" }
                ]
            },
            {
                country: "Hong Kong",
                estimates: "Estimated 7 days",
                prices: [
                    { range: "1-10 kg", price: "155.000/kg" },
                    { range: "11-25 kg", price: "145.000/kg" },
                    { range: "26-30 kg", price: "140.000/kg" }
                ]
            },
            {
                country: "Taiwan",
                estimates: "Estimated 7 days",
                prices: [
                    { range: "1-10 kg", price: "105.000/kg" },
                    { range: "11-20 kg", price: "95.000/kg" },
                    { range: "21-30 kg", price: "90.000/kg" }
                ]
            },
            {
                country: "Japan",
                estimates: "",
                prices: [
                    { range: "0.5 kg", price: "2.500¥/kg" },
                    { range: "1 kg", price: "3.700¥/kg" },
                    { range: "2-3 kg", price: "2.600¥/kg" },
                    { range: "4-8 kg", price: "2.100¥/kg" },
                    { range: "9-12 kg", price: "1.900¥/kg" },
                    { range: "13-20 kg", price: "1.800¥/kg" },
                    { range: "21-30 kg", price: "1.600¥/kg" }
                ]
            },
            {
                country: "Saudi Arabia",
                estimates: "Estimated 7 days",
                prices: [
                    { range: "1 kg", price: "395.000" },
                    { range: "2 kg", price: "495.000" },
                    { range: "3 kg", price: "610.000" },
                    { range: "4 kg", price: "740.000" },
                    { range: "5 kg", price: "850.000" },
                    { range: "6 kg", price: "960.000" },
                    { range: "7 kg", price: "1.100.000" },
                    { range: "8 kg", price: "1.200.000" },
                    { range: "9 kg", price: "1.300.000" },
                    { range: "10 kg", price: "1.400.000" },
                    { range: "11-30 kg", price: "Additional kg 100.000" }
                ]
            }
        ],
        jp: [
            {
                country: "シンガポール",
                estimates: "推定7日",
                prices: [
                    { range: "1-5 kg", price: "95.000/kg" },
                    { range: "6-10 kg", price: "85.000/kg" },
                    { range: "11-20 kg", price: "75.000/kg" },
                    { range: "20-30 kg", price: "60.000/kg" }
                ]
            },
            {
                country: "ブルネイ",
                estimates: "推定7日",
                prices: [
                    { range: "1-5 kg", price: "165.000/kg" },
                    { range: "6-10 kg", price: "155.000/kg" },
                    { range: "20-30 kg", price: "150.000/kg" }
                ]
            },
            {
                country: "マレーシア",
                estimates: "推定7日",
                prices: [
                    { range: "1-10 kg", price: "95.000/kg" },
                    { range: "11-25 kg", price: "85.000/kg" },
                    { range: "26-30 kg", price: "80.000/kg" }
                ]
            },
            {
                country: "東マレーシア（サバ・サラワク）",
                estimates: "推定7日",
                prices: [
                    { range: "1-10 kg", price: "115.000/kg" },
                    { range: "11-25 kg", price: "105.000/kg" },
                    { range: "26-30 kg", price: "100.000/kg" }
                ]
            },
            {
                country: "香港",
                estimates: "推定7日",
                prices: [
                    { range: "1-10 kg", price: "155.000/kg" },
                    { range: "11-25 kg", price: "145.000/kg" },
                    { range: "26-30 kg", price: "140.000/kg" }
                ]
            },
            {
                country: "台湾",
                estimates: "推定7日",
                prices: [
                    { range: "1-10 kg", price: "105.000/kg" },
                    { range: "11-20 kg", price: "95.000/kg" },
                    { range: "21-30 kg", price: "90.000/kg" }
                ]
            },
            {
                country: "日本",
                estimates: "",
                prices: [
                    { range: "0.5 kg", price: "1kgあたり 2.500¥" },
                    { range: "1 kg", price: "1kgあたり 3.700¥" },
                    { range: "2-3 kg", price: "1kgあたり 2.600¥" },
                    { range: "4-8 kg", price: "1kgあたり 2.100¥" },
                    { range: "9-12 kg", price: "1kgあたり 1.900¥" },
                    { range: "13-20 kg", price: "1kgあたり 1.800¥" },
                    { range: "21-30 kg", price: "1kgあたり 1.600¥" }
                ]
            },
            {
                country: "サウジアラビア",
                estimates: "推定7日",
                prices: [
                    { range: "1 kg", price: "395.000" },
                    { range: "2 kg", price: "495.000" },
                    { range: "3 kg", price: "610.000" },
                    { range: "4 kg", price: "740.000" },
                    { range: "5 kg", price: "850.000" },
                    { range: "6 kg", price: "960.000" },
                    { range: "7 kg", price: "1.100.000" },
                    { range: "8 kg", price: "1.200.000" },
                    { range: "9 kg", price: "1.300.000" },
                    { range: "10 kg", price: "1.400.000" },
                    { range: "11-30 kg", price: "追加1kgあたり 100.000" }
                ]
            }
        ]
    };
    return data[lang] || data['id'];
};

export const getFaqData = (lang = 'id') => {
    const data = {
        id: [
            {
                question: "Apa itu Nihong Jastip?",
                answer: "Nihong Jastip adalah layanan jasa titip dan ekspedisi internasional yang mengkhususkan diri dalam pengiriman barang antara Indonesia dan Jepang, serta ke berbagai negara lainnya. Kami membantu Anda mendapatkan produk dari Jepang atau mengirimkan barang ke berbagai tujuan internasional."
            },
            {
                question: "Bagaimana cara memesan layanan jastip?",
                answer: "Anda dapat memesan melalui website kami dengan mengisi formulir kontak, menghubungi kami via WhatsApp, atau melalui media sosial. Kami akan memandu Anda melalui proses pemesanan, mulai dari pemilihan produk hingga pengiriman."
            },
            {
                question: "Berapa lama waktu pengiriman?",
                answer: "Waktu pengiriman bervariasi tergantung negara tujuan. Untuk layanan ekspedisi, estimasi umumnya 7-14 hari. Untuk layanan jastip khusus Indonesia-Jepang, biasanya membutuhkan waktu 2-3 minggu tergantung proses customs dan ketersediaan barang."
            },
            {
                question: "Apakah ada biaya tambahan selain yang tertera?",
                answer: "Harga yang tertera sudah termasuk biaya pengiriman dasar. Namun, mungkin ada biaya tambahan untuk packing khusus, asuransi, atau bea cukai di negara tujuan yang akan kami informasikan terlebih dahulu sebelum proses pengiriman."
            },
            {
                question: "Bagaimana dengan barang yang rusak atau hilang?",
                answer: "Kami menyediakan asuransi pengiriman untuk barang bernilai tinggi. Untuk klaim kerusakan atau kehilangan, harap laporkan dalam waktu 3 hari setelah barang diterima dengan menyertakan bukti foto/video untuk proses klaim."
            },
            {
                question: "Apakah ada batasan barang yang bisa dikirim?",
                answer: "Ya, kami tidak melayani pengiriman barang terlarang seperti narkoba, senjata, bahan mudah meledak, hewan hidup, dan barang ilegal lainnya. Beberapa negara juga memiliki restriksi khusus untuk makanan, obat-obatan, dan produk tertentu."
            },
            {
                question: "Bagaimana sistem pembayaran?",
                answer: "Kami menerima pembayaran melalui transfer bank, e-wallet, dan untuk layanan jastip bisa melalui sistem DP (down payment) dengan pelunasan sebelum pengiriman. Detail pembayaran akan disampaikan setelah konfirmasi pesanan."
            },
            {
                question: "Apakah bisa tracking pengiriman?",
                answer: "Ya, untuk semua layanan ekspedisi kami menyediakan nomor resi yang dapat digunakan untuk melacak status pengiriman melalui website resmi kurir atau melalui sistem tracking kami."
            }
        ],
        en: [
            {
                question: "What is Nihong Jastip?",
                answer: "Nihong Jastip is an international personal shopper and expedition service specializing in item shipments between Indonesia and Japan, as well as to various other countries. We help you get products from Japan or ship items to various international destinations."
            },
            {
                question: "How do I order the jastip service?",
                answer: "You can order through our website by filling out the contact form, contacting us via WhatsApp, or through social media. We will guide you through the ordering process, starting from product selection to shipping."
            },
            {
                question: "How long does shipping take?",
                answer: "Shipping time varies depending on the destination country. For expedition services, the estimate is generally 7-14 days. For special Indonesia-Japan jastip service, it usually takes 2-3 weeks depending on customs processes and item availability."
            },
            {
                question: "Are there any additional fees besides the ones listed?",
                answer: "Prices listed already include basic shipping fees. However, there might be additional fees for special packing, insurance, or customs duties at the destination country, which we will inform you about prior to the shipping process."
            },
            {
                question: "What about damaged or lost items?",
                answer: "We provide shipping insurance for high-value items. For damage or loss claims, please report within 3 days after the item is received by providing photo/video evidence for the claim process."
            },
            {
                question: "Are there limitations on what can be shipped?",
                answer: "Yes, we do not handle shipments of prohibited items such as drugs, weapons, highly combustible materials, live animals, and other illegal goods. Some countries also have specific restrictions for food, medicine, and certain products."
            },
            {
                question: "What is the payment system like?",
                answer: "We accept payments via bank transfer, e-wallets, and for jastip services, a DP (down payment) system with the rest paid before shipment is available. Payment details will be provided upon order confirmation."
            },
            {
                question: "Can I track my shipment?",
                answer: "Yes, for all expedition services, we provide a tracking number you can use to track your shipment status via the official courier website or our tracking system."
            }
        ],
        jp: [
            {
                question: "Nihong Jastipとは何ですか？",
                answer: "Nihong Jastipは、インドネシアと日本の間、および他のさまざまな国への商品の発送を専門とする国際的な買い物代行および配送サービスです。日本から製品を入手したり、さまざまな国際的な目的地に商品を発送したりするお手伝いをします。"
            },
            {
                question: "買い物代行サービスはどのように注文しますか？",
                answer: "お問い合わせフォームに記入するか、WhatsApp経由でご連絡いただくか、ソーシャルメディアを通じてウェブサイトからご注文いただけます。製品の選択から発送まで、注文プロセスをご案内します。"
            },
            {
                question: "配送にはどのくらい時間がかかりますか？",
                answer: "配送時間は目的地の国によって異なります。配送サービスの場合、目安は通常7〜14日です。インドネシアと日本の特別な買い物代行サービスの場合、税関手続きや商品の在庫状況によって通常2〜3週間かかります。"
            },
            {
                question: "記載されている料金以外に追加料金はありますか？",
                answer: "記載されている価格には基本的な送料がすでに含まれています。ただし、特別な梱包、保険、または目的地の国での関税用に追加料金が発生する場合があります。これについては、発送プロセスの前にお知らせします。"
            },
            {
                question: "商品の破損または紛失についてはどうなりますか？",
                answer: "高価な品物には配送保険を提供しています。破損または紛失の請求については、商品を受け取ってから3日以内に、請求プロセスのために写真/ビデオの証拠を提供して報告してください。"
            },
            {
                question: "発送できるものに制限はありますか？",
                answer: "はい、麻薬、武器、可燃性の高い物質、生きている動物、その他の違法な商品などの禁止品目の発送は取り扱いません。国によっては、食品、医薬品、特定の製品に特別な制限を設けている場合もあります。"
            },
            {
                question: "支払いシステムはどのようになっていますか？",
                answer: "銀行振込、電子マネーによる支払いを受け付けています。買い物代行サービスの場合は、前払い（DP）システムを利用し、残金は発送前にお支払いいただきます。支払いの詳細は注文の確認時に提供されます。"
            },
            {
                question: "荷物を追跡できますか？",
                answer: "はい、すべての配送サービスについて、公式の宅配業者のウェブサイトまたは当社の追跡システムを介して配送状況を追跡するために使用できる追跡番号を提供します。"
            }
        ]
    };
    return data[lang] || data['id'];
};