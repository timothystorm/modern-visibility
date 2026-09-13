# @fedex-prism/runtime-core

The shared foundation for the FedEx Visibility Runtime: its public contract,
domain definitions, and common runtime behavior.

## Responsibilities

- **Contracts:** `RuntimeContract`, `ShipmentsService`, `IterableShipments`, and
  supporting types such as `NextToken`.
- **Domain definitions:** `Shipment` and its validation schema, `ShipmentSchema`.
- **Shared behavior:** runtime registration and access through
  `installFdxRuntime` and `getFdxRuntime`, plus utilities needed across runtime
  implementations.

Interfaces, abstract classes, types, schemas, and concrete shared behavior may
coexist here. Keep utilities focused on the runtime and its domain.

## Dependency boundary

[`runtime-internal`](../runtime-internal) and
[`runtime-external`](../runtime-external) depend on core and implement its
contracts. **Core must never depend on either implementation package.**
Implementation-specific network clients, configuration, and caching belong in
those implementation packages. UI modules consume core; the application chooses
an implementation and installs it during startup.

```ts
// Application startup
import { installFdxRuntime } from '@fedex-prism/runtime-core'
import { createFdxRuntimeInternal } from '@fedex-prism/runtime-internal'

installFdxRuntime(createFdxRuntimeInternal())
```

```ts
// A consumer of the installed runtime
import { getFdxRuntime } from '@fedex-prism/runtime-core'

const runtime = await getFdxRuntime()
const shipments = await runtime.getShipmentsService()
const page = await shipments.readNextShipments()
```

The registry accepts an instance or a promise and shares it through
`Symbol.for('@fedex-prism/visibility-runtime.v1')` on `globalThis`. Access before
installation and duplicate installation throw errors. Importing core does not
choose or install an implementation.

Use `import type` for interfaces and types when no runtime value is needed.
