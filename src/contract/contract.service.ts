import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';

import { ProviderFactory } from 'network/provider.factory';
import CometABI from './abi/CometABI.json';
import CometExtensionABI from './abi/CometExtensionABI.json';
import ConfiguratorABI from './abi/ConfiguratorABI.json';
import TimelockABI from './abi/TimelockABI.json';
import ERC20ABI from './abi/ERC20ABI.json';
import RewardsABI from './abi/RewardsABI.json';
import LegacyRewardsABI from './abi/LegacyRewardsABI.json';
import {
  CollateralInfo,
  CurveMap,
  MarketData,
  RootJson,
} from './contract.type';
import { JsonService } from 'json/json.service';
import { DAY_IN_SECONDS, YEAR_IN_DAYS } from 'common/constants';

@Injectable()
export class ContractService {
  private readonly logger = new Logger(ContractService.name);

  constructor(
    private readonly providerFactory: ProviderFactory,
    private readonly jsonService: JsonService,
  ) {}

  async readMarketData(
    root: RootJson,
    networkPath: string,
  ): Promise<MarketData> {
    const [networkKey] = networkPath.split('/');
    if (!networkKey) {
      this.logger.error(
        `Invalid networkPath format: '${root.networkPath}'. Expected format: 'network/market'`,
      );
      throw new Error(`Invalid networkPath format: '${root.networkPath}'`);
    }

    let provider: ethers.JsonRpcProvider;
    try {
      provider = this.providerFactory.get(networkKey);
    } catch (e) {
      this.logger.error(
        `Unsupported network '${networkKey}' in path '${root.networkPath}'`,
      );
      throw e;
    }

    const cometAddress = root.comet;
    const cometContract = new ethers.Contract(
      cometAddress,
      CometABI,
      provider,
    ) as any;

    const cometContractImplementation = (
      await this.getImplementationAddress(cometAddress, provider)
    ).address as string;

    const extensionDelegateAddress = await cometContract.extensionDelegate();
    const extensionDelegateContract = new ethers.Contract(
      extensionDelegateAddress,
      CometExtensionABI,
      provider,
    ) as any;

    const cometSymbol = await extensionDelegateContract.symbol();

    const baseTokenAddress = await cometContract.baseToken();
    const baseTokenPriceFeedAddress = await cometContract.baseTokenPriceFeed();
    const baseTokenContract = new ethers.Contract(
      baseTokenAddress,
      ERC20ABI,
      provider,
    ) as any;
    const baseTokenName = await baseTokenContract.name();
    const baseTokenSymbol = await baseTokenContract.symbol();
    const baseTokenDecimals = await baseTokenContract.decimals();

    const configuratorAddress = root.configurator;
    const configuratorContract = new ethers.Contract(
      configuratorAddress,
      ConfiguratorABI,
      provider,
    ) as any;

    const configuratorContractImplemenationAddress = (
      await this.getImplementationAddress(configuratorAddress, provider)
    ).address as string;

    const cometAdminAddress = (
      await this.getAdminAddress(cometAddress, provider)
    ).address as string;

    const cometFactoryAddress = await configuratorContract.factory(
      cometAddress,
    );

    const timelockAddress = await cometContract.governor();
    const timelockContract = new ethers.Contract(
      timelockAddress,
      TimelockABI,
      provider,
    ) as any;

    const governorAddress = await timelockContract.admin();

    const curveData: CurveMap = await this.getCurveData(
      cometContract,
      networkKey,
      cometSymbol,
    );

    await this.sleep(1000);

    const collaterals = await this.getCollaterals(cometContract, provider);

    const rewardsTable = await this.getRewardsTable(
      root,
      provider,
      networkKey,
      cometSymbol,
    );

    return {
      network: networkKey,
      market: cometSymbol,
      contracts: {
        comet: cometAddress,
        cometImplementation: cometContractImplementation,
        cometExtension: extensionDelegateAddress,
        configurator: configuratorAddress,
        configuratorImplementation: configuratorContractImplemenationAddress,
        cometAdmin: cometAdminAddress,
        cometFactory: cometFactoryAddress,
        rewards: root.rewards,
        bulker: root.bulker,
        governor: governorAddress,
        timelock: timelockAddress,
      },
      curve: curveData,
      baseToken: {
        name: baseTokenName,
        symbol: baseTokenSymbol,
        address: baseTokenAddress,
        decimals: Number(baseTokenDecimals),
        priceFeed: baseTokenPriceFeedAddress,
      },
      collaterals,
      rewardsTable,
    };
  }

  private parseAddress(storageValue) {
    if (!storageValue || storageValue === ethers.ZeroHash) return null;
    return ethers.getAddress('0x' + storageValue.slice(-40));
  }

  private async getAdminAddress(
    proxyAddress: string,
    provider: ethers.JsonRpcProvider,
  ) {
    const ADMIN_SLOT =
      '0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103';
    const adminStorage = await provider.getStorage(proxyAddress, ADMIN_SLOT);
    const adminAddress = this.parseAddress(adminStorage);
    if (adminAddress) {
      return { type: 'EIP-1967 (transparent/uups)', address: adminAddress };
    }

    // not a recognized proxy type
    return { type: 'Not a proxy', address: null };
  }

  private async getImplementationAddress(
    proxyAddress: string,
    provider: ethers.JsonRpcProvider,
  ) {
    // Storage slots for EIP-1967
    const STORAGE_SLOTS = {
      implementation:
        '0x360894A13BA1A3210667C828492DB98DCA3E2076CC3735A920A3CA505D382BBC',
      beacon:
        '0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50',
    };
    // Check Transparent Proxy (and UUPS)
    const implStorage = await provider.getStorage(
      proxyAddress,
      STORAGE_SLOTS.implementation,
    );
    const implAddress = this.parseAddress(implStorage);
    if (implAddress) {
      return { type: 'EIP-1967 (transparent/uups)', address: implAddress };
    }

    // Check Beacon Proxy (if needed)
    const beaconStorage = await provider.getStorage(
      proxyAddress,
      STORAGE_SLOTS.beacon,
    );
    const beaconAddress = this.parseAddress(beaconStorage);
    if (beaconAddress) {
      // read from beacon address
      const beaconImplStorage = await provider.getStorage(
        beaconAddress,
        STORAGE_SLOTS.implementation,
      );
      const beaconImplAddress = this.parseAddress(beaconImplStorage);
      return { type: 'Beacon Proxy', address: beaconImplAddress };
    }

    // not a recognized proxy type
    return { type: 'Not a proxy', address: null };
  }

  private async getCurveData(
    cometContract: any,
    network: string,
    market: string,
  ) {
    const date = new Date().toISOString().split('T')[0];

    const keys = [
      'supplyKink',
      'supplyPerSecondInterestRateSlopeLow',
      'supplyPerSecondInterestRateSlopeHigh',
      'supplyPerSecondInterestRateBase',
      'borrowKink',
      'borrowPerSecondInterestRateSlopeLow',
      'borrowPerSecondInterestRateSlopeHigh',
      'borrowPerSecondInterestRateBase',
    ];

    const chainMethods = keys.reduce((acc, key) => {
      acc[key] = async () => (await cometContract[key]()).toString();
      return acc;
    }, {});

    const existingCurve =
      this.jsonService.getMarketData(network, market)?.curve ?? {};

    const result = {};

    for (const key of keys) {
      const chainValue = await chainMethods[key]();
      const prevEntry = existingCurve[key];

      if (!prevEntry) {
        result[key] = {
          date,
          value: chainValue,
          previousValue: chainValue,
          valueSetDate: date,
        };
      } else {
        const oldValue = prevEntry.value;
        if (oldValue !== chainValue) {
          result[key] = {
            date,
            value: chainValue,
            previousValue: oldValue,
            valueSetDate: date,
          };
        } else {
          result[key] = {
            date,
            value: oldValue,
            previousValue: prevEntry.previousValue,
            valueSetDate: prevEntry.valueSetDate,
          };
        }
      }
    }

    return result as CurveMap;
  }

  private async getCollaterals(
    cometContract: any,
    provider: ethers.JsonRpcProvider,
  ) {
    const date = new Date().toISOString().split('T')[0] as string;
    const collaterals: CollateralInfo[] = [];
    const collateralCount = await cometContract.numAssets();

    for (let i = 0; i < collateralCount; i++) {
      const collateral = await cometContract.getAssetInfo(i);
      const collateralContract = new ethers.Contract(
        collateral.asset,
        ERC20ABI,
        provider,
      ) as any;
      const name = await collateralContract.name();
      const symbol = await collateralContract.symbol();
      const decimals = await collateralContract.decimals();

      const CF = `${ethers.formatEther(
        collateral.borrowCollateralFactor * 100n,
      )}%`;

      const LF = `${ethers.formatEther(
        collateral.liquidateCollateralFactor * 100n,
      )}%`;

      const LP = `${(
        (1 - Number(ethers.formatEther(collateral.liquidationFactor))) *
        100
      ).toFixed(2)}%`;

      const maxLeverage =
        1 / (1 - Number(ethers.formatEther(collateral.borrowCollateralFactor)));

      const asset = {
        idx: i,
        date,
        name,
        symbol,
        address: collateral.asset as string,
        decimals: Number(decimals),
        priceFeedAddress: collateral.priceFeed as string,
        priceFeedProvider: 'Chainlink',
        oevEnabled: false,
        capEnabled: false,
        rateType: 'Market',
        CF,
        LF,
        LP,
        maxLeverage: maxLeverage.toFixed(2) + 'x',
      };
      collaterals.push(asset);
    }

    await this.sleep(1000);

    return collaterals;
  }

  private async getRewardsTable(
    root: RootJson,
    provider: ethers.JsonRpcProvider,
    network: string,
    market: string,
  ) {
    try {
      const date = new Date().toISOString().split('T')[0] as string;

      const cometAddress = root.comet;
      const cometContract = new ethers.Contract(
        cometAddress,
        CometABI,
        provider,
      ) as any;

      const rewardsAddress = root.rewards;
      const legacyNetworks = ['mainnet', 'polygon'];
      const rewardsABI = legacyNetworks.includes(network)
        ? LegacyRewardsABI
        : RewardsABI;
      const rewardsContract = new ethers.Contract(
        rewardsAddress,
        rewardsABI,
        provider,
      ) as any;

      const lendRewardsSpeed = await cometContract.baseTrackingSupplySpeed();
      const borrowRewardsSpeed = await cometContract.baseTrackingBorrowSpeed();
      const lendDailyRewards = Math.round(
        Number(ethers.formatUnits(lendRewardsSpeed, 15)) * DAY_IN_SECONDS,
      );
      const borrowDailyRewards = Math.round(
        Number(ethers.formatUnits(borrowRewardsSpeed, 15)) * DAY_IN_SECONDS,
      );
      const dailyRewards = lendDailyRewards + borrowDailyRewards;
      const yearlyRewards = dailyRewards * YEAR_IN_DAYS;
      const rewardConfig = await rewardsContract.rewardConfig(cometAddress);
      const tokenAddress = rewardConfig[0];

      let compAmountOnRewardContract = 0;
      if (tokenAddress && tokenAddress !== ethers.ZeroAddress) {
        const tokenContract = new ethers.Contract(
          tokenAddress,
          ERC20ABI,
          provider,
        ) as any;
        const compBalance = await tokenContract.balanceOf(rewardsAddress);
        compAmountOnRewardContract = Number(ethers.formatEther(compBalance));
      }

      return {
        date,
        network,
        market,
        dailyRewards,
        yearlyRewards,
        lendDailyRewards,
        borrowDailyRewards,
        compAmountOnRewardContract,
        // lendAprBoost: null,
        // borrowAprBoost: null,
      };
    } catch (error) {
      this.logger.error(
        `Error getting rewards table for network ${network} and market ${market}:`,
        error instanceof Error ? error.message : String(error),
      );
      return null;
    } finally {
      await this.sleep(1000);
    }
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
