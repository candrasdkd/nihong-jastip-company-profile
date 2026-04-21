import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Diperlukan agar groq-sdk bisa di-bundle dengan benar di server
  serverExternalPackages: ['groq-sdk'],
};

export default nextConfig;
