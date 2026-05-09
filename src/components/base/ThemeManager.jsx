'use client';

import { useEffect } from 'react';
import { useSnapshot, subscribe } from 'valtio';
import { themeStore } from '@/store/themeStore';

export function ThemeManager() {
  const snap = useSnapshot(themeStore);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', snap.mode);
  }, [snap.mode]);

  useEffect(() => {
    const unsubscribe = subscribe(themeStore, () => {
      const m = themeStore.mode;
      document.cookie = `themeMode=${m}; path=/; max-age=${60 * 60 * 24 * 365}`;
    });
    return () => unsubscribe();
  }, []);

  return null;
}