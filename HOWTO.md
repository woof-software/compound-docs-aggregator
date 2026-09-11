# Quick Start

This repository generates **deterministic, on-chain–derived snapshots** of Compound Comet markets as JSON and Markdown (markets overview).

---

## Install Dependencies

```bash
yarn install
```

---

## Environment Setup

Copy `.env.example` to `.env` and fill in the RPC endpoints:

```bash
cp .env.example .env
```

`RPC_MAINNET`, `RPC_OPTIMISM`, `RPC_UNICHAIN`, `RPC_POLYGON`, `RPC_MANTLE`, `RPC_BASE`, `RPC_ARBITRUM`, `RPC_LINEA`, `RPC_SCROLL`, `RPC_AVALANCHE`, `RPC_SEPOLIA` are **full QuickNode HTTP RPC URLs** (not API keys) — the same endpoints as in `compound-aggregator`.

`RPC_RONIN` is public endpoint and comes prefilled.

Optional:

```env
GITHUB_TOKEN_PAT=...   # for Compound-Foundation docs PR workflow
```

For CI, add matching repository secrets `RPC_MAINNET`, `RPC_ARBITRUM`, etc. (same names as in `.env.example`).

---

## Generate Documentation

```bash
yarn cli:generate:md
```

This command will:

1. Build the NestJS application
2. Fetch deployment metadata from `Compound-Foundation/comet`
3. Read on-chain market state via RPC
4. Update `output.json`, `README.md`, and `compound-foundation/compound-3.md`

---

## GitHub Actions

| Workflow | Trigger | Command |
|----------|---------|---------|
| `update-market-data.yml` | daily + manual | `yarn cli:generate:md` |
| `run-pull-request.yml` | manual | opens PR to Compound-Foundation docs |

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

Markets themselves are discovered from `Compound-Foundation/comet` deployments (`roots.json`).

---

## Outputs

- `output.json` — structured market snapshot
- `README.md` — human-readable markets overview
- `compound-foundation/compound-3.md` — deployments section for Compound docs
