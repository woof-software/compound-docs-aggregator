import { registerAs } from '@nestjs/config';
import { CompoundVersion } from 'common/types/compound-version';
import { DuneConfig } from 'dune/dune.types';

const duneApiKey = process.env.DUNE_API_KEY;
if (!duneApiKey) throw Error('Missing env: DUNE_API_KEY');

export default registerAs(
  'dune',
  (): DuneConfig => ({
    apiKey: duneApiKey,
    url: 'https://api.dune.com',
    queries: {
      [CompoundVersion.V3]: {
        claims: 6318202,
        periods: 6315504,
        activity: 6369859,
      },
      [CompoundVersion.V2]: {
        claims: 6339225,
        periods: 6338647,
        activity: 6369859,
      },
    },
    pollAttempts: 10,
    pollDelayMs: 10000,
    pollForState: 'QUERY_STATE_COMPLETED',
  }),
);
