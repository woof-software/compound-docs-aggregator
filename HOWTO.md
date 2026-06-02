# Quick Start

This repository generates **deterministic, on-chain–derived snapshots** of Compound Comet markets as JSON and Markdown (markets overview).

---

## Install Dependencies

```bash
yarn install
```

---

## Environment Setup

Create a `.env` file in the project root:

```env
ANKR_KEY=your_ankr_api_key_here
UNICHAIN_QUICKNODE_KEY=your_unichain_api_key_here
GITHUB_TOKEN_PAT=your_github_pat_for_compound_finance_docs_optional
```

> If a network provider URL requires an API key, the corresponding env var must be set.

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

Add an entry to `src/config/networks.config.ts`:

```ts
{
  network: string,
  chainId: number,
  url: string,
  sortPosition: number,
  blockscanOrigin: string,
  displayName: string,
  comp?: string,           // optional, for contracts table
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
