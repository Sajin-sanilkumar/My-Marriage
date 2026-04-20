import type { TrackClickPayload } from '@/lib/invite-types';

export type { TrackClickPayload };

export async function trackClick(data: TrackClickPayload): Promise<void> {
  try {
    await fetch('/api/track/click', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    });
  } catch {
    // fire-and-forget
  }
}

export async function submitRsvp(weddingSlug: string, rsvpData: object): Promise<Response | null> {
  try {
    return await fetch(`/api/weddings/${weddingSlug}/rsvp`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(rsvpData),
    });
  } catch {
    return null;
  }
}
