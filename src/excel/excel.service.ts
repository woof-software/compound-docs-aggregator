import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

@Injectable()
export class ExcelService {
  /**
   * Generates a single Excel file 'output.xlsx' with:
   *  1) One worksheet per market, each containing three tables:
   *     - Contracts (#, Name, Address, Note)
   *     - Curve     (#, Name, Value)
   *     - Collaterals (#, Address, Decimals)
   *
   *  2) A separate worksheet named 'Rewards' that has a table for recording reward
   *     data for up to 8 entries plus a total row.
   *
   * @param markets Array of market objects, each shaped like:
   *   {
   *     addresses: { networkPath: string; comet: string; configurator: string; rewards?: string; bridgeReceiver?: string; bulker?: string },
   *     curve: { supplyKink: string; borrowKink: string },
   *     collaterals: Array<{ address: string; decimals: number }>
   *   }
   * @returns The filename 'output.xlsx'
   */
  async generate(markets: any[]): Promise<string> {
    const workbook = new ExcelJS.Workbook();

    // === 1) Create one worksheet per market ===
    for (const market of markets) {
      // Derive sheet name from networkPath, replacing invalid chars and truncating to 31 chars
      let sheetName = market.addresses.networkPath.replace(
        /[\/\\?\*\[\]:]/g,
        '_',
      );
      if (sheetName.length > 31) sheetName = sheetName.slice(0, 31);

      const sheet = workbook.addWorksheet(sheetName);
      let currentRow = 1;

      // ---- Contracts Table ----
      const contractsRef = `A${currentRow}`;
      const addr = market.addresses;
      const contractsRows: Array<Array<string | number>> = [];

      // 1) Comet
      contractsRows.push([1, 'Comet', addr.comet, 'Market / comet']);
      // 2) Configurator
      contractsRows.push([
        2,
        'Configurator',
        addr.configurator,
        'Configurator implementation',
      ]);
      // 3) Rewards (if provided)
      if (addr.rewards) {
        contractsRows.push([3, 'Rewards', addr.rewards, 'Rewards contract']);
      }
      // 4) BridgeReceiver (if provided)
      if (addr.bridgeReceiver) {
        contractsRows.push([
          contractsRows.length + 1,
          'BridgeReceiver',
          addr.bridgeReceiver,
          'BridgeReceiver contract',
        ]);
      }
      // 5) Bulker (if provided)
      if (addr.bulker) {
        contractsRows.push([
          contractsRows.length + 1,
          'Bulker',
          addr.bulker,
          'Bulker contract',
        ]);
      }

      sheet.addTable({
        name: `${sheetName.replace(/[^A-Za-z0-9]/g, '')}_Contracts`,
        ref: contractsRef,
        headerRow: true,
        style: { theme: 'TableStyleMedium2' },
        columns: [
          { name: '#' },
          { name: 'Name' },
          { name: 'Address' },
          { name: 'Note' },
        ],
        rows: contractsRows,
      });

      currentRow += contractsRows.length + 2; // +1 header +1 blank

      // ---- Curve Table ----
      const curveRef = `A${currentRow}`;
      const curveRows: Array<Array<string | number>> = [
        ['1', 'supplyKink', market.curve.supplyKink],
        ['2', 'borrowKink', market.curve.borrowKink],
      ];

      sheet.addTable({
        name: `${sheetName.replace(/[^A-Za-z0-9]/g, '')}_Curve`,
        ref: curveRef,
        headerRow: true,
        style: { theme: 'TableStyleMedium7' },
        columns: [{ name: '#' }, { name: 'Name' }, { name: 'Value' }],
        rows: curveRows,
      });

      currentRow += curveRows.length + 2; // +1 header +1 blank

      // ---- Collaterals Table ----
      const collRef = `A${currentRow}`;
      const assets: any[] = Array.isArray(market.collaterals)
        ? market.collaterals
        : [];
      const collRows: Array<Array<string | number>> = [];
      assets.forEach((a, idx) => {
        collRows.push([
          idx + 1,
          a.address || '',
          a.decimals != null ? a.decimals.toString() : '',
        ]);
      });

      sheet.addTable({
        name: `${sheetName.replace(/[^A-Za-z0-9]/g, '')}_Collaterals`,
        ref: collRef,
        headerRow: true,
        style: { theme: 'TableStyleMedium9' },
        columns: [{ name: '#' }, { name: 'Address' }, { name: 'Decimals' }],
        rows: collRows,
      });
    }

    // === 2) Create a separate 'Rewards' worksheet ===
    const rewardsSheet = workbook.addWorksheet('Rewards');
    // Define columns exactly as in the screenshot
    rewardsSheet.columns = [
      { header: '№', key: 'idx', width: 5 },
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Network', key: 'network', width: 20 },
      { header: 'Market', key: 'market', width: 20 },
      { header: 'Daily rewards', key: 'dailyRewards', width: 15 },
      { header: 'Yearly rewards', key: 'yearlyRewards', width: 15 },
      { header: 'Lend daily rewards', key: 'lendDaily', width: 15 },
      { header: 'Borrow daily rewards', key: 'borrowDaily', width: 15 },
      { header: 'Lend APR boost', key: 'lendAprBoost', width: 15 },
      { header: 'Borrow APR boost', key: 'borrowAprBoost', width: 15 },
      {
        header: 'Amount of COMP on Reward contract',
        key: 'compAmount',
        width: 25,
      },
    ];

    // Add 8 empty rows for manual data entry (№1…№8)
    for (let i = 1; i <= 8; i++) {
      rewardsSheet.addRow({
        idx: i,
        date: '',
        network: '',
        market: '',
        dailyRewards: '',
        yearlyRewards: '',
        lendDaily: '',
        borrowDaily: '',
        lendAprBoost: '',
        borrowAprBoost: '',
        compAmount: '',
      });
    }

    // Add "Total rewards" row with SUM formulas for numeric columns
    const totalRowIndex = rewardsSheet.rowCount + 1;
    rewardsSheet.addRow({
      idx: '',
      date: 'Total rewards',
      network: '',
      market: '',
      dailyRewards: { formula: `SUM(E2:E9)` },
      yearlyRewards: { formula: `SUM(F2:F9)` },
      lendDaily: { formula: `SUM(G2:G9)` },
      borrowDaily: { formula: `SUM(H2:H9)` },
      lendAprBoost: { formula: `SUM(I2:I9)` },
      borrowAprBoost: { formula: `SUM(J2:J9)` },
      compAmount: '',
    });

    // Bold the header row and the total row
    rewardsSheet.getRow(1).font = { bold: true };
    rewardsSheet.getRow(totalRowIndex).font = { bold: true };

    // === 3) Save the workbook ===
    const fileName = 'output.xlsx';
    await workbook.xlsx.writeFile(fileName);
    return fileName;
  }
}
