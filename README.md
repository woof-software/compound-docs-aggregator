# 📊 Comet Markets Overview

**Download full JSON:** [output.json](./output.json)

---

## 🌐 ARBITRUM

<details>
<summary><strong>arbitrum/cUSDCev3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xA5EDBDD9646f8dFF606d7448e414884C7d905dCA | Main market contract        |
  |  2  | Comet Implementation        | 0xFE192d38814BfCccA79Ab14075A833354371A6BE | Implementation contract     |
  |  3  | Comet Extension             | 0x5D409e56D886231aDAf00c8775665AD0f9897b56 | Extension delegate contract |
  |  4  | Configurator                | 0xb21b06D71c75973babdE35b49fFDAc3F82Ad3775 | Market configurator         |
  |  5  | Configurator Implementation | 0x8495AF03fb797E2965bCB42Cb0693e1c15614798 | Configurator implementation |
  |  6  | Comet Admin                 | 0xD10b40fF1D92e2267D099Da3509253D9Da4D715e | Admin contract              |
  |  7  | Comet Factory               | 0x7dE363b6Bf0a892B94a1Cd0C9DF76826bFC14228 | Factory contract            |
  |  8  | Rewards                     | 0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae | Rewards contract            |
  |  9  | Bulker                      | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Bulker contract             |
  |  10 | Governor                    | 0x42480C37B249e33aABaf4c22B20235656bd38068 | Governance contract         |
  |  11 | Timelock                    | 0x3fB4d38ea7EC20D91917c09591490Eeda38Cf88A | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |         1236681887 |         1236681887 | 2025-06-11 |
  |  3  | Supply Rate Slope High |       114155251141 |       114155251141 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |         1055936073 |         1055936073 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |       126839167935 |       126839167935 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name          | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Arbitrum      | ARB    | 0x912CE59144191C1204E64559FE8253a0e49E6548 |       18 | 0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6 | 55.0% | 60.0% | 10.00% |        2.22x |
  |  2  | GMX           | GMX    | 0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a |       18 | 0xDB98056FecFff59D032aB628337A4887110df3dB | 40.0% | 45.0% | 15.00% |        1.67x |
  |  3  | Wrapped Ether | WETH   | 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 |       18 | 0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612 | 78.0% | 85.0% |  5.00% |        4.55x |
  |  4  | Wrapped BTC   | WBTC   | 0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f |        8 | 0xd0C7101eACbB49F3deCcCc166d238410D6D46d57 | 70.0% | 77.0% | 10.00% |        3.33x |

</details>

<details>
<summary><strong>arbitrum/cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf | Main market contract        |
  |  2  | Comet Implementation        | 0x2416101cFd4aD12cA2D5b3E58419073c7D78d857 | Implementation contract     |
  |  3  | Comet Extension             | 0x95DeDD64b551F05E9f59a101a519B024b6b116E7 | Extension delegate contract |
  |  4  | Configurator                | 0xb21b06D71c75973babdE35b49fFDAc3F82Ad3775 | Market configurator         |
  |  5  | Configurator Implementation | 0x8495AF03fb797E2965bCB42Cb0693e1c15614798 | Configurator implementation |
  |  6  | Comet Admin                 | 0xD10b40fF1D92e2267D099Da3509253D9Da4D715e | Admin contract              |
  |  7  | Comet Factory               | 0x7dE363b6Bf0a892B94a1Cd0C9DF76826bFC14228 | Factory contract            |
  |  8  | Rewards                     | 0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae | Rewards contract            |
  |  9  | Bulker                      | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Bulker contract             |
  |  10 | Governor                    | 0x42480C37B249e33aABaf4c22B20235656bd38068 | Governance contract         |
  |  11 | Timelock                    | 0x3fB4d38ea7EC20D91917c09591490Eeda38Cf88A | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-06-11 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Arbitrum                        | ARB    | 0x912CE59144191C1204E64559FE8253a0e49E6548 |       18 | 0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6 | 70.0% | 80.0% | 10.00% |        3.33x |
  |  2  | GMX                             | GMX    | 0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a |       18 | 0xDB98056FecFff59D032aB628337A4887110df3dB | 60.0% | 75.0% | 15.00% |        2.50x |
  |  3  | Wrapped Ether                   | WETH   | 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 |       18 | 0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612 | 83.0% | 88.0% |  7.00% |        5.88x |
  |  4  | Wrapped BTC                     | WBTC   | 0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f |        8 | 0xd0C7101eACbB49F3deCcCc166d238410D6D46d57 | 75.0% | 85.0% | 10.00% |        4.00x |
  |  5  | Wrapped liquid staked Ether 2.0 | wstETH | 0x5979D7b546E38E414F7E9822514be443A4800529 |       18 | 0xe165155c34fE4cBfC55Fc554437907BDb1Af7e3e | 80.0% | 85.0% | 10.00% |        5.00x |
  |  6  | Renzo Restaked ETH              | ezETH  | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0xC49399814452B41dA8a7cd76a159f5515cb3e493 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  7  | Wrapped Mountain Protocol USD   | wUSDM  | 0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812 |       18 | 0x13cDFB7db5e2F58e122B2e789b59dE13645349C4 | 88.0% | 90.0% |  5.00% |        8.33x |

</details>

<details>
<summary><strong>arbitrum/cUSDTv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07 | Main market contract        |
  |  2  | Comet Implementation        | 0x7E3eA3B9468587A406695C36EA2e64c7613aa965 | Implementation contract     |
  |  3  | Comet Extension             | 0x271A200023c9512d37149dfbb62bf0F62a8D4680 | Extension delegate contract |
  |  4  | Configurator                | 0xb21b06D71c75973babdE35b49fFDAc3F82Ad3775 | Market configurator         |
  |  5  | Configurator Implementation | 0x8495AF03fb797E2965bCB42Cb0693e1c15614798 | Configurator implementation |
  |  6  | Comet Admin                 | 0xD10b40fF1D92e2267D099Da3509253D9Da4D715e | Admin contract              |
  |  7  | Comet Factory               | 0x7dE363b6Bf0a892B94a1Cd0C9DF76826bFC14228 | Factory contract            |
  |  8  | Rewards                     | 0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae | Rewards contract            |
  |  9  | Bulker                      | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Bulker contract             |
  |  10 | Governor                    | 0x42480C37B249e33aABaf4c22B20235656bd38068 | Governance contract         |
  |  11 | Timelock                    | 0x3fB4d38ea7EC20D91917c09591490Eeda38Cf88A | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-06-11 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Arbitrum                        | ARB    | 0x912CE59144191C1204E64559FE8253a0e49E6548 |       18 | 0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6 | 70.0% | 80.0% | 10.00% |        3.33x |
  |  2  | Wrapped Ether                   | WETH   | 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 |       18 | 0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612 | 83.0% | 88.0% |  7.00% |        5.88x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH | 0x5979D7b546E38E414F7E9822514be443A4800529 |       18 | 0xe165155c34fE4cBfC55Fc554437907BDb1Af7e3e | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Wrapped BTC                     | WBTC   | 0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f |        8 | 0xd0C7101eACbB49F3deCcCc166d238410D6D46d57 | 70.0% | 80.0% | 10.00% |        3.33x |
  |  5  | GMX                             | GMX    | 0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a |       18 | 0xDB98056FecFff59D032aB628337A4887110df3dB | 60.0% | 70.0% | 20.00% |        2.50x |

</details>

<details>
<summary><strong>arbitrum/cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x6f7D514bbD4aFf3BcD1140B7344b32f063dEe486 | Main market contract        |
  |  2  | Comet Implementation        | 0xD6018B9Cf0B9650Cf2794650adA0689bD594e11B | Implementation contract     |
  |  3  | Comet Extension             | 0x0be923b1716115d742E35Fa359d415598c50510F | Extension delegate contract |
  |  4  | Configurator                | 0xb21b06D71c75973babdE35b49fFDAc3F82Ad3775 | Market configurator         |
  |  5  | Configurator Implementation | 0x8495AF03fb797E2965bCB42Cb0693e1c15614798 | Configurator implementation |
  |  6  | Comet Admin                 | 0xD10b40fF1D92e2267D099Da3509253D9Da4D715e | Admin contract              |
  |  7  | Comet Factory               | 0x7dE363b6Bf0a892B94a1Cd0C9DF76826bFC14228 | Factory contract            |
  |  8  | Rewards                     | 0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae | Rewards contract            |
  |  9  | Bulker                      | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Bulker contract             |
  |  10 | Governor                    | 0x42480C37B249e33aABaf4c22B20235656bd38068 | Governance contract         |
  |  11 | Timelock                    | 0x3fB4d38ea7EC20D91917c09591490Eeda38Cf88A | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |          523211567 |          523211567 | 2025-06-11 |
  |  3  | Supply Rate Slope High |        38051750380 |        38051750380 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |          459791983 |          459791983 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |        47564687975 |        47564687975 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped eETH                    | weETH  | 0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe |       18 | 0xd3cf278F135D9831D2bF28F6672a4575906CA724 | 90.0% | 93.0% |  4.00% |       10.00x |
  |  2  | Rocket Pool ETH                 | rETH   | 0xEC70Dcb4A1EFa46b8F2D97C310C9c4790ba5ffA8 |       18 | 0x970FfD8E335B8fa4cd5c869c7caC3a90671d5Dc3 | 90.0% | 93.0% |  3.00% |       10.00x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH | 0x5979D7b546E38E414F7E9822514be443A4800529 |       18 | 0x6C987dDE50dB1dcDd32Cd4175778C2a291978E2a | 88.0% | 93.0% |  3.00% |        8.33x |
  |  4  | Wrapped BTC                     | WBTC   | 0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f |        8 | 0xFa454dE61b317b6535A0C462267208E8FdB89f45 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  5  | KelpDao Restaked ETH            | rsETH  | 0x4186BFC76E2E237523CBC30FD220FE055156b41F |       18 | 0x3870FAc3De911c12A57E5a2532D15aD8Ca275A60 | 88.0% | 91.0% |  4.00% |        8.33x |
  |  6  | USD₮0                           | USD₮0  | 0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9 |        6 | 0x84E93EC6170ED630f5ebD89A1AAE72d4F63f2713 | 80.0% | 85.0% |  5.00% |        5.00x |
  |  7  | USD Coin                        | USDC   | 0xaf88d065e77c8cC2239327C5EDb3A432268e5831 |        6 | 0x443EA0340cb75a160F31A440722dec7b5bc3C2E9 | 80.0% | 85.0% |  5.00% |        5.00x |
  |  8  | Renzo Restaked ETH              | ezETH  | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0x72e9B6F907365d76C6192aD49C0C5ba356b7Fa48 | 88.0% | 91.0% |  6.00% |        8.33x |

</details>

---

## 🌐 BASE

<details>
<summary><strong>base/cAEROv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x784efeB622244d2348d4F2522f8860B96fbEcE89 | Main market contract        |
  |  2  | Comet Implementation        | 0xF8E6A74d545812CFf2526e856ce59163cf1043f1 | Implementation contract     |
  |  3  | Comet Extension             | 0xDd18688Bb75Af704f3Fb1183e459C4d4D41132D9 | Extension delegate contract |
  |  4  | Configurator                | 0x45939657d1CA34A8FA39A924B71D28Fe8431e581 | Market configurator         |
  |  5  | Configurator Implementation | 0x83E0F742cAcBE66349E3701B171eE2487a26e738 | Configurator implementation |
  |  6  | Comet Admin                 | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Admin contract              |
  |  7  | Comet Factory               | 0x3D0bb1ccaB520A66e607822fC55BC921738fAFE3 | Factory contract            |
  |  8  | Rewards                     | 0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1 | Rewards contract            |
  |  9  | Bulker                      | 0x78D0677032A35c63D142a48A2037048871212a8C | Bulker contract             |
  |  10 | Governor                    | 0x18281dfC4d00905DA1aaA6731414EABa843c468A | Governance contract         |
  |  11 | Timelock                    | 0xCC3E7c85Bb0EE4f09380e041fee95a0caeDD4a02 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 850000000000000000 | 850000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |         1268391679 |         1268391679 | 2025-06-11 |
  |  3  | Supply Rate Slope High |        87940766108 |        87940766108 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 850000000000000000 | 850000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |         1043252156 |         1043252156 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |       116270294266 |       116270294266 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          697615423 |          697615423 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped Ether                   | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x2c7118c4C88B9841FCF839074c26Ae8f035f2921 | 60.0% | 65.0% | 25.00% |        2.50x |
  |  2  | USD Coin                        | USDC   | 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 |        6 | 0x970FfD8E335B8fa4cd5c869c7caC3a90671d5Dc3 | 65.0% | 70.0% | 20.00% |        2.86x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH | 0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452 |       18 | 0x5404872d8f2e24b230EC9B9eC64E3855F637FB93 | 60.0% | 65.0% | 25.00% |        2.50x |
  |  4  | Coinbase Wrapped BTC            | cbBTC  | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x8df378453Ff9dEFFa513367CDF9b3B53726303e9 | 60.0% | 65.0% | 25.00% |        2.50x |

</details>

<details>
<summary><strong>base/cUSDbCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf | Main market contract        |
  |  2  | Comet Implementation        | 0x564417B682817e1C7806b2A1a4F73e084d742925 | Implementation contract     |
  |  3  | Comet Extension             | 0x0E383794EaaA6Cf7Ffb2C8AD5BEbbBC5CB0F0A7b | Extension delegate contract |
  |  4  | Configurator                | 0x45939657d1CA34A8FA39A924B71D28Fe8431e581 | Market configurator         |
  |  5  | Configurator Implementation | 0x83E0F742cAcBE66349E3701B171eE2487a26e738 | Configurator implementation |
  |  6  | Comet Admin                 | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Admin contract              |
  |  7  | Comet Factory               | 0x3D0bb1ccaB520A66e607822fC55BC921738fAFE3 | Factory contract            |
  |  8  | Rewards                     | 0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1 | Rewards contract            |
  |  9  | Bulker                      | 0x78D0677032A35c63D142a48A2037048871212a8C | Bulker contract             |
  |  10 | Governor                    | 0x18281dfC4d00905DA1aaA6731414EABa843c468A | Governance contract         |
  |  11 | Timelock                    | 0xCC3E7c85Bb0EE4f09380e041fee95a0caeDD4a02 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 850000000000000000 | 850000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |          634195839 |          634195839 | 2025-06-11 |
  |  3  | Supply Rate Slope High |        28116026128 |        28116026128 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 850000000000000000 | 850000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |         1119165398 |         1119165398 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |       109927289446 |       109927289446 | 2025-06-11 |
  |  8  | Borrow Rate Base       |         1585489599 |         1585489599 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name                        | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :-------------------------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Coinbase Wrapped Staked ETH | cbETH  | 0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22 |       18 | 0x4687670f5f01716fAA382E2356C103BaD776752C | 45.0% | 60.0% | 20.00% |        1.82x |
  |  2  | Wrapped Ether               | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70 | 45.0% | 64.0% | 15.00% |        1.82x |

</details>

<details>
<summary><strong>base/cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xb125E6687d4313864e53df431d5425969c15Eb2F | Main market contract        |
  |  2  | Comet Implementation        | 0x2b00A0212338940fAd55EaDE9270Ea4bc44d5Cd3 | Implementation contract     |
  |  3  | Comet Extension             | 0x220Da2686dC870aC0A97498A1845e610d2f13431 | Extension delegate contract |
  |  4  | Configurator                | 0x45939657d1CA34A8FA39A924B71D28Fe8431e581 | Market configurator         |
  |  5  | Configurator Implementation | 0x83E0F742cAcBE66349E3701B171eE2487a26e738 | Configurator implementation |
  |  6  | Comet Admin                 | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Admin contract              |
  |  7  | Comet Factory               | 0x3D0bb1ccaB520A66e607822fC55BC921738fAFE3 | Factory contract            |
  |  8  | Rewards                     | 0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1 | Rewards contract            |
  |  9  | Bulker                      | 0x78D0677032A35c63D142a48A2037048871212a8C | Bulker contract             |
  |  10 | Governor                    | 0x18281dfC4d00905DA1aaA6731414EABa843c468A | Governance contract         |
  |  11 | Timelock                    | 0xCC3E7c85Bb0EE4f09380e041fee95a0caeDD4a02 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-06-11 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Coinbase Wrapped Staked ETH     | cbETH  | 0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22 |       18 | 0x4687670f5f01716fAA382E2356C103BaD776752C | 80.0% | 85.0% | 10.00% |        5.00x |
  |  2  | Wrapped Ether                   | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70 | 85.0% | 90.0% |  5.00% |        6.67x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH | 0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452 |       18 | 0x4b5DeE60531a72C1264319Ec6A22678a4D0C8118 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Coinbase Wrapped BTC            | cbBTC  | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x8D38A3d6B3c3B7d96D6536DA7Eef94A9d7dbC991 | 80.0% | 85.0% |  5.00% |        5.00x |

</details>

<details>
<summary><strong>base/cUSDSv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x2c776041CCFe903071AF44aa147368a9c8EEA518 | Main market contract        |
  |  2  | Comet Implementation        | 0x311C0C6B350a3fF00607ec024884EfCC9b8dA5a7 | Implementation contract     |
  |  3  | Comet Extension             | 0xaA390749cb758Af4070E93478Fc743c72c18989c | Extension delegate contract |
  |  4  | Configurator                | 0x45939657d1CA34A8FA39A924B71D28Fe8431e581 | Market configurator         |
  |  5  | Configurator Implementation | 0x83E0F742cAcBE66349E3701B171eE2487a26e738 | Configurator implementation |
  |  6  | Comet Admin                 | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Admin contract              |
  |  7  | Comet Factory               | 0x3D0bb1ccaB520A66e607822fC55BC921738fAFE3 | Factory contract            |
  |  8  | Rewards                     | 0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1 | Rewards contract            |
  |  9  | Bulker                      | 0x78D0677032A35c63D142a48A2037048871212a8C | Bulker contract             |
  |  10 | Governor                    | 0x18281dfC4d00905DA1aaA6731414EABa843c468A | Governance contract         |
  |  11 | Timelock                    | 0xCC3E7c85Bb0EE4f09380e041fee95a0caeDD4a02 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |         1712328767 |         1712328767 | 2025-06-11 |
  |  3  | Supply Rate Slope High |        96207508878 |        96207508878 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |         1585489599 |         1585489599 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |       107813292744 |       107813292744 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name                 | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |    LP | Max Leverage |
  | :-: | :------------------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | ----: | -----------: |
  |  1  | Savings USDS         | sUSDS  | 0x5875eEE11Cf8398102FdAd704C9E96607675467a |       18 | 0x72e9B6F907365d76C6192aD49C0C5ba356b7Fa48 | 93.0% | 95.0% | 4.00% |       14.29x |
  |  2  | Coinbase Wrapped BTC | cbBTC  | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x07DA0E54543a844a80ABE69c8A12F22B3aA59f9D | 80.0% | 85.0% | 5.00% |        5.00x |

</details>

<details>
<summary><strong>base/cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x46e6b214b524310239732D51387075E0e70970bf | Main market contract        |
  |  2  | Comet Implementation        | 0xfd047985E0044387EBc96752D72c97236997d43A | Implementation contract     |
  |  3  | Comet Extension             | 0xbd4CfC08d64a848A9116A92Cd06D2f2bDC0a2505 | Extension delegate contract |
  |  4  | Configurator                | 0x45939657d1CA34A8FA39A924B71D28Fe8431e581 | Market configurator         |
  |  5  | Configurator Implementation | 0x83E0F742cAcBE66349E3701B171eE2487a26e738 | Configurator implementation |
  |  6  | Comet Admin                 | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Admin contract              |
  |  7  | Comet Factory               | 0x3D0bb1ccaB520A66e607822fC55BC921738fAFE3 | Factory contract            |
  |  8  | Rewards                     | 0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1 | Rewards contract            |
  |  9  | Bulker                      | 0x78D0677032A35c63D142a48A2037048871212a8C | Bulker contract             |
  |  10 | Governor                    | 0x18281dfC4d00905DA1aaA6731414EABa843c468A | Governance contract         |
  |  11 | Timelock                    | 0xCC3E7c85Bb0EE4f09380e041fee95a0caeDD4a02 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |          684931506 |          684931506 | 2025-06-11 |
  |  3  | Supply Rate Slope High |        35673515981 |        35673515981 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |          491501775 |          491501775 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |        39954337899 |        39954337899 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name                            | Symbol      | Address                                    | Decimals | Price Feed                                 |    CF |    LF |    LP | Max Leverage |
  | :-: | :------------------------------ | :---------- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | ----: | -----------: |
  |  1  | Coinbase Wrapped Staked ETH     | cbETH       | 0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22 |       18 | 0x59e242D352ae13166B4987aE5c990C232f7f7CD6 | 90.0% | 93.0% | 2.50% |       10.00x |
  |  2  | Renzo Restaked ETH              | ezETH       | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0x72874CfE957bb47795548e5a9fd740D135ba5E45 | 88.0% | 91.0% | 6.00% |        8.33x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH      | 0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452 |       18 | 0x1F71901daf98d70B4BAF40DE080321e5C2676856 | 90.0% | 93.0% | 2.50% |       10.00x |
  |  4  | USD Coin                        | USDC        | 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 |        6 | 0x2F4eAF29dfeeF4654bD091F7112926E108eF4Ed0 | 80.0% | 85.0% | 5.00% |        5.00x |
  |  5  | Wrapped eETH                    | weETH       | 0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A |       18 | 0x841e380e3a98E4EE8912046d69731F4E21eFb1D7 | 90.0% | 93.0% | 4.00% |       10.00x |
  |  6  | rsETHWrapper                    | wrsETH      | 0xEDfa23602D0EC14714057867A78d01e94176BEA0 |       18 | 0xaeB318360f27748Acb200CE616E389A6C9409a07 | 88.0% | 91.0% | 4.00% |        8.33x |
  |  7  | Coinbase Wrapped BTC            | cbBTC       | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x4cfCE7795bF75dC3795369A953d9A9b8C2679AE4 | 80.0% | 85.0% | 5.00% |        5.00x |
  |  8  | Wrapped Super OETH              | wsuperOETHb | 0x7FcD174E80f264448ebeE8c88a7C4476AAF58Ea6 |       18 | 0xAA9527bf3183A96fe6e55831c96dE5cd988d3484 | 88.0% | 90.0% | 5.00% |        8.33x |

</details>

---

## 🌐 LINEA

<details>
<summary><strong>linea/cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x8D38A3d6B3c3B7d96D6536DA7Eef94A9d7dbC991 | Main market contract        |
  |  2  | Comet Implementation        | 0xf1583FcDb87ba23bC5DC5968b54D5A195660a68B | Implementation contract     |
  |  3  | Comet Extension             | 0x841e380e3a98E4EE8912046d69731F4E21eFb1D7 | Extension delegate contract |
  |  4  | Configurator                | 0x970FfD8E335B8fa4cd5c869c7caC3a90671d5Dc3 | Market configurator         |
  |  5  | Configurator Implementation | 0xdB7EdFa090061D9367CbEAF6bE16ECbDE596676C | Configurator implementation |
  |  6  | Comet Admin                 | 0x4b5DeE60531a72C1264319Ec6A22678a4D0C8118 | Admin contract              |
  |  7  | Comet Factory               | 0xaeB318360f27748Acb200CE616E389A6C9409a07 | Factory contract            |
  |  8  | Rewards                     | 0x2c7118c4C88B9841FCF839074c26Ae8f035f2921 | Rewards contract            |
  |  9  | Bulker                      | 0x023ee795361B28cDbB94e302983578486A0A5f1B | Bulker contract             |
  |  10 | Governor                    | 0x1F71901daf98d70B4BAF40DE080321e5C2676856 | Governance contract         |
  |  11 | Timelock                    | 0x4A900f81dEdA753bbBab12453b3775D5f26df6F3 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |         1712328767 |         1712328767 | 2025-06-11 |
  |  3  | Supply Rate Slope High |        96207508878 |        96207508878 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |         1585489599 |         1585489599 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |       107813292744 |       107813292744 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped Ether                   | WETH   | 0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f |       18 | 0x3c6Cd9Cc7c7a4c2Cf5a82734CD249D7D593354dA | 83.0% | 90.0% |  5.00% |        5.88x |
  |  2  | Wrapped liquid staked Ether 2.0 | wstETH | 0xB5beDd42000b71FddE22D3eE8a79Bd49A568fC8F |       18 | 0x72874CfE957bb47795548e5a9fd740D135ba5E45 | 82.0% | 87.0% |  5.00% |        5.56x |
  |  3  | Wrapped BTC                     | WBTC   | 0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4 |        8 | 0x7A99092816C8BD5ec8ba229e3a6E6Da1E628E1F9 | 80.0% | 85.0% | 10.00% |        5.00x |

</details>

---

## 🌐 MANTLE

<details>
<summary><strong>mantle/cUSDev3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x606174f62cd968d8e684c645080fa694c1D7786E | Main market contract        |
  |  2  | Comet Implementation        | 0x8CdA82AAa39a63b26C0E5B606bD32B49567D41a1 | Implementation contract     |
  |  3  | Comet Extension             | 0xf528B4bCAc12dad0bFa114282b219ad706bA7f18 | Extension delegate contract |
  |  4  | Configurator                | 0xb77Cd4cD000957283D8BAf53cD782ECf029cF7DB | Market configurator         |
  |  5  | Configurator Implementation | 0x3c851CbE2740747f5cE4e8894842A313e5A3aee3 | Configurator implementation |
  |  6  | Comet Admin                 | 0xe268B436E75648aa0639e2088fa803feA517a0c7 | Admin contract              |
  |  7  | Comet Factory               | 0x5a1d1C89Da75Bc957BBF9ED61b4B0AdEe0553285 | Factory contract            |
  |  8  | Rewards                     | 0xCd83CbBFCE149d141A5171C3D6a0F0fCCeE225Ab | Rewards contract            |
  |  9  | Bulker                      | 0x67DFCa85CcEEFA2C5B1dB4DEe3BEa716A28B9baa | Bulker contract             |
  |  10 | Governor                    | 0xc91EcA15747E73d6dd7f616C49dAFF37b9F1B604 | Governance contract         |
  |  11 | Timelock                    | 0x16C7B5C1b10489F4B111af11de2Bd607c9728107 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |         1236681887 |         1236681887 | 2025-06-11 |
  |  3  | Supply Rate Slope High |       114155251141 |       114155251141 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |         1055936073 |         1055936073 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |       126839167935 |       126839167935 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name         | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :----------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | mETH         | mETH   | 0xcDA86A272531e8640cD7F1a92c01839911B90bb0 |       18 | 0xfB8fF12f19b21e2Af98Fd422118e2f4B3ef3d1ed | 80.0% | 85.0% | 10.00% |        5.00x |
  |  2  | Ether        | WETH   | 0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111 |       18 | 0x75Adb8E5D093598D6893d1e0F5f4222BD2B510fc | 82.0% | 87.0% |  7.00% |        5.56x |
  |  3  | Fire Bitcoin | FBTC   | 0xC96dE26018A54D51c097160568752c4E3BD6C364 |        8 | 0xdEdD2f82711dbe4afdc2d8d5b7ab849234Db267e | 78.0% | 83.0% | 12.00% |        4.55x |

</details>

---

## 🌐 OPTIMISM

<details>
<summary><strong>optimism/cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x2e44e174f7D53F0212823acC11C01A11d58c5bCB | Main market contract        |
  |  2  | Comet Implementation        | 0x4aB3acec49A99Cac8a4029D3b006B3Fc9375CD45 | Implementation contract     |
  |  3  | Comet Extension             | 0xadF7aD4Dd000Ea75667A3CDf65F3D3b7f1e9F02E | Extension delegate contract |
  |  4  | Configurator                | 0x84E93EC6170ED630f5ebD89A1AAE72d4F63f2713 | Market configurator         |
  |  5  | Configurator Implementation | 0x371DB45c7ee248dAFf4Dc1FFB67A20faa0ecFE02 | Configurator implementation |
  |  6  | Comet Admin                 | 0x24D86Da09C4Dd64e50dB7501b0f695d030f397aF | Admin contract              |
  |  7  | Comet Factory               | 0xd187F938348AA245E2104be8D849ea6d8d23f434 | Factory contract            |
  |  8  | Rewards                     | 0x443EA0340cb75a160F31A440722dec7b5bc3C2E9 | Rewards contract            |
  |  9  | Bulker                      | 0xcb3643CC8294B23171272845473dEc49739d4Ba3 | Bulker contract             |
  |  10 | Governor                    | 0xC3a73A70d1577CD5B02da0bA91C0Afc8fA434DAF | Governance contract         |
  |  11 | Timelock                    | 0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-06-11 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Optimism                        | OP     | 0x4200000000000000000000000000000000000042 |       18 | 0x0D276FC14719f9292D5C1eA2198673d1f4269246 | 65.0% | 70.0% | 20.00% |        2.86x |
  |  2  | Wrapped Ether                   | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x13e3Ee699D1909E989722E753853AE30b17e08c5 | 83.0% | 88.0% |  7.00% |        5.88x |
  |  3  | Wrapped BTC                     | WBTC   | 0x68f180fcCe6836688e9084f035309E29Bf0A2095 |        8 | 0x718A5788b89454aAE3A028AE9c111A29Be6c2a6F | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Wrapped liquid staked Ether 2.0 | wstETH | 0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb |       18 | 0x4f90C34dEF3516Ca5bd0a8276e01516fb09fB2Ab | 80.0% | 85.0% | 10.00% |        5.00x |
  |  5  | Wrapped Mountain Protocol USD   | wUSDM  | 0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812 |       18 | 0x7E86318Cc4bc539043F204B39Ce0ebeD9F0050Dc | 88.0% | 90.0% |  5.00% |        8.33x |

</details>

<details>
<summary><strong>optimism/cUSDTv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x995E394b8B2437aC8Ce61Ee0bC610D617962B214 | Main market contract        |
  |  2  | Comet Implementation        | 0xaBf936d90C27bFe9AFa61a15450A54Fbac622C3C | Implementation contract     |
  |  3  | Comet Extension             | 0xdFb81f0EbFDfdd90143f5deBD1cd016b677d1585 | Extension delegate contract |
  |  4  | Configurator                | 0x84E93EC6170ED630f5ebD89A1AAE72d4F63f2713 | Market configurator         |
  |  5  | Configurator Implementation | 0x371DB45c7ee248dAFf4Dc1FFB67A20faa0ecFE02 | Configurator implementation |
  |  6  | Comet Admin                 | 0x24D86Da09C4Dd64e50dB7501b0f695d030f397aF | Admin contract              |
  |  7  | Comet Factory               | 0xd187F938348AA245E2104be8D849ea6d8d23f434 | Factory contract            |
  |  8  | Rewards                     | 0x443EA0340cb75a160F31A440722dec7b5bc3C2E9 | Rewards contract            |
  |  9  | Bulker                      | 0xcb3643CC8294B23171272845473dEc49739d4Ba3 | Bulker contract             |
  |  10 | Governor                    | 0xC3a73A70d1577CD5B02da0bA91C0Afc8fA434DAF | Governance contract         |
  |  11 | Timelock                    | 0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-06-11 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Optimism                        | OP     | 0x4200000000000000000000000000000000000042 |       18 | 0x0D276FC14719f9292D5C1eA2198673d1f4269246 | 65.0% | 70.0% | 20.00% |        2.86x |
  |  2  | Wrapped Ether                   | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x13e3Ee699D1909E989722E753853AE30b17e08c5 | 83.0% | 88.0% |  7.00% |        5.88x |
  |  3  | Wrapped BTC                     | WBTC   | 0x68f180fcCe6836688e9084f035309E29Bf0A2095 |        8 | 0x718A5788b89454aAE3A028AE9c111A29Be6c2a6F | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Wrapped liquid staked Ether 2.0 | wstETH | 0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb |       18 | 0x6846Fc014a72198Ee287350ddB6b0180586594E5 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  5  | Wrapped Mountain Protocol USD   | wUSDM  | 0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812 |       18 | 0x66228d797eb83ecf3465297751f6b1D4d42b7627 | 88.0% | 90.0% |  5.00% |        8.33x |

</details>

<details>
<summary><strong>optimism/cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xE36A30D249f7761327fd973001A32010b521b6Fd | Main market contract        |
  |  2  | Comet Implementation        | 0x92Ab39B21fEC75558AFb8b39C17D8A10Ce3f38A2 | Implementation contract     |
  |  3  | Comet Extension             | 0xc4aaFC9F0c52FDDa0fed972c55B136bD07552ad0 | Extension delegate contract |
  |  4  | Configurator                | 0x84E93EC6170ED630f5ebD89A1AAE72d4F63f2713 | Market configurator         |
  |  5  | Configurator Implementation | 0x371DB45c7ee248dAFf4Dc1FFB67A20faa0ecFE02 | Configurator implementation |
  |  6  | Comet Admin                 | 0x24D86Da09C4Dd64e50dB7501b0f695d030f397aF | Admin contract              |
  |  7  | Comet Factory               | 0xd187F938348AA245E2104be8D849ea6d8d23f434 | Factory contract            |
  |  8  | Rewards                     | 0x443EA0340cb75a160F31A440722dec7b5bc3C2E9 | Rewards contract            |
  |  9  | Bulker                      | 0xcb3643CC8294B23171272845473dEc49739d4Ba3 | Bulker contract             |
  |  10 | Governor                    | 0xC3a73A70d1577CD5B02da0bA91C0Afc8fA434DAF | Governance contract         |
  |  11 | Timelock                    | 0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |          684931506 |          684931506 | 2025-06-11 |
  |  3  | Supply Rate Slope High |        35673515981 |        35673515981 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |          491501775 |          491501775 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |        39954337899 |        39954337899 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped liquid staked Ether 2.0 | wstETH | 0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb |       18 | 0x295d9F81298Fc44B4F329CBef57E67266091Cc86 | 88.0% | 93.0% |  3.00% |        8.33x |
  |  2  | Rocket Pool ETH                 | rETH   | 0x9Bcef72be871e61ED4fBbc7630889beE758eb81D |       18 | 0x5D409e56D886231aDAf00c8775665AD0f9897b56 | 90.0% | 93.0% |  3.00% |       10.00x |
  |  3  | Wrapped BTC                     | WBTC   | 0x68f180fcCe6836688e9084f035309E29Bf0A2095 |        8 | 0x4ed39CF78ffA4428DE6bcEDB8d0f5Ff84699e13D | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Tether USD                      | USDT   | 0x94b008aA00579c1307B0EF2c499aD98a8ce58e58 |        6 | 0xDdC326838f2B5E5625306C3cf33318666f3Cf002 | 80.0% | 85.0% |  5.00% |        5.00x |
  |  5  | USD Coin                        | USDC   | 0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85 |        6 | 0x403F2083B6E220147f8a8832f0B284B4Ed5777d1 | 80.0% | 85.0% |  5.00% |        5.00x |
  |  6  | Renzo Restaked ETH              | ezETH  | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0x69dD37A0EE3D15776A54e34a7297B059e75C94Ab | 88.0% | 91.0% |  6.00% |        8.33x |
  |  7  | Wrapped eETH                    | weETH  | 0x5A7fACB970D094B6C7FF1df0eA68D99E6e73CBFF |       18 | 0x5A20166Ed55518520B1F68Cab1Cf127473123814 | 90.0% | 93.0% |  4.00% |       10.00x |
  |  8  | rsETHWrapper                    | wrsETH | 0x87eEE96D50Fb761AD85B1c982d28A042169d61b1 |       18 | 0xeE7B99Dc798Eae1957713bBBEde98073098B0E68 | 88.0% | 91.0% |  4.00% |        8.33x |

</details>

---

## 🌐 SCROLL

<details>
<summary><strong>scroll/cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xB2f97c1Bd3bf02f5e74d13f02E3e26F93D77CE44 | Main market contract        |
  |  2  | Comet Implementation        | 0x193E3236d3EdCD76a2D519A4F09B4C50e4edF697 | Implementation contract     |
  |  3  | Comet Extension             | 0x5EC955A4c15B195a4Af9a61f7155F6fe3c1A0656 | Extension delegate contract |
  |  4  | Configurator                | 0xECAB0bEEa3e5DEa0c35d3E69468EAC20098032D7 | Market configurator         |
  |  5  | Configurator Implementation | 0x77831F8997De34ead958DA207e43e4be70771C79 | Configurator implementation |
  |  6  | Comet Admin                 | 0x87A27b91f4130a25E9634d23A5B8E05e342bac50 | Admin contract              |
  |  7  | Comet Factory               | 0x6f7D514bbD4aFf3BcD1140B7344b32f063dEe486 | Factory contract            |
  |  8  | Rewards                     | 0x70167D30964cbFDc315ECAe02441Af747bE0c5Ee | Rewards contract            |
  |  9  | Bulker                      | 0x53C6D04e3EC7031105bAeA05B36cBc3C987C56fA | Bulker contract             |
  |  10 | Governor                    | 0xC6bf5A64896D679Cf89843DbeC6c0f5d3C9b610D | Governance contract         |
  |  11 | Timelock                    | 0xF6013e80E9e6AC211Cc031ad1CE98B3Aa20b73E4 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-06-11 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped Ether                   | WETH   | 0x5300000000000000000000000000000000000004 |       18 | 0x6bF14CB0A831078629D993FDeBcB182b21A8774C | 80.0% | 85.0% | 10.00% |        5.00x |
  |  2  | Wrapped liquid staked Ether 2.0 | wstETH | 0xf610A9dfB7C89644979b4A0f27063E9e7d7Cda32 |       18 | 0x709cef91Dd5d162d7047b678334d1Be41fe92843 | 75.0% | 80.0% | 15.00% |        4.00x |

</details>

---

## 🌐 UNICHAIN

<details>
<summary><strong>unichain/cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x2c7118c4C88B9841FCF839074c26Ae8f035f2921 | Main market contract        |
  |  2  | Comet Implementation        | 0x6bAD2334e987106F40c50c7942d794b4E09EdFC5 | Implementation contract     |
  |  3  | Comet Extension             | 0x8D38A3d6B3c3B7d96D6536DA7Eef94A9d7dbC991 | Extension delegate contract |
  |  4  | Configurator                | 0x8df378453Ff9dEFFa513367CDF9b3B53726303e9 | Market configurator         |
  |  5  | Configurator Implementation | 0x5404872d8f2e24b230EC9B9eC64E3855F637FB93 | Configurator implementation |
  |  6  | Comet Admin                 | 0xaeB318360f27748Acb200CE616E389A6C9409a07 | Admin contract              |
  |  7  | Comet Factory               | 0xdB7EdFa090061D9367CbEAF6bE16ECbDE596676C | Factory contract            |
  |  8  | Rewards                     | 0x6f7D514bbD4aFf3BcD1140B7344b32f063dEe486 | Rewards contract            |
  |  9  | Bulker                      | 0x58EbB8Db8b4FdF2dCbbB16E04c2F5b952963B514 | Bulker contract             |
  |  10 | Governor                    | 0x4b5DeE60531a72C1264319Ec6A22678a4D0C8118 | Governance contract         |
  |  11 | Timelock                    | 0x2F4eAF29dfeeF4654bD091F7112926E108eF4Ed0 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |         1712328767 |         1712328767 | 2025-06-11 |
  |  3  | Supply Rate Slope High |        96207508878 |        96207508878 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |         1585489599 |         1585489599 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |       107813292744 |       107813292744 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name          | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Uniswap       | UNI    | 0x8f187aA05619a017077f5308904739877ce9eA21 |       18 | 0x4A900f81dEdA753bbBab12453b3775D5f26df6F3 | 68.0% | 74.0% | 17.00% |        3.13x |
  |  2  | Wrapped Ether | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x72874CfE957bb47795548e5a9fd740D135ba5E45 | 83.0% | 90.0% |  5.00% |        5.88x |

</details>

<details>
<summary><strong>unichain/cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x6C987dDE50dB1dcDd32Cd4175778C2a291978E2a | Main market contract        |
  |  2  | Comet Implementation        | 0xdC02b1d2182b7Fc5755D491C5bAc7954fbFAF8De | Implementation contract     |
  |  3  | Comet Extension             | 0x443EA0340cb75a160F31A440722dec7b5bc3C2E9 | Extension delegate contract |
  |  4  | Configurator                | 0x8df378453Ff9dEFFa513367CDF9b3B53726303e9 | Market configurator         |
  |  5  | Configurator Implementation | 0x5404872d8f2e24b230EC9B9eC64E3855F637FB93 | Configurator implementation |
  |  6  | Comet Admin                 | 0xaeB318360f27748Acb200CE616E389A6C9409a07 | Admin contract              |
  |  7  | Comet Factory               | 0xdB7EdFa090061D9367CbEAF6bE16ECbDE596676C | Factory contract            |
  |  8  | Rewards                     | 0x6f7D514bbD4aFf3BcD1140B7344b32f063dEe486 | Rewards contract            |
  |  9  | Bulker                      | 0x58EbB8Db8b4FdF2dCbbB16E04c2F5b952963B514 | Bulker contract             |
  |  10 | Governor                    | 0x4b5DeE60531a72C1264319Ec6A22678a4D0C8118 | Governance contract         |
  |  11 | Timelock                    | 0x2F4eAF29dfeeF4654bD091F7112926E108eF4Ed0 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  2  | Supply Rate Slope Low  |          684931506 |          684931506 | 2025-06-11 |
  |  3  | Supply Rate Slope High |        35673515981 |        35673515981 | 2025-06-11 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-06-11 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-06-11 |
  |  6  | Borrow Rate Slope Low  |          491501775 |          491501775 | 2025-06-11 |
  |  7  | Borrow Rate Slope High |        39954337899 |        39954337899 | 2025-06-11 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-06-11 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped liquid staked Ether 2.0 | wstETH | 0xc02fE7317D4eb8753a02c35fe019786854A92001 |       18 | 0x3870FAc3De911c12A57E5a2532D15aD8Ca275A60 | 90.0% | 93.0% |  3.00% |       10.00x |
  |  2  | Wrapped eETH                    | weETH  | 0x7DCC39B4d1C53CB31e1aBc0e358b43987FEF80f7 |       18 | 0x2e44e174f7D53F0212823acC11C01A11d58c5bCB | 90.0% | 93.0% |  4.00% |       10.00x |
  |  3  | Renzo Restaked ETH              | ezETH  | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0x1Ad4CEBa9f8135A557bBe317DB62Aa125C330F26 | 88.0% | 91.0% |  6.00% |        8.33x |
  |  4  | Uniswap                         | UNI    | 0x8f187aA05619a017077f5308904739877ce9eA21 |       18 | 0x84E93EC6170ED630f5ebD89A1AAE72d4F63f2713 | 70.0% | 75.0% | 20.00% |        3.33x |
  |  5  | Wrapped BTC                     | WBTC   | 0x927B51f251480a681271180DA4de28D44EC4AfB8 |        8 | 0xFa454dE61b317b6535A0C462267208E8FdB89f45 | 80.0% | 85.0% | 10.00% |        5.00x |

</details>

---

## 🎁 Rewards Summary

|  #  | Date       | Network  | Market   | Daily Rewards | Yearly Rewards | Lend Daily Rewards | Borrow Daily Rewards | COMP on Reward Contract |
| :-: | :--------- | :------- | :------- | ------------: | -------------: | -----------------: | -------------------: | ----------------------: |
|  1  | 2025-06-11 | arbitrum | cUSDCev3 |        0 COMP |         0 COMP |             0 COMP |               0 COMP |            6377.00 COMP |
|  2  | 2025-06-11 | arbitrum | cUSDCv3  |       35 COMP |     12775 COMP |            20 COMP |              15 COMP |            6377.00 COMP |
|  3  | 2025-06-11 | arbitrum | cUSDTv3  |       30 COMP |     10950 COMP |            15 COMP |              15 COMP |            6377.00 COMP |
|  4  | 2025-06-11 | arbitrum | cWETHv3  |       11 COMP |      4015 COMP |             6 COMP |               5 COMP |            6377.00 COMP |
|  5  | 2025-06-11 | base     | cAEROv3  |       15 COMP |      5475 COMP |             5 COMP |              10 COMP |            8590.41 COMP |
|  6  | 2025-06-11 | base     | cUSDbCv3 |        0 COMP |         0 COMP |             0 COMP |               0 COMP |            8590.41 COMP |
|  7  | 2025-06-11 | base     | cUSDCv3  |       20 COMP |      7300 COMP |            13 COMP |               7 COMP |            8590.41 COMP |
|  8  | 2025-06-11 | base     | cUSDSv3  |       36 COMP |     13140 COMP |            24 COMP |              12 COMP |            8590.41 COMP |
|  9  | 2025-06-11 | base     | cWETHv3  |        6 COMP |      2190 COMP |             3 COMP |               3 COMP |            8590.41 COMP |
|  10 | 2025-06-11 | linea    | cUSDCv3  |        7 COMP |      2555 COMP |             4 COMP |               3 COMP |            4490.71 COMP |
|  11 | 2025-06-11 | mantle   | cUSDev3  |        8 COMP |      2920 COMP |             4 COMP |               4 COMP |            2697.01 COMP |
|  12 | 2025-06-11 | optimism | cUSDCv3  |        6 COMP |      2190 COMP |             2 COMP |               4 COMP |            3149.63 COMP |
|  13 | 2025-06-11 | optimism | cUSDTv3  |       10 COMP |      3650 COMP |             5 COMP |               5 COMP |            3149.63 COMP |
|  14 | 2025-06-11 | optimism | cWETHv3  |        7 COMP |      2555 COMP |             4 COMP |               3 COMP |            3149.63 COMP |
|  15 | 2025-06-11 | scroll   | cUSDCv3  |        0 COMP |         0 COMP |             0 COMP |               0 COMP |               0.00 COMP |
|  16 | 2025-06-11 | unichain | cUSDCv3  |        2 COMP |       730 COMP |             1 COMP |               1 COMP |            3374.52 COMP |
|  17 | 2025-06-11 | unichain | cWETHv3  |       20 COMP |      7300 COMP |            12 COMP |               8 COMP |            3374.52 COMP |
|     | **TOTAL**  |          |          |  **213 COMP** | **77745 COMP** |                    |                      |                         |

---

## 💎 Network COMP Balances

|  #  | Date       | Network  | Current COMP Balance |
| :-: | :--------- | :------- | -------------------: |
|  1  | 2025-06-11 | arbitrum |         6377.00 COMP |
|  2  | 2025-06-11 | base     |         8590.41 COMP |
|  3  | 2025-06-11 | linea    |         4490.71 COMP |
|  4  | 2025-06-11 | mantle   |         2697.01 COMP |
|  5  | 2025-06-11 | optimism |         3149.63 COMP |
|  6  | 2025-06-11 | scroll   |            0.00 COMP |
|  7  | 2025-06-11 | unichain |         3374.52 COMP |
|     | **TOTAL**  |          |    **28679.28 COMP** |

---

*Last updated:* 2025-06-11 17:13:35.855 UTC
