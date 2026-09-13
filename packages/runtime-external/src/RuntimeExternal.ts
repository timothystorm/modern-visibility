import type { RuntimeContract, ShipmentsService } from '@fedex-prism/runtime-core'

export class RuntimeExternal implements RuntimeContract {
  private shipmentsService?: Promise<ShipmentsService>

  getShipmentsService(): Promise<ShipmentsService> {
    return (this.shipmentsService ??= import('./services/ShipmentsExternalService').then(
        ({ ShipmentsExternalService }) => new ShipmentsExternalService(),
    ))
  }
}

export function createFdxRuntimeExternal(): RuntimeContract {
  return new RuntimeExternal()
}