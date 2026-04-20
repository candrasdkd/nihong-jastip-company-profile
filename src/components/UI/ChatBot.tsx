'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { Language } from '../../types';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  lang: Language;
}

// Fungsi untuk mendeteksi URL dan mengubahnya menjadi Link (<a> tag) yang bisa diklik
const renderText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#93c5fd', textDecoration: 'underline', fontWeight: 500 }}
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

const ChatBot: React.FC<ChatBotProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const greetings: Record<Language, string> = {
    id: 'Halo Kak! Saya asisten AI Nihong Jastip. Ada yang bisa dibantu soal ongkir atau pengiriman?',
    en: "Hello! I'm your Nihong Jastip AI assistant. Need help with shipping rates?",
    jp: 'こんにちは！Nihong JastipのAIアシスタントです。配送料金についてご質問はありますか？',
  };

  // Inisialisasi pesan pertama
  useEffect(() => {
    setMessages([{ id: '1', text: greetings[lang] || greetings.id, sender: 'bot', timestamp: new Date() }]);
  }, [lang]);

  // Auto-scroll ke bawah saat ada pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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
      // Tembak ke API Groq yang ada di backend
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text })
      });

      if (!res.ok) throw new Error('API Error');

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          sender: 'bot',
          timestamp: new Date()
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: 'Maaf Kak, koneksi sedang terputus. Bisa dicoba beberapa saat lagi ya.',
          sender: 'bot',
          timestamp: new Date()
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const placeholders: Record<Language, string> = {
    id: 'Tanya ongkir ke Jepang...', en: 'Ask shipping rates...', jp: 'メッセージを入力...',
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 10000 }}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '55px', height: '55px', borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
          color: 'white', border: 'none', boxShadow: '0 10px 25px rgba(1, 46, 108, 0.3)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={28} /></motion.div>
            : <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={28} /></motion.div>}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass"
            style={{
              position: 'absolute',
              bottom: '70px',
              right: '0',
              width: 'calc(100vw - 40px)', // Responsif mobile
              maxWidth: '380px',           // Batas maksimal desktop
              height: 'calc(100vh - 120px)',// Responsif mobile
              maxHeight: '500px',          // Batas maksimal desktop
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.4)',
              backdropFilter: 'blur(20px)',
              background: 'rgba(255, 255, 255, 0.85)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '20px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bot size={24} /></div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Nihong AI</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }} />
                  <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: msg.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                    background: msg.sender === 'user' ? 'var(--primary)' : 'white',
                    color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                    border: msg.sender === 'bot' ? '1px solid rgba(0,0,0,0.05)' : 'none',
                    // Menambahkan properti ini agar teks panjang atau URL tidak merusak layout
                    wordBreak: 'break-word'
                  }}>
                    {/* Fungsi renderText dipanggil di sini untuk mendeteksi URL */}
                    {renderText(msg.text)}
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-light)', marginTop: '4px' }}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'white', padding: '10px 15px', borderRadius: '18px 18px 18px 0', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  <Loader2 size={16} style={{ color: 'var(--primary)', animation: 'spin 1s linear infinite' }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '15px', borderTop: '1px solid rgba(0,0,0,0.05)', background: 'white' }}>
              <div style={{ display: 'flex', gap: '10px', background: 'var(--bg-light)', padding: '8px 12px', borderRadius: 'var(--radius-full)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={placeholders[lang]}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '0.9rem', color: 'var(--text-main)' }}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  style={{ background: 'var(--primary)', color: 'white', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'var(--transition)', opacity: !inputValue.trim() || isTyping ? 0.5 : 1 }}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default ChatBot;