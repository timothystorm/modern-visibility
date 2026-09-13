import { CoreRuntimeContract, type RuntimeContract, type ShipmentsService } from '@fedex-prism/runtime-core'

export class RuntimeInternal extends CoreRuntimeContract {
  private shipmentsService?: Promise<ShipmentsService>

  override getShipmentsService(): Promise<ShipmentsService> {
    return (this.shipmentsService ??= import('./services/ShipmentsInternalService').then(
      ({ ShipmentsInternalService }) => new ShipmentsInternalService(),
    ))
  }
}

export function createFdxRuntimeInternal(): RuntimeContract {
  console.debug(`☑️ Creating FedEx Runtime Internal`)
  return new RuntimeInternal()
}