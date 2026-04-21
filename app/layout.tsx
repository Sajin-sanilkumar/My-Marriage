import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { InviteLoadingGuard, InviteMusicGuard } from '@/components/invite-guards';
import { fetchWedding } from '@/lib/invite-api';
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

export const viewport: Viewport = { themeColor: '#C9A84C' };

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000');

export async function generateMetadata(): Promise<Metadata> {
  const wedding = await fetchWedding(process.env.WEDDING_SLUG ?? '');
  const site = (wedding?.site_config ?? {}) as Record<string, string>;
  const title       = site.tab_title       ?? (wedding ? `${wedding.bride_name} & ${wedding.groom_name} — Momentry by Urbanzi` : 'Momentry by Urbanzi');
  const description = site.tab_description ?? (wedding ? `You're invited to celebrate the wedding of ${wedding.bride_name} & ${wedding.groom_name}.` : '');

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    icons: {
      icon: '/logo.webp',
      shortcut: '/logo.webp',
      apple: '/logo.webp',
    },
    robots: { index: false, follow: false },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const wedding = await fetchWedding(process.env.WEDDING_SLUG ?? '');
  const site = (wedding?.site_config ?? {}) as Record<string, string>;
  const monogram = site.loading_monogram ?? (wedding ? `${wedding.bride_name[0]} & ${wedding.groom_name[0]}` : 'W');
  const tagline  = site.loading_tagline;

  const configJson = (wedding?.config_json ?? {}) as Record<string, unknown>;
  const musicUrl   = configJson.backgroundMusic as string | undefined;

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${jost.variable} antialiased`}>
        <InviteLoadingGuard monogram={monogram} tagline={tagline} />
        <InviteMusicGuard musicUrl={musicUrl}>
          {children}
        </InviteMusicGuard>
        <Toaster richColors closeButton position="bottom-right" />
      </body>
    </html>
  );
}
