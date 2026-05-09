'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/resources', label: 'Resources' },
];

const MobileSidebar = ({ open, onClose }) => {
  const pathname = usePathname();

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href);

  return (
    <div className="mobile-sidebar hidden">
      <div
        className={`overlay ${open ? 'open' : 'closed'}`}
        onClick={onClose}
      >
        <div className="backdrop" />

        <div
          className={`sidebar ${open ? 'open' : 'closed'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sidebarInner">
            <div className="closeBtnWrapper">
              <button onClick={onClose} className="closeBtn" aria-label="Close menu">
                &times;
              </button>
            </div>

            <nav>
              <ul className="navList">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`navLink ${isActive(href) ? 'active' : ''}`}
                      onClick={onClose}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8">
              <Link
                href="/contact"
                onClick={onClose}
                className="block w-full text-center bg-[#4285F4] text-white font-medium px-5 py-3 rounded-lg hover:bg-[#1967d2] transition-colors duration-200"
              >
                Join Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
