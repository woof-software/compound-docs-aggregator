import { registerAs } from '@nestjs/config';
import { DuneConfig } from '../dune/dune.types';

const duneApiKey = process.env.DUNE_API_KEY;
if (!duneApiKey) throw Error('Missing env: DUNE_API_KEY');

export default registerAs(
  'dune',
  (): DuneConfig => ({
    apiKey: duneApiKey,
    queryId: 6300979,
    url: 'https://api.dune.com',
  }),
);
