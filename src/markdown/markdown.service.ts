import { Injectable, Logger } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { markdownTable } from 'markdown-table';
import { CurveEntry, NestedMarkets } from 'contract/contract.type';

@Injectable()
export class MarkdownService {
  private readonly logger = new Logger(MarkdownService.name);

  write(nestedMarkets: NestedMarkets, jsonPath: string): void {
    const lines: string[] = [];

    // === Setup & Usage Instructions ===
    lines.push('## 🚀 Quick Start');
    lines.push('');
    lines.push('### Environment Setup');
    lines.push(
      'Create a `.env` file in the project root with the following variables:',
    );
    lines.push('');
    lines.push('```env');
    lines.push('# provider keys for blockchain networks');
    lines.push('ANKR_KEY=your_ankr_api_key_here');
    lines.push('UNICHAIN_QUICKNODE_KEY==your_unichain_api_key_here');
    lines.push('```');
    lines.push('');
    lines.push('### Generate Documentation');
    lines.push('Run the following command to generate this documentation:');
    lines.push('');
    lines.push('```bash');
    lines.push('yarn cli:generate');
    lines.push('```');
    lines.push('');
    lines.push('This command will:');
    lines.push('1. Build the NestJS application');
    lines.push('2. Fetch data from all supported networks');
    lines.push('3. Generate JSON output file');
    lines.push('4. Create/update this README.md file');
    lines.push('');
    lines.push('### Available Scripts');
    lines.push('');
    lines.push('```bash');
    lines.push('# Generate documentation and data files');
    lines.push('yarn cli:generate');
    lines.push('');
    lines.push('# Build the application');
    lines.push('yarn build');
    lines.push('');
    lines.push('# Run linting');
    lines.push('yarn lint');
    lines.push('');
    lines.push('# Format code');
    lines.push('yarn format');
    lines.push('```');
    lines.push('');
    lines.push('---');
    lines.push('');

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
}
