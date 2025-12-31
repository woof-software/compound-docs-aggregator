import { Injectable } from '@nestjs/common';
import fs from 'node:fs';
import path from 'node:path';

export type UsersChunkInfo = {
  file: string;
  rows: number;
  endCreatedAt: number;
};

export type UsersSeries = {
  network: string;
  version: 2 | 3;
  lastCreatedAt: number;
  chunks: UsersChunkInfo[];
};

export type UsersManifest = {
  chunkRows: number;
  series: UsersSeries[];
};

const DEFAULT_CHUNK_ROWS = 10_000;

@Injectable()
export class ManifestsService {
  private _manifest?: UsersManifest;
  private set manifest(manifest: UsersManifest) {
    this._manifest = manifest;
  }
  private get manifest(): UsersManifest {
    if (!this._manifest) throw new Error('Manifest must be defined');
    return this._manifest;
  }

  public get value(): UsersManifest {
    return this.manifest;
  }

  public load(manifestPath: string): UsersManifest {
    if (!fs.existsSync(manifestPath)) {
      this.manifest = { chunkRows: DEFAULT_CHUNK_ROWS, series: [] };
      return this.manifest;
    }

    const raw = fs.readFileSync(manifestPath, 'utf8');
    const parsed = JSON.parse(raw) as UsersManifest;

    parsed.chunkRows ??= DEFAULT_CHUNK_ROWS;
    parsed.series ??= [];
    for (const s of parsed.series) {
      s.chunks ??= [];
      s.lastCreatedAt ??= 0;
    }

    this.manifest = parsed;
    return this.manifest;
  }

  public save(manifestPath: string): void {
    const dir = path.dirname(manifestPath);
    fs.mkdirSync(dir, { recursive: true });

    const tmp = manifestPath + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(this.manifest, null, 2));
    fs.renameSync(tmp, manifestPath);
  }

  public getOrCreateSeries(network: string, version: 2 | 3): UsersSeries {
    let s = this.manifest.series.find(
      (x) => x.network === network && x.version === version,
    );
    if (!s) {
      s = { network, version, lastCreatedAt: 0, chunks: [] };
      this.manifest.series.push(s);
    }
    return s;
  }

  public chunkFileName(network: string, version: 2 | 3, idx: number): string {
    const n = String(idx).padStart(4, '0');
    return `v${version}_${network}_${n}.sqlite`;
  }
}
