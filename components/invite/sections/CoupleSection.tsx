'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// TODO: Replace all placeholder text and photo paths with real content

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BRIDE = {
  name: 'Keerthana',
  role: 'Bride' as const,
  initial: 'K',
  hometown: 'Malappuram, Kerala',
  profession: 'Software Engineer',
  about:
    'A gentle soul with a deep love for Carnatic music and Bharatanatyam. She brings warmth and grace to every room she enters, and has a beautiful gift for making everyone feel at home.',
  hobbies: ['Classical Dance', 'Carnatic Music', 'Reading', 'Cooking'],
};

const GROOM = {
  name: 'Sajin',
  role: 'Groom' as const,
  initial: 'S',
  hometown: 'Thrissur, Kerala',
  profession: 'Civil Engineer',
  about:
    'An adventurous spirit who finds joy in the outdoors and captures the world through his camera lens. His warmth, laughter, and quiet strength make every moment feel special.',
  hobbies: ['Photography', 'Cricket', 'Trekking', 'Travel'],
};

const OUR_STORY =
  "They first met through mutual friends in 2021, bonding over shared stories, filter coffee, and a love for Kerala's serene backwaters. What began as a warm friendship slowly blossomed into something beautiful — a bond built on laughter, trust, and countless cherished memories. On 26th April 2026, they take the most wonderful step of their journey together.";

// ---------------------------------------------------------------------------
// PhotoPlaceholder
// Replace the inner <div> with <Image> once real photos are available.
// ---------------------------------------------------------------------------

function PhotoPlaceholder({
  initial,
  isBride,
}: {
  initial: string;
  isBride: boolean;
}) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: '168px', height: '168px' }}
    >
      {/* Gold ring border */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ padding: '2px', background: 'linear-gradient(135deg, #C9A84C 0%, #B8941F 40%, #D4B978 70%, #C9A84C 100%)' }}
      >
        <div className="w-full h-full rounded-full" style={{ background: '#FAF6F0' }} />
      </div>

      {/* Portrait area — swap for <Image> when ready */}
      <div
        className="absolute inset-[6px] rounded-full flex flex-col items-center justify-center gap-1"
        style={{
          background: isBride
            ? 'linear-gradient(160deg, #f6ede0 0%, #ecd8be 100%)'
            : 'linear-gradient(160deg, #e8ede8 0%, #d0ddd0 100%)',
        }}
      >
        <span
          className="font-serif select-none"
          style={{ fontSize: '62px', lineHeight: 1, color: 'rgba(160,115,40,0.28)' }}
          aria-hidden="true"
        >
          {initial}
        </span>
        {/* TODO: Replace above with:
          <Image src="/photos/bride.jpg" (or groom) alt="..." fill className="rounded-full object-cover" />
        */}
      </div>

      {/* Small decorative dot at bottom of ring */}
      <div
        className="absolute bottom-[1px] left-1/2 -translate-x-1/2 rounded-full"
        style={{ width: '8px', height: '8px', background: '#C9A84C' }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// PersonCard
// ---------------------------------------------------------------------------

function PersonCard({
  person,
  delay,
}: {
  person: typeof BRIDE | typeof GROOM;
  delay: number;
}) {
  const isBride = person.role === 'Bride';

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className="flex flex-col items-center gap-6 px-4"
      style={{ maxWidth: '340px', width: '100%' }}
    >
      <PhotoPlaceholder initial={person.initial} isBride={isBride} />

      {/* Role badge */}
      <div className="flex flex-col items-center gap-1.5">
        <span
          className="font-sans text-[10px] uppercase tracking-[3px]"
          style={{ color: '#B8941F' }}
        >
          {person.role}
        </span>
        <h3
          className="font-serif text-[32px] leading-none text-charcoal"
          style={{ fontWeight: 300 }}
        >
          {person.name}
        </h3>
        {/* Thin gold rule */}
        <div
          className="rounded-full"
          style={{ width: '36px', height: '1.5px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
        />
      </div>

      {/* Details */}
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1C4.07 1 2.5 2.57 2.5 4.5C2.5 7.25 6 11 6 11C6 11 9.5 7.25 9.5 4.5C9.5 2.57 7.93 1 6 1ZM6 5.75C5.31 5.75 4.75 5.19 4.75 4.5C4.75 3.81 5.31 3.25 6 3.25C6.69 3.25 7.25 3.81 7.25 4.5C7.25 5.19 6.69 5.75 6 5.75Z" fill="#B8941F" fillOpacity="0.7" />
          </svg>
          <span className="font-sans text-[13px] text-warmgray">{person.hometown}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <rect x="1" y="3" width="10" height="7" rx="1" stroke="#B8941F" strokeOpacity="0.7" strokeWidth="1" fill="none" />
            <path d="M4 3V2C4 1.45 4.45 1 5 1H7C7.55 1 8 1.45 8 2V3" stroke="#B8941F" strokeOpacity="0.7" strokeWidth="1" />
          </svg>
          <span className="font-sans text-[13px] text-warmgray">{person.profession}</span>
        </div>
      </div>

      {/* About */}
      <p
        className="font-sans text-[13.5px] leading-relaxed text-center text-warmgray"
        style={{ maxWidth: '280px' }}
      >
        {person.about}
      </p>

      {/* Hobby tags */}
      <div className="flex flex-wrap justify-center gap-2">
        {person.hobbies.map((h) => (
          <span
            key={h}
            className="font-sans text-[11px] uppercase tracking-[1.5px] rounded-sm px-2.5 py-1"
            style={{
              border: '1px solid rgba(184,148,31,0.35)',
              color: '#9A7B18',
              background: 'rgba(184,148,31,0.06)',
            }}
          >
            {h}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// CoupleSection
// ---------------------------------------------------------------------------

export function CoupleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      style={{ background: '#FAF6F0', paddingTop: '72px', paddingBottom: '80px' }}
    >
      <div className="mx-auto px-5" style={{ maxWidth: '860px' }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center gap-3 mb-14"
        >
          <span
            className="font-sans text-[10px] uppercase tracking-[4px]"
            style={{ color: '#B8941F' }}
          >
            Meet
          </span>
          <h2
            className="font-serif text-[38px] sm:text-[46px] leading-none text-charcoal text-center"
            style={{ fontWeight: 300 }}
          >
            The Couple
          </h2>
          {/* Ornament */}
          <svg viewBox="0 0 120 18" width="90" height="14" fill="none" aria-hidden="true">
            <path d="M60 5 L64 9 L60 13 L56 9 Z" fill="#C9A84C" fillOpacity="0.6" />
            <path d="M56 9 C48 9 38 5 28 7 C20 8.5 12 11.5 4 9" stroke="#C9A84C" strokeOpacity="0.4" strokeWidth="0.8" />
            <path d="M64 9 C72 9 82 5 92 7 C100 8.5 108 11.5 116 9" stroke="#C9A84C" strokeOpacity="0.4" strokeWidth="0.8" />
            <circle cx="4" cy="9" r="2" fill="#C9A84C" fillOpacity="0.4" />
            <circle cx="116" cy="9" r="2" fill="#C9A84C" fillOpacity="0.4" />
          </svg>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-12 sm:gap-6 md:gap-16">
          <PersonCard person={BRIDE} delay={0.1} />

          {/* Divider (desktop) / ampersand */}
          <div className="hidden sm:flex flex-col items-center justify-center" style={{ paddingTop: '60px', minWidth: '40px' }}>
            <div className="h-16 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(184,148,31,0.3), transparent)' }} />
            <span
              className="font-serif text-[28px] my-2"
              style={{ color: 'rgba(184,148,31,0.4)', lineHeight: 1 }}
            >
              &
            </span>
            <div className="h-16 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(184,148,31,0.3), transparent)' }} />
          </div>

          {/* Mobile ampersand */}
          <div className="flex sm:hidden">
            <span className="font-serif text-[32px]" style={{ color: 'rgba(184,148,31,0.35)' }}>&</span>
          </div>

          <PersonCard person={GROOM} delay={0.25} />
        </div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mt-16 flex flex-col items-center gap-5"
        >
          {/* Section label */}
          <span
            className="font-sans text-[10px] uppercase tracking-[4px]"
            style={{ color: '#B8941F' }}
          >
            Our Story
          </span>

          {/* Opening quote mark */}
          <div
            className="font-serif text-[64px] leading-none select-none"
            style={{ color: 'rgba(184,148,31,0.18)', marginBottom: '-16px' }}
            aria-hidden="true"
          >
            "
          </div>

          <p
            className="font-serif text-[16px] sm:text-[17px] leading-relaxed text-center text-warmgray"
            style={{ maxWidth: '580px', fontStyle: 'italic', fontWeight: 300 }}
          >
            {OUR_STORY}
          </p>

          {/* Thin decorative rule */}
          <div
            className="rounded-full mt-2"
            style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
          />
        </motion.div>

      </div>
    </section>
  );
}
