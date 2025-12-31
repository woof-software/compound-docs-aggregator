export const shouldLogPct = (
  lastLogged: number,
  current: number,
  stepPct = 5,
): boolean => {
  if (current >= 100) return true;
  return current >= lastLogged + stepPct;
};
