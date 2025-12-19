import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { CompoundFinanceConfig } from 'config/compound-finance.config';

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
  private readonly docsApi: AxiosInstance; // API client for external docs repo
  private readonly baseURL = 'https://api.github.com/';

  constructor(private readonly config: ConfigService) {
    const token = process.env.GITHUB_TOKEN || '';
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: token ? { Authorization: `token ${token}` } : undefined,
    });

    this.docsApi = axios.create({
      baseURL: this.baseURL,
      headers: this.patTokenCompoundFinance
        ? { Authorization: `token ${this.patTokenCompoundFinance}` }
        : undefined,
    });
  }

  private get repoCompFinance() {
    return this.config.getOrThrow<CompoundFinanceConfig>('compoundFinance')
      .repository;
  }

  private get patTokenCompoundFinance() {
    return this.config.getOrThrow<CompoundFinanceConfig>('compoundFinance')
      .githubTokenPat;
  }

  private get compoundFinanceConfig(): CompoundFinanceConfig {
    return this.config.getOrThrow<CompoundFinanceConfig>('compoundFinance');
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

  async readDocsRepoFile(): Promise<string | null> {
    try {
      const { owner, repo, defaultBranch, filePath } = this.repoCompFinance;
      const url = `/repos/${owner}/${repo}/contents/${filePath}?ref=${defaultBranch}`;
      const response = await this.docsApi.get(url);

      if (response.data.content && response.data.encoding === 'base64') {
        return Buffer.from(response.data.content, 'base64').toString('utf-8');
      }

      return null;
    } catch (err: any) {
      if (err.response?.status === 404) {
        this.logger.warn(
          `File not found in docs repo: ${this.repoCompFinance.filePath}`,
        );
        return null;
      }
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(`Error reading file from docs repo: ${errorMessage}`);
      throw err;
    }
  }

  async hasChangesInCompound3Md(localFilePath: string): Promise<{
    hasChanges: boolean;
    localContent: string;
    remoteContent: string | null;
  }> {
    const localContent = readFileSync(localFilePath, 'utf-8');
    const remoteContent = await this.readDocsRepoFile();

    if (!remoteContent) {
      this.logger.warn('Remote file not found, considering as changes');
      return { hasChanges: true, localContent, remoteContent: null };
    }

    const normalizedLocal = localContent.replace(/\r\n/g, '\n');
    const normalizedRemote = remoteContent.replace(/\r\n/g, '\n');

    const hasChanges = normalizedLocal !== normalizedRemote;

    return {
      hasChanges,
      localContent: normalizedLocal,
      remoteContent: normalizedRemote,
    };
  }

  async createBranch(branchName: string): Promise<void> {
    try {
      const { owner, repo, defaultBranch } = this.repoCompFinance;

      const refResponse = await this.docsApi.get(
        `/repos/${owner}/${repo}/git/ref/heads/${defaultBranch}`,
      );
      const baseSha = refResponse.data.object.sha;

      await this.docsApi.post(`/repos/${owner}/${repo}/git/refs`, {
        ref: `refs/heads/${branchName}`,
        sha: baseSha,
      });

      this.logger.log(`Branch ${branchName} created successfully`);
    } catch (err: any) {
      if (err.response?.status === 422) {
        this.logger.warn(`Branch ${branchName} might already exist`);
        return;
      }
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(`Error creating branch: ${errorMessage}`);
      throw err;
    }
  }

  async updateFileInDocsRepo(
    filePath: string,
    content: string,
    branchName: string,
    commitMessage: string,
  ): Promise<void> {
    try {
      const { owner, repo, defaultBranch } = this.repoCompFinance;

      let currentSha: string | null = null;
      try {
        const fileResponse = await this.docsApi.get(
          `/repos/${owner}/${repo}/contents/${filePath}?ref=${defaultBranch}`,
        );
        currentSha = fileResponse.data.sha;
      } catch (err: any) {
        if (err.response?.status !== 404) {
          throw err;
        }
      }

      const encodedContent = Buffer.from(content, 'utf-8').toString('base64');

      await this.docsApi.put(`/repos/${owner}/${repo}/contents/${filePath}`, {
        message: commitMessage,
        content: encodedContent,
        branch: branchName,
        ...(currentSha && { sha: currentSha }),
      });

      this.logger.log(
        `File ${filePath} updated successfully in branch ${branchName}`,
      );
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(`Error updating file in docs repo: ${errorMessage}`);
      if (err.response?.data) {
        this.logger.error(
          `GitHub API error: ${JSON.stringify(err.response.data)}`,
        );
      }
      throw err;
    }
  }

  async createPullRequest(
    branchName: string,
    title: string,
    body: string,
  ): Promise<{ prNumber: number; prUrl: string } | null> {
    try {
      const { owner, repo, defaultBranch } = this.repoCompFinance;

      const existingPRs = await this.docsApi.get(
        `/repos/${owner}/${repo}/pulls?head=${owner}:${branchName}&state=open`,
      );

      if (existingPRs.data.length > 0) {
        const existingPR = existingPRs.data[0];
        this.logger.log(
          `PR already exists: #${existingPR.number} - ${existingPR.html_url}`,
        );
        return {
          prNumber: existingPR.number,
          prUrl: existingPR.html_url,
        };
      }

      const response = await this.docsApi.post(
        `/repos/${owner}/${repo}/pulls`,
        {
          title,
          body,
          head: branchName,
          base: defaultBranch,
        },
      );

      const prNumber = response.data.number;
      const prUrl = response.data.html_url;

      this.logger.log(`PR created successfully: #${prNumber} - ${prUrl}`);

      return { prNumber, prUrl };
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(`Error creating PR: ${errorMessage}`);
      if (err.response?.data) {
        this.logger.error(
          `GitHub API error: ${JSON.stringify(err.response.data)}`,
        );
      }
      throw err;
    }
  }

  async createCompoundV3PR(): Promise<{
    prNumber: number;
    prUrl: string;
  } | null> {
    const { markdown } = this.compoundFinanceConfig;
    const localFilePath = join(
      process.cwd(),
      markdown.directory,
      markdown.filename,
    );

    const { hasChanges, localContent } = await this.hasChangesInCompound3Md(
      localFilePath,
    );

    if (!hasChanges) {
      this.logger.log(
        'No changes detected in compound-3.md, skipping PR creation',
      );
      return null;
    }

    const { filePath } = this.repoCompFinance;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const branchName = `update-compound-3-${timestamp}`;

    this.logger.log(
      `Creating PR for compound-3.md updates (file: ${filePath})...`,
    );

    await this.createBranch(branchName);

    this.logger.log(`Updating only compound-3.md file: ${filePath}`);
    await this.updateFileInDocsRepo(
      filePath,
      localContent,
      branchName,
      'chore: auto-update compound-3.md deployments section',
    );

    const pr = await this.createPullRequest(
      branchName,
      'chore: auto-update compound-3.md deployments section',
      `This PR automatically updates the deployments section in compound-3.md with the latest market data.

Generated at: ${new Date().toISOString()}

**Note:** This is an automated PR. Please review the changes before merging.`,
    );

    return pr;
  }
}
