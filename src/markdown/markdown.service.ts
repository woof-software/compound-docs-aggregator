// src/markdown/markdown.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { markdownTable } from 'markdown-table';

@Injectable()
export class MarkdownService {
  private readonly logger = new Logger(MarkdownService.name);

  /**
   * Generates README.md with:
   *  1) A link to the full Excel report
   *  2) For each market, a collapsible section containing exactly three Markdown tables:
   *     - Contracts (#, Name, Address, Note)
   *     - Curve     (#, Name, Value)
   *     - Collaterals (#, Address, Decimals)
   *  3) A separate, non-collapsible "Rewards" section with its own Markdown table
   *     (rows 1–8 as placeholders + a total row).
   *
   * @param markets  Array of market objects:
   *   {
   *     addresses: { networkPath, comet, configurator, rewards?, bridgeReceiver?, bulker? },
   *     curve: { supplyKink, borrowKink },
   *     collaterals: Array<{ address: string; decimals: number }>
   *   }
   * @param excelPath  Relative path to the Excel file (e.g., "output.xlsx")
   */
  write(markets: any[], excelPath: string): void {
    const lines: string[] = [];

    // === Header & Download Link ===
    lines.push('# 📊 Comet Markets Overview');
    lines.push('');
    lines.push(`**Download full Excel report:** [${excelPath}](${excelPath})`);
    lines.push('');
    lines.push('---');
    lines.push('');

    // === Collapsible Sections for Each Market ===
    for (const market of markets) {
      const np = market.addresses.networkPath;
      lines.push('<details>');
      lines.push(`<summary><strong>${np}</strong></summary>`);
      lines.push('');

      //
      // 1) Contracts Table
      //
      lines.push('**Contracts**');
      const contractHeader = ['#', 'Name', 'Address', 'Note'];
      const contractRows: string[][] = [];
      const addr = market.addresses;

      // Row 1: Comet
      contractRows.push(['1', 'Comet', addr.comet, 'Market / comet']);
      // Row 2: Configurator
      contractRows.push([
        '2',
        'Configurator',
        addr.configurator,
        'Configurator implementation',
      ]);
      // Row 3: Rewards (if exists)
      if (addr.rewards) {
        contractRows.push(['3', 'Rewards', addr.rewards, 'Rewards contract']);
      }
      // Row 4: BridgeReceiver (if exists)
      if (addr.bridgeReceiver) {
        contractRows.push([
          (contractRows.length + 1).toString(),
          'BridgeReceiver',
          addr.bridgeReceiver,
          'BridgeReceiver contract',
        ]);
      }
      // Row 5: Bulker (if exists)
      if (addr.bulker) {
        contractRows.push([
          (contractRows.length + 1).toString(),
          'Bulker',
          addr.bulker,
          'Bulker contract',
        ]);
      }

      const contractTableMd = markdownTable([contractHeader, ...contractRows], {
        align: ['c', 'l', 'l', 'l'],
      });
      contractTableMd.split('\n').forEach((row) => lines.push(`  ${row}`));
      lines.push('');

      //
      // 2) Curve Table
      //
      lines.push('**Curve**');
      const curveHeader = ['#', 'Name', 'Value'];
      const curveRows: string[][] = [
        ['1', 'supplyKink', market.curve.supplyKink.toString()],
        ['2', 'borrowKink', market.curve.borrowKink.toString()],
      ];

      const curveTableMd = markdownTable([curveHeader, ...curveRows], {
        align: ['c', 'l', 'r'],
      });
      curveTableMd.split('\n').forEach((row) => lines.push(`  ${row}`));
      lines.push('');

      //
      // 3) Collaterals Table
      //
      lines.push('**Collaterals**');
      const collHeader = ['#', 'Address', 'Decimals'];
      const assets: any[] = Array.isArray(market.collaterals)
        ? market.collaterals
        : [];
      const collRows: string[][] = [];
      assets.forEach((a, idx) => {
        collRows.push([
          (idx + 1).toString(),
          a.address || '',
          a.decimals != null ? a.decimals.toString() : '',
        ]);
      });

      const collTableMd = markdownTable([collHeader, ...collRows], {
        align: ['c', 'l', 'r'],
      });
      collTableMd.split('\n').forEach((row) => lines.push(`  ${row}`));
      lines.push('');

      lines.push('</details>');
      lines.push('');
      lines.push('---');
      lines.push('');
    }

    // === Separate Rewards Section ===
    lines.push('## 🎁 Rewards');
    lines.push('');
    lines.push(
      'Below is a placeholder table for reward data. Rows 1–8 are for “Date of record” entries, ' +
        'and the “Total rewards” row will sum up numeric columns.',
    );
    lines.push('');

    const rewardsHeader = [
      '№',
      'Date',
      'Network',
      'Market',
      'Daily rewards',
      'Yearly rewards',
      'Lend daily rewards',
      'Borrow daily rewards',
      'Lend APR boost',
      'Borrow APR boost',
      'Amount of COMP on Reward contract',
    ];

    // 8 placeholder rows
    const rewardsRows: string[][] = [];
    for (let i = 1; i <= 8; i++) {
      rewardsRows.push([
        i.toString(),
        'Date of record',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ]);
    }
    // Total rewards row
    rewardsRows.push([
      '',
      '**Total rewards**',
      '',
      '',
      'SUM',
      'SUM',
      'SUM',
      'SUM',
      'SUM',
      'SUM',
      '',
    ]);

    const rewardsTableMd = markdownTable([rewardsHeader, ...rewardsRows], {
      align: ['c', 'l', 'l', 'l', 'r', 'r', 'r', 'r', 'r', 'r', 'r'],
    });
    lines.push(rewardsTableMd);
    lines.push('');
    lines.push('---');
    lines.push('');
    lines.push(
      `*Last updated:* ${new Date()
        .toISOString()
        .replace('T', ' ')
        .replace('Z', ' UTC')}`,
    );
    lines.push('');

    writeFileSync('README.md', lines.join('\n'), 'utf-8');
  }
}
