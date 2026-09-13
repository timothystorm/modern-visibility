import type { RuntimeContract, ShipmentsService } from '@fedex-prism/runtime-core'

export class RuntimeInternal implements RuntimeContract {
  private shipmentsService?: Promise<ShipmentsService>

  getShipmentsService(): Promise<ShipmentsService> {
    return (this.shipmentsService ??= import('./services/ShipmentsInternalService').then(
      ({ ShipmentsInternalService }) => new ShipmentsInternalService(),
    ))
  }
}

export function createFdxRuntimeInternal(): RuntimeContract {
  return new RuntimeInternal()
}