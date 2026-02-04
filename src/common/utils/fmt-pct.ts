export const fmtPct = (done: number, total: number, fraction = 2): string => {
  if (total <= 0) return '100%';
  const pct = (done / total) * 100;
  return `${pct.toFixed(fraction)}%`;
};
