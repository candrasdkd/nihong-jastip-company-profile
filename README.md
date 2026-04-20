# Nihong Jastip — Japan ⇄ Indonesia Personal Shopper & Expedition

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![CSS3](https://img.shields.io/badge/Vanilla_CSS-Custom-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A premium, SEO-optimized company profile website for **Nihong Jastip**, specializing in personal shopper services from Japan to Indonesia (**Jastip Jepang / Titip Jepang**) and global expedition services.

## 🚀 Key Features

- **Next.js 15+ App Router**: Built with the latest Next.js features for high performance and optimal developer experience.
- **Advanced i18n Support**: Full internationalization support for Indonesian (ID), English (EN), and Japanese (JA) via URL-based routing.
- **Intelligent AI Chatbot**: Integrated AI assistant powered by Groq to provide 24/7 customer support and answer Jastip queries accurately.
- **SEO & Performance Optimized**: 
  - Dynamic Metadata & OpenGraph tags.
  - JSON-LD Structured Data for better search engine visibility.
  - Optimized fonts and images.
  - Canonical URL management.
- **Premium Design System**: Custom-built design using Vanilla CSS for maximum flexibility and performance.
- **Responsive & Interactive**: Fully responsive layout with smooth animations powered by [Framer Motion](https://www.framer.com/motion/) and [AOS](https://michalsnik.github.io/aos/).
- **Global Presence**: Information about services in Osaka, Semarang, Depok, and Jakarta, serving over 64 countries.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Integration**: [Groq SDK](https://console.groq.com/)
- **Styling**: Vanilla CSS (Custom Design Tokens)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [AOS](https://github.com/michalsnik/aos)
- **Typography**: [Inter](https://fonts.google.com/specimen/Inter) via `next/font`
- **Icons**: [Lucide React](https://lucide.dev/) & Custom SVG Icons

## 📂 Project Structure

```text
src/
├── app/             # Next.js App Router (i18n routing)
│   └── [lang]/      # Language-specific pages
├── components/      # UI Components (Sections, Layout, SEO)
├── data/            # Static data and knowledge base for AI
├── hooks/           # Custom React hooks (e.g., useChat)
├── types/           # TypeScript Type Definitions
├── utils/           # Helper functions & constants
└── globals.css      # Custom design system & global styles
```

## 🏃 Getting Started

### Prerequisites

- Node.js 18.x or later
- Yarn or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nihong-jastip-company-profile.git
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Run the development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Scripts

- `yarn dev`: Start development server.
- `yarn build`: Build the production application.
- `yarn start`: Start the production server.
- `yarn lint`: Run ESLint for code quality.

## 🌐 Deployment

The project is optimized for deployment on **Vercel**. Simply connect your repository and it will automatically handle the build and deployment process.

---

Built with ❤️ by [Candrasdkd](https://github.com/candrasdkd)
