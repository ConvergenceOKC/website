'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { CMSLink } from '@/components/Link';
import type { Header as HeaderType } from '@/payload-types';

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || [];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink
              key={i}
              {...link}
              appearance={link.appearance}
              className="text-xs text-inherit hover:opacity-70 transition-opacity"
            />
          );
        })}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center w-8 h-8 text-inherit hover:opacity-70 transition-opacity text-lg font-normal"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu */}
          <nav className="fixed top-16 md:top-[7.375rem] left-0 right-0 bg-inherit border-t border-current/20 z-50 md:hidden">
            <div className="container py-4">
              <div className="flex flex-col gap-4">
                {navItems.map(({ link }, i) => {
                  return (
                    <CMSLink
                      key={i}
                      {...link}
                      appearance={link.appearance}
                      className="text-xs text-inherit hover:opacity-70 transition-opacity py-2 border-b border-current/10 last:border-b-0"
                    />
                  );
                })}
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};
