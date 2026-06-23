# rekhachitra (colocated standalone)

This is the **standalone** Rekhachitra app, colocated here so all the code lives in
one repo. It is **built and run independently** — it is *not* part of the root
gameducation-platform Next build:

- Excluded from the root `tsconfig.json` (`exclude: ["apps", ...]`).
- Its `node_modules` / `.next` / `.env*` are gitignored (`apps/**`).
- Its routes are **not** served by the root app.

To run it on its own:

```sh
cd apps/rekhachitra
pnpm install
pnpm dev          # uses its own .env.local (not committed)
```

**Note:** the integrated, canonical version of Rekhachitra lives in the root app at
`/desmos` (`src/app/desmos/**`). This standalone copy is kept for reference/history;
prefer `/desmos` for active work.
