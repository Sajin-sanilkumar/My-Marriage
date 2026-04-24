'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { trackClick } from '@/lib/invite-client';
import type { Wedding, WeddingEvent } from '@/lib/invite-types';
import { HeroSection } from '@/components/invite/sections/HeroSection';
import { CountdownSection } from '@/components/invite/sections/CountdownSection';
import { EventTimeline } from '@/components/invite/sections/EventTimeline';
import { RsvpSection } from '@/components/invite/sections/RsvpSection';
import { VenueSection } from '@/components/invite/sections/VenueSection';
import { FooterSection } from '@/components/invite/sections/FooterSection';
import { CoupleSection } from '@/components/invite/sections/CoupleSection';

export type LinkType = 'UNIVERSAL_LINK' | 'CATEGORY_LINK' | 'PERSONAL_LINK';

export interface InvitationPageProps {
  wedding: Wedding;
  events: WeddingEvent[];
  linkType: LinkType;
  categoryId?: string;
  guestId?: string;
  guestName?: string;
  customGreeting?: string;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BG_CREAM    = '#FAF6F0';
const BG_WHITE    = '#FFFFFF';
const BG_CHARCOAL = '#1C1C1C';
const BG_HERO     = '#141210';

function MiniOrnament() {
  return (
    <svg viewBox="0 0 60 18" width="40" height="12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M30 5 L33.5 9 L30 13 L26.5 9 Z" fill="currentColor" />
      <path d="M26.5 9 C21 9 15.5 5.5 10 7.5 C6 9 3 11 2 9" stroke="currentColor" strokeWidth="0.75" />
      <path d="M33.5 9 C39 9 44.5 5.5 50 7.5 C54 9 57 11 58 9" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="2" cy="9" r="1.5" fill="currentColor" />
      <circle cx="58" cy="9" r="1.5" fill="currentColor" />
    </svg>
  );
}

function SectionDivider({ from, to }: { from: string; to: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  const isDark = from === BG_CHARCOAL || to === BG_CHARCOAL || from === BG_HERO || to === BG_HERO;

  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, ease: EASE }}
      className="flex items-center justify-center"
      style={{ height: '40px', background: `linear-gradient(to bottom, ${from}, ${to})` }}>
      <span className={isDark ? 'text-gold-500' : 'text-gold-300'}><MiniOrnament /></span>
    </motion.div>
  );
}

export function InvitationPage({ wedding, events, linkType, categoryId, guestId, guestName, customGreeting }: InvitationPageProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  const [curtainUp, setCurtainUp] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setCurtainUp(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    trackClick({ wedding_id: wedding.id, category_id: categoryId, guest_id: guestId, link_type: linkType, user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToTimeline = () => {
    const el = timelineRef.current;
    if (!el) return;
    const target = el.getBoundingClientRect().top + window.scrollY;
    const start = window.scrollY;
    const distance = target - start;
    const duration = 900;
    let startTime: number | null = null;
    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      window.scrollTo(0, start + distance * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const mainEvent = events.find(e => 
    e.name.toLowerCase().includes('wedding') || 
    e.name.toLowerCase().includes('ceremony') ||
    e.name.toLowerCase().includes('marriage')
  ) || events[0];

  const primaryVenueName = mainEvent?.venue_name ?? '';
  const tagline = customGreeting ?? wedding.greeting_default ?? 'Together with their families';

  const configJson = wedding.config_json ?? {};
  const hashtag = (configJson.hashtag as string | undefined) ?? `#${wedding.bride_name.replace(/\s+/g, '')}Weds${wedding.groom_name.replace(/\s+/g, '')}`;
  const countdownTo = configJson.countdown_to as string | undefined;
  const showRsvpForm = configJson.showRsvpForm !== false;
  const showCoupleProfiles = configJson.showCoupleProfiles !== false;
  const showStorySection = configJson.showStorySection !== false;
  const coverPhoto = configJson.coverPhoto as string | null | undefined;
  const bridePhoto = configJson.bridePhoto as string | undefined;
  const groomPhoto = configJson.groomPhoto as string | undefined;
  const ceremonyName = events[0]?.name;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareMessage = `Join us for the wedding of ${wedding.bride_name} & ${wedding.groom_name}!`;

  const rsvpEvents = events.map((e) => ({ id: e.id, name: e.name, date: e.date, start_time: e.start_time }));

  return (
    <motion.main initial={{ opacity: 0.7 }} animate={{ opacity: curtainUp ? 1 : 0.7 }} transition={{ duration: 0.4, ease: EASE }}>
      <HeroSection brideName={wedding.bride_name} groomName={wedding.groom_name} date={wedding.wedding_date} venue={primaryVenueName} guestName={guestName} tagline={tagline} onScrollDown={scrollToTimeline} coverPhoto={coverPhoto} />
      {(showCoupleProfiles || showStorySection) && <SectionDivider from={BG_HERO} to={BG_CREAM} />}
      <CoupleSection
        brideName={wedding.bride_name}
        groomName={wedding.groom_name}
        brideFamily={wedding.bride_family}
        groomFamily={wedding.groom_family}
        brideAbout={wedding.bride_about}
        groomAbout={wedding.groom_about}
        brideHometown={wedding.bride_hometown}
        groomHometown={wedding.groom_hometown}
        brideProfession={wedding.bride_profession}
        groomProfession={wedding.groom_profession}
        brideHobbies={wedding.bride_hobbies}
        groomHobbies={wedding.groom_hobbies}
        ourStory={wedding.our_story}
        bridePhoto={bridePhoto}
        groomPhoto={groomPhoto}
        showCoupleProfiles={showCoupleProfiles}
        showStorySection={showStorySection}
      />
      <SectionDivider from={showCoupleProfiles || showStorySection ? BG_CREAM : BG_HERO} to={BG_CREAM} />
      {countdownTo && <CountdownSection countdownTo={countdownTo} eventName={ceremonyName} />}
      <SectionDivider from={BG_CREAM} to={BG_WHITE} />
      <div ref={timelineRef}><EventTimeline events={events} /></div>
      {showRsvpForm && <SectionDivider from={BG_WHITE} to={BG_CHARCOAL} />}
      {showRsvpForm && (
        <RsvpSection events={rsvpEvents} linkType={linkType} categoryId={categoryId} guestId={guestId} guestName={guestName} weddingSlug={wedding.slug} />
      )}
      <SectionDivider from={showRsvpForm ? BG_CHARCOAL : BG_WHITE} to={BG_CREAM} />
      <VenueSection events={events} />
      <SectionDivider from={BG_CREAM} to={BG_CHARCOAL} />
      <FooterSection hashtag={hashtag} shareMessage={shareMessage} shareUrl={shareUrl} />
    </motion.main>
  );
}
