import { ChatBotData } from '../types';

const CHATBOT_DATA: Record<string, ChatBotData> = {
  id: {
    greeting: 'Halo Kak! Saya asisten AI Nihong Jastip. Ada yang bisa dibantu soal jastip handcarry Jepang ⇄ Indonesia?',
    placeholder: 'Tanya ongkir handcarry...',
    errorMsg: 'Maaf Kak, koneksi sedang terputus. Bisa dicoba beberapa saat lagi ya.',
    suggestions: ['Hitung ongkir 3 kg Jepang → Indonesia', 'Barang apa yang dilarang?', 'Berapa lama pengiriman?', 'Bagaimana cara order?'],
    handoffLabel: 'Lanjut chat dengan admin',
    handoffIntro: 'Halo Nihong Jastip, saya tadi bertanya lewat chatbot di website.',
  },
  en: {
    greeting: "Hello! I'm your Nihong Jastip AI assistant. Need help with Japan ⇄ Indonesia handcarry rates?",
    placeholder: 'Ask handcarry rates...',
    errorMsg: 'Sorry, the connection is currently down. Please try again in a few moments.',
    suggestions: ['Estimate cost for 3 kg Japan → Indonesia', 'Which items are prohibited?', 'How long does shipping take?', 'How do I order?'],
    handoffLabel: 'Continue with an admin',
    handoffIntro: 'Hello Nihong Jastip, I was just asking via the website chatbot.',
  },
  jp: {
    greeting: 'こんにちは！Nihong JastipのAIアシスタントです。日本⇄インドネシアのハンドキャリー料金についてご質問はありますか？',
    placeholder: 'ハンドキャリー料金を質問...',
    errorMsg: '申し訳ありませんが、現在接続が切れています。しばらくしてからもう一度お試しください。',
    suggestions: ['日本→インドネシア 3kgの料金は？', '送れない商品は？', '配送にどのくらいかかりますか？', '注文の流れを教えてください'],
    handoffLabel: '担当者とチャットを続ける',
    handoffIntro: 'Nihong Jastipさん、ウェブサイトのチャットボットで質問しました。',
  },
};

export const getChatBotData = (lang: string = 'id'): ChatBotData =>
  CHATBOT_DATA[lang] || CHATBOT_DATA['id'];
