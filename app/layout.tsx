import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { InviteLoadingGuard, InviteMusicGuard } from '@/components/invite-guards';
import weddingData from '@/data/wedding.json';
import './globals.css';

const geistSans = localFont({ src: './fonts/GeistVF.woff',     variable: '--font-geist-sans', weight: '100 900' });
const geistMono = localFont({ src: './fonts/GeistMonoVF.woff', variable: '--font-geist-mono', weight: '100 900' });

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight:  ['300', '400', '500', '600', '700'],
  style:   ['normal', 'italic'],
  variable: '--font-cormorant',
  display:  'swap',
});

const jost = Jost({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display:  'swap',
});

const monogram = `${(weddingData as { bride: string }).bride[0]} & ${(weddingData as { groom: string }).groom[0]}`;

export const viewport: Viewport = { themeColor: '#C9A84C' };

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000')
  ),
  title:       'Wedvite',
  description: 'Wedding invitation & management platform',
  robots:      { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${jost.variable} antialiased`}>
        <InviteLoadingGuard monogram={monogram} />
        <InviteMusicGuard>
          {children}
        </InviteMusicGuard>
        <Toaster richColors closeButton position="bottom-right" />
      </body>
    </html>
  );
}
