import type { IterableShipments, ShipmentsService } from '@fedex-prism/runtime-core'
import type { Shipment } from '@fedex-prism/runtime-core'

export class ShipmentsInternalService implements ShipmentsService {
  async readNextShipments(nextToken?: string): Promise<IterableShipments> {
    const shipments: Shipment[] = [{ id: '1234567890' }]

    return nextToken === undefined ? { shipments } : { shipments, nextToken }
  }

  async readShipment(shipmentId: string): Promise<Shipment> {
    return { id: shipmentId }
  }
}