'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'

type NavItem = NonNullable<HeaderType['navItems']>[number]

export const MobileNavItem: React.FC<{ item: NavItem }> = ({ item }) => {
  const { link, hasSubItems, subItems } = item
  const [expanded, setExpanded] = useState(false)

  if (!hasSubItems || !subItems?.length) {
    return (
      <CMSLink
        {...link}
        appearance={link.appearance}
        className="text-convergence-beige justify-center py-2 text-xs"
      />
    )
  }

  // Determine if the parent link itself has a URL
  const parentHasUrl =
    (link.type === 'reference' && link.reference) ||
    (link.type === 'custom' && link.url)

  return (
    <div>
      <button
        className="text-convergence-beige flex w-full items-center justify-center gap-1 py-2 text-xs bg-transparent border-none font-inherit text-inherit cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        type="button"
        aria-expanded={expanded}
      >
        {link.label}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-2 pl-4 pb-2">
          {parentHasUrl && (
            <CMSLink
              {...link}
              appearance="link"
              className="text-convergence-beige justify-center py-1 text-xs opacity-80"
            />
          )}
          {subItems.map(({ link: subLink }, i) => (
            <CMSLink
              key={i}
              {...subLink}
              appearance="link"
              className="text-convergence-beige justify-center py-1 text-xs opacity-80"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
