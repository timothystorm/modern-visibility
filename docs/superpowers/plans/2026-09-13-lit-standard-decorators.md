# Lit standard decorators implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the workspace to Lit’s newer standard decorator workflow and fix the milestone selection flow to handle nullable values cleanly.

**Architecture:** Update the shared TypeScript browser config first so every consumer type-checks with the same decorator mode. Then convert the Lit reactive members to standard-decorator-compatible `accessor` declarations and adjust the milestone schema/parse path so empty selections become `null` before validation.

**Tech Stack:** TypeScript 6, Lit 3, Zod 4, Vite, tsdown, Turbo.

## Global Constraints

- Use Lit standard decorator syntax with `accessor` on decorated reactive members.
- Keep the workspace on a single decorator mode across app and package source type-checking.
- Preserve the milestone enum values exported from `packages/visibility-modules/src/domain/milestone.ts`.
- Keep the dashboard build green with `pnpm build`.

---

### Task 1: Switch the workspace TypeScript config to standard decorators

**Files:**
- Modify: `tsconfig.browser.json`
- Modify: `tsconfig.library.json`

**Interfaces:**
- Consumes: the shared browser config used by the dashboard app and package source type-checking.
- Produces: a workspace-wide TypeScript decorator mode that expects standard decorators and `accessor` members.

- [ ] **Step 1: Update the shared browser config to standard decorators**

Change the shared compiler settings so the browser build stops using experimental decorators and instead follows the standard-decorator model:

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "experimentalDecorators": false,
    "useDefineForClassFields": true
  }
}
```

- [ ] **Step 2: Align the library config with the same decorator mode**

Update the shared library config to extend the browser config without re-enabling legacy decorators:

```json
{
  "extends": "./tsconfig.browser.json",
  "compilerOptions": {}
}
```

- [ ] **Step 3: Verify the workspace config change in isolation**

Run:

```bash
pnpm exec tsc -b --pretty false
```

Expected: the decorator-mode errors from Lit source should disappear, and any remaining errors should be unrelated to decorator syntax.

### Task 2: Convert the Lit components and milestone parsing to standard decorators

**Files:**
- Modify: `packages/visibility-modules/src/ping-module.ts`
- Modify: `packages/visibility-modules/src/milestone-module.ts`
- Modify: `packages/visibility-modules/src/domain/milestone.ts`

**Interfaces:**
- Consumes: the standard-decorator workspace config from Task 1.
- Produces: Lit components that use `accessor` for reactive state/property declarations, plus a nullable milestone selection flow that still validates enum values through Zod.

- [ ] **Step 1: Convert reactive members to `accessor` declarations**

Update the reactive members so Lit can decorate them in standard-decorator mode:

```ts
@customElement('ping-module')
export class PingModule extends LitElement {
  @state()
  accessor now = new Date()
}
```

```ts
@customElement('milestone-module')
export class MilestoneModule extends LitElement {
  @property()
  accessor milestone: Milestone | null = null
}
```

- [ ] **Step 2: Fix the milestone schema to stay a plain enum**

Keep the enum schema non-nullable so `parse()` remains available on the enum schema itself:

```ts
import * as z from 'zod'

export const MilestoneEnum = z.enum(['LabelCreated', 'InTransit', 'OutForDelivery', 'Delivered'])
export type Milestone = z.infer<typeof MilestoneEnum>
```

- [ ] **Step 3: Map the empty select value to `null` before parsing**

Change the event handler so an empty string clears the reactive property instead of trying to parse it as an enum value:

```ts
private handleMilestoneChange(event: Event) {
  const select = event.currentTarget
  if (!(select instanceof HTMLSelectElement)) {
    throw new TypeError('Milestone change must come from a select element')
  }

  this.milestone = select.value === '' ? null : MilestoneEnum.parse(select.value)
}
```

- [ ] **Step 4: Verify the component conversion and schema fix**

Run:

```bash
pnpm exec tsc -b --pretty false
pnpm build
```

Expected: both commands succeed, and the dashboard build no longer fails on the Lit decorators or milestone parsing.

