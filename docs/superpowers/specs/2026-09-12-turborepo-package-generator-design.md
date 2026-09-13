# Turborepo Package Generator Design

Use Turborepo's native custom-generator convention as a thin wrapper around
its bundled Plop runtime:

- Define one generator in `turbo/generators/config.ts`.
- Keep Handlebars templates under `turbo/generators/templates/package/`.
- Run it with `pnpm generate`.
- Use `@turbo/gen` only for TypeScript types; do not install `plop` directly.
- Use Plop's built-in `kebabCase` helper for package names and paths.

The generator creates a build-ready package:

```text
packages/<name>/
├── package.json
├── src/index.ts
├── tsconfig.json
└── tsdown.config.ts
```

The package uses the `@fedex-prism/<name>` scope, ESM exports, the shared
library TypeScript configuration, and `tsdown`. It contains no
framework-specific dependencies.

No custom validation, test harness, dependency installation, or repository
configuration mutation belongs in the generator. Turbo, Plop, the filesystem,
and the package manager surface invalid input and collisions.
