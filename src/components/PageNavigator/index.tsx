'use client';

import React, { useEffect, useState } from 'react';

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
  const selector = `h${level}`;
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
  const seenIds = new Set<string>();
  const results: Heading[] = [];

  nodes.forEach((node, index) => {
    // Generate an ID if the heading doesn't have one
    if (!node.id) {
      let baseId = `heading-${level}-${index}`;
      let counter = 0;

      // Ensure unique ID by checking the DOM directly
      while (document.getElementById(baseId)) {
        counter++;
        baseId = `heading-${level}-${index}-${counter}`;
      }

      node.id = baseId;
    }

    // Apply scroll margin if the heading doesn't have it
    const computedStyle = getComputedStyle(node);
    if (
      !computedStyle.scrollMarginTop ||
      computedStyle.scrollMarginTop === '0px'
    ) {
      node.style.scrollMarginTop = '8rem'; // Default scroll margin
    }

    // Only add if we haven't seen this ID in this scan and it's not already in results
    if (!seenIds.has(node.id) && !results.some((h) => h.id === node.id)) {
      seenIds.add(node.id);
      results.push({
        id: node.id,
        text: node.innerText || node.textContent || '',
      });
    }
  });

  return results;
}

export const PageNavigator: React.FC<PageNavigatorProps> = ({
  headingLevel = '2',
}) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateHeadings = () => {
      setHeadings(getHeadings(headingLevel));
    };

    // Initial scan
    updateHeadings();

    // Watch for new heading tags being added
    const observer = new MutationObserver((mutations) => {
      const headingSelector = `h${headingLevel}`; // Any heading of the specified level
      let shouldUpdate = false;

      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // Check if the added node is a heading or contains headings
            if (
              element.matches?.(headingSelector) ||
              element.querySelector?.(headingSelector)
            ) {
              shouldUpdate = true;
              break;
            }
          }
        }
        if (shouldUpdate) break;
      }

      if (shouldUpdate) {
        console.log('New headings detected, updating...'); // Debug log
        updateHeadings();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [headingLevel, isClient]);

  useEffect(() => {
    if (!isClient) return;

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
        hasScrolledToFooter = footerRect.top <= 300;
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
          // Adjusted for scroll margin
          if (rect.top <= 130) {
            currentId = el.id;
          }
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings, isClient]);

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

  if (!isClient || headings.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-32 z-50 container hidden justify-end xl:flex">
      <nav
        className={`pointer-events-auto relative max-h-[80vh] w-[350px] overflow-y-auto p-10 transition-opacity duration-300 ease-in-out ${
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
                className={`h-auto cursor-pointer pl-1 text-left text-sm whitespace-normal underline-offset-4 ${
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
