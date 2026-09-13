import {CoreRuntimeContract} from '@fedex-prism/runtime-core'

export interface RuntimeExternalOptions {
  client_id: string
  grant_type?: string | 'client_credentials'
}

export class RuntimeExternal extends CoreRuntimeContract {
  private shipmentsService?: Promise<ShipmentsService>

  override getShipmentsService(): Promise<ShipmentsService> {
    return (this.shipmentsService ??= import('./services/ShipmentsExternalService').then(
        ({ShipmentsExternalService}) => new ShipmentsExternalService(),
    ))
  }
}

export function createFdxRuntimeExternal(options: RuntimeExternalOptions): RuntimeContract {
  console.log(`⚠️ Creating FedEx Runtime External with client_id: ${options.client_id}`)
  return new RuntimeExternal()
}