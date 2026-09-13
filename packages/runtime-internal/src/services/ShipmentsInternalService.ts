import type { IterableShipments, ShipmentsService } from '@fedex-prism/runtime-core'
import type { Shipment } from '@fedex-prism/runtime-core'

export class ShipmentsInternalService implements ShipmentsService {
  async readAllShipments(nextToken?: string): Promise<IterableShipments> {
    const shipments: Shipment[] = [{ id: '1234567890' }]

    return nextToken === undefined ? { shipments } : { shipments, nextToken }
  }

  async readShipmentByTrackId(trackId: string): Promise<ShipmentDetail | null> {
    return { id: trackId, events: [] }
  }
}