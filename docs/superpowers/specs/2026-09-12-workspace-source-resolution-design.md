# Workspace Source Resolution Design

Keep package `exports` and `types` pointed at `dist` for published and deployed
consumers.

During repository development, configure the shared TypeScript settings to
resolve `@fedex-prism/*` imports to `packages/*/src/index.ts`:

```json
{
  "compilerOptions": {
    "paths": {
      "@fedex-prism/*": ["./packages/*/src/index.ts"]
    }
  }
}
```

This changes TypeScript and IDE resolution without rewriting emitted package
imports. Workspace dependencies must still be declared with `workspace:*`.
