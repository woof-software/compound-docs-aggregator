import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { writeFileSync, readFileSync, existsSync } from 'fs';

interface CacheEntry {
  timestamp: number;
  data: string[];
}

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);
  private readonly owner = 'compound-finance';
  private readonly repo = 'comet';
  private readonly defaultBranch = 'main';
  private readonly api: AxiosInstance;
  private readonly rootDir = 'deployments';

  // Excluded networks (test networks)
  private readonly excludedNetworks = ['sepolia', 'fuji', 'hardhat'];

  // Caching configuration
  private readonly cacheFile = '.github-cache.json';
  private readonly cacheExpirationMs = 30 * 60 * 1000; // 30 minutes
  private inMemoryCache: string[] | null = null;

  constructor() {
    const token = process.env.GITHUB_TOKEN || '';
    this.api = axios.create({
      baseURL: 'https://api.github.com',
      headers: token ? { Authorization: `token ${token}` } : undefined,
    });
  }

  /**
   * Gets list of all roots.json files with caching
   */
  async listAllRootsJson(): Promise<string[]> {
    // Check in-memory cache
    if (this.inMemoryCache) {
      this.logger.debug('Using in-memory cache');
      return this.inMemoryCache;
    }

    // Check file cache
    const cachedData = this.loadFromFileCache();
    if (cachedData) {
      this.logger.debug('Using file cache');
      this.inMemoryCache = cachedData;
      return cachedData;
    }

    // Fetch data via GitHub Tree API (single request)
    const results = await this.fetchFromGitHubTree();

    // Save to cache
    this.saveToFileCache(results);
    this.inMemoryCache = results;

    return results;
  }

  /**
   * Uses GitHub Tree API to get entire structure in a single request
   */
  private async fetchFromGitHubTree(): Promise<string[]> {
    try {
      // Get entire file tree recursively in one request
      const url = `/repos/${this.owner}/${this.repo}/git/trees/${this.defaultBranch}?recursive=1`;
      const response = await this.api.get(url);

      const tree = response.data.tree as Array<{
        path: string;
        type: 'blob' | 'tree';
        mode: string;
      }>;

      const results: string[] = [];

      for (const item of tree) {
        // Look only for roots.json files in deployments folder
        if (
          item.type === 'blob' &&
          item.path.startsWith(`${this.rootDir}/`) &&
          item.path.endsWith('/roots.json')
        ) {
          // Check if file is not in an excluded network
          const relativePath = item.path.replace(/^deployments\//, '');
          const isExcluded = this.excludedNetworks.some((network) =>
            relativePath.startsWith(`${network}/`),
          );

          if (!isExcluded) {
            results.push(relativePath);
          } else {
            this.logger.debug(`Excluded: ${relativePath}`);
          }
        }
      }

      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(`Error fetching tree: ${errorMessage}`);

      // Fallback to old method
      this.logger.warn('Falling back to recursive method');
      return this.fallbackRecursiveMethod();
    }
  }

  /**
   * Fallback method - old recursive logic
   */
  private async fallbackRecursiveMethod(): Promise<string[]> {
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
          const isExcludedNetwork = this.excludedNetworks.some(
            (network) =>
              item.path.includes(`/${network}/`) ||
              item.path.endsWith(`/${network}`) ||
              item.path === `${this.rootDir}/${network}`,
          );

          if (isExcludedNetwork) {
            this.logger.debug(
              `Skipping excluded network directory: ${item.path}`,
            );
            continue;
          }

          await this.recursiveList(item.path, results);
        } else if (
          item.type === 'file' &&
          item.name.toLowerCase() === 'roots.json'
        ) {
          const relative = item.path.replace(/^deployments\//, '');
          results.push(relative);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(`Error reading ${pathInRepo}: ${errorMessage}`);
    }
  }

  /**
   * Loads data from file cache
   */
  private loadFromFileCache(): string[] | null {
    try {
      if (!existsSync(this.cacheFile)) {
        return null;
      }

      const cacheContent = readFileSync(this.cacheFile, 'utf-8');
      const cacheEntry: CacheEntry = JSON.parse(cacheContent);

      const now = Date.now();
      if (now - cacheEntry.timestamp > this.cacheExpirationMs) {
        this.logger.debug('Cache expired');
        return null;
      }

      return cacheEntry.data;
    } catch (err) {
      this.logger.warn('Failed to load cache, will fetch fresh data');
      return null;
    }
  }

  /**
   * Saves data to file cache
   */
  private saveToFileCache(data: string[]) {
    try {
      const cacheEntry: CacheEntry = {
        timestamp: Date.now(),
        data: data,
      };
      writeFileSync(
        this.cacheFile,
        JSON.stringify(cacheEntry, null, 2),
        'utf-8',
      );
      this.logger.debug('Data saved to cache');
    } catch (err) {
      this.logger.warn('Failed to save cache');
    }
  }
}
