/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow both local and external image domains if needed
  images: {
    remotePatterns: [
      // Vercel Blob storage
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
};

export default nextConfig;
