import React from 'react';

export type Language = 'id' | 'en' | 'jp';

export interface JastipRoute {
  route: string;
  price: string;
}

export interface JastipData {
  title: string;
  routes: JastipRoute[];
}

export interface ExpeditionPrice {
  range: string;
  price: string;
}

export interface ExpeditionCountry {
  country: string;
  estimates: string;
  prices: ExpeditionPrice[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

// Common Prop Types
export interface BaseProps {
  lang: Language | string;
}

export interface NavClickHandlers {
  handleNavClick: (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => void;
  handleNavClickWithClose: (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
