export function toSafeInteger(value: bigint, label: string): number {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue) || !Number.isSafeInteger(numberValue)) {
    throw new Error(`Invalid ${label}: ${value.toString()}`);
  }
  return numberValue;
}
