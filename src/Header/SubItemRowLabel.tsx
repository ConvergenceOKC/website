'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type SubItem = NonNullable<NonNullable<Header['navItems']>[number]['subItems']>[number]

export const SubItemRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<SubItem>()

  const label = data?.data?.link?.label
    ? `Sub item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
    : 'Row'

  return <div>{label}</div>
}
