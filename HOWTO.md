# 🚀 Quick Start

## Install Dependencies

Run the following command to install all neccessary dependencies from package.json:

```bash
yarn install
```

## Environment Setup

Create a `.env` file in the project root with the following variables:

```env
# provider keys for blockchain networks
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

## Generate Documentation

Run the following command to generate this documentation:

```bash
yarn cli:generate
```

This command will:

1. Build the NestJS application
2. Fetch data from all supported networks
3. Generate JSON output file
4. Create/update this README.md file

## Available Scripts

```bash
# Generate documentation and data files
yarn cli:generate

# Build the application
yarn build

# Run linting
yarn lint

# Format code
yarn format
```

## Add Network

If the market in the new network/chain is deployed you need to add a new network provider to the file network.config.ts

```ts
  {
    network: string, // network name
    chainId: number, // chain ID
    url: string, // provider URL
  }
```

### Interaction

You can use install this code into project and run

```bash
yarn cli:generate
```

command to generate new README.md markdown and output.json file or just fetch output.json file from this repository which is updated every day at 12:02 UTC
