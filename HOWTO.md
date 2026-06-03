# Quick Start

This repository generates **deterministic, on-chain–derived snapshots** of Compound Comet markets as JSON and Markdown (markets overview).

---

## Install Dependencies

```bash
yarn install
```

---

## Environment Setup

Copy `.env.example` to `.env` and set a **full RPC URL per chain**:

```bash
cp .env.example .env
```

Each `RPC_*` variable holds the **full endpoint URL** for that chain (see `.env.example`).

Public endpoints (`RPC_RONIN`, `RPC_AVALANCHE`, `RPC_FUJI`) are listed there too — set them in `.env` like the rest.

Optional:

```env
GITHUB_TOKEN_PAT=...   # for compound-finance docs PR workflow
```

For CI, add matching repository secrets `RPC_MAINNET`, `RPC_ARBITRUM`, etc. (same names as in `.env.example`).

---

## Generate Documentation

```bash
yarn cli:generate:md
```

This command will:

1. Build the NestJS application
2. Fetch deployment metadata from `compound-finance/comet`
3. Read on-chain market state via RPC
4. Update `output.json`, `README.md`, and `compound-finance/compound-3.md`

---

## GitHub Actions

| Workflow | Trigger | Command |
|----------|---------|---------|
| `update-market-data.yml` | daily + manual | `yarn cli:generate:md` |
| `run-pull-request.yml` | manual | opens PR to compound-finance docs |

---

## Available Scripts

```bash
yarn build
yarn lint
yarn format
yarn cli:generate:md
yarn cli:pull-request
```

---

## Add Network

Add an entry to `src/config/networks.config.ts` and a matching `RPC_*` variable in `.env.example`:

```ts
{
  network: string,
  chainId: number,
  urlEnvVar: 'RPC_MY_NETWORK', // env var name; value in .env is the full RPC URL
  sortPosition: number,
  blockscanOrigin: string,
  displayName: string,
  comp?: string,
  svrFeeRecipient?: string,
  svrFeeReceiver?: string,
}
```

Markets themselves are discovered from `compound-finance/comet` deployments (`roots.json`).

---

## Outputs

- `output.json` — structured market snapshot
- `README.md` — human-readable markets overview
- `compound-finance/compound-3.md` — deployments section for Compound docs
