import { registerAs } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export interface CompoundFoundationConfig {
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
    autoUpdateBranch: string;
  };
  githubTokenPat: string;
}

const githubTokenPat = process.env.GITHUB_TOKEN_PAT || '';
if (!githubTokenPat) {
  Logger.warn('No Github token Pat');
}

export default registerAs(
  'compoundFoundation',
  (): CompoundFoundationConfig => ({
    markdown: {
      directory: 'compound-foundation',
      filename: 'compound-3.md',
      sectionStartMarker: 'deployments:',
      sectionEndMarker: '---',
    },
    repository: {
      owner: 'Compound-Foundation',
      repo: 'compound-v3-docs.github.io',
      defaultBranch: 'master',
      filePath: 'docs/pages/v3/compound-3.md',
      autoUpdateBranch: 'auto-update-compound-3',
    },
    githubTokenPat,
  }),
);
