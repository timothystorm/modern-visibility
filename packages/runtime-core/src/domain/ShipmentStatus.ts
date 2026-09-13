import { z } from 'zod'

export const ShipmentStatusEnum = z.enum([
  'LabelCreated',
  'InTransit',
  'OutForDelivery',
  'Delivered',
  'Exception'
])

export type ShipmentStatus = z.infer<typeof ShipmentStatusEnum>