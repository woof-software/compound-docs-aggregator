import { spawn, type ChildProcess } from 'node:child_process';
import * as readline from 'node:readline';
import type { Readable } from 'node:stream';
import { setTimeout } from 'node:timers/promises';

type ExitResult = { code: number | null; signal: NodeJS.Signals | null };

////////////////////////////////////
const RETRY_PATTERNS: RegExp[] = [
  ///skipping network/i,
  /skipping network=mainnet chainId=1/i,
  /Error: read ECONNRESET/i,
  /*/\bERROR\b/i,
  /\[Nest\].*\bERROR\b/i,
  /UnhandledPromiseRejection/i,
  /FATAL/i,
  /SQLITE_BUSY/i,*/
];

////////////////////////////////////

const RETRY_COMMAND = process.env.RETRY_COMMAND;
if (!RETRY_COMMAND) throw new Error('Retry requires RETRY_COMMAND env');
const retryCommand = RETRY_COMMAND;

const killProcessTree = async (child: ChildProcess): Promise<void> => {
  const pid = child.pid;
  if (!pid) return;

  try {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(pid), '/T', '/F'], { stdio: 'ignore' });
      return;
    }

    // Try killing the whole process group (works if spawned with detached=true)
    try {
      process.kill(-pid, 'SIGTERM');
    } catch {
      child.kill('SIGTERM');
    }
  } catch {
    // ignore
  }

  const killTimeoutMs = Number(process.env.FULL_SYNC_KILL_TIMEOUT_MS ?? 5000);
  await setTimeout(killTimeoutMs);

  try {
    if (process.platform !== 'win32') {
      try {
        process.kill(-pid, 'SIGKILL');
      } catch {
        child.kill('SIGKILL');
      }
    }
  } catch {
    // ignore
  }
};

const attachScanner = (
  stream: Readable,
  mirror: NodeJS.WritableStream,
  regexList: RegExp[],
  onMatch: (line: string, re: RegExp) => void,
): readline.Interface => {
  const rl = readline.createInterface({ input: stream });

  rl.on('line', (line: string) => {
    mirror.write(`${line}\n`);
    for (const re of regexList) {
      if (re.test(line)) {
        onMatch(line, re);
        break;
      }
    }
  });

  return rl;
};

const runOnce = async (
  pm: 'pnpm' | 'yarn' | 'npm',
): Promise<{
  exit: ExitResult;
  logTriggeredRestart: boolean;
  restartReason: string;
}> => {
  const args: string[] = pm === 'yarn' ? [retryCommand] : ['run', retryCommand];

  let logTriggeredRestart = false;
  let restartReason = '';

  const child = spawn(pm, args, {
    stdio: ['inherit', 'pipe', 'pipe'],
    env: process.env,
    detached: process.platform !== 'win32',
  });

  // Runtime guard + TS narrowing: with 'pipe' these must exist
  if (!child.stdout || !child.stderr) {
    throw new Error('[full-sync] Expected stdout/stderr to be piped.');
  }

  const regexList = RETRY_PATTERNS;

  const onMatch = (line: string, re: RegExp) => {
    if (logTriggeredRestart) return;
    logTriggeredRestart = true;
    restartReason = `[log-match] ${String(re)} matched: ${line}`;
    void killProcessTree(child);
  };

  const rlOut = attachScanner(child.stdout, process.stdout, regexList, onMatch);
  const rlErr = attachScanner(child.stderr, process.stderr, regexList, onMatch);

  const exit = await new Promise<ExitResult>((resolve) => {
    child.on('exit', (code, signal) => resolve({ code, signal }));
  });

  rlOut.close();
  rlErr.close();

  return { exit, logTriggeredRestart, restartReason };
};

const main = async (): Promise<void> => {
  const pm = 'yarn';
  const maxRestarts = Number(process.env.FULL_SYNC_MAX_RESTARTS ?? 5000);
  const delayMs = Number(process.env.FULL_SYNC_RESTART_DELAY_MS ?? 2000);

  let restarts = 0;

  while (true) {
    // eslint-disable-next-line no-console
    console.log(
      `\n[full-sync] Starting cli:generate (restart #${restarts}) via ${pm}...`,
    );

    const { exit, logTriggeredRestart, restartReason } = await runOnce(pm);
    const code = exit.code ?? 0;

    if (code === 0 && !logTriggeredRestart) {
      // eslint-disable-next-line no-console
      console.log('[full-sync] Done: cli:generate finished successfully.');
      return;
    }

    restarts += 1;

    if (restarts > maxRestarts) {
      // eslint-disable-next-line no-console
      console.error(
        `[full-sync] Giving up: exceeded FULL_SYNC_MAX_RESTARTS=${maxRestarts}. Last exit code=${code}. Reason=${
          restartReason || 'exit-nonzero'
        }`,
      );
      process.exit(1);
    }

    // eslint-disable-next-line no-console
    console.error(
      `[full-sync] Restarting in ${delayMs}ms. Exit code=${code}. Reason=${
        restartReason || 'exit-nonzero'
      }`,
    );

    await setTimeout(delayMs);
  }
};

void main();
