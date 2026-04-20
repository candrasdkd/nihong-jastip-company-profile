import { useState, useEffect, useRef } from 'react';
import { Message, ChatBotData } from '../types';
import { getChatBotData } from '../data';

export const useChat = (lang: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          text: chatData.errorMsg,
          sender: 'bot',
          timestamp: new Date()
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    messages,
    inputValue,
    setInputValue,
    isTyping,
    messagesEndRef,
    handleSend,
    chatData
  };
};
