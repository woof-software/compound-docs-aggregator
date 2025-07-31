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

  /**
   * Gets file content from repository
   */
  async getFileContent(
    owner: string,
    repo: string,
    path: string,
    ref = 'main',
  ): Promise<{ content: string; sha: string }> {
    try {
      const url = `/repos/${owner}/${repo}/contents/${path}?ref=${ref}`;
      const response = await this.api.get(url);

      if (Array.isArray(response.data)) {
        throw new Error('Expected file, got directory');
      }

      return {
        content: Buffer.from(response.data.content, 'base64').toString('utf8'),
        sha: response.data.sha,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error getting file content: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Gets a git reference
   */
  async getRef(
    owner: string,
    repo: string,
    ref: string,
  ): Promise<{ sha: string }> {
    try {
      const url = `/repos/${owner}/${repo}/git/refs/${ref}`;
      const response = await this.api.get(url);

      return {
        sha: response.data.object.sha,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error getting reference: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Creates a git reference (branch)
   */
  async createRef(
    owner: string,
    repo: string,
    ref: string,
    sha: string,
  ): Promise<void> {
    try {
      const url = `/repos/${owner}/${repo}/git/refs`;
      await this.api.post(url, {
        ref,
        sha,
      });

      this.logger.log(`Created reference: ${ref}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error creating reference: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Updates or creates a file
   */
  async updateFile(
    owner: string,
    repo: string,
    path: string,
    message: string,
    content: string,
    sha: string,
    branch: string,
  ): Promise<void> {
    try {
      const url = `/repos/${owner}/${repo}/contents/${path}`;
      await this.api.put(url, {
        message,
        content: Buffer.from(content).toString('base64'),
        sha,
        branch,
      });

      this.logger.log(`Updated file: ${path}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error updating file: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Creates a pull request
   */
  async createPullRequest(
    owner: string,
    repo: string,
    title: string,
    head: string,
    base: string,
    body: string,
  ): Promise<{ html_url: string; number: number }> {
    try {
      const url = `/repos/${owner}/${repo}/pulls`;
      const response = await this.api.post(url, {
        title,
        head,
        base,
        body,
        maintainer_can_modify: true,
      });

      this.logger.log(`Created pull request: ${response.data.html_url}`);

      return {
        html_url: response.data.html_url,
        number: response.data.number,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error creating pull request: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Deletes a git reference (branch)
   */
  async deleteRef(owner: string, repo: string, ref: string): Promise<void> {
    try {
      const url = `/repos/${owner}/${repo}/git/refs/${ref}`;
      await this.api.delete(url);

      this.logger.log(`Deleted reference: ${ref}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error deleting reference: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Gets repository information
   */
  async getRepository(
    owner: string,
    repo: string,
  ): Promise<{ default_branch: string }> {
    try {
      const url = `/repos/${owner}/${repo}`;
      const response = await this.api.get(url);

      return {
        default_branch: response.data.default_branch,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error getting repository: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Gets commit information
   */
  async getCommit(
    owner: string,
    repo: string,
    ref: string,
  ): Promise<{ sha: string }> {
    try {
      const url = `/repos/${owner}/${repo}/commits/${ref}`;
      const response = await this.api.get(url);

      return {
        sha: response.data.sha,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error getting commit: ${errorMessage}`);
      throw error;
    }
  }
}
