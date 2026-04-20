import '@testing-library/jest-dom'
import React from 'react'

// Global Mock untuk API Browser yang tidak ada di JSDOM
window.HTMLElement.prototype.scrollIntoView = jest.fn();

// Mock IntersectionObserver
window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// GLOBAL MOCK: Framer Motion
// Strategi ini menggunakan Proxy untuk menangani semua tag (motion.div, motion.button, dll)
// dan secara otomatis menghapus prop animasi agar tidak menyebabkan error di React 19.
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: new Proxy({}, {
      get: (_target, key) => {
        return ({ 
          children, 
          initial, 
          animate, 
          exit, 
          whileHover, 
          whileTap, 
          whileInView, 
          viewport, 
          transition, 
          variants, 
          layout,
          ...props 
        }: any) => {
          return React.createElement(key, props, children);
        };
      }
    }),
    AnimatePresence: ({ children }: any) => children,
  };
});
