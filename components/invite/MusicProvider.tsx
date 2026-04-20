'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface MusicContextValue {
  isPlaying: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  togglePlay: () => void;
}

const MusicContext = createContext<MusicContextValue>({
  isPlaying: false, isMuted: false, toggleMute: () => {}, togglePlay: () => {},
});

export function useMusicContext() { return useContext(MusicContext); }

const VOLUME = 0.3;
const FADE_DURATION_MS = 2000;
const FADE_STEP_MS = 50;
const UNLOCK_EVENTS = ['click', 'touchstart'] as const;

export function MusicProvider({ children, url }: { children: React.ReactNode; url?: string }) {
  const audioRef         = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const isStartingRef    = useRef(false);
  const unlockHandlerRef = useRef<(() => void) | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted,   setIsMuted]   = useState(false);

  useEffect(() => {
    // If url is provided and starts with /uploads, use it. Otherwise fallback to default.
    let musicSrc = '/music/wedding-bg.mp3';
    if (url && url.startsWith('/uploads/')) {
      musicSrc = url;
    } else if (url) {
      musicSrc = url;
    }
    const audio = new Audio(musicSrc);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audio.addEventListener('error', () => {});
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ''; };
  }, [url]);

  const removeUnlockListeners = useCallback(() => {
    if (unlockHandlerRef.current) {
      UNLOCK_EVENTS.forEach((e) => window.removeEventListener(e, unlockHandlerRef.current!));
      unlockHandlerRef.current = null;
    }
  }, []);

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    const steps = FADE_DURATION_MS / FADE_STEP_MS;
    const increment = VOLUME / steps;
    audio.volume = 0;
    fadeTimerRef.current = setInterval(() => {
      if (!audioRef.current) return;
      const next = Math.min(audioRef.current.volume + increment, VOLUME);
      audioRef.current.volume = next;
      if (next >= VOLUME) { clearInterval(fadeTimerRef.current!); fadeTimerRef.current = null; }
    }, FADE_STEP_MS);
  }, []);

  const startMusicFromGesture = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || isStartingRef.current || isPlaying) return;
    isStartingRef.current = true;
    audio.play()
      .then(() => { setIsPlaying(true); fadeIn(); removeUnlockListeners(); })
      .catch(() => { isStartingRef.current = false; });
  }, [fadeIn, isPlaying, removeUnlockListeners]);

  useEffect(() => {
    const handler = () => startMusicFromGesture();
    unlockHandlerRef.current = handler;
    UNLOCK_EVENTS.forEach((e) => window.addEventListener(e, handler, { passive: true }));
    return () => removeUnlockListeners();
  }, [startMusicFromGesture, removeUnlockListeners]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      isStartingRef.current = true;
      audio.play()
        .then(() => { setIsPlaying(true); fadeIn(); removeUnlockListeners(); isStartingRef.current = false; })
        .catch(() => { isStartingRef.current = false; });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [fadeIn, removeUnlockListeners]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }, []);

  return (
    <MusicContext.Provider value={{ isPlaying, isMuted, toggleMute, togglePlay }}>
      {children}
    </MusicContext.Provider>
  );
}
