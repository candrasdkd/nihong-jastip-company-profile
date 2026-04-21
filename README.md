# Nihong Jastip — Japan ⇄ Indonesia Personal Shopper & Expedition

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Deployed-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Jest](https://img.shields.io/badge/Jest-Tested-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

A premium, SEO-optimized company profile website for **Nihong Jastip**, specializing in personal shopper services from Japan to Indonesia (**Jastip Jepang / Titip Jepang**) and global expedition services.

## 🚀 Key Features

- **Next.js 15+ App Router (Edge Runtime)**: Dikonfigurasi khusus untuk berjalan di atas infrastruktur Cloudflare Workers yang sangat cepat.
- **React 19 Ready**: Memanfaatkan fitur terbaru React 19 untuk performa maksimal.
- **Advanced i18n Support**: Full internationalization support for Indonesian (ID), English (EN), and Japanese (JA) via URL-based routing.
- **Intelligent AI Chatbot**: Integrated AI assistant powered by **Groq SDK (Llama 3)** running on Edge Runtime for instant responses.
- **Robust Testing Suite**: 30+ unit tests covering components, hooks, and utility functions using **Jest** and **React Testing Library**.
- **SEO & Performance Optimized**: 
  - Dynamic Metadata & OpenGraph tags.
  - JSON-LD Structured Data (Schema.org).
  - Canonical URL management.
- **Premium Design System**: Custom-built design using Vanilla CSS for maximum flexibility and performance.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Runtime**: [Cloudflare Pages](https://pages.cloudflare.com/) via [OpenNext](https://opennext.js.org/)
- **Package Manager**: [Yarn 4 (Berry)](https://yarnpkg.com/)
- **AI Integration**: [Groq Cloud SDK](https://console.groq.com/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Styling**: Vanilla CSS (Custom Design Tokens)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📂 Project Structure

```text
src/
├── app/             # Next.js App Router (Edge Runtime enabled)
│   ├── [lang]/      # Language-specific pages
│   └── api/         # Backend routes (Edge API Integration)
├── components/      # UI Components
├── data/            # Knowledge base for AI & Static Content
├── hooks/           # Custom React hooks (useChat, useAppLogic)
├── types/           # TypeScript Type Definitions
└── utils/           # Helper functions (WhatsApp, Text Processing)
```

## 🧪 Testing & Quality Assurance

Proyek ini menggunakan standar pengujian ketat sebelum deployment:

```bash
# Menjalankan semua test secara lokal
yarn test

# Menjalankan test dengan laporan coverage (digunakan di CI/CD)
yarn test:ci
```

**Catatan Kompatibilitas React 19:** Pengujian dikonfigurasi untuk memaksa `NODE_ENV=test` dan `customExportConditions: ['development']` guna memastikan fungsi `act()` dari React Testing Library berjalan dengan benar.

## ⚙️ Deployment (Cloudflare Pages)

Proyek ini di-deploy menggunakan **OpenNext** untuk mengubah build Next.js menjadi format Cloudflare Workers.

### Environment Variables
Pastikan variabel berikut diatur di Dashboard Cloudflare Pages (Settings -> Variables and Secrets):
- `GROQ_API_KEY`: API Key dari Groq Cloud Console.

### Edge Runtime Configuration
Semua dynamic routes menggunakan konfigurasi:
```typescript
export const runtime = 'edge';
```

## 🏃 Getting Started

### Prerequisites
- Node.js 20.x or later
- Yarn 4.x

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/candrasdkd/nihong-jastip-company-profile.git
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Set up environment variables in `.env.local`:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```
4. Run development server:
   ```bash
   yarn dev
   ```

## 📦 Scripts

- `yarn dev`: Jalankan server pengembangan.
- `yarn build`: Build Next.js standar.
- `yarn build:cf`: Build khusus untuk Cloudflare Pages (OpenNext).
- `yarn deploy`: Build dan deploy langsung ke Cloudflare.
- `yarn test:ci`: Jalankan test suite lengkap untuk CI/CD.

---

Built with ❤️ by [Candrasdkd](https://github.com/candrasdkd)
