'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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
      <nav className="hidden items-center gap-6 md:flex">
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink
              key={i}
              {...link}
              appearance={link.appearance}
              className="text-xs transition-opacity hover:opacity-70"
            />
          );
        })}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="z-50 flex h-8 w-8 items-center justify-center text-lg font-normal text-inherit transition-opacity hover:opacity-70 md:hidden"
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
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md md:hidden"
            onClick={closeMobileMenu}
          />

          {/* Mobile Menu */}
          <nav className="fixed top-16 right-0 left-0 z-50 border-t border-current/20 bg-inherit md:top-[7.375rem] md:hidden">
            <div className="container py-4">
              <div className="flex flex-col gap-4">
                {navItems.map(({ link }, i) => {
                  return (
                    <CMSLink
                      key={i}
                      {...link}
                      appearance={link.appearance}
                      className="justify-center py-2 text-xs text-inherit transition-opacity hover:opacity-70"
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
