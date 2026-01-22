import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { markdownTable } from 'markdown-table';
import { CurveEntry, NestedMarkets } from 'contract/contract.types';
import { V2RewardsAtContract } from '../contract/rewards.types';
import { CompoundFinanceConfig } from 'config/compound-finance.config';
import { NetworkConfig } from 'network/network.types';
import { STATIC_DEPLOYMENTS } from './constants/static-deployments';
import { getNetworkSortPosition } from './helpers/get-network-sort-position';
import { getBlockscanOrigin } from './helpers/get-blockscan-origin';
import { getNetworkDisplayName } from './helpers/get-network-display-name';
import { getNetworkShortName } from './helpers/get-network-short-name';

@Injectable()
export class MarkdownService {
  private readonly logger = new Logger(MarkdownService.name);

  constructor(private readonly config: ConfigService) {}

  private get compoundFinance(): CompoundFinanceConfig {
    return this.config.getOrThrow<CompoundFinanceConfig>('compoundFinance');
  }

  private get networks(): NetworkConfig[] {
    return this.config.getOrThrow<NetworkConfig[]>('networks');
  }

  private readonly rewardsMdPath = join(process.cwd(), 'REWARDS.md');

  write(nestedMarkets: NestedMarkets, jsonPath: string): void {
    const lines: string[] = [];

    // === Header & Download Link ===
    lines.push('# 📊 Comet Markets Overview');
    lines.push('');
    const fileName = jsonPath.split('/').pop() || 'output.json';
    lines.push(`**Download full JSON:** [${fileName}](./${fileName})`);
    lines.push('');
    lines.push('---');
    lines.push('');

    // === Markets by Network ===
    for (const [networkName, networkMarkets] of Object.entries(
      nestedMarkets.markets,
    )) {
      lines.push(`## 🌐 ${networkName.toUpperCase()}`);
      lines.push('');

      for (const [marketName, marketData] of Object.entries(networkMarkets)) {
        lines.push('<details>');
        lines.push(`<summary><strong>${marketName}</strong></summary>`);
        lines.push('');

        // 1) Contracts Table
        lines.push('**📋 Contracts**');
        lines.push('');
        const contractHeader = ['#', 'Name', 'Address', 'Note'];
        const contractRows: string[][] = [];

        const contracts = marketData.contracts;
        let rowNum = 1;

        // Основные контракты
        contractRows.push([
          rowNum.toString(),
          'Comet',
          contracts.comet,
          'Main market contract',
        ]);
        rowNum++;
        contractRows.push([
          rowNum.toString(),
          'Comet Implementation',
          contracts.cometImplementation,
          'Implementation contract',
        ]);
        rowNum++;
        contractRows.push([
          rowNum.toString(),
          'Comet Extension',
          contracts.cometExtension,
          'Extension delegate contract',
        ]);
        rowNum++;
        contractRows.push([
          rowNum.toString(),
          'Configurator',
          contracts.configurator,
          'Market configurator',
        ]);
        rowNum++;
        contractRows.push([
          rowNum.toString(),
          'Configurator Implementation',
          contracts.configuratorImplementation,
          'Configurator implementation',
        ]);
        rowNum++;
        contractRows.push([
          rowNum.toString(),
          'Comet Admin',
          contracts.cometAdmin,
          'Admin contract',
        ]);
        rowNum++;
        contractRows.push([
          rowNum.toString(),
          'Comet Factory',
          contracts.cometFactory,
          'Factory contract',
        ]);
        rowNum++;

        if (contracts.rewards) {
          contractRows.push([
            rowNum.toString(),
            'Rewards',
            contracts.rewards,
            'Rewards contract',
          ]);
          rowNum++;
        }
        if (contracts.bulker) {
          contractRows.push([
            rowNum.toString(),
            'Bulker',
            contracts.bulker,
            'Bulker contract',
          ]);
          rowNum++;
        }

        contractRows.push([
          rowNum.toString(),
          'Governor',
          contracts.governor,
          'Governance contract',
        ]);
        rowNum++;
        contractRows.push([
          rowNum.toString(),
          'Timelock',
          contracts.timelock,
          'Timelock contract',
        ]);

        const contractTableMd = markdownTable(
          [contractHeader, ...contractRows],
          {
            align: ['c', 'l', 'l', 'l'],
          },
        );
        contractTableMd.split('\n').forEach((row) => lines.push(`  ${row}`));
        lines.push('');

        // 2) Curve Table
        lines.push('**📈 Interest Rate Curve**');
        lines.push('');
        const curveHeader = [
          '#',
          'Parameter',
          'Current Value',
          'Previous Value',
          'Date Set',
        ];
        const curveRows: string[][] = [];
        const curve = marketData.curve;

        let curveRowNum = 1;
        const curveParams: Array<[string, CurveEntry]> = [
          ['Supply Kink', curve.supplyKink],
          ['Supply Rate Slope Low', curve.supplyPerSecondInterestRateSlopeLow],
          [
            'Supply Rate Slope High',
            curve.supplyPerSecondInterestRateSlopeHigh,
          ],
          ['Supply Rate Base', curve.supplyPerSecondInterestRateBase],
          ['Borrow Kink', curve.borrowKink],
          ['Borrow Rate Slope Low', curve.borrowPerSecondInterestRateSlopeLow],
          [
            'Borrow Rate Slope High',
            curve.borrowPerSecondInterestRateSlopeHigh,
          ],
          ['Borrow Rate Base', curve.borrowPerSecondInterestRateBase],
        ];

        for (const [paramName, paramData] of curveParams) {
          curveRows.push([
            curveRowNum.toString(),
            paramName,
            paramData.value?.toString() || 'N/A',
            paramData.previousValue?.toString() || 'N/A',
            paramData.valueSetDate || 'N/A',
          ]);
          curveRowNum++;
        }
        const curveTableMd = markdownTable([curveHeader, ...curveRows], {
          align: ['c', 'l', 'r', 'r', 'l'],
        });
        curveTableMd.split('\n').forEach((row) => lines.push(`  ${row}`));
        lines.push('');

        // 3) Collaterals Table
        lines.push('**💰 Collaterals**');
        lines.push('');
        const collHeader = [
          '#',
          'Name',
          'Symbol',
          'Address',
          'Decimals',
          'Price Feed',
          'CF',
          'LF',
          'LP',
          'Max Leverage',
        ];
        const collRows: string[][] = [];

        marketData.collaterals.forEach((collateral, index) => {
          collRows.push([
            (index + 1).toString(),
            collateral.name,
            collateral.symbol,
            collateral.address,
            collateral.decimals.toString(),
            collateral.priceFeedAddress,
            collateral.CF,
            collateral.LF,
            collateral.LP,
            collateral.maxLeverage,
          ]);
        });

        const collTableMd = markdownTable([collHeader, ...collRows], {
          align: ['c', 'l', 'l', 'l', 'r', 'l', 'r', 'r', 'r', 'r'],
        });
        collTableMd.split('\n').forEach((row) => lines.push(`  ${row}`));
        lines.push('');

        lines.push('</details>');
        lines.push('');
      }

      lines.push('---');
      lines.push('');
    }

    // === Rewards Section ===
    lines.push('## 🎁 Rewards Summary');
    lines.push('');

    const rewardsHeader = [
      '#',
      'Date',
      'Network',
      'Market',
      'Daily Rewards',
      'Yearly Rewards',
      'Lend Daily Rewards',
      'Borrow Daily Rewards',
      'COMP on Reward Contract',
    ];

    const rewardsRows: string[][] = [];

    nestedMarkets.rewards.marketRewards.forEach((reward, index) => {
      rewardsRows.push([
        (index + 1).toString(),
        reward.date,
        reward.network,
        reward.market,
        `${reward.dailyRewards} COMP`,
        `${reward.yearlyRewards} COMP`,
        `${reward.lendDailyRewards} COMP`,
        `${reward.borrowDailyRewards} COMP`,
        `${reward.compAmountOnRewardContract.toFixed(2)} COMP`,
      ]);
    });

    // Total row
    rewardsRows.push([
      '',
      '**TOTAL**',
      '',
      '',
      `**${nestedMarkets.rewards.totalDailyRewards} COMP**`,
      `**${nestedMarkets.rewards.totalYearlyRewards} COMP**`,
      '',
      '',
      '',
    ]);

    const rewardsTableMd = markdownTable([rewardsHeader, ...rewardsRows], {
      align: ['c', 'l', 'l', 'l', 'r', 'r', 'r', 'r', 'r'],
    });
    lines.push(rewardsTableMd);
    lines.push('');
    lines.push('---');
    lines.push('');

    // === Network COMP Balance Section ===
    lines.push('## 💎 Network COMP Balances');
    lines.push('');

    const balanceHeader = ['#', 'Date', 'Network', 'Current COMP Balance'];
    const balanceRows: string[][] = [];

    nestedMarkets.networkCompBalance.networks.forEach((network) => {
      balanceRows.push([
        (network.idx + 1).toString(),
        network.date,
        network.network,
        `${network.currentCompBalance.toFixed(2)} COMP`,
      ]);
    });

    // Total row
    balanceRows.push([
      '',
      '**TOTAL**',
      '',
      `**${nestedMarkets.networkCompBalance.totalCompBalance.toFixed(
        2,
      )} COMP**`,
    ]);

    const balanceTableMd = markdownTable([balanceHeader, ...balanceRows], {
      align: ['c', 'l', 'l', 'r'],
    });
    lines.push(balanceTableMd);
    lines.push('');
    lines.push('---');
    lines.push('');

    // === Footer ===
    lines.push(
      `*Last updated:* ${new Date()
        .toISOString()
        .replace('T', ' ')
        .replace('Z', ' UTC')}`,
    );
    lines.push('');

    writeFileSync('README.md', lines.join('\n'), 'utf-8');
    this.logger.log('README.md successfully generated');
  }

  public writeRewardsMd(params: {
    owesV2: Record<string, number>;
    owesV3: Record<string, number>;
    nestedMarketsV3: NestedMarkets; // V3-only
    v2At: V2RewardsAtContract[]; // from v2At()
  }): void {
    const { owesV2, owesV3, nestedMarketsV3, v2At } = params;

    const lines: string[] = [];

    lines.push('# 🎁 Rewards');
    lines.push('');

    // =========================
    // V3
    // =========================
    lines.push('## Compound V3');
    lines.push('');

    const v3AtByNetwork = new Map<string, number>(
      nestedMarketsV3.networkCompBalance.networks.map((n) => [
        n.network,
        n.currentCompBalance,
      ]),
    );

    {
      const allNetworks = Array.from(
        new Set([...Object.keys(owesV3), ...Array.from(v3AtByNetwork.keys())]),
      );

      const rowsRaw = allNetworks.map((network) => {
        const atContract = v3AtByNetwork.get(network) ?? 0;
        const owed = owesV3[network] ?? 0;
        const delta = atContract - owed;
        return { network, atContract, owed, delta };
      });

      rowsRaw.sort(
        (a, b) => b.owed - a.owed || a.network.localeCompare(b.network),
      );

      const header = [
        'Network',
        'Rewards at contract',
        'Rewards owed',
        'Rewards delta (at contract - owed)',
      ];

      const rows: string[][] = rowsRaw.map((r) => [
        r.network,
        `${r.atContract.toFixed(2)} COMP`,
        `${r.owed.toFixed(2)} COMP`,
        `${r.delta.toFixed(2)} COMP`,
      ]);

      const totalAt = rowsRaw.reduce((acc, r) => acc + r.atContract, 0);
      const totalOwed = rowsRaw.reduce((acc, r) => acc + r.owed, 0);
      const totalDelta = rowsRaw.reduce((acc, r) => acc + r.delta, 0);

      rows.push([
        '**TOTAL**',
        `**${totalAt.toFixed(2)} COMP**`,
        `**${totalOwed.toFixed(2)} COMP**`,
        `**${totalDelta.toFixed(2)} COMP**`,
      ]);

      lines.push(
        markdownTable([header, ...rows], { align: ['l', 'r', 'r', 'r'] }),
      );
      lines.push('');
    }

    lines.push('---');
    lines.push('');

    // =========================
    // V2
    // =========================
    lines.push('## Compound V2');
    lines.push('');

    const v2AtByNetwork = new Map<string, number>(
      v2At.map((r) => [r.network, r.atContract]),
    );

    {
      const allNetworks = Array.from(
        new Set([...Object.keys(owesV2), ...Array.from(v2AtByNetwork.keys())]),
      );

      const rowsRaw = allNetworks.map((network) => {
        const atContract = v2AtByNetwork.get(network) ?? 0;
        const owed = owesV2[network] ?? 0;
        const delta = atContract - owed;
        return { network, atContract, owed, delta };
      });

      rowsRaw.sort(
        (a, b) => b.owed - a.owed || a.network.localeCompare(b.network),
      );

      const header = [
        'Network',
        'Rewards at contract',
        'Rewards owed',
        'Rewards delta (at contract - owed)',
      ];

      const rows: string[][] = rowsRaw.map((r) => [
        r.network,
        `${r.atContract.toFixed(2)} COMP`,
        `${r.owed.toFixed(2)} COMP`,
        `${r.delta.toFixed(2)} COMP`,
      ]);

      const totalAt = rowsRaw.reduce((acc, r) => acc + r.atContract, 0);
      const totalOwed = rowsRaw.reduce((acc, r) => acc + r.owed, 0);
      const totalDelta = rowsRaw.reduce((acc, r) => acc + r.delta, 0);

      rows.push([
        '**TOTAL**',
        `**${totalAt.toFixed(2)} COMP**`,
        `**${totalOwed.toFixed(2)} COMP**`,
        `**${totalDelta.toFixed(2)} COMP**`,
      ]);

      lines.push(
        markdownTable([header, ...rows], { align: ['l', 'r', 'r', 'r'] }),
      );
      lines.push('');
    }

    lines.push('---');
    lines.push('');
    lines.push(
      `*Last updated:* ${new Date()
        .toISOString()
        .replace('T', ' ')
        .replace('Z', ' UTC')}`,
    );
    lines.push('');

    writeFileSync(this.rewardsMdPath, lines.join('\n'), 'utf-8');
    this.logger.log('rewards.md successfully generated');
  }

  /**
   * Updates the deployments section in compound-3.md file using data from nestedMarkets
   * This method replaces the deployments section with newly generated deployment data
   * and updates the date display in the Note section
   */
  updateCompound3Deployments(nestedMarkets: NestedMarkets): void {
    const { directory, filename, sectionStartMarker, sectionEndMarker } =
      this.compoundFinance.markdown;
    const compound3Path = join(process.cwd(), directory, filename);

    if (!existsSync(compound3Path)) {
      this.logger.error(`File not found: ${compound3Path}`);
      throw new Error(`File not found: ${compound3Path}`);
    }

    const fileContent = readFileSync(compound3Path, 'utf-8');
    const lines = fileContent.split('\n');
    const deploymentsSection = this.generateDeploymentsSection(nestedMarkets);

    let deploymentsStartIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line && line.trim().startsWith(sectionStartMarker)) {
        deploymentsStartIndex = i;
        break;
      }
    }

    if (deploymentsStartIndex === -1) {
      this.logger.error(
        `Could not find "${sectionStartMarker}" line in ${filename}`,
      );
      throw new Error(
        `Could not find "${sectionStartMarker}" line in ${filename}`,
      );
    }

    let deploymentsEndIndex = lines.length;
    for (let i = deploymentsStartIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      if (line && line.trim() === sectionEndMarker) {
        deploymentsEndIndex = i;
        break;
      }
    }

    const existingDeploymentsSection = lines
      .slice(deploymentsStartIndex + 1, deploymentsEndIndex)
      .join('\n');

    if (existingDeploymentsSection === deploymentsSection) {
      this.logger.log(
        `${filename} deployments section unchanged; skipping date update`,
      );
      return;
    }

    const beforeSection = lines.slice(0, deploymentsStartIndex + 1).join('\n');
    let afterSection = lines.slice(deploymentsEndIndex).join('\n');

    // Update date display in markdown content
    afterSection = this.updateDateDisplayInContent(afterSection);

    const updatedContent = `${beforeSection}\n${deploymentsSection}\n${afterSection}`;

    writeFileSync(compound3Path, updatedContent, 'utf-8');
    this.logger.log(`${filename} deployments section successfully updated`);
  }

  private updateDateDisplayInContent(content: string): string {
    const now = new Date();
    const dataCollectedAt = now
      .toISOString()
      .replace('T', ' ')
      .replace('Z', ' UTC');

    // Check if the note line exists
    if (content.includes('compound-docs-aggregator')) {
      if (content.includes('Data collected on:')) {
        // Replace existing date/timestamp (handles both date-only and full timestamp formats)
        return content.replace(
          /Data collected on: \*\*[^*]+\*\*\.?/g,
          `Data collected on: **${dataCollectedAt}**.`,
        );
      } else {
        // Add timestamp to existing note (after repository.)
        return content.replace(
          /(repository\.)/g,
          `$1 Data collected on: **${dataCollectedAt}**.`,
        );
      }
    }

    return content;
  }

  /**
   * Generates the deployments YAML section from NestedMarkets data
   */
  private generateDeploymentsSection(nestedMarkets: NestedMarkets): string {
    const deployments: string[] = [];
    // Note: 'deployments:' header is already in the file, so we don't add it here

    const networkEntries = Object.entries(nestedMarkets.markets).sort(
      ([a], [b]) =>
        getNetworkSortPosition(a, this.networks) -
        getNetworkSortPosition(b, this.networks),
    );

    for (const [networkName, networkMarkets] of networkEntries) {
      const marketEntries = Object.entries(networkMarkets).sort(([a], [b]) =>
        a.localeCompare(b),
      );

      // Check if network has USDC.e market (for determining native suffix)
      const hasUSDCE = marketEntries.some(
        ([name]) => name.toLowerCase() === 'cusdcev3',
      );

      for (const [marketName, marketData] of marketEntries) {
        const suffix = this.getMarketSuffix(marketName, hasUSDCE);
        const deploymentKey = this.getDeploymentKey(
          networkName,
          marketName,
          suffix,
        );
        const tabText = this.getTabText(networkName, marketName);
        const blockscanOrigin = getBlockscanOrigin(networkName, this.networks);

        deployments.push(`  ${deploymentKey}:`);
        deployments.push(`    tab_text: ${tabText}`);
        deployments.push(`    blockscan_origin: '${blockscanOrigin}'`);
        deployments.push(`    contracts:`);

        const contracts = this.formatContracts(
          marketData.contracts,
          marketData.collaterals,
          marketName,
        );

        const collateralSymbols = new Set(
          marketData.collaterals.map((c) => c.symbol),
        );

        for (const [contractName, contractAddress] of Object.entries(
          contracts,
        )) {
          if (contractName.includes('_')) {
            continue;
          }

          if (collateralSymbols.has(contractName)) {
            deployments.push(`      ${contractName}:`);
            deployments.push(`        address: '${contractAddress}'`);

            const metadataPrefix = `${contractName}_`;
            const metadataFields: Array<[string, string]> = [];

            for (const [key, value] of Object.entries(contracts)) {
              if (key.startsWith(metadataPrefix)) {
                const metadataKey = key.replace(metadataPrefix, '');
                metadataFields.push([metadataKey, value]);
              }
            }

            const fieldOrder = [
              'Borrow CF',
              'Borrow CF Raw',
              'Liquidation CF',
              'Liquidation CF Raw',
              'Liquidation Penalty',
              'Liquidation Penalty Raw',
              'Supply Cap',
              'Supply Cap Raw',
              'Price Feed',
            ];

            const orderedFields = this.orderMetadataFields(
              metadataFields,
              fieldOrder,
            );
            for (const [key, value] of orderedFields) {
              deployments.push(`        ${key}: '${value}'`);
            }
          } else {
            deployments.push(`      ${contractName}: '${contractAddress}'`);
          }
        }
      }
    }

    // Add static deployments for unsupported networks
    for (const staticDeployment of STATIC_DEPLOYMENTS) {
      deployments.push(`  ${staticDeployment.deploymentKey}:`);
      deployments.push(`    tab_text: ${staticDeployment.tabText}`);
      deployments.push(
        `    blockscan_origin: '${staticDeployment.blockscanOrigin}'`,
      );
      deployments.push(`    contracts:`);
      for (const [contractName, contractAddress] of Object.entries(
        staticDeployment.contracts,
      )) {
        deployments.push(`      ${contractName}: '${contractAddress}'`);
      }
    }

    return deployments.join('\n');
  }

  /**
   * Formats contracts from market data into the format expected by compound-3.md
   */
  private formatContracts(
    contracts: any,
    collaterals: any[],
    marketName: string,
  ): Record<string, string> {
    const formatted: Record<string, string> = {};
    const cometContractName = this.getCometContractName(marketName);

    const contractMappings: Record<string, string> = {
      comet: cometContractName,
      cometImplementation: `${cometContractName} Implementation`,
      cometExtension: `${cometContractName} Ext`,
      configurator: 'Configurator',
      configuratorImplementation: 'Configurator Implementation',
      cometAdmin: 'Proxy Admin',
      cometFactory: 'Comet Factory',
      rewards: 'Rewards',
      bulker: 'Bulker',
      governor: 'Governor',
      timelock: 'Timelock',
    };

    const optionalContracts: Record<string, string> = {
      bridgeReceiver: 'Bridge Receiver',
      faucet: 'Faucet',
      svrFeeRecipient: 'SVR Fee Recipient',
      marketAdminPermissionChecker: 'Market Admin Permission Checker',
      marketAdminUpdateTimelock: 'Market Admin Update Timelock',
      marketAdminUpdateProposer: 'Market Admin Update Proposer',
    };

    for (const [key, displayName] of Object.entries(contractMappings)) {
      if (contracts[key]) {
        formatted[displayName] = contracts[key];
      }
    }

    for (const [key, displayName] of Object.entries(optionalContracts)) {
      if (contracts[key]) {
        formatted[displayName] = contracts[key];
      }
    }

    for (const collateral of collaterals) {
      formatted[collateral.symbol] = collateral.address;

      if (collateral.CF) {
        formatted[`${collateral.symbol}_Borrow CF`] = collateral.CF;
        if (collateral.borrowCollateralFactorRaw) {
          formatted[`${collateral.symbol}_Borrow CF Raw`] =
            collateral.borrowCollateralFactorRaw;
        }
      }
      if (collateral.LF) {
        formatted[`${collateral.symbol}_Liquidation CF`] = collateral.LF;
        if (collateral.liquidateCollateralFactorRaw) {
          formatted[`${collateral.symbol}_Liquidation CF Raw`] =
            collateral.liquidateCollateralFactorRaw;
        }
      }
      if (collateral.LP) {
        formatted[`${collateral.symbol}_Liquidation Penalty`] = collateral.LP;
        if (collateral.liquidationFactorRaw) {
          formatted[`${collateral.symbol}_Liquidation Penalty Raw`] =
            collateral.liquidationFactorRaw;
        }
      }

      if (collateral.supplyCapFormatted) {
        formatted[`${collateral.symbol}_Supply Cap`] =
          collateral.supplyCapFormatted;
      }

      if (collateral.supplyCapRaw) {
        formatted[`${collateral.symbol}_Supply Cap Raw`] =
          collateral.supplyCapRaw;
      }

      if (collateral.priceFeedAddress) {
        formatted[`${collateral.symbol}_Price Feed`] =
          collateral.priceFeedAddress;
      }
    }

    return formatted;
  }

  /**
   * Gets the comet contract name based on the market name
   */
  private getCometContractName(marketName: string): string {
    const normalized = marketName.trim();
    const lowerNormalized = normalized.toLowerCase();

    // Handle special case: cUSDCev3 -> cUSDCv3 (for USDC.e markets, the contract is still cUSDCv3)
    if (lowerNormalized === 'cusdcev3' || lowerNormalized === 'cusdc.ev3') {
      return 'cUSDCv3';
    }

    return normalized;
  }

  /**
   * Generates deployment key (header) from network and market names
   */
  private getDeploymentKey(
    networkName: string,
    marketName: string,
    suffix: string,
  ): string {
    const networkDisplay = getNetworkDisplayName(networkName, this.networks);
    const marketDisplay = this.getMarketDisplayName(marketName);
    return `${networkDisplay} - ${marketDisplay} Base${suffix}`;
  }

  /**
   * Gets market display name
   */
  private getMarketDisplayName(marketName: string): string {
    const lowerMarket = marketName.toLowerCase();

    if (lowerMarket === 'cusdcev3' || lowerMarket === 'cusdc.ev3') {
      return 'USDC.e';
    }
    if (
      lowerMarket === 'cusdbcbcv3' ||
      lowerMarket === 'cusdbcbc' ||
      lowerMarket.includes('usdbc')
    ) {
      return 'USDbC';
    }
    if (lowerMarket === 'cwstethv3' || lowerMarket === 'cwsteth') {
      return 'wstETH'; // lowercase 'w'
    }
    if (lowerMarket === 'cusdev3' || lowerMarket === 'cusde') {
      return 'USDe';
    }
    if (lowerMarket === 'caerov3' || lowerMarket === 'caero') {
      return 'AERO';
    }

    // For standard markets: remove 'c' prefix and 'v3' suffix, then uppercase
    return marketName.replace(/^c/i, '').replace(/v3$/i, '').toUpperCase();
  }

  /**
   * Gets market suffix (e.g., " (Bridged)", " (Native)")
   */
  private getMarketSuffix(marketName: string, hasUSDCE: boolean): string {
    const lowerMarket = marketName.toLowerCase();

    if (lowerMarket === 'cusdcev3' || lowerMarket.includes('usdce')) {
      return ' (Bridged)';
    }

    if (lowerMarket.includes('usdbc') || lowerMarket === 'cusdbcbcv3') {
      return ' (Bridged)';
    }

    // For USDC markets, if there's also a USDC.e market in the same network, this is native
    if (lowerMarket === 'cusdcv3' && hasUSDCE) {
      return ' (Native)';
    }

    return '';
  }

  /**
   * Generates tab text from network and market names
   */
  private getTabText(networkName: string, marketName: string): string {
    const networkShort = getNetworkShortName(networkName, this.networks);
    const marketShort = this.getMarketDisplayName(marketName);
    return `${networkShort} ${marketShort}`;
  }

  private orderMetadataFields(
    fields: Array<[string, string]>,
    order: string[],
  ): Array<[string, string]> {
    const ordered: Array<[string, string]> = [];
    const fieldMap = new Map(fields);

    for (const key of order) {
      const value = fieldMap.get(key);
      if (value !== undefined) {
        ordered.push([key, value]);
        fieldMap.delete(key);
      }
    }

    for (const [key, value] of fieldMap) {
      ordered.push([key, value]);
    }

    return ordered;
  }
}
