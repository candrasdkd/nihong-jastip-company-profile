import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow groq-sdk to be bundled correctly
  serverExternalPackages: ['groq-sdk'],
};

export default nextConfig;
