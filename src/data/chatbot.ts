import { ChatBotData } from '../types';

const CHATBOT_DATA: Record<string, ChatBotData> = {
  id: {
    greeting: 'Halo Kak! Saya asisten AI Nihong Jastip. Ada yang bisa dibantu soal jastip handcarry Jepang ⇄ Indonesia?',
    placeholder: 'Tanya ongkir handcarry...',
    errorMsg: 'Maaf Kak, koneksi sedang terputus. Bisa dicoba beberapa saat lagi ya.',
  },
  en: {
    greeting: "Hello! I'm your Nihong Jastip AI assistant. Need help with Japan ⇄ Indonesia handcarry rates?",
    placeholder: 'Ask handcarry rates...',
    errorMsg: 'Sorry, the connection is currently down. Please try again in a few moments.',
  },
  jp: {
    greeting: 'こんにちは！Nihong JastipのAIアシスタントです。日本⇄インドネシアのハンドキャリー料金についてご質問はありますか？',
    placeholder: 'ハンドキャリー料金を質問...',
    errorMsg: '申し訳ありませんが、現在接続が切れています。しばらくしてからもう一度お試しください。',
  },
};

export const getChatBotData = (lang: string = 'id'): ChatBotData =>
  CHATBOT_DATA[lang] || CHATBOT_DATA['id'];
