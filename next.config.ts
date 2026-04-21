import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Required by @opennextjs/cloudflare to bundle for Cloudflare Workers
  output: 'standalone',
  // Allow groq-sdk to be bundled correctly
  serverExternalPackages: ['groq-sdk'],
};

export default nextConfig;
