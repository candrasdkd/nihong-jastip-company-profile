import { ChatBotData } from '../types';

const CHATBOT_DATA: Record<string, ChatBotData> = {
  id: {
    greeting: 'Halo Kak! Saya asisten AI Nihong Jastip. Ada yang bisa dibantu soal ongkir atau pengiriman?',
    placeholder: 'Tanya ongkir ke Jepang...',
    errorMsg: 'Maaf Kak, koneksi sedang terputus. Bisa dicoba beberapa saat lagi ya.',
  },
  en: {
    greeting: "Hello! I'm your Nihong Jastip AI assistant. Need help with shipping rates?",
    placeholder: 'Ask shipping rates...',
    errorMsg: 'Sorry, the connection is currently down. Please try again in a few moments.',
  },
  jp: {
    greeting: 'こんにちは！Nihong JastipのAIアシスタントです。配送料金についてご質問はありますか？',
    placeholder: 'メッセージを入力...',
    errorMsg: '申し訳ありませんが、現在接続が切れています。しばらくしてからもう一度お試しください。',
  },
};

export const getChatBotData = (lang: string = 'id'): ChatBotData =>
  CHATBOT_DATA[lang] || CHATBOT_DATA['id'];
