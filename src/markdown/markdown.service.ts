import { Injectable, Logger } from '@nestjs/common';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { markdownTable } from 'markdown-table';
import { CurveEntry, NestedMarkets } from 'contract/contract.types';

@Injectable()
export class MarkdownService {
  private readonly logger = new Logger(MarkdownService.name);

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

  /**
   * Updates the deployments section in compound-3.md file using data from output.json
   * This method replaces lines 16-567 with newly generated deployment data
   */
  updateCompound3Deployments(): void {
    const compound3Path = join(
      process.cwd(),
      'compound-finance',
      'compound-3.md',
    );
    const outputJsonPath = join(process.cwd(), 'output.json');

    // Check if files exist
    if (!existsSync(compound3Path)) {
      this.logger.error(`File not found: ${compound3Path}`);
      throw new Error(`File not found: ${compound3Path}`);
    }

    if (!existsSync(outputJsonPath)) {
      this.logger.error(`File not found: ${outputJsonPath}`);
      throw new Error(`File not found: ${outputJsonPath}`);
    }

    // Read existing compound-3.md file
    const fileContent = readFileSync(compound3Path, 'utf-8');
    const lines = fileContent.split('\n');

    // Read output.json
    const outputJsonContent = readFileSync(outputJsonPath, 'utf-8');
    const nestedMarkets: NestedMarkets = JSON.parse(outputJsonContent);

    // Generate deployments section
    const deploymentsSection = this.generateDeploymentsSection(nestedMarkets);

    // Find the start of deployments section (should be line 15, index 14)
    const deploymentsStartIndex = 14; // Line 15 (0-indexed: 14)

    // Find the end of deployments section by looking for the next '---' marker
    let deploymentsEndIndex = lines.length;
    for (let i = deploymentsStartIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      if (line && line.trim() === '---') {
        deploymentsEndIndex = i;
        break;
      }
    }

    // Replace deployments section (lines 16 to end of deployments)
    const beforeSection = lines.slice(0, deploymentsStartIndex + 1).join('\n'); // Lines 1-15 (including 'deployments:')
    const afterSection = lines.slice(deploymentsEndIndex).join('\n'); // Everything after '---'

    // Combine all parts
    const updatedContent = `${beforeSection}\n${deploymentsSection}\n${afterSection}`;

    // Write back to file
    writeFileSync(compound3Path, updatedContent, 'utf-8');
    this.logger.log('compound-3.md deployments section successfully updated');
  }

  /**
   * Generates the deployments YAML section from NestedMarkets data
   */
  private generateDeploymentsSection(nestedMarkets: NestedMarkets): string {
    const deployments: string[] = [];
    // Note: 'deployments:' header is already in the file (line 15), so we don't add it here

    // Sort networks and markets for consistent output
    const networkEntries = Object.entries(nestedMarkets.markets).sort(
      ([a], [b]) =>
        this.getNetworkSortOrder(a).localeCompare(this.getNetworkSortOrder(b)),
    );

    for (const [networkName, networkMarkets] of networkEntries) {
      const marketEntries = Object.entries(networkMarkets).sort(([a], [b]) =>
        a.localeCompare(b),
      );

      // Check if network has both USDC.e and USDC markets (for determining native suffix)
      const hasUSDCE = marketEntries.some(
        ([name]) => name.toLowerCase() === 'cusdcev3',
      );
      const hasUSDC = marketEntries.some(
        ([name]) => name.toLowerCase() === 'cusdcv3',
      );

      for (const [marketName, marketData] of marketEntries) {
        const suffix = this.getMarketSuffix(marketName, hasUSDCE, hasUSDC);
        const deploymentKey = this.getDeploymentKey(
          networkName,
          marketName,
          suffix,
        );
        const tabText = this.getTabText(networkName, marketName);
        const blockscanOrigin = this.getBlockscanOrigin(networkName);

        deployments.push(`  ${deploymentKey}: ## this becomes the header text`);
        deployments.push(`    tab_text: ${tabText}`);
        deployments.push(`    blockscan_origin: '${blockscanOrigin}'`);
        deployments.push(`    contracts:`);

        // Add contracts
        const contracts = this.formatContracts(
          marketData.contracts,
          marketData.collaterals,
          marketName,
        );
        for (const [contractName, contractAddress] of Object.entries(
          contracts,
        )) {
          deployments.push(`      ${contractName}: '${contractAddress}'`);
        }
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

    // Get comet contract name from market name
    const cometContractName = this.getCometContractName(marketName);

    // Map main contracts
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

    // Add optional contracts
    const optionalContracts: Record<string, string> = {
      bridgeReceiver: 'Bridge Receiver',
      faucet: 'Faucet',
      marketAdminPermissionChecker: 'Market Admin Permission Checker',
      marketAdminUpdateTimelock: 'Market Admin Update Timelock',
      marketAdminUpdateProposer: 'Market Admin Update Proposer',
    };

    // Add main contracts
    for (const [key, displayName] of Object.entries(contractMappings)) {
      if (contracts[key]) {
        formatted[displayName] = contracts[key];
      }
    }

    // Add optional contracts
    for (const [key, displayName] of Object.entries(optionalContracts)) {
      if (contracts[key]) {
        formatted[displayName] = contracts[key];
      }
    }

    // Add collaterals as contracts (using symbol as key)
    for (const collateral of collaterals) {
      formatted[collateral.symbol] = collateral.address;
    }

    return formatted;
  }

  /**
   * Gets the comet contract name based on the market name
   */
  private getCometContractName(marketName: string): string {
    // Market names are like: cUSDCv3, cWETHv3, cUSDCev3, cUSDbCv3, cAEROv3, cUSDev3, cwstETHv3
    // Return as-is, but handle special cases
    const normalized = marketName.trim();
    const lowerNormalized = normalized.toLowerCase();

    // Handle special case: cUSDCev3 -> cUSDCv3 (for USDC.e markets, the contract is still cUSDCv3)
    if (lowerNormalized === 'cusdcev3' || lowerNormalized === 'cusdc.ev3') {
      return 'cUSDCv3';
    }

    // All other market names are used as-is (preserving case)
    // Examples: cWETHv3, cUSDTv3, cUSDSv3, cUSDbCv3, cAEROv3, cUSDev3, cwstETHv3
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
    const networkDisplay = this.getNetworkDisplayName(networkName);
    const marketDisplay = this.getMarketDisplayName(marketName);
    return `${networkDisplay} - ${marketDisplay} Base${suffix}`;
  }

  /**
   * Gets network display name for deployment key
   */
  private getNetworkDisplayName(networkName: string): string {
    const networkMap: Record<string, string> = {
      mainnet: 'Ethereum Mainnet',
      sepolia: 'Ethereum Sepolia Testnet',
      polygon: 'Polygon Mainnet',
      arbitrum: 'Arbitrum',
      base: 'Base',
      optimism: 'Optimism',
      scroll: 'Scroll',
      mantle: 'Mantle',
      mumbai: 'Polygon Mumbai Testnet',
      'base-sepolia': 'Base Sepolia',
    };

    return (
      networkMap[networkName.toLowerCase()] || this.capitalizeFirst(networkName)
    );
  }

  /**
   * Gets market display name
   */
  private getMarketDisplayName(marketName: string): string {
    const lowerMarket = marketName.toLowerCase();

    // Handle special cases first
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
    const display = marketName
      .replace(/^c/i, '')
      .replace(/v3$/i, '')
      .toUpperCase();

    // Handle standard cases
    if (display === 'USDC') return 'USDC';
    if (display === 'USDT') return 'USDT';
    if (display === 'WETH') return 'WETH';
    if (display === 'USDS') return 'USDS';

    return display;
  }

  /**
   * Gets market suffix (e.g., " (Bridged)", " (Native)")
   */
  private getMarketSuffix(
    marketName: string,
    hasUSDCE: boolean,
    hasUSDC: boolean,
  ): string {
    const lowerMarket = marketName.toLowerCase();

    // USDC.e markets are bridged
    if (lowerMarket === 'cusdcev3' || lowerMarket.includes('usdce')) {
      return ' (Bridged)';
    }

    // USDbC markets are bridged
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
    const networkShort = this.getNetworkShortName(networkName);
    const marketShort = this.getMarketShortName(marketName);
    return `${networkShort} ${marketShort}`;
  }

  /**
   * Gets short network name for tab text
   */
  private getNetworkShortName(networkName: string): string {
    const shortMap: Record<string, string> = {
      mainnet: 'Mainnet',
      sepolia: 'Sepolia',
      polygon: 'Polygon',
      arbitrum: 'Arbitrum',
      base: 'Base',
      optimism: 'Optimism',
      scroll: 'Scroll',
      mantle: 'Mantle',
      mumbai: 'Mumbai',
      'base-sepolia': 'Base Sepolia',
    };

    return (
      shortMap[networkName.toLowerCase()] || this.capitalizeFirst(networkName)
    );
  }

  /**
   * Gets short market name for tab text (same as display name)
   */
  private getMarketShortName(marketName: string): string {
    // Tab text uses the same format as display name
    return this.getMarketDisplayName(marketName);
  }

  /**
   * Gets blockscan origin URL for a network
   */
  private getBlockscanOrigin(networkName: string): string {
    const blockscanMap: Record<string, string> = {
      mainnet: 'https://etherscan.io/',
      sepolia: 'https://sepolia.etherscan.io/',
      polygon: 'https://polygonscan.com/',
      mumbai: 'https://mumbai.polygonscan.com/',
      arbitrum: 'https://arbiscan.io/',
      base: 'https://basescan.org/',
      'base-sepolia': 'https://sepolia.basescan.org/',
      optimism: 'https://optimistic.etherscan.io/',
      scroll: 'https://scrollscan.com/',
      mantle: 'https://mantlescan.xyz/',
    };

    return blockscanMap[networkName.toLowerCase()] || 'https://etherscan.io/';
  }

  /**
   * Gets network sort order for consistent ordering
   */
  private getNetworkSortOrder(networkName: string): string {
    const orderMap: Record<string, string> = {
      mainnet: '01',
      sepolia: '02',
      polygon: '03',
      mumbai: '04',
      arbitrum: '05',
      base: '06',
      'base-sepolia': '07',
      optimism: '08',
      scroll: '09',
      mantle: '10',
    };

    return orderMap[networkName.toLowerCase()] || '99' + networkName;
  }

  /**
   * Capitalizes first letter of a string
   */
  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
