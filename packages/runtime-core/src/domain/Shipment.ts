import {z} from 'zod'
import { ShipmentStatusEnum } from './ShipmentStatus'
import { ScanEventSchema } from './ScanEvent'

export const ShipmentSchema = z.object({
  id: z.string(),
  status: ShipmentStatusEnum.optional()
})

export type Shipment = z.infer<typeof ShipmentSchema>

export const ShipmentDetailSchema = ShipmentSchema.extend({
  events: z.array(ScanEventSchema)
})

export type ShipmentDetail = z.infer<typeof ShipmentDetailSchema>