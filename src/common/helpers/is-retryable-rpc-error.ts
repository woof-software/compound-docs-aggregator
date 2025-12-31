export const isRetryableRpcError = (e: any): boolean => {
  const msg = String(e?.shortMessage ?? e?.message ?? '');

  // Non-retryable cases where splitting the range usually helps
  if (
    /query returned more than|more than \d+ results|too many results|response size exceeded|max response size/i.test(
      msg,
    )
  ) {
    return false;
  }

  return (
    // ethers: "response body is not valid JSON"
    (e?.code === 'UNSUPPORTED_OPERATION' && e?.operation === 'bodyJson') ||
    // ethers/network-ish codes
    e?.code === 'NETWORK_ERROR' ||
    e?.code === 'SERVER_ERROR' ||
    e?.code === 'TIMEOUT' ||
    // transient transport errors
    /ECONNRESET|ETIMEDOUT|EAI_AGAIN|socket hang up|fetch failed|Client network socket disconnected/i.test(
      msg,
    ) ||
    // RPC throttling / gateway hiccups
    /429|502|503|504|rate limit|too many requests/i.test(msg)
  );
};
