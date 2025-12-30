# 🚀 Quick Start

This repository indexes on-chain users for Compound markets and generates **deterministic, on-chain–derived snapshots** (JSON + Markdown) such as protocol **owes** and **markets overview**. Large SQLite artifacts are stored in **chunked form** (Git LFS) and assembled at runtime.

---

## Install Dependencies

```bash
yarn install
```

---

## Environment Setup

Create a `.env` file in the project root with the following variables:

```env
# Provider keys for blockchain networks (examples)
ANKR_KEY=your_ankr_api_key_here
UNICHAIN_QUICKNODE_KEY=your_unichain_api_key_here
```

> If a network provider URL is configured to require an API key, make sure the corresponding env var is present.

---

## Git LFS Setup (Recommended)

This repo stores large artifacts in Git LFS:

- Runtime/indexer DB chunks: `src/indexer/storage/**/*.sqlite` (**required for indexing**)
- Detailed owes snapshots: `owes-detailed-v2.json`, `owes-detailed-v3.json` (optional)

### Minimal LFS sync (pull ONLY SQLite chunks)

This is the recommended setup if you want to **avoid downloading large non-DB artifacts** (like `owes-detailed-*.json`) but still run the indexer locally.

```bash
git lfs install --local --skip-smudge

# Only allow pulling sqlite chunks
git config lfs.fetchinclude "src/indexer/storage/**/*.sqlite"
git config lfs.fetchexclude ""

# Pull only what is allowed (sqlite only)
git lfs pull
```

### Full LFS sync (pull everything tracked by LFS)

Use this if you want **all** LFS artifacts locally.

```bash
git lfs install --local
git lfs pull
```

### Pull a specific LFS file on demand

If later you do need a detailed owes file:

```bash
git lfs pull --include="owes-detailed-v3.json"
# or
git lfs pull --include="owes-detailed-v2.json"
```

---

## Generate Documentation

Generate/update the repository documentation and the main `output.json` snapshot:

```bash
yarn cli:generate:md
```

This command will:

1. Build the NestJS application
2. Fetch market metadata from all supported networks
3. Generate/update `output.json` in the repository root
4. Create/update the generated Markdown documentation (README)

---

## Index On-Chain Users Database

Build and maintain the on-chain users database (used by the owes commands):

```bash
yarn cli:index
```

This command will:

1. Build the NestJS application
2. Assemble the **chunked** databases into a single working (runtime) database
3. Index all configured networks that should be indexed
4. Discover and persist users that appear on each network (per supported protocol/version and topics)
5. Update the indexer cursor/state to support resumable runs
6. Split the updated runtime database back into stored chunks for long-term persistence

### Full local sync with retries

For long-running local indexing (fresh sync / flaky RPC), use:

```bash
yarn full-index
```

---

## Generate Protocol Owes

Owes snapshots are generated **from the already indexed users database**.

### Compound v2 owes

```bash
yarn cli:generate:owes:v2
```

This command will:

1. Read previously indexed users from the local database
2. Compute current **Compound v2** owes for those users on each configured v2 network
3. Produce `owes-v2.json` in the repository root

> Note on v2 accrual (“heal”): this project does **not** rely on a state-changing “heal” flow to force accrual.  
> The snapshot is derived from **current on-chain state** available via `eth_call`.

### Compound v3 owes

```bash
yarn cli:generate:owes:v3
```

This command will:

1. Read all previously indexed users from the local database
2. For each configured v3 network, compute the current protocol owed amounts for those users
3. Produce `owes-v3.json` in the repository root

### Detailed owes snapshots (Git LFS)

Some workflows may also produce large “detailed” owes JSON files, stored via Git LFS:

- `owes-detailed-v2.json`
- `owes-detailed-v3.json`

These files are **optional to download** (see “Git LFS Setup”), and are typically only needed for deep dives / debugging / analytics.

### Generate owes Markdown

Generate a human-readable Markdown summary from the latest owes snapshots:

```bash
yarn cli:generate:owes:md
```

This command will:

1. Read the latest `owes-v2.json` / `owes-v3.json` (if present)
2. Produce/refresh `REWARDS.md`

### Important workflow note

In CI, the GitHub Actions workflow runs **`cli:index` before** any owes generation.  
When running locally, you must ensure `yarn cli:index` completed successfully first — otherwise owes output may be incomplete or stale.

---

## GitHub Actions

There are two kinds of workflows:

### 1) Manually triggered workflows (`run-*`)
These are intended to be executed on demand from the GitHub Actions UI.

- `run-indexing.yml` — runs the user indexer (`yarn cli:index`)
- `run-owes-v2.yml` — generates `owes-v2.json`
- `run-owes-v3.yml` — generates `owes-v3.json`
- `run-owes-md.yml` — generates the owes Markdown summary

### 2) Scheduled / maintenance workflows (`update-*`)
These keep the repository snapshots up to date (for example, market metadata and owes snapshots), and may be configured on a timer.

- `update-market-data.yml` — updates market metadata and generated docs (`output.json` + README)
- `update-owes.yml` — updates owes snapshots (and related markdown, if configured)

> CI tip: if you want to **avoid downloading large LFS artifacts** in Actions, use `actions/checkout` with `lfs: false`, then run `git lfs install --skip-smudge` + `git lfs pull` with `lfs.fetchinclude` set to `src/indexer/storage/**/*.sqlite`.

---

## Outputs

Common generated artifacts in the repository root:

- `output.json` — markets / metadata snapshot used by the docs generator
- `owes-v2.json` — Compound v2 owes snapshot (if enabled)
- `owes-v3.json` — Compound v3 owes snapshot
- `REWARDS.md` — Markdown summary of owes (generated from the JSON snapshots)
- SQLite database chunks (tracked via Git LFS) — used by the indexer
- Detailed owes JSON (tracked via Git LFS): `owes-detailed-v2.json`, `owes-detailed-v3.json` (optional)

---

## Available Scripts

```bash
# Build the application
yarn build

# Run linting
yarn lint

# Format code
yarn format

# Generate documentation and market snapshot (README + output.json)
yarn cli:generate:md

# Index users across configured networks (writes chunked DB artifacts)
yarn cli:index

# Generate owes snapshots
yarn cli:generate:owes:v2
yarn cli:generate:owes:v3

# Generate Markdown summary for owes
yarn cli:generate:owes:md

# Retries cli:index (for local full sync)
yarn full-index
```

---

## Add Network

If a market is deployed on a new network/chain, you typically need to add:

1. **Provider entry** (RPC URL + chainId) in `network.config.ts`
2. **Protocol config** for that network (e.g., v2 `comptrollerV2` + reward token, v3 comets / rewards), depending on what your generators/indexer use

Provider entry example:

```ts
{
  network: string, // network name
  chainId: number, // chain ID
  url: string,     // provider URL
}
```

---

## Using This Repository

You can either:

- **Run the scripts locally** to regenerate snapshots and docs, or
- **Consume the committed snapshots** (`output.json`, `owes-*.json`, `REWARDS.md`) produced by GitHub Actions.

For local regeneration:

```bash
yarn cli:generate:md
yarn cli:index
yarn cli:generate:owes:v3
yarn cli:generate:owes:md
```
