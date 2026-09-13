import { z } from 'zod'
import { ShipmentStatusEnum } from './ShipmentStatus'

export const ScanEventSchema = z.object({
  datetime: z.iso.datetime(),
  status: ShipmentStatusEnum,
})

export type ScanEvent = z.infer<typeof ScanEventSchema>