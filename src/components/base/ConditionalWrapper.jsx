'use client';
import { usePathname } from 'next/navigation';

export default function ConditionalWrapper({ children, showOndashboard }) {
  const pathname = usePathname();
  // If the current path starts with '/auth', do not render the children
  if (pathname.startsWith('/orifine-admin') || pathname.startsWith('/forget-password') || pathname.startsWith('/admin') && !showOndashboard) {
    return null;
  };
  return <>{children}</>;
}