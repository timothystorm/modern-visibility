# Workspace Source Resolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make TypeScript and WebStorm resolve internal `@fedex-prism/*` imports to workspace source while published package metadata continues to target `dist`.

**Architecture:** Add one wildcard `paths` entry to the shared root TypeScript configuration. Package manifests remain unchanged, so external consumers continue using compiled exports.

**Tech Stack:** TypeScript, pnpm workspaces

## Global Constraints

- Keep package `exports` and `types` pointed at `dist`.
- Keep `workspace:*` dependencies as the package-linking mechanism.
- Do not add bundler aliases.
- Do not commit or push changes.

---

### Task 1: Resolve Workspace Imports to Source

**Files:**
- Modify: `tsconfig.base.json`

**Interfaces:**
- Produces: `@fedex-prism/*` → `./packages/*/src/index.ts` for TypeScript resolution.

- [ ] Confirm TypeScript currently resolves `@fedex-prism/runtime-core` to `dist/index.d.mts`.
- [ ] Add:

```json
"paths": {
  "@fedex-prism/*": ["./packages/*/src/index.ts"]
}
```

- [ ] Confirm `tsc --traceResolution` resolves the same import to
  `packages/runtime-core/src/index.ts`.
- [ ] Run the affected package type-check and build.
- [ ] Do not stage, commit, or push.
