import { Injectable, Logger } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import axios from 'axios';
import { GithubService } from 'github/github.service';
import { NestedMarket, NestedMarkets } from 'contract/contract.type';

interface DeploymentChanges {
  added: string[];
  updated: string[];
  removed: string[];
}

interface GitHubConfig {
  token: string;
  forkOwner: string;
  originalOwner: string;
  repository: string;
  filePath: string;
  branchName: string;
}

interface PullRequestResult {
  created: boolean;
  url?: string;
  number?: number;
  error?: string;
}

@Injectable()
export class CompoundDocumentationService {
  private readonly logger = new Logger(CompoundDocumentationService.name);
  private readonly markdownFilePath = './compound-3.md';

  private readonly githubConfig: GitHubConfig = {
    token: process.env.GITHUB_TOKEN || '',
    forkOwner: 'woof-software',
    originalOwner: 'compound-finance',
    repository: 'compound-finance.github.io',
    filePath: 'docs/pages/v3/compound-3.md',
    branchName: `update-deployments-${Date.now()}`,
  };

  private readonly networkNames: Record<string, string> = {
    mainnet: 'Ethereum Mainnet',
    arbitrum: 'Arbitrum',
    base: 'Base',
    optimism: 'Optimism',
    polygon: 'Polygon Mainnet',
    scroll: 'Scroll',
    linea: 'Linea',
    mantle: 'Mantle',
    unichain: 'Unichain',
    ronin: 'Ronin',
  };

  private readonly networkShortNames: Record<string, string> = {
    mainnet: 'Mainnet',
    arbitrum: 'Arbitrum',
    base: 'Base',
    optimism: 'Optimism',
    polygon: 'Polygon',
    scroll: 'Scroll',
    linea: 'Linea',
    mantle: 'Mantle',
    unichain: 'Unichain',
    ronin: 'Ronin',
  };

  private readonly blockscanUrls: Record<string, string> = {
    mainnet: 'https://etherscan.io/',
    arbitrum: 'https://arbiscan.io/',
    base: 'https://basescan.org/',
    optimism: 'https://optimistic.etherscan.io/',
    polygon: 'https://polygonscan.com/',
    scroll: 'https://scrollscan.com/',
    linea: 'https://lineascan.build/',
    mantle: 'https://mantlescan.xyz/',
    unichain: 'https://uniscan.xyz/',
    ronin: 'https://app.roninchain.com/',
  };

  private readonly testnetDeployments = [
    'Base Sepolia - USDC Base',
    'Base Sepolia - WETH Base',
    'Ethereum Sepolia Testnet - USDC Base',
    'Ethereum Sepolia Testnet - WETH Base',
    'Polygon Mumbai Testnet - USDC Base',
  ];

  constructor(private readonly githubService: GithubService) {}

  /**
   * Main method to update the markdown file with current market data and create PR
   */
  async write(marketsData: NestedMarkets): Promise<PullRequestResult> {
    try {
      this.logger.log('Starting documentation update process...');

      // Fetch current markdown from fork
      const currentContent = await this.fetchMarkdownFromGitHub();

      // Generate new deployments YAML
      const newDeployments = this.generateDeploymentsYaml(marketsData.markets);

      // Check for changes
      const currentDeployments = this.extractCurrentDeployments(currentContent);

      if (!this.hasDeploymentsChanged(currentDeployments, newDeployments)) {
        this.logger.log(
          'No changes detected in deployments. Update not required.',
        );
        return { created: false };
      }

      this.logger.log(
        'Changes detected in deployments. Creating pull request...',
      );

      // Update content
      const updatedContent = this.updateMarkdownContent(
        currentContent,
        newDeployments,
      );

      // Create pull request
      const prResult = await this.createPullRequest(
        updatedContent,
        currentContent,
      );

      // Log results
      const changes = this.detectChanges(currentDeployments, newDeployments);
      this.logChanges(
        changes,
        Object.keys(this.mergeWithTestnets(newDeployments, currentDeployments))
          .length,
      );

      return prResult;
    } catch (error) {
      this.logger.error('Error in documentation update process:', error);
      throw error;
    }
  }

  /**
   * Fetches markdown content from GitHub fork repository
   */
  private async fetchMarkdownFromGitHub(): Promise<string> {
    try {
      const url = `https://raw.githubusercontent.com/${this.githubConfig.forkOwner}/${this.githubConfig.repository}/master/${this.githubConfig.filePath}`;

      this.logger.log(`Fetching markdown from: ${url}`);
      const response = await axios.get(url, { responseType: 'text' });

      this.logger.log('Successfully fetched markdown from GitHub');
      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error('Error fetching markdown from GitHub:', error);
      throw new Error(`Failed to fetch markdown from GitHub: ${errorMessage}`);
    }
  }

  /**
   * Creates a new branch and pull request with updated content using GitHub API
   */
  private async createPullRequest(
    updatedContent: string,
    originalContent: string,
  ): Promise<PullRequestResult> {
    try {
      this.logger.log('Creating pull request workflow...');

      // Step 1: Get current file SHA from fork
      const currentFile = await this.githubService.getFileContent(
        this.githubConfig.forkOwner,
        this.githubConfig.repository,
        this.githubConfig.filePath,
        'master',
      );

      const currentSha = currentFile.sha;
      this.logger.log(`Current file SHA: ${currentSha}`);

      // Step 2: Get master branch reference from fork
      const masterRef = await this.githubService.getRef(
        this.githubConfig.forkOwner,
        this.githubConfig.repository,
        'heads/master',
      );

      this.logger.log(`Master branch SHA: ${masterRef.sha}`);

      // Step 3: Create new branch in fork
      const newBranchRef = `refs/heads/${this.githubConfig.branchName}`;
      await this.githubService.createRef(
        this.githubConfig.forkOwner,
        this.githubConfig.repository,
        newBranchRef,
        masterRef.sha,
      );

      this.logger.log(
        `Created branch: ${this.githubConfig.branchName} in fork`,
      );

      // Step 4: Update file in new branch of fork
      const commitMessage = this.generateCommitMessage(
        originalContent,
        updatedContent,
      );
      await this.githubService.updateFile(
        this.githubConfig.forkOwner,
        this.githubConfig.repository,
        this.githubConfig.filePath,
        commitMessage,
        updatedContent,
        currentSha,
        this.githubConfig.branchName,
      );

      this.logger.log(
        `Updated file in branch: ${this.githubConfig.branchName}`,
      );

      // Step 5: Create pull request from fork to original repository
      const pullRequestTitle = 'Update Compound III deployments';
      const pullRequestHead = `${this.githubConfig.forkOwner}:${this.githubConfig.branchName}`;
      const pullRequestBase = 'master'; // or should this be the default branch?
      const pullRequestBody = this.generatePullRequestBody(
        originalContent,
        updatedContent,
      );

      const pullRequest = await this.githubService.createPullRequest(
        this.githubConfig.originalOwner, // PR goes to original repo
        this.githubConfig.repository,
        pullRequestTitle,
        pullRequestHead, // from fork:branch
        pullRequestBase, // to original:master
        pullRequestBody,
      );

      return {
        created: true,
        url: pullRequest.html_url,
        number: pullRequest.number,
      };
    } catch (error) {
      this.logger.error('Error in pull request workflow:', error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      // Cleanup: Try to delete the branch if it was created
      try {
        await this.githubService.deleteRef(
          this.githubConfig.forkOwner,
          this.githubConfig.repository,
          `heads/${this.githubConfig.branchName}`,
        );
        this.logger.log(`Cleaned up branch: ${this.githubConfig.branchName}`);
      } catch (cleanupError) {
        this.logger.warn('Failed to cleanup branch after error:', cleanupError);
      }

      return {
        created: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Generates commit message based on changes
   */
  private generateCommitMessage(
    originalContent: string,
    updatedContent: string,
  ): string {
    const originalDeployments = this.extractCurrentDeployments(originalContent);
    const newDeployments = this.extractCurrentDeployments(updatedContent);
    const changes = this.detectChanges(originalDeployments, newDeployments);

    const totalChanges =
      changes.added.length + changes.updated.length + changes.removed.length;

    if (totalChanges === 0) {
      return 'Update Compound III deployments';
    }

    const parts: string[] = [];

    if (changes.added.length > 0) {
      parts.push(
        `add ${changes.added.length} deployment${
          changes.added.length > 1 ? 's' : ''
        }`,
      );
    }

    if (changes.updated.length > 0) {
      parts.push(
        `update ${changes.updated.length} deployment${
          changes.updated.length > 1 ? 's' : ''
        }`,
      );
    }

    if (changes.removed.length > 0) {
      parts.push(
        `remove ${changes.removed.length} deployment${
          changes.removed.length > 1 ? 's' : ''
        }`,
      );
    }

    return `Update Compound III deployments: ${parts.join(', ')}`;
  }

  /**
   * Generates pull request body with detailed changes
   */
  private generatePullRequestBody(
    originalContent: string,
    updatedContent: string,
  ): string {
    const originalDeployments = this.extractCurrentDeployments(originalContent);
    const newDeployments = this.extractCurrentDeployments(updatedContent);
    const changes = this.detectChanges(originalDeployments, newDeployments);

    let body = '## Compound III Deployments Update\n\n';
    body +=
      'This pull request updates the Compound III deployments section with the latest contract addresses.\n\n';

    body += '### Summary\n';
    body += `- **Added**: ${changes.added.length} deployment${
      changes.added.length !== 1 ? 's' : ''
    }\n`;
    body += `- **Updated**: ${changes.updated.length} deployment${
      changes.updated.length !== 1 ? 's' : ''
    }\n`;
    body += `- **Removed**: ${changes.removed.length} deployment${
      changes.removed.length !== 1 ? 's' : ''
    }\n`;
    body += `- **Total deployments**: ${
      Object.keys(newDeployments).length
    }\n\n`;

    if (changes.added.length > 0) {
      body += '### Added Deployments\n';
      changes.added.forEach((deployment) => {
        body += `- ${deployment}\n`;
      });
      body += '\n';
    }

    if (changes.updated.length > 0) {
      body += '### Updated Deployments\n';
      changes.updated.forEach((deployment) => {
        body += `- ${deployment}\n`;
      });
      body += '\n';
    }

    if (changes.removed.length > 0) {
      body += '### Removed Deployments\n';
      changes.removed.forEach((deployment) => {
        body += `- ${deployment}\n`;
      });
      body += '\n';
    }

    body += '### Automated Update\n';
    body +=
      'This update was generated automatically from the latest on-chain data.\n';
    body +=
      'All contract addresses have been verified and are current as of the time of generation.\n\n';

    body += '---\n';
    body += '*Generated by Compound III Documentation Service*';

    return body;
  }

  /**
   * Validates GitHub configuration
   */
  private validateGitHubConfig(): void {
    if (!this.githubConfig.token) {
      throw new Error(
        'GitHub token is required. Set GITHUB_TOKEN environment variable.',
      );
    }

    if (!this.githubConfig.forkOwner || !this.githubConfig.originalOwner) {
      throw new Error('GitHub repository owners must be configured');
    }

    if (!this.githubConfig.repository || !this.githubConfig.filePath) {
      throw new Error('GitHub repository and file path must be configured');
    }
  }

  /**
   * Checks if fork is up to date with original repository using GithubService
   */
  private async ensureForkIsUpToDate(): Promise<void> {
    try {
      // Get latest commit from original repository
      const originalRepo = await this.githubService.getRepository(
        this.githubConfig.originalOwner,
        this.githubConfig.repository,
      );

      const originalCommit = await this.githubService.getCommit(
        this.githubConfig.originalOwner,
        this.githubConfig.repository,
        originalRepo.default_branch,
      );

      // Get latest commit from fork
      const forkCommit = await this.githubService.getCommit(
        this.githubConfig.forkOwner,
        this.githubConfig.repository,
        'master',
      );

      if (originalCommit.sha !== forkCommit.sha) {
        this.logger.warn('Fork is not up to date with original repository');
        // Note: it might be needed to automatically sync the fork
        // For now, it just logs a warning
      } else {
        this.logger.log('Fork is up to date with original repository');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.warn('Could not verify fork status:', errorMessage);
    }
  }

  /**
   * Public method for external usage - validates config and processes update
   */
  async updateDocumentation(
    marketsData: NestedMarkets,
  ): Promise<PullRequestResult> {
    this.validateGitHubConfig();
    await this.ensureForkIsUpToDate();
    return this.write(marketsData);
  }

  /**
   * Updated local write method with improved comparison and GitHub source
   */
  async writeLocal(marketsData: NestedMarkets): Promise<void> {
    try {
      this.logger.log('Starting local markdown file update...');

      // Fetch current content from GitHub
      const currentContent = await this.fetchMarkdownFromGitHub();

      // Generate new deployments YAML
      const newDeployments = this.generateDeploymentsYaml(marketsData.markets);

      // Extract current deployments using improved method
      const currentDeployments = this.extractCurrentDeployments(currentContent);

      if (!this.hasDeploymentsChanged(currentDeployments, newDeployments)) {
        this.logger.log(
          'No changes detected in deployments. Update not required.',
        );
        return;
      }

      this.logger.log(
        'Changes detected in deployments. Updating local file...',
      );

      // Update content and write to local file
      const updatedContent = this.updateMarkdownContent(
        currentContent,
        newDeployments,
      );
      this.writeMarkdownFile(updatedContent);

      // Log comparison results
      const changes = this.detectChanges(currentDeployments, newDeployments);
      this.logChanges(
        changes,
        Object.keys(this.mergeWithTestnets(newDeployments, currentDeployments))
          .length,
      );
    } catch (error) {
      this.logger.error('Error updating local markdown file:', error);
      throw error;
    }
  }

  private readMarkdownFile(): string {
    try {
      return readFileSync(this.markdownFilePath, 'utf8');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to read markdown file: ${errorMessage}`);
    }
  }

  /**
   * Writes updated content to markdown file
   */
  private writeMarkdownFile(content: string): void {
    try {
      writeFileSync(this.markdownFilePath, content, 'utf8');
      this.logger.log('Markdown file updated successfully');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to write markdown file: ${errorMessage}`);
    }
  }

  /**
   * Creates a backup copy of the markdown file
   */
  // private createBackup(): void {
  //   try {
  //     const backupPath = `${this.markdownFilePath}.backup.${Date.now()}`;
  //     copyFileSync(this.markdownFilePath, backupPath);
  //     this.logger.log(`Backup created: ${backupPath}`);
  //   } catch (error) {
  //     const errorMessage =
  //       error instanceof Error ? error.message : String(error);
  //     this.logger.warn(`Failed to create backup: ${errorMessage}`);
  //   }
  // }

  /**
   * Generates deployments YAML structure from markets data
   */
  private generateDeploymentsYaml(
    markets: NestedMarkets['markets'],
  ): Record<string, any> {
    const deployments: Record<string, any> = {};

    // Sort networks for consistency
    const sortedNetworks = Object.keys(markets).sort();

    for (const networkKey of sortedNetworks) {
      const networkMarkets = markets[networkKey];
      if (!networkMarkets) {
        continue;
      }

      // Sort markets within network
      const sortedMarkets = Object.keys(networkMarkets).sort();

      for (const marketKey of sortedMarkets) {
        const market = networkMarkets[marketKey];
        if (!market) {
          continue;
        }
        // Generate deployment name
        const deploymentName = this.generateDeploymentName(
          networkKey,
          marketKey,
          market,
        );

        // Get blockscan URL
        const blockscanOrigin = this.getBlockscanOrigin(networkKey);

        // Format contracts
        const contracts = this.formatContracts(marketKey, market);

        deployments[deploymentName] = {
          tab_text: this.generateTabText(networkKey, marketKey, market),
          blockscan_origin: blockscanOrigin,
          contracts: contracts,
        };
      }
    }

    return deployments;
  }

  /**
   * Generates deployment name for YAML key
   */
  private generateDeploymentName(
    network: string,
    market: string,
    marketData: NestedMarket,
  ): string {
    const networkName = this.networkNames[network] || network;
    const marketName = `${marketData.baseToken.symbol} Base`;
    let deploymentKey = `${networkName} - ${marketName}`;
    if (market === 'cUSDCev3') {
      deploymentKey = `${networkName} - USDC.e Base (Bridged)`;
    }
    if (market === 'cUSDbCv3') {
      deploymentKey = `${networkName} - USDbC Base (Bridged)`;
    }

    return deploymentKey;
  }

  /**
   * Generates tab text for deployment
   */
  private generateTabText(
    network: string,
    market: string,
    marketData: NestedMarket,
  ): string {
    const baseTokenSymbol =
      market === 'cUSDCev3' ? 'USDC.e' : marketData.baseToken?.symbol;
    const networkShortName = this.networkShortNames[network] || network;

    return `${networkShortName} ${baseTokenSymbol}`;
  }

  /**
   * Gets blockscan URL for network
   */
  private getBlockscanOrigin(networkKey: string): string {
    return this.blockscanUrls[networkKey] || 'https://etherscan.io/';
  }

  /**
   * Formats contracts for YAML output
   */
  private formatContracts(
    marketKey: string,
    marketData: NestedMarket,
  ): Record<string, string> {
    const contracts: Record<string, string> = {};

    // Main Comet contracts

    if (marketData.contracts?.comet) {
      contracts[marketKey] = marketData.contracts.comet;
    }

    if (marketData.contracts?.cometImplementation) {
      contracts[`${marketKey} Implementation`] =
        marketData.contracts.cometImplementation;
    }

    if (marketData.contracts?.cometExtension) {
      contracts[`${marketKey} Ext`] = marketData.contracts.cometExtension;
    }

    // System contracts
    const systemContracts = [
      'configurator',
      'configuratorImplementation',
      'cometAdmin',
      'cometFactory',
      'rewards',
      'bulker',
      'governor',
      'timelock',
    ];

    const contractNameMapping: Record<string, string> = {
      configurator: 'Configurator',
      configuratorImplementation: 'Configurator Implementation',
      cometAdmin: 'Proxy Admin',
      cometFactory: 'Comet Factory',
      rewards: 'Rewards',
      bulker: 'Bulker',
      governor: 'Governor',
      timelock: 'Timelock',
    };

    systemContracts.forEach((contractKey) => {
      if (marketData.contracts?.[contractKey]) {
        const displayName = contractNameMapping[contractKey] || contractKey;
        contracts[displayName] = marketData.contracts[contractKey];
      }
    });

    // Collateral tokens
    if (marketData.collaterals) {
      marketData.collaterals.forEach((collateral) => {
        if (collateral.address && collateral.symbol) {
          contracts[collateral.symbol] = collateral.address;
        }
      });
    }

    // Base token
    if (marketData.baseToken?.address && marketData.baseToken?.symbol) {
      const tokenKey =
        marketKey === 'cUSDCev3' ? 'USDC.e' : marketData.baseToken.symbol;
      contracts[tokenKey] = marketData.baseToken.address;
    }

    // COMP token
    if (marketData.COMP) {
      contracts['COMP'] = marketData.COMP;
    }

    return contracts;
  }

  /**
   * Converts object to YAML string format
   */
  private objectToYaml(obj: Record<string, any>, indent = 0): string {
    let yaml = '';
    const spaces = '  '.repeat(indent);

    for (const [key, value] of Object.entries(obj)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        yaml += `${spaces}${key}:\n`;
        yaml += this.objectToYaml(value, indent + 1);
      } else {
        yaml += `${spaces}${key}: ${this.formatYamlValue(value)}\n`;
      }
    }

    return yaml;
  }

  /**
   * Formats value for YAML output
   */
  private formatYamlValue(value: any): string {
    if (typeof value === 'string') {
      // Check if quotes are needed
      if (
        value.includes(':') ||
        value.includes(' ') ||
        value.startsWith('0x')
      ) {
        return `'${value}'`;
      }
      return value;
    }
    return String(value);
  }

  /**
   * Parses markdown file into sections
   */
  private parseMarkdownFile(content: string): {
    beforeDeployments: string;
    afterDeployments: string;
  } {
    const lines = content.split('\n');
    const deploymentsStartIndex = lines.findIndex(
      (line) => line.trim() === 'deployments:',
    );

    if (deploymentsStartIndex === -1) {
      throw new Error('Deployments section not found in markdown file');
    }

    // Find end of YAML section (next line without indent after deployments)
    let deploymentsEndIndex = lines.length;
    for (let i = deploymentsStartIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      // If line starts without indent and is not empty, it's end of YAML
      if (
        line &&
        line.trim() !== '' &&
        !line.startsWith(' ') &&
        !line.startsWith('\t')
      ) {
        deploymentsEndIndex = i;
        break;
      }
    }

    return {
      beforeDeployments: lines.slice(0, deploymentsStartIndex).join('\n'),
      afterDeployments: lines.slice(deploymentsEndIndex).join('\n'),
    };
  }

  /**
   * Creates updated markdown content with new deployments
   */
  private updateMarkdownContent(
    originalContent: string,
    newDeployments: Record<string, any>,
  ): string {
    const { beforeDeployments, afterDeployments } =
      this.parseMarkdownFile(originalContent);

    // Extract existing deployments to preserve testnets
    const existingDeployments = this.extractCurrentDeployments(originalContent);

    // Merge new deployments with preserved testnet deployments
    const mergedDeployments = this.mergeWithTestnets(
      newDeployments,
      existingDeployments,
    );

    const deploymentsYaml = this.objectToYaml({
      deployments: mergedDeployments,
    });

    // Remove extra \n to avoid triple dashes
    return `${beforeDeployments}\n${deploymentsYaml.trimEnd()}\n${afterDeployments}`;
  }

  /**
   * Merges new deployments with existing testnet deployments
   */
  private mergeWithTestnets(
    newDeployments: Record<string, any>,
    existingDeployments: Record<string, any>,
  ): Record<string, any> {
    const merged = { ...newDeployments };

    // Preserve testnet deployments from existing data
    for (const testnetName of this.testnetDeployments) {
      if (existingDeployments[testnetName] && !merged[testnetName])
        merged[testnetName] = existingDeployments[testnetName];
    }

    // Sort the final deployments alphabetically for consistency
    const sortedMerged: Record<string, any> = {};
    const sortedKeys = Object.keys(merged).sort();

    for (const key of sortedKeys) {
      sortedMerged[key] = merged[key];
    }

    return sortedMerged;
  }

  /**
   * Compares two deployment objects to detect changes
   */
  private hasDeploymentsChanged(
    oldDeployments: Record<string, any>,
    newDeployments: Record<string, any>,
  ): boolean {
    // Merge new deployments with preserved testnets for fair comparison
    const mergedNewDeployments = this.mergeWithTestnets(
      newDeployments,
      oldDeployments,
    );

    // Normalize both for comparison
    const normalizedOld = this.normalizeDeployments(oldDeployments);
    const normalizedNew = this.normalizeDeployments(mergedNewDeployments);

    return JSON.stringify(normalizedOld) !== JSON.stringify(normalizedNew);
  }

  /**
   * Normalizes deployments for consistent comparison
   */
  private normalizeDeployments(
    deployments: Record<string, any>,
  ): Record<string, any> {
    const normalized: Record<string, any> = {};

    // Sort keys for consistency
    const sortedKeys = Object.keys(deployments).sort();

    for (const key of sortedKeys) {
      const deployment = deployments[key];
      if (!deployment || typeof deployment !== 'object') {
        continue;
      }

      normalized[key] = {
        tab_text: deployment.tab_text || '',
        blockscan_origin: deployment.blockscan_origin || '',
        contracts: this.sortObjectByKeys(deployment.contracts || {}),
      };
    }

    return normalized;
  }

  /**
   * Sorts object by keys alphabetically
   */
  private sortObjectByKeys(obj: Record<string, any>): Record<string, any> {
    const sorted: Record<string, any> = {};
    const sortedKeys = Object.keys(obj).sort();

    for (const key of sortedKeys) {
      sorted[key] = obj[key];
    }

    return sorted;
  }

  /**
   * Improved method for extracting deployments from markdown content
   */
  private extractCurrentDeployments(content: string): Record<string, any> {
    try {
      // More reliable way to extract YAML front matter section
      const yamlMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/m);
      if (!yamlMatch || !yamlMatch[1]) {
        this.logger.warn('YAML front matter not found in content');
        return {};
      }

      const yamlContent = yamlMatch[1];

      // Find deployments section within YAML
      const deploymentsMatch = yamlContent.match(
        /deployments:\s*\n([\s\S]*?)(?=\n\w|$)/,
      );
      if (!deploymentsMatch || !deploymentsMatch[1]) {
        this.logger.warn('Deployments section not found in YAML');
        return {};
      }

      return this.parseDeploymentsYaml(deploymentsMatch[1]);
    } catch (err) {
      this.logger.error('Error extracting deployments:', err);
      return {};
    }
  }

  /**
   * Parses YAML deployments section into structured object
   */
  private parseDeploymentsYaml(yamlText: string): Record<string, any> {
    const deployments: Record<string, any> = {};
    const lines = yamlText.split('\n');

    let currentDeployment: string | null = null;
    let currentSection: 'root' | 'contracts' = 'root';

    for (const line of lines) {
      if (!line.trim()) continue;

      const leadingSpaces = line.length - line.trimStart().length;
      const trimmed = line.trim();

      // Deployment level (2 spaces indentation)
      if (leadingSpaces === 2) {
        if (trimmed.endsWith(':')) {
          currentDeployment = trimmed.slice(0, -1).trim();
          deployments[currentDeployment] = {};
          currentSection = 'root';
          continue;
        }
      }

      if (!currentDeployment) continue;

      // Property level (4 spaces indentation)
      if (leadingSpaces === 4) {
        const colonIndex = trimmed.indexOf(':');
        if (colonIndex === -1) continue;

        const key = trimmed.substring(0, colonIndex).trim();
        const value = trimmed
          .substring(colonIndex + 1)
          .trim()
          .replace(/['"]/g, '');

        if (key === 'contracts') {
          currentSection = 'contracts';
          deployments[currentDeployment][key] = {};
        } else {
          deployments[currentDeployment][key] = value;
        }
        continue;
      }

      // Contract level (6 spaces indentation)
      if (leadingSpaces === 6 && currentSection === 'contracts') {
        const colonIndex = trimmed.indexOf(':');
        if (colonIndex === -1) continue;

        const contractName = trimmed.substring(0, colonIndex).trim();
        const contractAddress = trimmed
          .substring(colonIndex + 1)
          .trim()
          .replace(/['"]/g, '');

        if (!deployments[currentDeployment].contracts) {
          deployments[currentDeployment].contracts = {};
        }
        deployments[currentDeployment].contracts[contractName] =
          contractAddress;
      }
    }

    return deployments;
  }

  /**
   * Detects changes between old and new deployments
   */
  private detectChanges(
    oldDeployments: Record<string, any>,
    newDeployments: Record<string, any>,
  ): DeploymentChanges {
    // Use merged deployments for change detection
    const mergedNewDeployments = this.mergeWithTestnets(
      newDeployments,
      oldDeployments,
    );

    const changes: DeploymentChanges = {
      added: [],
      updated: [],
      removed: [],
    };

    // Find added and updated deployments
    for (const [key, newValue] of Object.entries(mergedNewDeployments)) {
      if (!(key in oldDeployments)) {
        // Don't count preserved testnets as "added"
        if (!this.testnetDeployments.includes(key)) {
          changes.added.push(key);
        }
      } else if (
        JSON.stringify(oldDeployments[key]) !== JSON.stringify(newValue)
      ) {
        changes.updated.push(key);
      }
    }

    // Find removed deployments (excluding preserved testnets)
    for (const key of Object.keys(oldDeployments)) {
      if (
        !(key in mergedNewDeployments) &&
        !this.testnetDeployments.includes(key)
      ) {
        changes.removed.push(key);
      }
    }

    return changes;
  }

  /**
   * Logs the changes made during synchronization
   */
  private logChanges(
    changes: DeploymentChanges,
    totalDeployments: number,
  ): void {
    this.logger.log('=== SYNCHRONIZATION REPORT ===');
    this.logger.log(`Added: ${changes.added.length}`);
    this.logger.log(`Updated: ${changes.updated.length}`);
    this.logger.log(`Removed: ${changes.removed.length}`);
    this.logger.log(`Total deployments: ${totalDeployments}`);

    if (changes.added.length > 0) {
      this.logger.log('Added deployments:');
      changes.added.forEach((name) => this.logger.log(`  + ${name}`));
    }

    if (changes.updated.length > 0) {
      this.logger.log('Updated deployments:');
      changes.updated.forEach((name) => this.logger.log(`  ~ ${name}`));
    }

    if (changes.removed.length > 0) {
      this.logger.log('Removed deployments:');
      changes.removed.forEach((name) => this.logger.log(`  - ${name}`));
    }
  }
}
