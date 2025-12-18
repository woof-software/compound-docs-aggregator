import { id } from 'ethers';

/**
 * -----------------------------
 * Topics: Configurator discovery
 * -----------------------------
 *
 * We keep this intentionally broad: most governance updates include
 * `address indexed cometProxy` in topic[1]. This lets us discover comet proxies
 * without any external address list.
 *
 * If at some point a topic is wrong for a specific chain/version, it just reduces discovery coverage
 * (doesn't break indexing). You can add/remove topics safely.
 */
export const DISCOVERY_TOPIC0_OR = [
  id('CometDeployed(address,address)'),
  id('SetFactory(address,address,address)'),
  id('SetGovernor(address,address,address)'),
  id('SetPauseGuardian(address,address,address)'),
  id('SetBaseToken(address,address,address)'),
];

/**
 * -----------------------------
 * Topics: Comet user discovery
 * -----------------------------
 *
 * We only use topics to extract indexed addresses (no ABI needed).
 * For each topic0 we specify which topic positions contain user addresses.
 */
export const TOPIC_SUPPLY = id('Supply(address,address,uint256)'); // from, dst
export const TOPIC_WITHDRAW = id('Withdraw(address,address,uint256)'); // src, to
export const TOPIC_TRANSFER = id('Transfer(address,address,uint256)'); // from, to

export const TOPIC_SUPPLY_COLLATERAL = id(
  'SupplyCollateral(address,address,address,uint256)',
); // from, dst, asset
export const TOPIC_WITHDRAW_COLLATERAL = id(
  'WithdrawCollateral(address,address,address,uint256)',
); // src, to, asset
export const TOPIC_TRANSFER_COLLATERAL = id(
  'TransferCollateral(address,address,address,uint256)',
); // from, to, asset

export const TOPIC_ABSORB_DEBT = id(
  'AbsorbDebt(address,address,uint256,uint256)',
); // absorber, borrower
export const TOPIC_ABSORB_COLLATERAL = id(
  'AbsorbCollateral(address,address,address,uint256,uint256)',
); // absorber, borrower, asset

export const TOPIC_BUY_COLLATERAL = id(
  'BuyCollateral(address,address,uint256,uint256)',
); // buyer, asset
export const TOPIC_WITHDRAW_RESERVES = id('WithdrawReserves(address,uint256)'); // to

export const DEFAULT_COMET_TOPIC0_OR = [
  TOPIC_SUPPLY,
  TOPIC_WITHDRAW,
  TOPIC_SUPPLY_COLLATERAL,
  TOPIC_WITHDRAW_COLLATERAL,
  TOPIC_ABSORB_DEBT,
  TOPIC_ABSORB_COLLATERAL,
  TOPIC_BUY_COLLATERAL,
  TOPIC_WITHDRAW_RESERVES,
  // Noisy
  // TOPIC_TRANSFER,
  // TOPIC_TRANSFER_COLLATERAL,
];

export const ADDR_TOPIC_INDEXES: Record<string, number[]> = {
  [TOPIC_SUPPLY]: [1, 2],
  [TOPIC_WITHDRAW]: [1, 2],
  [TOPIC_TRANSFER]: [1, 2],

  [TOPIC_SUPPLY_COLLATERAL]: [1, 2],
  [TOPIC_WITHDRAW_COLLATERAL]: [1, 2],
  [TOPIC_TRANSFER_COLLATERAL]: [1, 2],

  [TOPIC_ABSORB_DEBT]: [1, 2],
  [TOPIC_ABSORB_COLLATERAL]: [1, 2],

  [TOPIC_BUY_COLLATERAL]: [1],
  [TOPIC_WITHDRAW_RESERVES]: [1],
};
