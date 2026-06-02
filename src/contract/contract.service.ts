import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import { MulticallProvider } from 'ethers-multicall-provider';

import { ProviderFactory } from 'network/provider.factory';
import { NetworkService } from 'network/network.service';
import { JsonService } from 'json/json.service';
import CometABI from './abi/CometABI.json';
import CometExtensionABI from './abi/CometExtensionABI.json';
import ConfiguratorABI from './abi/ConfiguratorABI.json';
import TimelockABI from './abi/TimelockABI.json';
import ERC20ABI from './abi/ERC20ABI.json';
import {
  CollateralInfo,
  CometContract,
  CometExtensionContract,
  ConfiguratorContract,
  CurveEntry,
  CurveKey,
  CurveMap,
  Erc20Contract,
  MarketData,
  ProxyAddressInfo,
  RootJson,
  TimelockContract,
} from './contract.types';
import { Address } from 'common/types/address';
import { formatSupplyCap } from './helpers/format-supply-cap';
import { CURVE_KEYS } from './contract.constants';
import { toSafeInteger } from '../common/helpers/to-safe-integer';

@Injectable()
export class ContractService {
  private readonly logger = new Logger(ContractService.name);

  constructor(
    private readonly providerFactory: ProviderFactory,
    private readonly networkService: NetworkService,
    private readonly jsonService: JsonService,
  ) {}

  private createContract<T>(
    address: Address,
    abi: ethers.InterfaceAbi,
    runner: ethers.ContractRunner,
  ): T {
    return new ethers.Contract(address, abi, runner) as unknown as T;
  }

  private getCometContract(
    address: Address,
    runner: ethers.ContractRunner,
  ): CometContract {
    return this.createContract<CometContract>(address, CometABI, runner);
  }

  private getCometExtensionContract(
    address: Address,
    runner: ethers.ContractRunner,
  ): CometExtensionContract {
    return this.createContract<CometExtensionContract>(
      address,
      CometExtensionABI,
      runner,
    );
  }

  private getConfiguratorContract(
    address: Address,
    runner: ethers.ContractRunner,
  ): ConfiguratorContract {
    return this.createContract<ConfiguratorContract>(
      address,
      ConfiguratorABI,
      runner,
    );
  }

  private getTimelockContract(
    address: Address,
    runner: ethers.ContractRunner,
  ): TimelockContract {
    return this.createContract<TimelockContract>(address, TimelockABI, runner);
  }

  private getErc20Contract(
    address: Address,
    runner: ethers.ContractRunner,
  ): Erc20Contract {
    return this.createContract<Erc20Contract>(address, ERC20ABI, runner);
  }

  private getDateString(): string {
    const date = new Date().toISOString().split('T')[0];
    if (!date) {
      throw new Error('Failed to build date string');
    }
    return date;
  }

  private requireAddress(address: Address | null, label: string): Address {
    if (!address) {
      throw new Error(`Missing ${label} address`);
    }
    return address;
  }

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

    const multicall = this.providerFactory.multicall(networkKey);

    const cometAddress = root.comet;
    const configuratorAddress = root.configurator;

    const cometContract = this.getCometContract(cometAddress, multicall);
    const configuratorContract = this.getConfiguratorContract(
      configuratorAddress,
      multicall,
    );

    const networkConfig = this.networkService.byName(networkKey);
    const comp = networkConfig?.comp;
    const svrFeeRecipient = networkConfig?.svrFeeRecipient;
    const svrFeeReceiver = networkConfig?.svrFeeReceiver;

    const [
      cometImplementationInfo,
      configuratorImplementationInfo,
      cometAdminInfo,
    ] = await Promise.all([
      this.getImplementationAddress(cometAddress, provider),
      this.getImplementationAddress(configuratorAddress, provider),
      this.getAdminAddress(cometAddress, provider),
    ]);

    const [
      extensionDelegateAddress,
      baseTokenAddress,
      baseTokenPriceFeedAddress,
      timelockAddress,
      cometFactoryAddress,
    ] = await Promise.all([
      cometContract.extensionDelegate(),
      cometContract.baseToken(),
      cometContract.baseTokenPriceFeed(),
      cometContract.governor(),
      configuratorContract.factory(cometAddress),
    ]);

    const extensionDelegateContract = this.getCometExtensionContract(
      extensionDelegateAddress,
      multicall,
    );
    const timelockContract = this.getTimelockContract(
      timelockAddress,
      multicall,
    );
    const baseTokenContract = this.getErc20Contract(
      baseTokenAddress,
      multicall,
    );

    const [
      cometSymbol,
      governorAddress,
      baseTokenName,
      baseTokenSymbol,
      baseTokenDecimals,
    ] = await Promise.all([
      extensionDelegateContract.symbol(),
      timelockContract.admin(),
      baseTokenContract.name(),
      baseTokenContract.symbol(),
      baseTokenContract.decimals(),
    ]);

    const baseTokenDecimalsNumber = toSafeInteger(
      baseTokenDecimals,
      'base token decimals',
    );

    const [curveData, collaterals] = await Promise.all([
      this.getCurveData(cometContract, networkKey, cometSymbol),
      this.getCollaterals(cometContract, multicall),
    ]);

    const cometContractImplementation = this.requireAddress(
      cometImplementationInfo.address,
      'comet implementation',
    );
    const configuratorContractImplementation = this.requireAddress(
      configuratorImplementationInfo.address,
      'configurator implementation',
    );
    const cometAdminAddress = this.requireAddress(
      cometAdminInfo.address,
      'comet admin',
    );

    return {
      network: networkKey,
      market: cometSymbol,
      contracts: {
        comet: cometAddress,
        cometImplementation: cometContractImplementation,
        cometExtension: extensionDelegateAddress,
        configurator: configuratorAddress,
        configuratorImplementation: configuratorContractImplementation,
        cometAdmin: cometAdminAddress,
        cometFactory: cometFactoryAddress,
        rewards: root.rewards,
        bulker: root.bulker,
        governor: governorAddress,
        timelock: timelockAddress,
        ...(comp ? { comp } : {}),
        ...(svrFeeRecipient ? { svrFeeRecipient } : {}),
        ...(svrFeeReceiver ? { svrFeeReceiver } : {}),
      },
      curve: curveData,
      baseToken: {
        name: baseTokenName,
        symbol: baseTokenSymbol,
        address: baseTokenAddress,
        decimals: baseTokenDecimalsNumber,
        priceFeed: baseTokenPriceFeedAddress,
      },
      collaterals,
    };
  }

  private parseAddress(storageValue?: string | null): Address | null {
    if (!storageValue || storageValue === ethers.ZeroHash) return null;
    try {
      return ethers.getAddress(`0x${storageValue.slice(-40)}`) as Address;
    } catch {
      return null;
    }
  }

  private async getAdminAddress(
    proxyAddress: Address,
    provider: ethers.JsonRpcProvider,
  ): Promise<ProxyAddressInfo> {
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
    proxyAddress: Address,
    provider: ethers.JsonRpcProvider,
  ): Promise<ProxyAddressInfo> {
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
    cometContract: CometContract,
    network: string,
    market: string,
  ): Promise<CurveMap> {
    const date = this.getDateString();

    const [
      supplyKink,
      supplyPerSecondInterestRateSlopeLow,
      supplyPerSecondInterestRateSlopeHigh,
      supplyPerSecondInterestRateBase,
      borrowKink,
      borrowPerSecondInterestRateSlopeLow,
      borrowPerSecondInterestRateSlopeHigh,
      borrowPerSecondInterestRateBase,
    ] = await Promise.all([
      cometContract.supplyKink(),
      cometContract.supplyPerSecondInterestRateSlopeLow(),
      cometContract.supplyPerSecondInterestRateSlopeHigh(),
      cometContract.supplyPerSecondInterestRateBase(),
      cometContract.borrowKink(),
      cometContract.borrowPerSecondInterestRateSlopeLow(),
      cometContract.borrowPerSecondInterestRateSlopeHigh(),
      cometContract.borrowPerSecondInterestRateBase(),
    ]);

    const chainValues: Record<CurveKey, string> = {
      supplyKink: supplyKink.toString(),
      supplyPerSecondInterestRateSlopeLow:
        supplyPerSecondInterestRateSlopeLow.toString(),
      supplyPerSecondInterestRateSlopeHigh:
        supplyPerSecondInterestRateSlopeHigh.toString(),
      supplyPerSecondInterestRateBase:
        supplyPerSecondInterestRateBase.toString(),
      borrowKink: borrowKink.toString(),
      borrowPerSecondInterestRateSlopeLow:
        borrowPerSecondInterestRateSlopeLow.toString(),
      borrowPerSecondInterestRateSlopeHigh:
        borrowPerSecondInterestRateSlopeHigh.toString(),
      borrowPerSecondInterestRateBase:
        borrowPerSecondInterestRateBase.toString(),
    };

    const existingCurve = this.jsonService.getMarketData(
      network,
      market,
    )?.curve;

    const result: Record<CurveKey, CurveEntry> = {} as Record<
      CurveKey,
      CurveEntry
    >;

    for (const key of CURVE_KEYS) {
      const chainValue = chainValues[key];
      const prevEntry = existingCurve?.[key];

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
    cometContract: CometContract,
    multicall: MulticallProvider,
  ): Promise<CollateralInfo[]> {
    const date = this.getDateString();
    const collateralCount = toSafeInteger(
      await cometContract.numAssets(),
      'collateral count',
    );

    const assetInfos = await Promise.all(
      Array.from({ length: collateralCount }, (_, i) =>
        cometContract.getAssetInfo(i),
      ),
    );

    const collaterals = await Promise.all(
      assetInfos.map(async (collateral, idx) => {
        const collateralContract = this.getErc20Contract(
          collateral.asset,
          multicall,
        );
        const [name, symbol, decimals] = await Promise.all([
          collateralContract.name(),
          collateralContract.symbol(),
          collateralContract.decimals(),
        ]);

        const decimalsNumber = toSafeInteger(decimals, `${symbol} decimals`);

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
          1 /
          (1 - Number(ethers.formatEther(collateral.borrowCollateralFactor)));

        const borrowCollateralFactorRaw =
          collateral.borrowCollateralFactor.toString();
        const liquidateCollateralFactorRaw =
          collateral.liquidateCollateralFactor.toString();
        const liquidationFactorRaw = collateral.liquidationFactor.toString();
        const supplyCapRaw = collateral.supplyCap.toString();
        const supplyCapFormatted = formatSupplyCap(
          supplyCapRaw,
          decimalsNumber,
        );

        return {
          idx,
          date,
          name,
          symbol,
          address: collateral.asset,
          decimals: decimalsNumber,
          priceFeedAddress: collateral.priceFeed,
          priceFeedProvider: 'Chainlink',
          oevEnabled: false,
          capEnabled: false,
          rateType: 'Market',
          CF,
          LF,
          LP,
          supplyCapFormatted,
          maxLeverage: maxLeverage.toFixed(2) + 'x',
          borrowCollateralFactorRaw,
          liquidateCollateralFactorRaw,
          liquidationFactorRaw,
          supplyCapRaw,
        };
      }),
    );

    return collaterals;
  }
}
