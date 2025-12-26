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

# GitHub Tokens
# GITHUB_TOKEN - automatically available in GitHub Actions (for commits to this repo)
# GITHUB_TOKEN_PAT - Personal Access Token with 'repo' scope (for PRs in compound-finance.github.io)
GITHUB_TOKEN_PAT=your_personal_access_token_here
```

### GitHub Tokens Setup

**GITHUB_TOKEN** - automatically provided, no setup needed (used for commits to this repository).

**GITHUB_TOKEN_PAT** - required for creating PRs in `compound-finance.github.io`:
1. Create PAT: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Select scope: `repo`
3. Add as secret: Repository → Settings → Secrets → Actions → `GITHUB_TOKEN_PAT`

If `GITHUB_TOKEN_PAT` is not set, PR creation will be skipped (local commits still work).

> If a network provider URL is configured to require an API key, make sure the corresponding env var is present.

---

## Git LFS Setup

This repo stores large database chunks via Git LFS.

```bash
git lfs install --local
git lfs pull
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

What it does (high level):

1. Reads previously indexed users from the local database
2. Computes current **Compound v2** owes for those users on each configured v2 network
3. Produces `owes-v2.json` in the repository root

> Note on v2 accrual (“heal”): this project **does not rely on a “heal” flow to force accrual** for v2.
> The snapshot is derived from **current on-chain state** available via `eth_call`.  
> For some addresses, the “perfectly up-to-the-moment” claimable amount may require a state-changing interaction on-chain
> (the protocol updates certain accounting lazily). This tool intentionally avoids mutating chain state.

### Compound v3 owes

```bash
yarn cli:generate:owes:v3
```

This command will:

1. Read all previously indexed users from the local database
2. For each configured v3 network, compute the current protocol owed amounts for those users
3. Produce `owes-v3.json` in the repository root

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

---

## Outputs

Common generated artifacts in the repository root:

- `output.json` — markets / metadata snapshot used by the docs generator
- `owes-v2.json` — Compound v2 owes snapshot (if enabled)
- `owes-v3.json` — Compound v3 owes snapshot
- `owes.md` — Markdown summary of owes (generated from the JSON snapshots)
- SQLite database chunks (tracked via Git LFS) — used by the indexer

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
- **Consume the committed snapshots** (`output.json`, `owes-*.json`, `owes.md`) produced by GitHub Actions.

For local regeneration:

```bash
yarn cli:generate:md
yarn cli:index
yarn cli:generate:owes:v3
yarn cli:generate:owes:md
```
