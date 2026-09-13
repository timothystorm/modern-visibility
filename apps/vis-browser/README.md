# Prism browser distribution

This application assembles the workspace packages into a browser deployment.
It installs the internal runtime, then registers the ping, milestone, and stats
elements. The current internal runtime returns sample shipment data.

From the repository root:

```sh
pnpm build:browser
http-server apps/vis-browser/dist -p 8080 -c-1
```

Open http://localhost:8080/ for the ping demo. The deployment stays in
`apps/vis-browser/dist`; there is no root distribution directory.
Normal `pnpm build` also builds this app through Turbo; each app retains its own
output directory for caching. `pnpm clean` removes package/app outputs.

## Use on a page

```html
<script type="module" src="./prism.js"></script>
<fdx-ping-module></fdx-ping-module>
<fdx-milestone-module></fdx-milestone-module>
<fdx-stats-module></fdx-stats-module>
```

Use only the tags you want to display. Deploy the **entire** output directory,
including `chunks`; relative imports also support hosting under a subdirectory.
No import map, CDN, React, or consumer build is required. Dependencies are bundled
together so components share Lit, Zod, and the runtime within this distribution.

Load one distribution version per page. This entry owns runtime installation;
applications that select their own runtime or use overrides should consume the
workspace/npm packages instead. Their existing exports and build behavior are
unchanged. npm publication remains a separate task.

For development, run the root `pnpm dev` and serve this app's `dist` with a static
server. Refresh manually after rebuilds; this distribution does not use HMR.
