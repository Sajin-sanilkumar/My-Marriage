import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: 'linear-gradient(160deg, #FAF6F0 0%, #F5EFE6 100%)' }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-4 rounded-[2px] border border-gold-300/35 sm:inset-6" />
      <p className="mb-6 font-sans text-[11px] uppercase tracking-[5px] text-warmgray/60">404</p>
      <div className="mb-6 h-px w-10 bg-gold-300" />
      <h1 className="font-serif font-light text-charcoal" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
        Invitation Not Found
      </h1>
      <p className="mx-auto mt-4 max-w-[280px] font-sans text-[14px] leading-relaxed text-warmgray">
        This invitation link may have expired or the address is incorrect.
      </p>
      <div className="my-8 h-px w-10 bg-gold-300" />
      <Link href="/" className="group font-sans text-[12px] uppercase tracking-[3px] text-gold-500 transition-colors hover:text-gold-400">
        View Invitation
        <span className="ml-1 inline-block transition-transform duration-150 group-hover:translate-x-0.5">→</span>
      </Link>
    </main>
  );
}
