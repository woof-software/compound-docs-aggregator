import { registerAs } from '@nestjs/config';
import path from 'node:path';
import { IndexerConfig } from '../indexer/indexer.types';

const rootPath = process.cwd();
const storagePath = path.join(rootPath, 'src', 'indexer', 'storage');

export default registerAs('indexer', (): IndexerConfig => {
  return {
    repoMetaPath: path.join(storagePath, 'meta.sqlite'),
    repoUsersDir: path.join(storagePath, 'users'),
    manifestPath: path.join(storagePath, 'users', 'manifest.json'),
    runtimeDir: path.join(rootPath, '.runtime'),
    runtimePath: path.join(rootPath, '.runtime', 'runtime.sqlite'),
  };
});
