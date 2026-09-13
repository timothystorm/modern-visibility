import { z } from 'zod'

export const ShipmentSchema = z.object({
  id: z.string()
})

export type Shipment = z.infer<typeof ShipmentSchema>
