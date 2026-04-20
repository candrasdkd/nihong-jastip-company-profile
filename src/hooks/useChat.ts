import { useState, useEffect, useRef, useCallback } from 'react';
import { Message, ChatBotData } from '../types';
import { getChatBotData } from '../data';

const TYPING_DELAY_MS = 2500; // Delay 2.5 detik sebelum mulai mengetik
const CHAR_INTERVAL_MS = 18;  // Kecepatan typewriter: 1 karakter per 18ms

export const useChat = (lang: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // streamingText adalah teks yang sedang "diketik" secara animasi
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const chatData: ChatBotData = getChatBotData(lang);

  // Inisialisasi pesan pertama
  useEffect(() => {
    setMessages([{
      id: '1',
      text: chatData.greeting,
      sender: 'bot',
      timestamp: new Date()
    }]);
  }, [lang, chatData.greeting]);

  // Auto-scroll ke bawah saat ada pesan baru atau teks sedang distream
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, streamingText]);

  // Cleanup interval saat komponen unmount
  useEffect(() => {
    return () => {
      if (typewriterRef.current) clearInterval(typewriterRef.current);
    };
  }, []);

  // Fungsi typewriter yang menganimasikan teks karakter per karakter
  const startTypewriter = useCallback((fullText: string, msgId: string) => {
    let index = 0;
    setStreamingText('');

    typewriterRef.current = setInterval(() => {
      index++;
      const currentText = fullText.slice(0, index);
      setStreamingText(currentText);

      // Scroll ke bawah secara smooth mengikuti teks yang muncul
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

      if (index >= fullText.length) {
        // Typewriter selesai: simpan pesan final ke messages, bersihkan streaming state
        if (typewriterRef.current) clearInterval(typewriterRef.current);
        setMessages((prev) => [
          ...prev,
          { id: msgId, text: fullText, sender: 'bot', timestamp: new Date() }
        ]);
        setStreamingText('');
        setIsTyping(false);
      }
    }, CHAR_INTERVAL_MS);
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Kirim seluruh history percakapan agar bot punya konteks
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text, history })
      });

      if (!res.ok) throw new Error('API Error');

      const data = await res.json();
      const replyText: string = data.reply;
      const msgId = (Date.now() + 1).toString();

      // Delay 3 detik sambil tetap menampilkan loading indicator
      await new Promise((resolve) => setTimeout(resolve, TYPING_DELAY_MS));

      // Setelah delay, mulai animasi typewriter
      startTypewriter(replyText, msgId);

    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, TYPING_DELAY_MS));
      startTypewriter(chatData.errorMsg, (Date.now() + 1).toString());
    }
  };

  return {
    isOpen,
    setIsOpen,
    messages,
    inputValue,
    setInputValue,
    isTyping,
    streamingText,
    messagesEndRef,
    handleSend,
    chatData
  };
};
