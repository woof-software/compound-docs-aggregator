export interface DetailedOweRow {
  network?: string; // V2: undefined
  market?: string; // V2: undefined, V3: comet
  user: string;
  owedDec: string; // bigint decimal string
}

export interface DetailedOwesWriter {
  filePath: string;
  first: boolean;
}
