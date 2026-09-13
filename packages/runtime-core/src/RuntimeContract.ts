import type {ShipmentsService} from './services/ShipmentsService'
import {UiIntent} from './intent/UiIntent'

export interface RuntimeContract {
  getUiIntent(): UiIntent
  getShipmentsService(): Promise<ShipmentsService>
}

/**
 * The RuntimeContract interface defines the contract for the FedEx Visibility Runtime. It provides access to various
 * services.
 */
export abstract class CoreRuntimeContract implements RuntimeContract {
  private _uiIntent?: UiIntent

  getUiIntent(): UiIntent {
    return (this._uiIntent ??= new UiIntent())
  }

  abstract getShipmentsService(): Promise<ShipmentsService>
}

// The RUNTIME_KEY symbol is used to store the runtime instance in the global scope. It is a unique symbol to avoid
// potential naming collisions with other global properties.
const RUNTIME_KEY = Symbol.for('@fedex-prism/visibility-runtime.v1')

// The RuntimeGlobal type extends the globalThis type to include an optional property for the FedEx Visibility Runtime.
// This allows us to safely access the runtime instance from the global scope without TypeScript errors.
type RuntimeGlobal = typeof globalThis & { [RUNTIME_KEY]?: Promise<RuntimeContract> }

/**
 * Retrieves the FedEx Visibility Runtime from the global scope. If the runtime has not been initialized, an error is
 * thrown.
 *
 * @return A promise that resolves to the runtime instance.
 */
export function getFdxRuntime(): Promise<RuntimeContract> {
  const runtime = (globalThis as RuntimeGlobal)[RUNTIME_KEY]
  if (!runtime) {
    throw new Error('FedEx Runtime has not been initialized.')
  }
  return runtime
}

/**
 * Installs the FedEx Runtime into the global scope. This function should be called once during application
 * initialization.
 *
 * @param runtime - The runtime instance or a promise that resolves to the runtime instance.
 */
export function installFdxRuntime(runtime: RuntimeContract | Promise<RuntimeContract>): void {
  const globalRuntime = globalThis as RuntimeGlobal
  if (globalRuntime[RUNTIME_KEY]) {
    throw new Error('FedEx Runtime has already been initialized.')
  }
  globalRuntime[RUNTIME_KEY] = Promise.resolve(runtime)
}

// The RuntimeOverrides type is a partial version of the RuntimeContract interface. It allows for overriding specific
// methods of the runtime contract.
export type RuntimeOverrides = Partial<RuntimeContract>

/**
 * Creates a new RuntimeContract that combines a base runtime with optional overrides. If an override is provided for a
 * method, it will be used; otherwise, the base method will be called.
 *
 * @example
 * const base = createFdxRuntimeInternal()
 * const customShipmentsService = new MyShipmentsService()
 * const runtime = withRuntimeOverrides(base, { getShipmentsService: () => customShipmentsService })
 * installFdxRuntime(runtime)
 *
 * @param base - The base runtime contract to use as the default implementation.
 * @param overrides - An object containing optional overrides for the runtime contract methods.
 */
export function withRuntimeOverrides(
    base: RuntimeContract,
    overrides: RuntimeOverrides
): RuntimeContract {
  return {
    getUiIntent: () =>
        overrides.getUiIntent
            ? overrides.getUiIntent()
            : base.getUiIntent(),
    getShipmentsService: () =>
        overrides.getShipmentsService
            ? overrides.getShipmentsService()
            : base.getShipmentsService(),
  }
}