'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const hasSubItems = data?.data?.hasSubItems
  const suffix = hasSubItems ? ' (dropdown)' : ''
  const displayLabel = hasSubItems ? data?.data?.label : data?.data?.link?.label
  const label = displayLabel
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${displayLabel}${suffix}`
    : 'Row'

  return <div>{label}</div>
}
