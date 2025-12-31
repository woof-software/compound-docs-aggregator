import { id } from 'ethers';

/**
 * ONLY REWARDS TARGETED
 */

export type AddrSource = {
  kind: 'topic' | 'data';
  index: number; // topic index OR 0-based data word index
};

/**
 * -----------------------------
 * V3: Configurator discovery
 * -----------------------------
 * Assume cometProxy is in topics[1] for these.
 */
export const V3_DISCOVERY_TOPIC0_OR = [
  id('CometDeployed(address,address)'),
  id('SetFactory(address,address,address)'),
  id('SetGovernor(address,address,address)'),
  id('SetPauseGuardian(address,address,address)'),
  id('SetBaseToken(address,address,address)'),
];

/**
 * -----------------------------
 * V3: Users (minimal for rewards coverage)
 * -----------------------------
 * Keep ONLY base position-changing events:
 * - Supply / Withdraw / Transfer
 */
export const V3_USER_ADDR_SOURCES: Record<string, AddrSource[]> = {
  [id('Supply(address,address,uint256)')]: [
    { kind: 'topic', index: 1 }, // from
    { kind: 'topic', index: 2 }, // dst (account)
  ],
  [id('Withdraw(address,address,uint256)')]: [
    { kind: 'topic', index: 1 }, // src (account)
    { kind: 'topic', index: 2 }, // to
  ],
  [id('Transfer(address,address,uint256)')]: [
    { kind: 'topic', index: 1 }, // from
    { kind: 'topic', index: 2 }, // to
  ],
};

export const V3_USER_TOPIC0_OR = Object.keys(V3_USER_ADDR_SOURCES);

/**
 * -----------------------------
 * V2: Comptroller discovery
 * -----------------------------
 */
export const V2_DISCOVERY_TOPIC0_OR = [id('MarketListed(address)')];

/**
 * -----------------------------
 * V2: Users (minimal for rewards coverage)
 * -----------------------------
 * Suppliers: cToken Transfer covers mint/redeem and regular transfers.
 * Borrowers: Borrow + RepayBorrow (addresses usually in data).
 */
export const V2_USER_ADDR_SOURCES: Record<string, AddrSource[]> = {
  [id('Transfer(address,address,uint256)')]: [
    { kind: 'topic', index: 1 }, // from
    { kind: 'topic', index: 2 }, // to
  ],

  [id('Borrow(address,uint256,uint256,uint256)')]: [
    { kind: 'data', index: 0 }, // borrower
  ],

  /*[id('RepayBorrow(address,address,uint256,uint256,uint256)')]: [
    { kind: 'data', index: 0 }, // payer
    { kind: 'data', index: 1 }, // borrower
  ],*/
};

export const V2_USER_TOPIC0_OR = Object.keys(V2_USER_ADDR_SOURCES);
