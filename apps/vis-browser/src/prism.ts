import { installFdxRuntime } from '@fedex-prism/runtime-core'
import { createFdxRuntimeExternal } from '@fedex-prism/runtime-external'

// Register elements only after the shared runtime is ready for their lifecycle callbacks.
installFdxRuntime(createFdxRuntimeExternal({client_id: "123456"}))
await import('@fedex-prism/visibility-modules')
