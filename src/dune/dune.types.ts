export interface DuneConfig {
  apiKey: string;
  url: string;
  queries: {
    claimsV3: number;
    periodsV3: number;
  };
  pollAttempts: number;
  pollDelayMs: number;
  pollForState: string;
}

export interface DuneResult<TRow> {
  execution_id: string;
  query_id: number;
  is_execution_finished: boolean;
  state: string;
  submitted_at: string;
  expires_at: string;
  execution_started_at: string;
  execution_ended_at: string;
  result: {
    rows: TRow[];
    metadata: {
      column_names: string[];
      column_types: string[];
      row_count: number;
      result_set_bytes: number;
      total_row_count: number;
      total_result_set_bytes: number;
      datapoint_count: number;
      pending_time_millis: number;
      execution_time_millis: number;
    };
  };
}

export interface DuneClaimedRowV3 {
  network: string;
  total_comp_claimed: number;
}
export type DuneClaimedV3 = Record<string, number>;

export interface DuneSpeedPeriodRowV3 {
  comet_addr: string; // "0x6f7d514b..."
  curr_borrow_speed: string; // "46296296296"
  curr_supply_speed: string; // "69444444444"
  network: string; // "arbitrum"
  period_end_block: number; // 224809660
  period_end_time: string; // "2024-06-23 07:56:32.000 UTC"
  period_start_block: number; // 224809660
  period_start_time: string; // "2024-06-23 07:56:32.000 UTC"
  starting_event_type: string; // "config_update"
  starting_tx_hash: string; // "0x2883..."
}
export interface DuneCometSpeedPeriodV3 {
  currBorrowSpeed: bigint;
  currSupplySpeed: bigint;
  periodEndBlock: number;
  periodEndTime: Date;
  periodStartBlock: number;
  periodStartTime: Date;
  startingEventType: string;
  startingTxHash: string;
}
/**
 * network -> comet -> periods
 */
export type DuneCometsSpeedPeriodsV3 = Record<
  string,
  Record<string, DuneCometSpeedPeriodV3[]>
>;
