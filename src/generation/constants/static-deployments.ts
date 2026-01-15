/**
 * Static deployments for networks that are not yet supported by the data collector
 * These will be included in the generated compound-3.md file
 */
export interface StaticDeployment {
  deploymentKey: string;
  tabText: string;
  blockscanOrigin: string;
  contracts: Record<string, string>;
}

export const STATIC_DEPLOYMENTS: StaticDeployment[] = [
  {
    deploymentKey: 'Ethereum Sepolia Testnet - USDC Base',
    tabText: 'Sepolia USDC',
    blockscanOrigin: 'https://sepolia.etherscan.io/',
    contracts: {
      cUSDCv3: '0xAec1F48e02Cfb822Be958B68C7957156EB3F0b6e',
      'cUSDCv3 Implementation': '0xE3E0106227181958aBfbA960C13d0Fe52c733265',
      'cUSDCv3 Ext': '0xdCbDb7306c6Ff46f77B349188dC18cEd9DF30299',
      Configurator: '0xc28aD44975C614EaBe0Ed090207314549e1c6624',
      'Configurator Implementation':
        '0x2b03014AeEe8DD46de4464da41e7dF9BD154cd66',
      'Proxy Admin': '0x9e9fA093aa60db36c4E8a01EBf4718095b6e37f0',
      'Comet Factory': '0x91663d91795049C3D4afC85A7d0AdB15238750aa',
      Rewards: '0x8bF5b658bdF0388E8b482ED51B14aef58f90abfD',
      Bulker: '0x157c001bb1F8b33743B14483Be111C961d8e11dE',
      Faucet: '0x68793eA49297eB75DFB4610B68e076D2A5c7646C',
      USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
      COMP: '0xA6c8D1c55951e8AC44a0EaA959Be5Fd21cc07531',
      WBTC: '0xa035b9e130F2B1AedC733eEFb1C67Ba4c503491F',
      WETH: '0x2D5ee574e710219a521449679A4A7f2B43f046ad',
    },
  },
  {
    deploymentKey: 'Ethereum Sepolia Testnet - WETH Base',
    tabText: 'Sepolia WETH',
    blockscanOrigin: 'https://sepolia.etherscan.io/',
    contracts: {
      cWETHv3: '0x2943ac1216979aD8dB76D9147F64E61adc126e96',
      'cWETHv3 Implementation': '0x149F2D15f3822C0C935a9c99ddfb804611586cAc',
      'cWETHv3 Ext': '0xD0b7551E480c101fa9cf3fe0887cCBe59f16216B',
      Configurator: '0xc28aD44975C614EaBe0Ed090207314549e1c6624',
      'Configurator Implementation':
        '0x2b03014AeEe8DD46de4464da41e7dF9BD154cd66',
      'Proxy Admin': '0x9e9fA093aa60db36c4E8a01EBf4718095b6e37f0',
      'Comet Factory': '0x91663d91795049C3D4afC85A7d0AdB15238750aa',
      Rewards: '0x8bF5b658bdF0388E8b482ED51B14aef58f90abfD',
      Bulker: '0xaD0C044425D81a2E223f4CE699156900fead2Aaa',
      Faucet: '0x68793eA49297eB75DFB4610B68e076D2A5c7646C',
      cbETH: '0xb9fa8F5eC3Da13B508F462243Ad0555B46E028df',
      COMP: '0xA6c8D1c55951e8AC44a0EaA959Be5Fd21cc07531',
      stETH: '0x3e3FE7dBc6B4C189E7128855dD526361c49b40Af',
      wstETH: '0xB82381A3fBD3FaFA77B3a7bE693342618240067b',
      WETH: '0x2D5ee574e710219a521449679A4A7f2B43f046ad',
    },
  },
  {
    deploymentKey: 'Polygon Mumbai Testnet - USDC Base',
    tabText: 'Mumbai USDC',
    blockscanOrigin: 'https://mumbai.polygonscan.com/',
    contracts: {
      cUSDCv3: '0xF09F0369aB0a875254fB565E52226c88f10Bc839',
      'cUSDCv3 Implementation': '0x6Cd33556D458aC78Cc17b55Eb75B17d23E4deE57',
      'cUSDCv3 Ext': '0x1c3080d7fd5c97A58E0F2EA19e9Eec4745dC4BDe',
      Configurator: '0x64550801B8bf3BF4D8792d46D8903F82e2EC95A9',
      'Configurator Implementation':
        '0xA5615c22c3Ab520A77b29F3d32C2831156dFbE7B',
      'Proxy Admin': '0xfE14E3BdCADDe7ccD3c8EeE3CcC11e3FC8184E47',
      'Comet Factory': '0x9F7Ac7A36902414Dd4D280E79C5B10162882F0Ba',
      Timelock: '0x90b1f90Ed6477d5Ee1Ff14Bef670266DaE9eEb92',
      'Bridge Receiver': '0xe195d2cBf7f20E40Cf701a9fA3F01fE89bA5a1da',
      Rewards: '0x0785f2AC0dCBEDEE4b8D62c25A34098E9A0dF4bB',
      Bulker: '0x990D086E52B132f5b4f769829612F756a4a20bb8',
      Faucet: '0x1Cea3a83BA17692cEa8DB37D72446f014480F3bE',
      DAI: '0x4DAFE12E1293D889221B1980672FE260Ac9dDd28',
      USDC: '0xDB3cB4f2688daAB3BFf59C24cC42D4B6285828e9',
      WETH: '0xE1e67212B1A4BF629Bdf828e08A3745307537ccE',
      WBTC: '0x4B5A0F4E00bC0d6F16A593Cae27338972614E713',
      WMATIC: '0xfec23a9E1DBA805ADCF55E0338Bf5E03488FC7Fb',
    },
  },
  {
    deploymentKey: 'Base Sepolia - USDC Base',
    tabText: 'Base Sepolia USDC',
    blockscanOrigin: 'https://sepolia.basescan.org/',
    contracts: {
      cUSDCv3: '0x571621Ce60Cebb0c1D442B5afb38B1663C6Bf017',
      'cUSDCv3 Implementation': '0xe85D00f657F78c799ec4E9CAFd951ce5891bAde8',
      'cUSDCv3 Ext': '0x7F8dB47259a6b4461C53eBD230C9161B01B7160E',
      Configurator: '0x090a2b1fc84d0b5141d5D5608b12Db19201aE5a6',
      'Configurator Implementation':
        '0x62a8ddF40c1fd8B76Cb643fB967912783deBfd79',
      'Proxy Admin': '0x45f6ceDa8ba0e6c9E998ee932e39da40B4e3D438',
      'Comet Factory': '0xBA7Ef8536998e22503530E59416717c7D3fEbCA9',
      Timelock: '0xb2A7676bA3A258E710c7092B5E763d6f037c1d02',
      'Bridge Receiver': '0x80c116493DB619560e3380D0fF195e749D8857D7',
      Rewards: '0x3394fa1baCC0b47dd0fF28C8573a476a161aF7BC',
      Bulker: '0x7D25b2AecF07B5CB87B05e17Aa5cecbA8BCfDBD1',
      Faucet: '0xD76cB57d8B097B80a6eE4D1b4d5ef872bfBa6051',
      USDC: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
      cbETH: '0x774eD9EDB0C5202dF9A86183804b5D9E99dC6CA3',
      COMP: '0x2f535da74048c0874400f0371Fba20DF983A56e2',
      WETH: '0x4200000000000000000000000000000000000006',
    },
  },
  {
    deploymentKey: 'Base Sepolia - WETH Base',
    tabText: 'Base Sepolia WETH',
    blockscanOrigin: 'https://sepolia.basescan.org/',
    contracts: {
      cWETHv3: '0x61490650AbaA31393464C3f34E8B29cd1C44118E',
      'cWETHv3 Implementation': '0xa78f909c0F0dA420e15A1cFa3Be578dB5AE5799E',
      'cWETHv3 Ext': '0xe28860fBB866751b0c0CB07ce1BA54F467b19B03',
      Configurator: '0x090a2b1fc84d0b5141d5D5608b12Db19201aE5a6',
      'Configurator Implementation':
        '0x62a8ddF40c1fd8B76Cb643fB967912783deBfd79',
      'Proxy Admin': '0x45f6ceDa8ba0e6c9E998ee932e39da40B4e3D438',
      'Comet Factory': '0xBA7Ef8536998e22503530E59416717c7D3fEbCA9',
      Timelock: '0xb2A7676bA3A258E710c7092B5E763d6f037c1d02',
      'Bridge Receiver': '0x80c116493DB619560e3380D0fF195e749D8857D7',
      Rewards: '0x3394fa1baCC0b47dd0fF28C8573a476a161aF7BC',
      Bulker: '0x7D25b2AecF07B5CB87B05e17Aa5cecbA8BCfDBD1',
      Faucet: '0xD76cB57d8B097B80a6eE4D1b4d5ef872bfBa6051',
      cbETH: '0x774eD9EDB0C5202dF9A86183804b5D9E99dC6CA3',
      COMP: '0x2f535da74048c0874400f0371Fba20DF983A56e2',
      WETH: '0x4200000000000000000000000000000000000006',
    },
  },
];
