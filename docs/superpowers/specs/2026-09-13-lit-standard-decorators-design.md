# Lit standard decorators migration

## Goal
Migrate the workspace from TypeScript experimental decorators to standard decorators so Lit components can use the newer `accessor`-based pattern.

## Scope
- Update workspace TypeScript config so standard decorators are enabled consistently.
- Convert Lit reactive members in `packages/visibility-modules` to standard decorator syntax.
- Fix the milestone schema/parsing path so the component accepts a nullable selection cleanly.

## Design
Lit’s current guidance is to keep experimental decorators for most projects, but it also supports a migration path to standard decorators. That migration requires `accessor` on decorated reactive members, and the compiler must stop using `experimentalDecorators` while allowing `useDefineForClassFields` to be `true`.

The implementation will update the shared browser TS config so the dashboard and package source are type-checked with the same decorator mode. Then the Lit components will be converted from field decorators to `accessor` declarations where needed (`@state()` and `@property()`).

For the milestone module, the current schema helper is incorrect and the parse flow needs to separate the empty `<select>` value from valid enum values. The schema should remain a plain enum, and the component should map an empty string to `null` before parsing.

## Files to change
- `tsconfig.browser.json`
- `packages/visibility-modules/src/ping-module.ts`
- `packages/visibility-modules/src/milestone-module.ts`
- `packages/visibility-modules/src/domain/milestone.ts`

## Acceptance criteria
- `pnpm build` completes successfully.
- Lit reactive state uses standard decorator-compatible `accessor` declarations.
- The milestone selector can clear to `null` without type or runtime errors.

