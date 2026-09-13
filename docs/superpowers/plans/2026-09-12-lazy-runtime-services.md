# Lazy Runtime Services Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the runtime contract expose `ShipmentsService` through an explicit, lazy, asynchronous getter.

**Architecture:** The contract declares `getShipmentsService(): Promise<ShipmentsService>`. The global runtime lookup is typed as an optional promise so callers can await runtime initialization before requesting a lazily loaded service.

**Tech Stack:** TypeScript

## Global Constraints

- Keep the public API explicit and fully typed.
- Do not implement service loading inside the contract package.
- The eventual runtime implementation must cache the first service-loading promise.
- Do not commit or push changes.

---

### Task 1: Define the Lazy Service Contract

**Files:**
- Modify: `packages/runtime-contract/src/FdxRuntimeContract.ts`

**Interfaces:**
- Consumes: `ShipmentsService` from `./ShipmentsService`.
- Produces: `FdxRuntimeContract.getShipmentsService(): Promise<ShipmentsService>`.

- [ ] Import `ShipmentsService` with `import type`.
- [ ] Replace the eager `shipmentsService` property with
  `getShipmentsService(): Promise<ShipmentsService>`.
- [ ] Define a local intersection type for `globalThis` that maps
  `RUNTIME_KEY` to `Promise<FdxRuntimeContract> | undefined`.
- [ ] Run
  `pnpm exec tsc -p packages/runtime-contract/tsconfig.json --noEmit --incremental false`.
- [ ] Run `pnpm --filter @fedex-prism/runtime-contract build`.
- [ ] Do not stage, commit, or push.
