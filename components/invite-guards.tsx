'use client';

import { usePathname } from 'next/navigation';
import { LoadingScreen } from '@/components/invite/LoadingScreen';
import { MusicProvider } from '@/components/invite/MusicProvider';
import { MusicToggle } from '@/components/invite/MusicToggle';

const ADMIN_PREFIXES = ['/admin', '/login', '/api'];

function isAdminPath(pathname: string) {
  return ADMIN_PREFIXES.some((p) => pathname.startsWith(p));
}

export function InviteLoadingGuard({ monogram, tagline }: { monogram: string; tagline?: string }) {
  const pathname = usePathname();
  if (isAdminPath(pathname)) return null;
  return <LoadingScreen monogram={monogram} tagline={tagline} />;
}

export function InviteMusicGuard({ children, musicUrl }: { children: React.ReactNode; musicUrl?: string }) {
  const pathname = usePathname();
  if (isAdminPath(pathname)) return <>{children}</>;
  return (
    <MusicProvider url={musicUrl}>
      {children}
      <MusicToggle />
    </MusicProvider>
  );
}
