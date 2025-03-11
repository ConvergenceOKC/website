import { revalidatePath } from 'next/cache'

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateMap: CollectionAfterChangeHook = ({
  doc,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating map`)
    revalidatePath('/map')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating map`)
    revalidatePath('/map')
  }

  return doc
}