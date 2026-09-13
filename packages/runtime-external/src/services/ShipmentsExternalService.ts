import type { IterableShipments, ShipmentsService } from '@fedex-prism/runtime-core'
import type { Shipment } from '@fedex-prism/runtime-core'

export class ShipmentsExternalService implements ShipmentsService {
  async readNextShipments(nextToken?: string): Promise<IterableShipments> {
    const shipments: Shipment[] = [{ id: '0000000000' }]

    return nextToken === undefined ? { shipments } : { shipments, nextToken }
  }

  async readShipment(shipmentId: string): Promise<Shipment> {
    return { id: shipmentId }
  }
}