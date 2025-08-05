import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import * as jwt from 'jsonwebtoken';

interface CacheEntry {
  timestamp: number;
  data: string[];
}

export interface GitHubPullRequest {
  number: number;
  html_url: string;
  title: string;
  body: string;
  state: string;
  mergeable: boolean;
  head: {
    sha: string;
    ref: string;
  };
  base: {
    sha: string;
    ref: string;
  };
}

export interface GitHubCheckRun {
  id: number;
  name: string;
  status: 'queued' | 'in_progress' | 'completed';
  conclusion:
    | 'success'
    | 'failure'
    | 'neutral'
    | 'cancelled'
    | 'skipped'
    | 'timed_out'
    | 'action_required'
    | null;
  started_at: string;
  completed_at: string | null;
}

export interface GitHubCheckRuns {
  total_count: number;
  check_runs: GitHubCheckRun[];
}

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);
  private readonly owner = 'compound-finance';
  private readonly repo = 'comet';
  private readonly defaultBranch = 'main';
  private api: AxiosInstance;
  private readonly rootDir = 'deployments';

  // Excluded networks (test networks)
  private readonly excludedNetworks = ['sepolia', 'fuji', 'hardhat'];

  // Caching configuration
  private readonly cacheFile = '.github-cache.json';
  private readonly cacheExpirationMs = 30 * 60 * 1000; // 30 minutes
  private inMemoryCache: string[] | null = null;

  // GitHub App authentication
  private installationToken: string | null = null;
  private tokenExpiresAt = 0;

  constructor() {
    const token = process.env.GITHUB_TOKEN || '';
    this.api = axios.create({
      baseURL: 'https://api.github.com',
      headers: token ? { Authorization: `token ${token}` } : undefined,
    });
  }

  /**
   * Authenticates as a GitHub App installation
   */
  async authenticateAsApp(
    appId: string,
    privateKey: string,
    installationId: string,
  ): Promise<void> {
    try {
      // Check if we have a valid token
      if (this.installationToken && Date.now() < this.tokenExpiresAt) {
        return;
      }

      this.logger.log('Authenticating as GitHub App...');

      // Generate JWT
      const jwtToken = this.generateJWT(appId, privateKey);

      // Get installation access token
      const installationToken = await this.getInstallationToken(
        jwtToken,
        installationId,
      );

      // Update API instance with new token
      this.installationToken = installationToken.token;
      this.tokenExpiresAt =
        new Date(installationToken.expires_at).getTime() - 60000; // 1 minute buffer

      this.api = axios.create({
        baseURL: 'https://api.github.com',
        headers: {
          Authorization: `token ${this.installationToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      this.logger.log('Successfully authenticated as GitHub App');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error authenticating as GitHub App: ${errorMessage}`);
      throw new Error(`GitHub App authentication failed: ${errorMessage}`);
    }
  }

  /**
   * Generates JWT token for GitHub App authentication
   */
  private generateJWT(appId: string, privateKey: string): string {
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iat: now - 60, // issued 60 seconds in the past
      exp: now + 600, // expires in 10 minutes
      iss: appId,
    };

    // Clean up private key format
    const cleanPrivateKey = privateKey
      .replace(/\\n/g, '\n')
      .replace(/"/g, '')
      .trim();

    return jwt.sign(payload, cleanPrivateKey, { algorithm: 'RS256' });
  }

  /**
   * Gets installation access token using JWT
   */
  private async getInstallationToken(
    jwtToken: string,
    installationId: string,
  ): Promise<{ token: string; expires_at: string }> {
    try {
      const response = await axios.post(
        `https://api.github.com/app/installations/${installationId}/access_tokens`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        },
      );

      return {
        token: response.data.token,
        expires_at: response.data.expires_at,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to get installation token: ${errorMessage}`);
    }
  }

  /**
   * Gets pull request information
   */
  async getPullRequest(
    owner: string,
    repo: string,
    pullNumber: number,
  ): Promise<GitHubPullRequest> {
    try {
      const url = `/repos/${owner}/${repo}/pulls/${pullNumber}`;
      const response = await this.api.get(url);

      return {
        number: response.data.number,
        html_url: response.data.html_url,
        title: response.data.title,
        body: response.data.body,
        state: response.data.state,
        mergeable: response.data.mergeable,
        head: {
          sha: response.data.head.sha,
          ref: response.data.head.ref,
        },
        base: {
          sha: response.data.base.sha,
          ref: response.data.base.ref,
        },
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error getting pull request: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Gets check runs for a commit
   */
  async getCheckRuns(
    owner: string,
    repo: string,
    ref: string,
  ): Promise<GitHubCheckRuns> {
    try {
      const url = `/repos/${owner}/${repo}/commits/${ref}/check-runs`;
      const response = await this.api.get(url);

      return {
        total_count: response.data.total_count,
        check_runs: response.data.check_runs.map((run: any) => ({
          id: run.id,
          name: run.name,
          status: run.status,
          conclusion: run.conclusion,
          started_at: run.started_at,
          completed_at: run.completed_at,
        })),
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error getting check runs: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Enables auto-merge for a pull request
   */
  async enableAutoMerge(
    owner: string,
    repo: string,
    pullNumber: number,
    mergeMethod: 'MERGE' | 'SQUASH' | 'REBASE' = 'MERGE',
  ): Promise<void> {
    try {
      const url = `/repos/${owner}/${repo}/pulls/${pullNumber}/merge`;

      // Check if PR can be merged immediately
      const pr = await this.getPullRequest(owner, repo, pullNumber);
      if (pr.mergeable && pr.state === 'open') {
        // Check if all required checks are passing
        const checks = await this.getCheckRuns(owner, repo, pr.head.sha);
        const hasFailedChecks = checks.check_runs.some(
          (check) =>
            check.status === 'completed' && check.conclusion === 'failure',
        );

        if (!hasFailedChecks) {
          // Merge immediately if no failing checks
          await this.api.put(url, {
            commit_title: `${pr.title} (#${pullNumber})`,
            merge_method: mergeMethod.toLowerCase(),
          });
          this.logger.log(`Successfully merged PR #${pullNumber}`);
        } else {
          this.logger.warn(
            `PR #${pullNumber} has failing checks, cannot auto-merge`,
          );
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Error enabling auto-merge: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Syncs a fork with its upstream repository
   */
  async syncFork(owner: string, repo: string, branch: string): Promise<void> {
    try {
      const url = `/repos/${owner}/${repo}/merge-upstream`;
      await this.api.post(url, {
        branch: branch,
      });

      this.logger.log(
        `Successfully synced fork ${owner}/${repo} branch ${branch}`,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      this.logger.error(`Error syncing fork: ${errorMessage}`);
      throw error;
    }
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
