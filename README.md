# Nihong Jastip — Japan ⇄ Indonesia Personal Shopper & Expedition

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Jest](https://img.shields.io/badge/Jest-Tested-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-Passing-4fb325?style=for-the-badge&logo=github-actions&logoColor=white)](#-cicd-pipeline)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A premium, SEO-optimized company profile website for **Nihong Jastip**, specializing in personal shopper services from Japan to Indonesia (**Jastip Jepang / Titip Jepang**) and global expedition services.

## 🚀 Key Features

- **Next.js 15+ App Router**: Built with the latest Next.js features for high performance and optimal developer experience.
- **Advanced i18n Support**: Full internationalization support for Indonesian (ID), English (EN), and Japanese (JA) via URL-based routing.
- **Intelligent AI Chatbot**: Integrated AI assistant powered by **Groq SDK (Llama 3)** to provide 24/7 customer support and answer Jastip queries accurately.
- **Robust Testing Suite**: 30+ unit tests covering components, hooks, and utility functions using **Jest** and **React Testing Library**.
- **SEO & Performance Optimized**: 
  - Dynamic Metadata & OpenGraph tags.
  - JSON-LD Structured Data for better search engine visibility.
  - Canonical URL management.
- **Premium Design System**: Custom-built design using Vanilla CSS for maximum flexibility and performance.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Integration**: [Groq Cloud SDK](https://console.groq.com/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Styling**: Vanilla CSS (Custom Design Tokens)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```text
src/
├── app/             # Next.js App Router (i18n routing & API)
│   ├── [lang]/      # Language-specific pages
│   └── api/         # Backend routes (Groq AI Integration)
├── components/      # UI Components
│   ├── Layout/      # Header, Sidebar, Footer
│   ├── Sections/    # Hero, Services, Pricing, FAQ, Contact
│   ├── SEO/         # Meta tags & JSON-LD Schema
│   └── UI/          # ChatBot and reusable UI elements
├── data/            # Knowledge base for AI & Static Content
├── hooks/           # Custom React hooks (useChat, useAppLogic)
├── types/           # TypeScript Type Definitions
└── utils/           # Helper functions (WhatsApp, Text Processing)
```

## 🧪 Testing

Proyek ini dilengkapi dengan suite pengujian otomatis untuk menjaga stabilitas kode.

- **Unit Testing**: Mengetes logika internal fungsi dan hook.
- **Component Testing**: Memastikan UI merender data dengan benar dan merespon interaksi user.
- **Mocking**: Menggunakan global mocks untuk browser API (`scrollIntoView`, `IntersectionObserver`) dan `framer-motion`.

### Running Tests
```bash
# Menjalankan semua test
npm test

# Menjalankan test dengan laporan coverage
npm run test:ci
```

## ⚙️ CI/CD Pipeline

Kami menggunakan **GitHub Actions** untuk otomatisasi kualitas kode:
1. **Linting**: Memastikan kode mengikuti standar Next.js.
2. **Type Check**: Validasi tipe data TypeScript.
3. **Automated Tests**: Menjalankan seluruh test suite.
4. **Build Check**: Memastikan proyek berhasil dikompilasi sebelum dideploy.

Setiap Pull Request ke `main` akan memicu pipeline ini. Deployment dilakukan secara otomatis via **Vercel** hanya jika pipeline lulus.

## 🏃 Getting Started

### Prerequisites
- Node.js 20.x or later
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nihong-jastip-company-profile.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Buat file `.env.local` dan tambahkan API Key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📦 Scripts

- `npm run dev`: Start development server.
- `npm run build`: Build the production application.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint check.
- `npm run type-check`: Run TypeScript validation.
- `npm run test`: Run unit tests.

---

Built with ❤️ by [Candrasdkd](https://github.com/candrasdkd)
