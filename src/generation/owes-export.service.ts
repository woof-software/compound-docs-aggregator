import { Injectable, Logger } from '@nestjs/common';

import { CompoundVersion } from 'common/types/compound-version';
import { fmtPct } from 'common/utils/fmt-pct';
import { shouldLogPct } from 'common/utils/should-log-pct';
import { RuntimeDbService } from 'indexer/runtime-db.service';
import { JsonService } from 'json/json.service';

@Injectable()
export class OwesExportService {
  private readonly logger = new Logger(OwesExportService.name);

  // Big page is OK: reading from sqlite + append to file
  private readonly pageSize = 5000;

  constructor(
    private readonly db: RuntimeDbService,
    private readonly json: JsonService,
  ) {}

  public exportDetailedOwes(version: CompoundVersion): string {
    const total = this.db.countOwesByVersion(version);

    const writer = this.json.startDetailedOwes(version);

    let offset = 0;
    let page = 0;
    let lastPct = -1;

    this.logger.log(`[detailed][${version}] export start: totalRows=${total}`);

    while (true) {
      page += 1;

      const pct = fmtPct(Math.min(offset, total), Math.max(1, total), 2);

      const pctInt = Math.floor((offset * 100) / Math.max(1, total));
      if (shouldLogPct(lastPct, pctInt, 5)) {
        lastPct = pctInt;
        this.logger.verbose(
          `[detailed][${version}] ${pct} page=${page} offset=${offset}/${total}`,
        );
      }

      const rows = this.db.fetchOwesPageByVersion({
        version,
        limit: this.pageSize,
        offset,
      });

      if (rows.length === 0) break;

      type Row = (typeof rows)[number];
      // Already sorted by owed desc by SQL
      const mapper =
        version === CompoundVersion.V2
          ? (r: Row) => ({
              user: r.user,
              owedDec: r.owed_dec,
            })
          : (r: Row) => ({
              network: r.network,
              market: r.market,
              user: r.user,
              owedDec: r.owed_dec,
            });

      this.json.appendDetailedOwesBatch(writer, rows.map(mapper));

      offset += rows.length;
      if (rows.length < this.pageSize) break;
    }

    const path = this.json.finishDetailedOwes(writer);

    this.logger.log(
      `[detailed][${version}] export done: path=${path} rowsWritten=${offset}/${total}`,
    );

    return path;
  }
}
