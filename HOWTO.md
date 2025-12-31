# 🚀 Quick Start

This repository indexes on-chain users for Compound markets and generates **deterministic, on-chain–derived snapshots** (JSON + Markdown), such as protocol **owes** and a **markets overview**.

To keep the **public repo lightweight** (and avoid GitHub LFS bandwidth issues on forks/clones), **large artifacts are stored in a separate private “artifacts” repository** using **Git LFS** and synced in CI/local runs when needed.

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

## Artifacts Repository (Git LFS)

This repository (**code repo**) does **not** store large artifacts in Git LFS anymore.

Instead, heavy data lives in a separate **private artifacts repository** (example: `cryptease/compound-docs-artifacts`) with this structure:

- `storage/` — runtime/indexer DB snapshot (manifests + chunks)
  - `storage/**/manifest.json` (regular Git)
  - `storage/**/*.sqlite` (Git LFS)
- `snapshots/` — large detailed snapshots
  - `snapshots/owes-detailed-v2.json` (Git LFS)
  - `snapshots/owes-detailed-v3.json` (Git LFS)

CI and local runs **rsync** `artifacts/storage/` into `src/indexer/storage/` before running commands that need the indexed DB.

---

## ARTIFACTS_TOKEN (GitHub Actions)

Workflows that need the indexed DB or detailed snapshots must clone the **private artifacts repo**.

To do this, the code repo uses a GitHub Actions secret named:

- **`ARTIFACTS_TOKEN`** — a **fine-grained Personal Access Token (PAT)** with access to the private artifacts repository.

### How to create `ARTIFACTS_TOKEN`

1. GitHub → **Settings** → **Developer settings**
2. **Personal access tokens** → **Fine-grained tokens** → **Generate new token**
3. **Repository access** → *Only select repositories* → select your private artifacts repo
4. **Repository permissions**:
  - **Contents: Read and write** (required)
5. Create token and copy it.

### How to add it to the code repo

In the **code repo** (this repo):
- **Settings → Secrets and variables → Actions → New repository secret**
- Name: `ARTIFACTS_TOKEN`
- Value: your PAT

> Keep this token only in GitHub Secrets (do not commit it, do not store it in `.env`).

---

## Local Setup (Optional)

If you only want to regenerate docs that don’t require the indexed DB (e.g. `cli:generate:md`), you can run locally without artifacts.

If you want to run the **indexer** or generate **owes**, you need the artifacts repo.

### Clone + pull artifacts (sqlite only)

```bash
# 1) Clone artifacts repo (private)
git clone git@github.com:cryptease/compound-docs-artifacts.git ../compound-docs-artifacts
cd ../compound-docs-artifacts

# 2) Pull ONLY sqlite chunks from LFS
git lfs install --local --skip-smudge
git config lfs.fetchinclude "storage/**/*.sqlite"
git config lfs.fetchexclude ""
git lfs pull

# 3) Overlay into the code repo
cd ../compound-docs-aggregator   # <- your code repo folder
mkdir -p src/indexer/storage
rsync -a ../compound-docs-artifacts/storage/ src/indexer/storage/
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

> This command does **not** require the indexed DB.

---

## Index On-Chain Users Database

Build and maintain the on-chain users database (used by the owes commands):

```bash
yarn cli:index
```

This command will:

1. Build the NestJS application
2. Assemble the DB snapshot into a working (runtime) database
3. Index all configured networks that should be indexed
4. Discover and persist users that appear on each network
5. Update the indexer cursor/state to support resumable runs
6. Write updated DB back to `src/indexer/storage/` (which CI then syncs to the artifacts repo)

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
4. Optionally produce a large detailed file `owes-detailed-v2.json` (stored in the artifacts repo)

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
4. Optionally produce a large detailed file `owes-detailed-v3.json` (stored in the artifacts repo)

### Generate owes Markdown

Generate a human-readable Markdown summary from the latest owes snapshots:

```bash
yarn cli:generate:owes:md
```

This command will:

1. Read the latest `owes-v2.json` / `owes-v3.json` (if present)
2. Produce/refresh `REWARDS.md`

### Important workflow note

In CI, GitHub Actions runs **`cli:index` before** any owes generation.  
When running locally, ensure `yarn cli:index` completed successfully first — otherwise owes output may be incomplete or stale.

---

## GitHub Actions

There are two kinds of workflows:

### 1) Manually triggered workflows (`run-*`)
- `run-indexing.yml` — runs the user indexer (`yarn cli:index`)  
  **Requires** `ARTIFACTS_TOKEN` (to pull/push DB artifacts)
- `run-owes-v2.yml` — generates `owes-v2.json`  
  **Requires** `ARTIFACTS_TOKEN` (needs indexed DB; pushes detailed snapshot to artifacts repo)
- `run-owes-v3.yml` — generates `owes-v3.json`  
  **Requires** `ARTIFACTS_TOKEN`
- `run-owes-md.yml` — generates the owes Markdown summary (`REWARDS.md`)  
  Does **not** require `ARTIFACTS_TOKEN` (reads public `owes-*.json`)

### 2) Scheduled / maintenance workflows (`update-*`)
- `update-market-data.yml` — updates market metadata and docs (`output.json` + README)  
  Does **not** require `ARTIFACTS_TOKEN`
- `update-owes.yml` — updates index + owes + markdown  
  **Requires** `ARTIFACTS_TOKEN`

---

## Outputs

Artifacts committed in the **code repo** (this repo):

- `output.json` — markets / metadata snapshot used by the docs generator
- `owes-v2.json` — Compound v2 owes snapshot (if enabled)
- `owes-v3.json` — Compound v3 owes snapshot
- `REWARDS.md` — Markdown summary of owes (generated from the JSON snapshots)

Artifacts stored in the **private artifacts repo**:

- `storage/**/*.sqlite` — indexed DB chunks (Git LFS)
- `storage/**/manifest.json` — manifests (regular Git)
- `snapshots/owes-detailed-v2.json` — detailed owes v2 (Git LFS)
- `snapshots/owes-detailed-v3.json` — detailed owes v3 (Git LFS)

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

# Index users across configured networks (writes updated DB into src/indexer/storage/)
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

Typical local flow (with artifacts synced first if you need indexing/owes):

```bash
yarn cli:generate:md
yarn cli:index
yarn cli:generate:owes:v3
yarn cli:generate:owes:md
```
