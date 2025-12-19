import { registerAs } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export interface CompoundFinanceConfig {
  markdown: {
    directory: string;
    filename: string;
    sectionStartMarker: string;
    sectionEndMarker: string;
  };
  repository: {
    owner: string;
    repo: string;
    defaultBranch: string;
    filePath: string;
  };
  githubTokenPat: string;
}

const githubTokenPat = process.env.GITHUB_TOKEN_PAT || '';
if (!githubTokenPat) {
  Logger.warn('No Github token Pat');
}

export default registerAs(
  'compoundFinance',
  (): CompoundFinanceConfig => ({
    markdown: {
      directory: 'compound-finance',
      filename: 'compound-3.md',
      sectionStartMarker: 'deployments:',
      sectionEndMarker: '---',
    },
    repository: {
      owner: 'compound-finance',
      repo: 'compound-finance.github.io',
      defaultBranch: 'master',
      filePath: 'docs/pages/v3/compound-3.md',
    },
    githubTokenPat,
  }),
);
