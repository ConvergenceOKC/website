'use client';

import React, { useEffect, useState } from 'react';

type Heading = {
  id: string;
  text: string;
};

function getHeadings(level: string = '2'): Heading[] {
  const selector = `h${level}[id]`;
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
  return nodes.map((node) => ({
    id: node.id,
    text: node.innerText || node.textContent || '',
  }));
}

export const PageNavigator: React.FC<{ headingLevel?: string }> = ({
  headingLevel = '2',
}) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  // const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setHeadings(getHeadings(headingLevel));
  }, [headingLevel]);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled past the hero section
      const heroElement = document.querySelector('[data-block-type="hero"]');
      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        const hasScrolledPastHero = heroRect.bottom <= 0;
        setIsVisible(hasScrolledPastHero);
      } else {
        // Fallback: show after scrolling down a certain amount
        setIsVisible(window.scrollY > 300);
      }

      // Find active heading - account for scroll margin
      const headingElements = headings.map((h) =>
        document.getElementById(h.id),
      );
      let currentId: string | null = null;

      // Get the scroll margin value (assuming it's consistent across headings)
      const scrollMarginTop =
        headingElements[0] &&
        (parseInt(getComputedStyle(headingElements[0]).scrollMarginTop) || 100);

      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          // Use scroll margin instead of fixed 100px offset
          if (rect.top <= (scrollMarginTop || 100)) {
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
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update active state immediately after click to provide instant feedback
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav
      className={`fixed top-20 right-4 z-50 max-h-[80vh] w-[300px] overflow-y-auto border-l border-gray-200 bg-white p-4 transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-label="Page sections"
    >
      <ul className="m-0 list-none p-0">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => handleClick(heading.id)}
              className={`w-full cursor-pointer border-none bg-none px-0 py-2 text-left ${
                activeId === heading.id
                  ? 'font-bold text-blue-600'
                  : 'font-normal text-gray-800'
              }`}
              aria-current={activeId === heading.id ? 'true' : undefined}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
