'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface VenueEvent {
  venue_name: string;
  venue_address: string;
  venue_lat: number;
  venue_lng: number;
  maps_url?: string;
}

export interface VenueSectionProps {
  events: VenueEvent[];
}

interface Venue {
  name: string;
  address: string;
  lat: number;
  lng: number;
  maps_url?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function deduplicateVenues(events: VenueEvent[]): Venue[] {
  return Array.from(
    new Map(
      events
        .filter((e) => e.venue_name)
        .map((e) => [
          e.venue_name,
          {
            name: e.venue_name,
            address: e.venue_address,
            lat: e.venue_lat,
            lng: e.venue_lng,
            maps_url: e.maps_url,
          },
        ]),
    ).values(),
  );
}

function mapsUrl(venue: Venue) {
  return venue.maps_url ?? `https://maps.google.com/?q=${encodeURIComponent(venue.name)}&ll=${venue.lat},${venue.lng}`;
}

// ---------------------------------------------------------------------------
// SmallOrnament — matches EventTimeline's 60px version
// ---------------------------------------------------------------------------

function SmallOrnament() {
  return (
    <svg
      viewBox="0 0 60 18"
      width="60"
      height="18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M30 5 L33.5 9 L30 13 L26.5 9 Z" fill="currentColor" />
      <path
        d="M26.5 9 C21 9 15.5 5.5 10 7.5 C6 9 3 11 2 9"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <path
        d="M33.5 9 C39 9 44.5 5.5 50 7.5 C54 9 57 11 58 9"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <circle cx="2" cy="9" r="1.5" fill="currentColor" />
      <circle cx="58" cy="9" r="1.5" fill="currentColor" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// MapPin — location marker icon
// ---------------------------------------------------------------------------

function MapPin() {
  return (
    <svg
      viewBox="0 0 24 32"
      width="32"
      height="42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Drop shadow blob */}
      <ellipse cx="12" cy="30" rx="5" ry="2" fill="#C9A84C" opacity="0.18" />
      {/* Pin body */}
      <path
        d="M12 1C7.029 1 3 5.029 3 10c0 6.627 9 21 9 21S21 16.627 21 10c0-4.971-4.029-9-9-9z"
        fill="#C9A84C"
        fillOpacity="0.15"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Inner circle */}
      <circle cx="12" cy="10" r="3.5" fill="#C9A84C" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// ExternalArrow
// ---------------------------------------------------------------------------

function ExternalArrow() {
  return (
    <svg
      viewBox="0 0 12 12"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 10 L10 2" />
      <path d="M4.5 2 L10 2 L10 7.5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// MapPlaceholder — decorative area standing in for the map embed
// ---------------------------------------------------------------------------

function MapPlaceholder({ venue }: { venue: Venue }) {
  const url = mapsUrl(venue);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${venue.name} in Google Maps`}
      className="group relative flex aspect-[16/8] w-full items-center justify-center overflow-hidden transition-all duration-500 hover:scale-[1.02]"
      style={{ background: 'linear-gradient(135deg, #FBF7EF 0%, #F5EBDA 100%)' }}
    >
      {/* Editorial map pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(circle at 70% 30%, rgba(201,168,76,0.12) 0%, transparent 40%),
            radial-gradient(circle at 30% 70%, rgba(201,168,76,0.1) 0%, transparent 35%),
            radial-gradient(circle at 50% 50%, transparent 18%, rgba(201,168,76,0.1) 18.5%, rgba(201,168,76,0.1) 36%,
              transparent 36.5%, transparent 54%, rgba(201,168,76,0.1) 54.5%, rgba(201,168,76,0.1) 72%, transparent 72.5%)
          `,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />

      {/* Pin + label with floating animation */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <motion.div
          animate={{ 
            y: [0, -8, 0],
            filter: ["drop-shadow(0 4px 6px rgba(160,130,50,0.1))", "drop-shadow(0 12px 18px rgba(160,130,50,0.25))", "drop-shadow(0 4px 6px rgba(160,130,50,0.1))"]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ willChange: 'transform, filter' }}
        >
          <MapPin />
        </motion.div>
        
        <motion.span
          className="flex items-center gap-2 rounded-full border border-gold-300 bg-white/90 px-4 py-1.5 font-sans text-[11px] font-medium text-gold-700 shadow-lg backdrop-blur-sm transition-all group-hover:border-gold-400 group-hover:bg-white group-hover:shadow-gold-200/40"
          style={{ letterSpacing: '1px', textTransform: 'uppercase' }}
        >
          Open in Maps
          <ExternalArrow />
        </motion.span>
      </div>
    </a>
  );
}

// ---------------------------------------------------------------------------
// VenueCard
// ---------------------------------------------------------------------------

function VenueCard({ venue, index }: { venue: Venue; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const url = mapsUrl(venue);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -5 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 1.2, delay: index * 0.2, ease: EASE }}
      whileHover={{ y: -12, boxShadow: '0 30px 60px rgba(201,168,76,0.15), 0 10px 20px rgba(0,0,0,0.08)' }}
      className="group overflow-hidden rounded-[12px] border border-white/80 bg-white/60 shadow-xl backdrop-blur-xl"
      style={{ 
        perspective: '1000px',
        willChange: 'transform, box-shadow',
        boxShadow: '0 12px 48px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.8)'
      }}
    >
      <MapPlaceholder venue={venue} />

      {/* Card body with clear, elegant typography */}
      <div className="relative px-7 py-7">
        {/* Subtle accent icon */}
        <div className="absolute top-7 right-7 opacity-[0.15] text-gold-600 transition-opacity group-hover:opacity-[0.25]">
          <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.373 0 0 5.373 0 12C0 21 12 32 12 32C12 32 24 21 24 12C24 5.373 18.627 0 12 0ZM12 16.5C9.5147 16.5 7.5 14.4853 7.5 12C7.5 9.5147 9.5147 7.5 12 7.5C14.4853 7.5 16.5 9.5147 16.5 12C16.5 14.4853 14.4853 16.5 12 16.5Z" fill="currentColor"/>
          </svg>
        </div>

        <h3
          className="mb-1 font-serif font-light text-zinc-900"
          style={{ fontSize: 'clamp(1.25rem, 4vw, 1.6rem)', lineHeight: 1.25 }}
        >
          {venue.name}
        </h3>

        <p className="mb-6 font-sans text-[13px] leading-relaxed text-zinc-600/80 max-w-[90%]">
          {venue.address}
        </p>

        {/* Decorative divider */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-5 bg-gold-300" />
          <div className="h-1 w-1 rotate-45 bg-gold-400" />
          <div className="h-px flex-1 bg-gold-100" />
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-zinc-900 px-6 py-3 font-sans text-[11px] font-medium uppercase tracking-[2px] text-white transition-all hover:bg-zinc-800 active:scale-[0.96]"
        >
          <span className="relative z-10">Get Directions</span>
          <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
          <motion.div 
            className="absolute inset-0 z-0 bg-gold-500/10 opacity-0 transition-opacity group-hover:opacity-100" 
            style={{ filter: 'blur(10px)' }}
          />
        </a>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// VenueSection (main export)
// ---------------------------------------------------------------------------

export function VenueSection({ events }: VenueSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  const venues = deduplicateVenues(events);

  if (venues.length === 0) return null;

  const isSingle = venues.length === 1;

  return (
    <section className="relative overflow-hidden bg-[#FBFBF9] py-24 sm:py-[160px]">
      
      {/* ── Rich Ambient Background ── */}
      <div 
        className="pointer-events-none absolute left-[-15%] top-[-5%] h-[60vh] w-[60vh] rounded-full opacity-[0.4]"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      <div 
        className="pointer-events-none absolute right-[-10%] bottom-[-5%] h-[70vh] w-[70vh] rounded-full opacity-[0.3]"
        style={{ background: 'radial-gradient(circle, rgba(160,130,50,0.12) 0%, transparent 70%)', filter: 'blur(100px)' }}
      />
      
      {/* Floating floral silhouettes (abstract) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]">
        <svg viewBox="0 0 800 800" className="absolute top-0 right-0 h-full w-auto">
          <circle cx="600" cy="200" r="150" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
          <circle cx="650" cy="250" r="120" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
          <path d="M400,0 Q600,200 800,0" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* ── Section header ───────────────────────────────────────────────── */}
      <div
        ref={headerRef}
        className="relative z-10 mb-16 flex flex-col items-center gap-5 px-6 text-center sm:mb-24"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={headerInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: EASE }}
          className="mb-2"
        >
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[5px] text-gold-500">The Location</span>
        </motion.div>

        <motion.h2
          className="font-serif font-light text-zinc-900"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        >
          Find Your Way
        </motion.h2>

        <motion.div
          className="text-gold-300"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={headerInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-200" />
            <SmallOrnament />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-200" />
          </div>
        </motion.div>

        <motion.p
          className="max-w-[460px] font-sans text-[15px] leading-relaxed text-zinc-500"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
        >
          {isSingle 
            ? 'We are so excited to celebrate our special day with you at this beautiful venue.' 
            : 'Join us across these carefully chosen locations as we celebrate our new beginning.'}
        </motion.p>
      </div>

      {/* ── Venue cards ──────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto px-6" style={{ maxWidth: isSingle ? '680px' : '1100px' }}>
        <div
          className={
            isSingle
              ? ''
              : 'grid grid-cols-1 gap-10 sm:grid-cols-2'
          }
        >
          {venues.map((venue, i) => (
            <VenueCard key={venue.name} venue={venue} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom decorative ornament */}
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 opacity-[0.1] text-gold-500">
        <svg width="400" height="100" viewBox="0 0 400 100" fill="none">
           <path d="M0,50 C100,20 300,80 400,50" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

    </section>
  );
}
