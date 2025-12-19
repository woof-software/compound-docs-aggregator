import { registerAs } from '@nestjs/config';

export interface CompoundFinanceConfig {
  compoundV3: {
    directory: string;
    filename: string;
    sectionStartMarker: string;
    sectionEndMarker: string;
  };
}

export default registerAs(
  'compoundFinance',
  (): CompoundFinanceConfig => ({
    compoundV3: {
      directory: 'compound-finance',
      filename: 'compound-3.md',
      sectionStartMarker: 'deployments:',
      sectionEndMarker: '---',
    },
  }),
);
