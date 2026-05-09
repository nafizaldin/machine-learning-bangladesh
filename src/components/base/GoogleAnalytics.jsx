'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const search = useSearchParams()?.toString() || '';
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!GA_ID) return;
    const path = `${pathname}${search ? `?${search}` : ''}`;
    // this fires on every client‑side navigation
    window.gtag?.('config', GA_ID, { page_path: path });
  }, [pathname, search, GA_ID]);

  return null;
}
