import type { Metadata } from 'next';
import { fetchWedding, resolveSlug } from '@/lib/invite-api';
import { InvitationPage } from '@/components/invite/InvitationPage';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

const WEDDING_SLUG = process.env.WEDDING_SLUG ?? '';

function fill(template: string, name: string) {
  return template.replace(/\{name\}/g, name).replace(/\{category\}/g, name);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const [resolution, wedding] = await Promise.all([
    resolveSlug(WEDDING_SLUG, slug),
    fetchWedding(WEDDING_SLUG),
  ]);

  if (!wedding || resolution.type === 'not_found') return {};

  const og = wedding.og ?? {};
  const image = og.image ?? '/og-image.jpg';
  const images = [{ url: image, width: 953, height: 501, alt: `${wedding.bride_name} & ${wedding.groom_name}` }];

  let title: string;
  let description: string;

  if (resolution.type === 'personal') {
    const name = resolution.data.name;
    title       = fill(og.title_personal       ?? `You're invited, {name}! 💌`, name);
    description = fill(og.description_personal ?? `Dear {name}, you are warmly invited to the wedding.`, name);
  } else {
    const name = resolution.data.name;
    title       = fill(og.title_category       ?? `You're invited! 💌`, name);
    description = fill(og.description_category ?? `You are warmly invited to the wedding.`, name);
  }

  return {
    title,
    description,
    openGraph: { title, description, type: 'website', images },
    twitter:   { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = params;
  const [resolution, wedding] = await Promise.all([
    resolveSlug(WEDDING_SLUG, slug),
    fetchWedding(WEDDING_SLUG),
  ]);

  if (!wedding || resolution.type === 'not_found') notFound();

  if (resolution.type === 'category') {
    return (
      <InvitationPage
        wedding={wedding}
        events={wedding.events}
        linkType="CATEGORY_LINK"
        categoryId={resolution.data.id}
        customGreeting={resolution.data.greeting}
      />
    );
  }

  return (
    <InvitationPage
      wedding={wedding}
      events={wedding.events}
      linkType="PERSONAL_LINK"
      guestId={resolution.data.id}
      guestName={resolution.data.name}
    />
  );
}
