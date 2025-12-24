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
```

### GIT LFS Setup

```bash
git lfs install --local
```

## Generate Documentation

Run the following command to generate this documentation:

```bash
yarn cli:generate:md
```

This command will:

1. Build the NestJS application
2. Fetch data from all supported networks
3. Generate JSON output file
4. Create/update this README.md file

## Index On-Chain Users Database

Run the following command to build and maintain the on-chain users database:

```bash
yarn cli:index
```

This command will:

1. Build the NestJS application  
2. Assemble the chunked databases into a single working (runtime) database  
3. Index all configured networks that should be indexed  
4. Discover and persist users that appear on each network (per supported protocol/version and topics)  
5. Update the indexer cursor/state to support resumable runs  
6. Split the updated runtime database back into stored chunks for long-term persistence

\#\# Generate Protocol Owes

Run the following command to generate the current protocol owes snapshot:

```bash
yarn cli:generate:owes
```

This command will:

1. Read all previously indexed users from the local database  
2. For each network, compute the current protocol owed amounts for those users  
3. Currently supports **Compound v3 only** (across all configured v3 networks)  
4. Produce a single JSON output file with the computed owes snapshot in the repository root

> Important: The GitHub Actions workflow always runs `cli:index` **before** this command.  
> When running locally (manually), you must ensure `yarn cli:index` completed successfully first, so the indexed users database is up-to-date (otherwise the owes output may be incomplete or stale).


## Available Scripts

```bash
# Build the application
yarn build

# Run linting
yarn lint

# Format code
yarn format

# Generate documentation and data files
yarn cli:generate:md

# Index users by chains/versions/comets
yarn cli:index

# Generate reward owes by network (currently v3 only)
yarn cli:generate:owes

# Retries cli index (for local full sync)
yarn full-index
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
