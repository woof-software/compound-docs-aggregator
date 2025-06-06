import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { writeFileSync, mkdirSync } from 'fs';
import * as path from 'path';

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);
  private readonly owner = 'compound-finance';
  private readonly repo = 'comet';
  private readonly defaultBranch = 'main';
  private readonly api: AxiosInstance;
  private readonly rootDir = 'deployments';

  constructor() {
    const token = process.env.GITHUB_TOKEN || '';
    this.api = axios.create({
      baseURL: 'https://api.github.com',
      headers: token ? { Authorization: `token ${token}` } : undefined,
    });
  }

  /**
   * Reursively finds all 'roots.json' files in the GitHub repository.
   * and returns their relative paths.
   *
   * Example result:
   * [
   *   'arbitrum/usdc.e/roots.json',
   *   'arbitrum/usdc/roots.json',
   *   'base/aero/roots.json',
   *   'mainnet/usdc/roots.json',
   *   'linea/usdc/roots.json',
   *   …
   * ]
   */
  async listAllRootsJson(): Promise<string[]> {
    const results: string[] = [];
    await this.recursiveList(this.rootDir, results);
    return results;
  }

  private async recursiveList(pathInRepo: string, results: string[]) {
    try {
      const url = `/repos/${this.owner}/${this.repo}/contents/${pathInRepo}?ref=${this.defaultBranch}`;
      const response = await this.api.get(url);

      const items = response.data as Array<{
        name: string;
        path: string;
        type: 'file' | 'dir';
        download_url: string | null;
      }>;

      for (const item of items) {
        if (item.type === 'dir') {
          // if the item is a directory, recursively list its contents
          await this.recursiveList(item.path, results);
        } else if (
          item.type === 'file' &&
          item.name.toLowerCase() === 'roots.json'
        ) {
          // if the item is a file named 'roots.json', add its relative path to results
          const relative = item.path.replace(/^deployments\//, '');
          results.push(relative);
        }
      }
    } catch (err) {
      // Log the error but continue processing other paths
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(`Error reading ${pathInRepo}: ${errorMessage}`);
    }
  }

  async fetchAndSaveRoots(targetDir: string) {
    // get all relative paths to 'roots.json' files
    const rootsPaths = await this.listAllRootsJson();
    const savedPaths: string[] = [];

    for (const rel of rootsPaths) {
      // form the full URL to download the JSON file
      // example: https://raw.githubusercontent.com/compound-finance/comet/main/deployments/arbitrum/usdc.e/roots.json
      const rawUrl = `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.defaultBranch}/${this.rootDir}/${rel}`;

      let jsonData: any;
      try {
        const response = await axios.get(rawUrl, { responseType: 'json' });
        jsonData = response.data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        this.logger.error(`Failed to download ${rawUrl}: ${errorMessage}`);
        continue; // Пропускаем этот файл и идём дальше
      }

      const localPath = path.join(targetDir, rel);

      // guarantee the directory exists
      const dir = path.dirname(localPath);
      try {
        mkdirSync(dir, { recursive: true });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        this.logger.error(`Failed to create directory ${dir}: ${errorMessage}`);
        continue;
      }

      try {
        writeFileSync(localPath, JSON.stringify(jsonData, null, 2), 'utf-8');
        this.logger.log(`Saved: ${localPath}`);
        savedPaths.push(localPath);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        this.logger.error(`Failed to write file ${localPath}: ${errorMessage}`);
      }
    }

    return savedPaths;
  }
}
