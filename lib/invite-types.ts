export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  venue_name: string;
  venue_address: string;
  venue_lat: number;
  venue_lng: number;
  maps_url?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  greeting?: string;
}

export interface Guest {
  id: string;
  slug: string;
  name: string;
  category_id?: string;
}

export interface WeddingOg {
  image?: string;
  title_personal?: string;
  description_personal?: string;
  title_category?: string;
  description_category?: string;
  title_universal?: string;
  description_universal?: string;
}

export interface Wedding {
  id: string;
  slug: string;
  bride_name: string;
  groom_name: string;
  bride_family?: string;
  groom_family?: string;
  wedding_date: string;
  greeting_default?: string;
  theme?: string;
  og?: WeddingOg;
  config_json?: Record<string, unknown>;
  events: WeddingEvent[];
  categories: Category[];
}

export type LinkResolution =
  | { type: 'category'; data: Category }
  | { type: 'personal'; data: Guest }
  | { type: 'not_found'; data: null };

export interface TrackClickPayload {
  wedding_id: string;
  category_id?: string;
  guest_id?: string;
  link_type: 'UNIVERSAL_LINK' | 'CATEGORY_LINK' | 'PERSONAL_LINK';
  user_agent?: string;
}
