'use client';

import React, { useEffect, useState } from 'react';

import { set } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { cn } from '@/utilities/ui';

type Heading = {
  id: string;
  text: string;
};

type PageNavigatorProps = {
  headingLevel?: string;
};

function getHeadings(level: string = '2'): Heading[] {
  const selector = `h${level}[id]`;
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
  return nodes.map((node) => ({
    id: node.id,
    text: node.innerText || node.textContent || '',
  }));
}

export const PageNavigator: React.FC<PageNavigatorProps> = ({
  headingLevel = '2',
}) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setHeadings(getHeadings(headingLevel));
  }, [headingLevel]);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled past the hero section
      const heroElement = document.querySelector('[data-block-type="hero"]');
      let hasScrolledPastHero = false;
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        hasScrolledPastHero = heroRect.bottom <= 200;
      } else {
        // Fallback: show after scrolling down a certain amount
        hasScrolledPastHero = window.scrollY > 300;
      }

      // Check if user has scrolled to footer and hide if so
      const footerElement = document.querySelector('footer');
      let hasScrolledToFooter = false;
      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();
        hasScrolledToFooter = footerRect.top <= 400;
      }

      // Only show if past hero and not at footer
      setIsVisible(hasScrolledPastHero && !hasScrolledToFooter);

      // Find active heading - account for scroll margin
      const headingElements = headings.map((h) =>
        document.getElementById(h.id),
      );
      let currentId: string | null = null;

      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300) {
            currentId = el.id;
          }
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      // Update active state immediately after click to provide instant feedback
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-32 z-50 container hidden justify-end xl:flex">
      <nav
        className={`pointer-events-auto relative w-[350px] overflow-y-auto p-10 transition-opacity duration-300 ease-in-out ${
          isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-label="Page sections"
      >
        <div className="bg-convergence-beige/70 absolute inset-0 backdrop-blur-sm" />
        {/* <div className="bg-convergence-beige absolute inset-0 bg-[url('/images/bg-pattern-white-green.jpg')] bg-cover opacity-80 bg-blend-multiply" /> */}
        <ul className="relative z-10 m-0 list-disc p-0">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={cn(
                'marker:text-convergence-burnt-orange',
                activeId === heading.id ? '' : 'list-none',
              )}
            >
              <Button
                variant={'link'}
                onClick={() => handleClick(heading.id)}
                className={`cursor-pointer pl-1 text-sm underline-offset-4 ${
                  activeId === heading.id
                    ? 'text-convergence-burnt-orange decoration-convergence-burnt-orange font-bold'
                    : 'text-convergence-brown font-normal'
                }`}
                aria-current={activeId === heading.id ? 'true' : undefined}
              >
                {heading.text}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
