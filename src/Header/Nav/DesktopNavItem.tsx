'use client'

import React, { useCallback, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { CMSLink } from '@/components/Link'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { Header as HeaderType } from '@/payload-types'

type NavItem = NonNullable<HeaderType['navItems']>[number]

export const DesktopNavItem: React.FC<{ item: NavItem }> = ({ item }) => {
  const { link, hasSubItems, subItems } = item

  if (!hasSubItems || !subItems?.length) {
    return (
      <CMSLink
        {...link}
        appearance={link.appearance}
        className="text-xs"
      />
    )
  }

  return <DesktopDropdown item={item} />
}

const DesktopDropdown: React.FC<{ item: NavItem }> = ({ item }) => {
  const { label, subItems } = item
  const [open, setOpen] = useState(false)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleOpen = useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    closeTimeout.current = setTimeout(() => {
      setOpen(false)
    }, 150)
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="text-xs flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          type="button"
        >
          {label}
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-auto min-w-[180px] p-2"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        <div className="flex flex-col gap-1">
          {subItems?.map(({ link: subLink }, i) => (
            <CMSLink
              key={i}
              {...subLink}
              appearance="link"
              className="text-xs px-3 py-1.5 rounded-md hover:bg-accent transition-colors"
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
