# Nihong Jastip — Japan ⇄ Indonesia Handcarry Personal Shopper

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Jest](https://img.shields.io/badge/Jest-Tested-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

A premium, SEO-optimized company profile website for **Nihong Jastip**, specializing in two-way handcarry personal shopper services between Japan and Indonesia (**Jastip Handcarry Jepang ⇄ Indonesia**).

## 🚀 Key Features

- **Next.js 16 App Router**: Dioptimalkan untuk deployment seamless di Vercel.
- **React 19 Ready**: Memanfaatkan fitur terbaru React 19 untuk performa maksimal.
- **Advanced i18n Support**: Full internationalization support for Indonesian (ID), English (EN), and Japanese (JA) via URL-based routing.
- **Intelligent AI Chatbot**: Integrated AI assistant powered by **Groq SDK (Llama 3)** running on Node.js serverless route for instant responses.
- **Robust Testing Suite**: 30+ unit tests covering components, hooks, and utility functions using **Jest** and **React Testing Library**.
- **SEO & Performance Optimized**: 
  - Dynamic Metadata & OpenGraph tags.
  - JSON-LD Structured Data (Schema.org).
  - Canonical URL management.
- **Premium Design System**: Custom-built design using Vanilla CSS for maximum flexibility and performance.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Runtime**: [Vercel](https://vercel.com/) (Node.js Serverless Functions)
- **Package Manager**: [Yarn](https://yarnpkg.com/)
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

## ⚙️ Deployment (Vercel)

Proyek ini dikonfigurasi untuk deployment otomatis di **Vercel** melalui [vercel.json](./vercel.json).

### Environment Variables
Pastikan variabel berikut diatur di Dashboard Vercel (Settings → Environment Variables):
- `GROQ_API_KEY`: API Key dari Groq Cloud Console.

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
- `yarn build`: Build Next.js untuk produksi (Vercel).
- `yarn test:ci`: Jalankan test suite lengkap untuk CI/CD.

---

Built with ❤️ by [Candrasdkd](https://github.com/candrasdkd)
