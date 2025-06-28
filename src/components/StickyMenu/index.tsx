import React, { ReactNode, useEffect, useState } from 'react';

// Ensure JSX namespace is available for type checking

interface StickyMenuProps {
  headingTag: keyof JSX.IntrinsicElements; // e.g., 'h2', 'h3'
  extraContent?: ReactNode;
  contentSelector?: string; // Optional: CSS selector for the content section
}

interface HeadingInfo {
  id: string;
  text: string;
}

const StickyMenu: React.FC<StickyMenuProps> = ({
  headingTag,
  extraContent,
  contentSelector = 'main', // Default to <main> as content section
}) => {
  const [headings, setHeadings] = useState<HeadingInfo[]>([]);

  useEffect(() => {
    const contentRoot =
      document.querySelector(contentSelector) || document.body;
    const nodes = Array.from(contentRoot.getElementsByTagName(headingTag));
    const headingList: HeadingInfo[] = nodes.map((node, idx) => {
      let id = node.id;
      if (!id) {
        id = `sticky-menu-heading-${headingTag}-${idx}`;
        node.id = id;
      }
      return {
        id,
        text: node.textContent || `(${headingTag})`,
      };
    });
    setHeadings(headingList);
  }, [headingTag, contentSelector]);

  return (
    <nav
      className="sticky top-0 z-[100] flex w-60 flex-col gap-2 self-start rounded-lg border border-gray-200 bg-white p-4 shadow-md"
      aria-label="Page section navigation"
    >
      <div className="flex flex-col gap-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className="rounded px-2 py-1 text-base text-gray-800 no-underline transition-colors duration-200 hover:bg-gray-100 focus:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(heading.id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.location.hash = `#${heading.id}`;
              }
            }}
          >
            {heading.text}
          </a>
        ))}
      </div>
      {extraContent && <div className="mt-4">{extraContent}</div>}
    </nav>
  );
};

export default StickyMenu;
