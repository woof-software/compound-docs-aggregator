import { registerAs } from '@nestjs/config';
import { DuneConfig } from '../dune/dune.types';

const duneApiKey = process.env.DUNE_API_KEY;
if (!duneApiKey) throw Error('Missing env: DUNE_API_KEY');

export default registerAs(
  'dune',
  (): DuneConfig => ({
    apiKey: duneApiKey,
    url: 'https://api.dune.com',
    queries: {
      claimsV3: 6318202,
      periodsV3: 6315504,
    },
    pollAttempts: 10,
    pollDelayMs: 10000,
    pollForState: 'QUERY_STATE_COMPLETED',
  }),
);
