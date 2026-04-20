import type { Metadata } from 'next';
import { fetchWedding } from '@/lib/invite-api';
import { InvitationPage } from '@/components/invite/InvitationPage';
import { notFound } from 'next/navigation';

const WEDDING_SLUG = process.env.WEDDING_SLUG ?? '';

export async function generateMetadata(): Promise<Metadata> {
  const wedding = await fetchWedding(WEDDING_SLUG);
  if (!wedding) return {};

  const og   = wedding.og ?? {};
  const site = (wedding.site_config ?? {}) as Record<string, string>;
  const image    = og.image ?? '/og-image.jpg';
  const tabTitle = site.tab_title ?? `${wedding.bride_name} & ${wedding.groom_name} — Wedding Invitation`;
  const ogTitle  = og.title_universal       ?? tabTitle;
  const description = og.description_universal ?? `You're invited to celebrate the wedding of ${wedding.bride_name} & ${wedding.groom_name}.`;

  return {
    title: tabTitle,
    description,
    openGraph: { title: ogTitle, description, type: 'website', images: [{ url: image, width: 953, height: 501, alt: `${wedding.bride_name} & ${wedding.groom_name}` }] },
    twitter:   { card: 'summary_large_image', title: ogTitle, description, images: [image] },
  };
}

export default async function UniversalPage() {
  const wedding = await fetchWedding(WEDDING_SLUG);
  if (!wedding) notFound();

  return (
    <InvitationPage
      wedding={wedding}
      events={wedding.events}
      linkType="UNIVERSAL_LINK"
    />
  );
}
