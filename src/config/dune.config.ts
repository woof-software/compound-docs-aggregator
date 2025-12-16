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
        users: 6345188,
      },
      [CompoundVersion.V2]: {
        users: 6318202,
      },
    },
    pollAttempts: 15,
    pollDelayMs: 10000,
    pollForState: 'QUERY_STATE_COMPLETED',
  }),
);
