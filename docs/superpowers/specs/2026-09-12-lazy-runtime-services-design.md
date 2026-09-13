# Lazy Runtime Services Design

`FdxRuntimeContract` exposes each lazily loaded resource through an explicit
async getter:

```ts
interface FdxRuntimeContract {
  getShipmentsService(): Promise<ShipmentsService>
}
```

Consumers call:

```ts
const shipments = await runtime.getShipmentsService()
```

The runtime implementation creates the service promise on first use and
returns that same promise for subsequent calls. This keeps the contract fully
typed, avoids eager loading, and allows bundlers to split each service behind
its own dynamic import.

Loading failures reject the promise and are not converted into a successful
fallback value.
