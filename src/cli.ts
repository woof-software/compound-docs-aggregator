import { LogLevel } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';

import { AppModule } from './app.module';

async function bootstrap() {
  const logLevel = ['log', 'error', 'warn', 'debug', 'verbose'] as LogLevel[];
  await CommandFactory.run(AppModule, { logger: logLevel });
}

bootstrap().catch((err) => {
  console.error('Error starting CLI:', err);
  process.exit(1);
});
