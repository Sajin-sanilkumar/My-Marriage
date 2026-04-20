import { prisma } from '@/lib/prisma';
import type { Wedding, WeddingOg, LinkResolution } from '@/lib/invite-types';

export type { Wedding, WeddingOg, LinkResolution };
export type { WeddingEvent, Category, Guest, TrackClickPayload } from '@/lib/invite-types';

export async function fetchWedding(slug: string): Promise<Wedding | null> {
  if (!slug) return null;
  const w = await prisma.wedding.findUnique({
    where: { slug },
    include: {
      events:     { orderBy: { sort_order: 'asc' } },
      categories: { orderBy: { created_at: 'asc' } },
    },
  });
  if (!w) return null;

  const configJson = (w.config_json ?? {}) as Record<string, unknown>;
  const og = (configJson.og ?? {}) as WeddingOg;

  return {
    id:               w.id,
    slug:             w.slug,
    bride_name:       w.bride_name,
    groom_name:       w.groom_name,
    bride_family:     w.bride_family || undefined,
    groom_family:     w.groom_family || undefined,
    wedding_date:     w.wedding_date.toISOString(),
    greeting_default: w.greeting_default,
    bride_about:      w.bride_about || undefined,
    groom_about:      w.groom_about || undefined,
    bride_hometown:   w.bride_hometown || undefined,
    groom_hometown:   w.groom_hometown || undefined,
    bride_profession: w.bride_profession || undefined,
    groom_profession: w.groom_profession || undefined,
    bride_hobbies:    w.bride_hobbies || undefined,
    groom_hobbies:    w.groom_hobbies || undefined,
    our_story:        w.our_story || undefined,
    theme:            w.theme,
    og,
    config_json:      configJson,
    site_config:      (w.site_config ?? {}) as Record<string, unknown>,
    events: w.events.map((e) => ({
      id:            e.id,
      name:          e.name,
      date:          e.date.toISOString(),
      start_time:    e.start_time,
      end_time:      e.end_time ?? '',
      venue_name:    e.venue_name,
      venue_address: e.venue_address,
      venue_lat:     e.venue_lat,
      venue_lng:     e.venue_lng,
      maps_url:      e.venue_map_url ?? undefined,
    })),
    categories: w.categories.map((c) => ({
      id:       c.id,
      slug:     c.slug,
      name:     c.name,
      greeting: c.custom_greeting ?? undefined,
    })),
  };
}

export async function resolveSlug(weddingSlug: string, urlSlug: string): Promise<LinkResolution> {
  const wedding = await prisma.wedding.findUnique({ where: { slug: weddingSlug }, select: { id: true } });
  if (!wedding) return { type: 'not_found', data: null };

  const category = await prisma.category.findFirst({
    where: { wedding_id: wedding.id, slug: urlSlug },
  });
  if (category) {
    return {
      type: 'category',
      data: { id: category.id, slug: category.slug, name: category.name, greeting: category.custom_greeting ?? undefined },
    };
  }

  const guest = await prisma.guest.findFirst({
    where: { wedding_id: wedding.id, slug: urlSlug },
  });
  if (guest) {
    return {
      type: 'personal',
      data: { id: guest.id, slug: guest.slug, name: guest.name, category_id: guest.category_id ?? undefined },
    };
  }

  return { type: 'not_found', data: null };
}
