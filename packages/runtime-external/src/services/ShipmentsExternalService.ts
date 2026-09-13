import type { IterableShipments, ShipmentsService } from '@fedex-prism/runtime-core'
import type { Shipment } from '@fedex-prism/runtime-core'

export class ShipmentsExternalService implements ShipmentsService {
  async readAllShipments(nextToken?: string): Promise<IterableShipments> {
    const shipments: Shipment[] = [{ id: '0000000000' }]

    return nextToken === undefined ? { shipments } : { shipments, nextToken }
  }

  async readShipmentByTrackId(trackId: string): Promise<ShipmentDetail | null> {
    return { id: trackId, events: [] }
  }
}