import { setTimeout } from 'node:timers/promises';
import { isRetryableRpcError } from './is-retryable-rpc-error';

export async function withRetries<T>(
  fn: () => Promise<T>,
  opts?: {
    attempts?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    isRetryable?: (e: any) => boolean;
    onRetry?: (attempt: number, err: any, delayMs: number) => void;
  },
): Promise<T> {
  const attempts = Math.max(1, opts?.attempts ?? 3);
  const baseDelayMs = Math.max(0, opts?.baseDelayMs ?? 250);
  const maxDelayMs = Math.max(baseDelayMs, opts?.maxDelayMs ?? 5_000);
  const isRetryable = opts?.isRetryable ?? isRetryableRpcError;

  let lastErr: any;

  for (let a = 0; a < attempts; a++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;

      const last = a === attempts - 1;
      if (last || !isRetryable(err)) throw err;

      // Quadratic backoff + tiny jitter
      const backoff = Math.min(maxDelayMs, baseDelayMs * (a + 1) * (a + 1));
      const jitter = Math.floor(Math.random() * Math.min(200, backoff));
      const delayMs = backoff + jitter;

      opts?.onRetry?.(a + 1, err, delayMs);
      await setTimeout(delayMs);
    }
  }

  throw lastErr;
}
