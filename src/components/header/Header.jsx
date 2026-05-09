'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileSidebar from './MobileSidebar';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/resources', label: 'Resources' },
];

const Header = () => {
  const pathname = usePathname();
  const headerRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const handleScroll = () => {
      if (window.scrollY > 20) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href);

  return (
    <>
      <header ref={headerRef} className="mlb-header">
        <div className="mlb-header-inner component-gap-x">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.png"
              alt="ML Bangladesh"
              width={160}
              height={47}
              className="object-contain h-10 w-auto"
              priority
            />
          </Link>

          <nav className="mlb-nav hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map(({ href, label }) => (
                <li key={href} className="list-none">
                  <Link
                    href={href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive(href)
                        ? 'text-[#4285F4] font-semibold'
                        : 'text-[#5f6368] hover:text-[#202124]'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#4285F4] text-white font-medium px-5 py-2.5 rounded-lg hover:bg-[#1967d2] transition-colors duration-200 text-sm"
            >
              Join Us
            </Link>
          </div>

          <button
            className="md:hidden flex items-center justify-center p-2 text-[#5f6368]"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
