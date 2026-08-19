# AGENTS.md

## Cursor Cloud specific instructions

This repository is **aarana.dev** — a static, bilingual (EN/ES) personal portfolio site
built with **Astro** (static output) + **Tailwind CSS v4**. It is a single frontend service;
there is no backend, database, or external dependency to run.

Standard scripts live in `package.json` (`dev`, `build`, `preview`, `astro`, `gen:assets`).
Prefer those over ad-hoc commands.

### Node / package manager
- The project's `package.json` declares `engines.node >= 24`, but the Cloud VM's default
  `node` is the pre-installed `/exec-daemon/node` (currently v22.x). This version runs
  `pnpm install`, `astro check`, `astro build`, and `astro dev` without issues, so there is
  **no need to install Node 24 or manipulate `PATH`**. Use the environment as-is.
- Use **pnpm** (there is a `pnpm-lock.yaml`). `pnpm` is already on `PATH` for the Cloud
  agent's default (non-login) shell.
- Native/optional build scripts (`sharp`, `esbuild`) are pre-approved via `allowBuilds` in
  `pnpm-workspace.yaml`, so `pnpm install` completes non-interactively (no `pnpm approve-builds`).

### Running the dev server
- Start with `pnpm dev`; it serves at `http://localhost:4321/` (English) and
  `http://localhost:4321/es/` (Spanish). Use `--host` only if you need it exposed on the network.
- Gotcha: a **tmux/login shell may not have `pnpm` on `PATH`** (nvm's default node dir differs
  from where `pnpm` is installed). If `pnpm: command not found` in a fresh tmux/login shell,
  prepend the working toolchain, e.g.:
  `export PATH="/exec-daemon:/home/ubuntu/.nvm/versions/node/v22.22.2/bin:$PATH"` before `pnpm dev`.
  The default Shell (non-login) already resolves `pnpm` correctly.

### Lint / check / build
- Type/content check: `pnpm run astro check` (expected: 0 errors; deprecation "hints" are non-fatal).
- Production build: `pnpm run build` → outputs static site to `dist/`.
- Regenerate brand/OG raster assets (rarely needed): `pnpm run gen:assets` (uses `sharp`).
