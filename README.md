# 📊 Comet Markets Overview

**Download full JSON:** [output.json](./output.json)

---

## 🌐 ARBITRUM

<details>
<summary><strong>cUSDCev3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xA5EDBDD9646f8dFF606d7448e414884C7d905dCA | Main market contract        |
  |  2  | Comet Implementation        | 0x468DCf84d507963eb76135D6249cab1f530c72C9 | Implementation contract     |
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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1236681887 |         1236681887 | 2025-10-31 |
  |  3  | Supply Rate Slope High |       114155251141 |       114155251141 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |         1055936073 |         1055936073 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       126839167935 |       126839167935 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name          | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Arbitrum      | ARB    | 0x912CE59144191C1204E64559FE8253a0e49E6548 |       18 | 0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6 | 55.0% | 60.0% | 10.00% |        2.22x |
  |  2  | GMX           | GMX    | 0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a |       18 | 0xDB98056FecFff59D032aB628337A4887110df3dB | 40.0% | 45.0% | 15.00% |        1.67x |
  |  3  | Wrapped Ether | WETH   | 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 |       18 | 0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612 | 78.0% | 85.0% |  7.00% |        4.55x |
  |  4  | Wrapped BTC   | WBTC   | 0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f |        8 | 0xd0C7101eACbB49F3deCcCc166d238410D6D46d57 | 70.0% | 77.0% | 10.00% |        3.33x |

</details>

<details>
<summary><strong>cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf | Main market contract        |
  |  2  | Comet Implementation        | 0xDb23cBd70d6c401F32a181627291865F185DC135 | Implementation contract     |
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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-10-31 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Arbitrum                        | ARB    | 0x912CE59144191C1204E64559FE8253a0e49E6548 |       18 | 0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6 | 70.0% | 80.0% | 10.00% |        3.33x |
  |  2  | GMX                             | GMX    | 0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a |       18 | 0xDB98056FecFff59D032aB628337A4887110df3dB | 60.0% | 75.0% | 15.00% |        2.50x |
  |  3  | Wrapped Ether                   | WETH   | 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 |       18 | 0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612 | 83.0% | 88.0% |  7.00% |        5.88x |
  |  4  | Wrapped BTC                     | WBTC   | 0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f |        8 | 0xd0C7101eACbB49F3deCcCc166d238410D6D46d57 | 75.0% | 85.0% | 10.00% |        4.00x |
  |  5  | Wrapped liquid staked Ether 2.0 | wstETH | 0x5979D7b546E38E414F7E9822514be443A4800529 |       18 | 0xe165155c34fE4cBfC55Fc554437907BDb1Af7e3e | 80.0% | 85.0% | 10.00% |        5.00x |
  |  6  | Renzo Restaked ETH              | ezETH  | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0xC49399814452B41dA8a7cd76a159f5515cb3e493 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  7  | Wrapped Mountain Protocol USD   | wUSDM  | 0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812 |       18 | 0x5D173813B4505701e79E654b36A95E6c1FAD4448 |  0.0% | 0.01% |  0.00% |        1.00x |

</details>

<details>
<summary><strong>cUSDTv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07 | Main market contract        |
  |  2  | Comet Implementation        | 0x1477E00e51A81bDb7417de8f8A6279Adc59696Df | Implementation contract     |
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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-10-31 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Arbitrum                        | ARB    | 0x912CE59144191C1204E64559FE8253a0e49E6548 |       18 | 0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6 | 70.0% | 80.0% | 10.00% |        3.33x |
  |  2  | Wrapped Ether                   | WETH   | 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 |       18 | 0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612 | 83.0% | 88.0% |  7.00% |        5.88x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH | 0x5979D7b546E38E414F7E9822514be443A4800529 |       18 | 0xe165155c34fE4cBfC55Fc554437907BDb1Af7e3e | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Wrapped BTC                     | WBTC   | 0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f |        8 | 0xd0C7101eACbB49F3deCcCc166d238410D6D46d57 | 70.0% | 80.0% | 10.00% |        3.33x |
  |  5  | GMX                             | GMX    | 0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a |       18 | 0xDB98056FecFff59D032aB628337A4887110df3dB | 60.0% | 70.0% | 20.00% |        2.50x |
  |  6  | Arbitrum tBTC v2                | tBTC   | 0x6c84a8f1c29108F47a79964b5Fe888D4f4D0dE40 |       18 | 0xE808488e8627F6531bA79a13A9E0271B39abEb1C | 80.0% | 85.0% | 10.00% |        5.00x |

</details>

<details>
<summary><strong>cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x6f7D514bbD4aFf3BcD1140B7344b32f063dEe486 | Main market contract        |
  |  2  | Comet Implementation        | 0x28B0C5fa2A8dF4f3Bf42B990578c3CA13Ab9288C | Implementation contract     |
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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |          523211567 |          523211567 | 2025-10-31 |
  |  3  | Supply Rate Slope High |        38051750380 |        38051750380 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          459791983 |          459791983 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |        47564687975 |        47564687975 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped eETH                    | weETH  | 0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe |       18 | 0xd3cf278F135D9831D2bF28F6672a4575906CA724 | 90.0% | 93.0% |  4.00% |       10.00x |
  |  2  | Rocket Pool ETH                 | rETH   | 0xEC70Dcb4A1EFa46b8F2D97C310C9c4790ba5ffA8 |       18 | 0x970FfD8E335B8fa4cd5c869c7caC3a90671d5Dc3 | 90.0% | 93.0% |  3.00% |       10.00x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH | 0x5979D7b546E38E414F7E9822514be443A4800529 |       18 | 0x6C987dDE50dB1dcDd32Cd4175778C2a291978E2a | 88.0% | 93.0% |  3.00% |        8.33x |
  |  4  | Wrapped BTC                     | WBTC   | 0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f |        8 | 0xFa454dE61b317b6535A0C462267208E8FdB89f45 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  5  | KelpDao Restaked ETH            | rsETH  | 0x4186BFC76E2E237523CBC30FD220FE055156b41F |       18 | 0x3870FAc3De911c12A57E5a2532D15aD8Ca275A60 | 90.0% | 93.0% |  4.00% |       10.00x |
  |  6  | USD₮0                           | USD₮0  | 0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9 |        6 | 0x84E93EC6170ED630f5ebD89A1AAE72d4F63f2713 | 80.0% | 85.0% |  5.00% |        5.00x |
  |  7  | USD Coin                        | USDC   | 0xaf88d065e77c8cC2239327C5EDb3A432268e5831 |        6 | 0x443EA0340cb75a160F31A440722dec7b5bc3C2E9 | 80.0% | 85.0% |  5.00% |        5.00x |
  |  8  | Renzo Restaked ETH              | ezETH  | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0x72e9B6F907365d76C6192aD49C0C5ba356b7Fa48 | 90.0% | 93.0% |  4.00% |       10.00x |

</details>

---

## 🌐 BASE

<details>
<summary><strong>cAEROv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x784efeB622244d2348d4F2522f8860B96fbEcE89 | Main market contract        |
  |  2  | Comet Implementation        | 0x52b9aF50a09f1B65f5E714D5c2E42dFCdAD6e2FD | Implementation contract     |
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
  |  1  | Supply Kink            | 850000000000000000 | 850000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1268391679 |         1268391679 | 2025-10-31 |
  |  3  | Supply Rate Slope High |        87940766108 |        87940766108 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 850000000000000000 | 850000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |         1043252156 |         1043252156 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       116270294266 |       116270294266 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          697615423 |          697615423 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped Ether                   | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x2c7118c4C88B9841FCF839074c26Ae8f035f2921 | 60.0% | 65.0% | 25.00% |        2.50x |
  |  2  | USD Coin                        | USDC   | 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 |        6 | 0x970FfD8E335B8fa4cd5c869c7caC3a90671d5Dc3 | 65.0% | 70.0% | 20.00% |        2.86x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH | 0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452 |       18 | 0x5404872d8f2e24b230EC9B9eC64E3855F637FB93 | 60.0% | 65.0% | 25.00% |        2.50x |
  |  4  | Coinbase Wrapped BTC            | cbBTC  | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x8df378453Ff9dEFFa513367CDF9b3B53726303e9 | 60.0% | 65.0% | 25.00% |        2.50x |

</details>

<details>
<summary><strong>cUSDbCv3</strong></summary>

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
  |  1  | Supply Kink            | 850000000000000000 | 850000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |          634195839 |          634195839 | 2025-10-31 |
  |  3  | Supply Rate Slope High |        28116026128 |        28116026128 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 850000000000000000 | 850000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |         1119165398 |         1119165398 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       109927289446 |       109927289446 | 2025-10-31 |
  |  8  | Borrow Rate Base       |         1585489599 |         1585489599 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                        | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :-------------------------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Coinbase Wrapped Staked ETH | cbETH  | 0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22 |       18 | 0x4687670f5f01716fAA382E2356C103BaD776752C | 45.0% | 60.0% | 20.00% |        1.82x |
  |  2  | Wrapped Ether               | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70 | 45.0% | 64.0% | 15.00% |        1.82x |

</details>

<details>
<summary><strong>cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xb125E6687d4313864e53df431d5425969c15Eb2F | Main market contract        |
  |  2  | Comet Implementation        | 0xd84933745943Df8EDC45Ff0f0ef7BD55324A22b6 | Implementation contract     |
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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-10-31 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Coinbase Wrapped Staked ETH     | cbETH  | 0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22 |       18 | 0x4687670f5f01716fAA382E2356C103BaD776752C | 80.0% | 85.0% | 10.00% |        5.00x |
  |  2  | Wrapped Ether                   | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70 | 85.0% | 90.0% |  5.00% |        6.67x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH | 0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452 |       18 | 0x4b5DeE60531a72C1264319Ec6A22678a4D0C8118 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Coinbase Wrapped BTC            | cbBTC  | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x8D38A3d6B3c3B7d96D6536DA7Eef94A9d7dbC991 | 80.0% | 85.0% |  5.00% |        5.00x |
  |  5  | Base tBTC v2                    | tBTC   | 0x236aa50979D5f3De3Bd1Eeb40E81137F22ab794b |       18 | 0x6D75BFB5A5885f841b132198C9f0bE8c872057BF | 80.0% | 85.0% | 10.00% |        5.00x |

</details>

<details>
<summary><strong>cUSDSv3</strong></summary>

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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1712328767 |         1712328767 | 2025-10-31 |
  |  3  | Supply Rate Slope High |        96207508878 |        96207508878 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |         1585489599 |         1585489599 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       107813292744 |       107813292744 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                 | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |    LP | Max Leverage |
  | :-: | :------------------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | ----: | -----------: |
  |  1  | Savings USDS         | sUSDS  | 0x5875eEE11Cf8398102FdAd704C9E96607675467a |       18 | 0x72e9B6F907365d76C6192aD49C0C5ba356b7Fa48 | 93.0% | 95.0% | 4.00% |       14.29x |
  |  2  | Coinbase Wrapped BTC | cbBTC  | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x07DA0E54543a844a80ABE69c8A12F22B3aA59f9D | 80.0% | 85.0% | 5.00% |        5.00x |

</details>

<details>
<summary><strong>cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x46e6b214b524310239732D51387075E0e70970bf | Main market contract        |
  |  2  | Comet Implementation        | 0x3dC67C8FF5E7DDE907C76b625F5bbd5a404479D5 | Implementation contract     |
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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |          684931506 |          684931506 | 2025-10-31 |
  |  3  | Supply Rate Slope High |        35673515981 |        35673515981 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          491501775 |          491501775 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |        39954337899 |        39954337899 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol      | Address                                    | Decimals | Price Feed                                 |    CF |    LF |    LP | Max Leverage |
  | :-: | :------------------------------ | :---------- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | ----: | -----------: |
  |  1  | Coinbase Wrapped Staked ETH     | cbETH       | 0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22 |       18 | 0x59e242D352ae13166B4987aE5c990C232f7f7CD6 | 90.0% | 93.0% | 2.50% |       10.00x |
  |  2  | Renzo Restaked ETH              | ezETH       | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0x72874CfE957bb47795548e5a9fd740D135ba5E45 | 90.0% | 93.0% | 4.00% |       10.00x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH      | 0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452 |       18 | 0x1F71901daf98d70B4BAF40DE080321e5C2676856 | 90.0% | 93.0% | 2.50% |       10.00x |
  |  4  | USD Coin                        | USDC        | 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 |        6 | 0x2F4eAF29dfeeF4654bD091F7112926E108eF4Ed0 | 80.0% | 85.0% | 5.00% |        5.00x |
  |  5  | Wrapped eETH                    | weETH       | 0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A |       18 | 0x841e380e3a98E4EE8912046d69731F4E21eFb1D7 | 90.0% | 93.0% | 4.00% |       10.00x |
  |  6  | rsETHWrapper                    | wrsETH      | 0xEDfa23602D0EC14714057867A78d01e94176BEA0 |       18 | 0xaeB318360f27748Acb200CE616E389A6C9409a07 | 90.0% | 93.0% | 4.00% |       10.00x |
  |  7  | Coinbase Wrapped BTC            | cbBTC       | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x4cfCE7795bF75dC3795369A953d9A9b8C2679AE4 | 80.0% | 85.0% | 5.00% |        5.00x |
  |  8  | Wrapped Super OETH              | wsuperOETHb | 0x7FcD174E80f264448ebeE8c88a7C4476AAF58Ea6 |       18 | 0xAA9527bf3183A96fe6e55831c96dE5cd988d3484 | 88.0% | 90.0% | 5.00% |        8.33x |

</details>

---

## 🌐 LINEA

<details>
<summary><strong>cUSDCv3</strong></summary>

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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1712328767 |         1712328767 | 2025-10-31 |
  |  3  | Supply Rate Slope High |        96207508878 |        96207508878 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |         1585489599 |         1585489599 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       107813292744 |       107813292744 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped Ether                   | WETH   | 0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f |       18 | 0x3c6Cd9Cc7c7a4c2Cf5a82734CD249D7D593354dA | 83.0% | 90.0% |  5.00% |        5.88x |
  |  2  | Wrapped liquid staked Ether 2.0 | wstETH | 0xB5beDd42000b71FddE22D3eE8a79Bd49A568fC8F |       18 | 0x72874CfE957bb47795548e5a9fd740D135ba5E45 | 82.0% | 87.0% |  5.00% |        5.56x |
  |  3  | Wrapped BTC                     | WBTC   | 0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4 |        8 | 0x7A99092816C8BD5ec8ba229e3a6E6Da1E628E1F9 | 80.0% | 85.0% | 10.00% |        5.00x |

</details>

<details>
<summary><strong>cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x60F2058379716A64a7A5d29219397e79bC552194 | Main market contract        |
  |  2  | Comet Implementation        | 0xD4c08aB0020b1003c50F07ED2038e2B4F807610e | Implementation contract     |
  |  3  | Comet Extension             | 0xc8E4c3F58d5FC4409522503927Ecea057EbbA1fc | Extension delegate contract |
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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |          684931506 |          684931506 | 2025-10-31 |
  |  3  | Supply Rate Slope High |        35673515981 |        35673515981 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          491501775 |          491501775 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |        39954337899 |        39954337899 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Renzo Restaked ETH              | ezETH  | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0x311930889C61E141E15a61D11BE974D749390E7A | 90.0% | 93.0% |  6.00% |       10.00x |
  |  2  | Wrapped liquid staked Ether 2.0 | wstETH | 0xB5beDd42000b71FddE22D3eE8a79Bd49A568fC8F |       18 | 0x2B47eCD3FFBAA6396AcE8d3D414873498BbC2b62 | 90.0% | 93.0% |  3.00% |       10.00x |
  |  3  | Wrapped BTC                     | WBTC   | 0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4 |        8 | 0xA2699232B341881B1Ed85d91592b7c259E029aCf | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Wrapped eETH                    | weETH  | 0x1Bf74C010E6320bab11e2e5A532b5AC15e0b8aA6 |       18 | 0xA4F2e977CAb3177D61E2e7eAEcd257Bf09F2f915 | 90.0% | 93.0% |  4.00% |       10.00x |
  |  5  | rsETHWrapper                    | wrsETH | 0xD2671165570f41BBB3B0097893300b6EB6101E6C |       18 | 0x8C74B2811D2F1aD65517ADB5C65773c1E520ed2f | 90.0% | 93.0% |  4.00% |       10.00x |

</details>

---

## 🌐 MAINNET

<details>
<summary><strong>cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xc3d688B66703497DAA19211EEdff47f25384cdc3 | Main market contract        |
  |  2  | Comet Implementation        | 0xC5fb5c72eda5C609db7EA23a50FFD47c046032B7 | Implementation contract     |
  |  3  | Comet Extension             | 0xA70a0227028aD005F4Fc9376a82cd1462e3AAedC | Extension delegate contract |
  |  4  | Configurator                | 0x316f9708bB98af7dA9c68C1C3b5e79039cD336E3 | Market configurator         |
  |  5  | Configurator Implementation | 0xcFC1fA6b7ca982176529899D99af6473aD80DF4F | Configurator implementation |
  |  6  | Comet Admin                 | 0x1EC63B5883C3481134FD50D5DAebc83Ecd2E8779 | Admin contract              |
  |  7  | Comet Factory               | 0x1fA408992e74A42D1787E28b880C451452E8C958 | Factory contract            |
  |  8  | Rewards                     | 0x1B0e765F6224C21223AeA2af16c1C46E38885a40 | Rewards contract            |
  |  9  | Bulker                      | 0xa397a8C2086C554B531c02E29f3291c9704B00c7 | Bulker contract             |
  |  10 | Governor                    | 0x309a862bbC1A00e45506cB8A802D1ff10004c8C0 | Governance contract         |
  |  11 | Timelock                    | 0x6d903f6003cca6255D85CcA4D3B5E5146dC33925 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-10-31 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Compound                        | COMP   | 0xc00e94Cb662C3520282E6f5717214004A7f26888 |       18 | 0x69B50fF403E995d9c4441a303438D9049dAC8cCD | 50.0% | 70.0% | 25.00% |        2.00x |
  |  2  | Wrapped BTC                     | WBTC   | 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599 |        8 | 0xc8E4c3F58d5FC4409522503927Ecea057EbbA1fc | 80.0% | 85.0% | 10.00% |        5.00x |
  |  3  | Wrapped Ether                   | WETH   | 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 |       18 | 0xc0053f3FBcCD593758258334Dfce24C2A9A673aD | 82.5% | 88.0% |  7.00% |        5.71x |
  |  4  | Uniswap                         | UNI    | 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 |       18 | 0x553303d460EE0afB37EdFf9bE42922D8FF63220e | 68.0% | 74.0% | 17.00% |        3.13x |
  |  5  | ChainLink Token                 | LINK   | 0x514910771AF9Ca656af840dff83E8264EcF986CA |       18 | 0x83B34662f65532e611A87EBed38063Dec889D5A7 | 73.0% | 79.0% | 17.00% |        3.70x |
  |  6  | Wrapped liquid staked Ether 2.0 | wstETH | 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0 |       18 | 0xA2699232B341881B1Ed85d91592b7c259E029aCf | 80.0% | 85.0% | 10.00% |        5.00x |
  |  7  | Coinbase Wrapped BTC            | cbBTC  | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x0A4F4F9E84Fc4F674F0D209f94d41FaFE5aF887D | 80.0% | 85.0% |  5.00% |        5.00x |
  |  8  | tBTC v2                         | tBTC   | 0x18084fbA666a33d37592fA2633fD49a74DD93a88 |       18 | 0xAA9527bf3183A96fe6e55831c96dE5cd988d3484 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  9  | Wrapped eETH                    | weETH  | 0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee |       18 | 0x4F12633d511dC3049DE1ea923b7047fBeD0070D2 | 75.0% | 80.0% | 10.00% |        4.00x |
  |  10 | deUSD                           | deUSD  | 0x15700B564Ca08D9439C58cA5053166E8317aa138 |       18 | 0x471a6299C027Bd81ed4D66069dc510Bd0569f4F8 | 88.0% | 90.0% |  4.00% |        8.33x |
  |  11 | Staked deUSD                    | sdeUSD | 0x5C5b196aBE0d54485975D1Ec29617D42D9198326 |       18 | 0xE4829421ae79f2F44716cCbbb40751cd6Be3d483 | 88.0% | 90.0% |  4.00% |        8.33x |
  |  12 | rsETH                           | rsETH  | 0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7 |       18 | 0xD6a48f6f687A5FeF8A69834C49514B747012cf1c | 85.0% | 90.0% |  5.00% |        6.67x |

</details>

<details>
<summary><strong>cUSDSv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x5D409e56D886231aDAf00c8775665AD0f9897b56 | Main market contract        |
  |  2  | Comet Implementation        | 0x7DBa40140E9B633B2FE3Db35A769773a12968d4c | Implementation contract     |
  |  3  | Comet Extension             | 0xd4eC911B8FD79139736950235a93d3ea9c3f68ed | Extension delegate contract |
  |  4  | Configurator                | 0x316f9708bB98af7dA9c68C1C3b5e79039cD336E3 | Market configurator         |
  |  5  | Configurator Implementation | 0xcFC1fA6b7ca982176529899D99af6473aD80DF4F | Configurator implementation |
  |  6  | Comet Admin                 | 0x1EC63B5883C3481134FD50D5DAebc83Ecd2E8779 | Admin contract              |
  |  7  | Comet Factory               | 0x1fA408992e74A42D1787E28b880C451452E8C958 | Factory contract            |
  |  8  | Rewards                     | 0x1B0e765F6224C21223AeA2af16c1C46E38885a40 | Rewards contract            |
  |  9  | Bulker                      | 0xa397a8C2086C554B531c02E29f3291c9704B00c7 | Bulker contract             |
  |  10 | Governor                    | 0x309a862bbC1A00e45506cB8A802D1ff10004c8C0 | Governance contract         |
  |  11 | Timelock                    | 0x6d903f6003cca6255D85CcA4D3B5E5146dC33925 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-10-31 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped Ether                   | WETH   | 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 |       18 | 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419 | 83.0% | 88.0% |  7.00% |        5.88x |
  |  2  | USDe                            | USDe   | 0x4c9EDD5852cd905f086C759E8383e09bff1E68B3 |       18 | 0xa569d910839Ae8865Da8F8e70FfFb0cBA869F961 | 70.0% | 75.0% | 15.00% |        3.33x |
  |  3  | Coinbase Wrapped BTC            | cbBTC  | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x2665701293fCbEB223D11A08D826563EDcCE423A | 80.0% | 85.0% |  5.00% |        5.00x |
  |  4  | tBTC v2                         | tBTC   | 0x18084fbA666a33d37592fA2633fD49a74DD93a88 |       18 | 0x8350b7De6a6a2C1368E7D4Bd968190e13E354297 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  5  | Wrapped liquid staked Ether 2.0 | wstETH | 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0 |       18 | 0x7dE363b6Bf0a892B94a1Cd0C9DF76826bFC14228 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  6  | Savings USDS                    | sUSDS  | 0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD |       18 | 0x31B844DBc7CDBAa27D22fD6d54986836D023bF3F | 90.0% | 94.0% |  4.00% |       10.00x |
  |  7  | Wrapped eETH                    | weETH  | 0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee |       18 | 0x1A2058b0Dd6A97BEB2796FCd6C3024Fb47CF01Cd | 70.0% | 75.0% | 10.00% |        3.33x |
  |  8  | SKY Governance Token            | SKY    | 0x56072C95FAA701256059aa122697B133aDEd9279 |       18 | 0xEF819FE60af67698567f03095A029AE1a1935007 | 73.0% | 79.0% | 15.00% |        3.70x |
  |  9  | deUSD                           | deUSD  | 0x15700B564Ca08D9439C58cA5053166E8317aa138 |       18 | 0x471a6299C027Bd81ed4D66069dc510Bd0569f4F8 | 88.0% | 90.0% |  6.00% |        8.33x |
  |  10 | Staked deUSD                    | sdeUSD | 0x5C5b196aBE0d54485975D1Ec29617D42D9198326 |       18 | 0xE4829421ae79f2F44716cCbbb40751cd6Be3d483 | 88.0% | 90.0% |  6.00% |        8.33x |

</details>

<details>
<summary><strong>cUSDTv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x3Afdc9BCA9213A35503b077a6072F3D0d5AB0840 | Main market contract        |
  |  2  | Comet Implementation        | 0xD306AA45457F9bA71aF8c73d25f730a8e2e520dC | Implementation contract     |
  |  3  | Comet Extension             | 0xe3458a0BdBd5A413d3731595C5Eb7C4CD6a14DD1 | Extension delegate contract |
  |  4  | Configurator                | 0x316f9708bB98af7dA9c68C1C3b5e79039cD336E3 | Market configurator         |
  |  5  | Configurator Implementation | 0xcFC1fA6b7ca982176529899D99af6473aD80DF4F | Configurator implementation |
  |  6  | Comet Admin                 | 0x1EC63B5883C3481134FD50D5DAebc83Ecd2E8779 | Admin contract              |
  |  7  | Comet Factory               | 0x1fA408992e74A42D1787E28b880C451452E8C958 | Factory contract            |
  |  8  | Rewards                     | 0x1B0e765F6224C21223AeA2af16c1C46E38885a40 | Rewards contract            |
  |  9  | Bulker                      | 0xa397a8C2086C554B531c02E29f3291c9704B00c7 | Bulker contract             |
  |  10 | Governor                    | 0x309a862bbC1A00e45506cB8A802D1ff10004c8C0 | Governance contract         |
  |  11 | Timelock                    | 0x6d903f6003cca6255D85CcA4D3B5E5146dC33925 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-10-31 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Compound                        | COMP   | 0xc00e94Cb662C3520282E6f5717214004A7f26888 |       18 | 0x69B50fF403E995d9c4441a303438D9049dAC8cCD | 50.0% | 70.0% | 25.00% |        2.00x |
  |  2  | Wrapped Ether                   | WETH   | 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 |       18 | 0xc0053f3FBcCD593758258334Dfce24C2A9A673aD | 83.0% | 88.0% |  7.00% |        5.88x |
  |  3  | Wrapped BTC                     | WBTC   | 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599 |        8 | 0xc8E4c3F58d5FC4409522503927Ecea057EbbA1fc | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Uniswap                         | UNI    | 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 |       18 | 0x553303d460EE0afB37EdFf9bE42922D8FF63220e | 68.0% | 74.0% | 17.00% |        3.13x |
  |  5  | ChainLink Token                 | LINK   | 0x514910771AF9Ca656af840dff83E8264EcF986CA |       18 | 0x83B34662f65532e611A87EBed38063Dec889D5A7 | 73.0% | 79.0% | 17.00% |        3.70x |
  |  6  | Wrapped liquid staked Ether 2.0 | wstETH | 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0 |       18 | 0xA2699232B341881B1Ed85d91592b7c259E029aCf | 80.0% | 85.0% | 10.00% |        5.00x |
  |  7  | Coinbase Wrapped BTC            | cbBTC  | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x2D09142Eae60Fd8BD454a276E95AeBdFFD05722d | 80.0% | 85.0% |  5.00% |        5.00x |
  |  8  | tBTC v2                         | tBTC   | 0x18084fbA666a33d37592fA2633fD49a74DD93a88 |       18 | 0x7b03a016dBC36dB8e05C480192faDcdB0a06bC37 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  9  | Wrapped Mountain Protocol USD   | wUSDM  | 0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812 |       18 | 0x7BaDaB7109afBbF48eCd8d6498CaAcd2630b45B9 |  0.0% | 0.01% |  0.00% |        1.00x |
  |  10 | Staked FRAX                     | sFRAX  | 0xA663B02CF0a4b149d2aD41910CB81e23e1c41c32 |       18 | 0x8C74B2811D2F1aD65517ADB5C65773c1E520ed2f | 88.0% | 90.0% |  5.00% |        8.33x |
  |  11 | mETH                            | mETH   | 0xd5F7838F5C461fefF7FE49ea5ebaF7728bB0ADfa |       18 | 0x60F2058379716A64a7A5d29219397e79bC552194 | 80.0% | 85.0% |  5.00% |        5.00x |
  |  12 | Wrapped eETH                    | weETH  | 0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee |       18 | 0x4F12633d511dC3049DE1ea923b7047fBeD0070D2 | 75.0% | 80.0% | 10.00% |        4.00x |
  |  13 | Staked deUSD                    | sdeUSD | 0x5C5b196aBE0d54485975D1Ec29617D42D9198326 |       18 | 0xE4829421ae79f2F44716cCbbb40751cd6Be3d483 | 88.0% | 90.0% |  4.00% |        8.33x |
  |  14 | deUSD                           | deUSD  | 0x15700B564Ca08D9439C58cA5053166E8317aa138 |       18 | 0x471a6299C027Bd81ed4D66069dc510Bd0569f4F8 | 88.0% | 90.0% |  4.00% |        8.33x |

</details>

<details>
<summary><strong>cWBTCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xe85Dc543813B8c2CFEaAc371517b925a166a9293 | Main market contract        |
  |  2  | Comet Implementation        | 0xb8430B935998b5AE5F4a0b8B8Ad01eF454EAc16C | Implementation contract     |
  |  3  | Comet Extension             | 0x4f4D5A808E2448cB12df7aC12EFb12888FD9BDd5 | Extension delegate contract |
  |  4  | Configurator                | 0x316f9708bB98af7dA9c68C1C3b5e79039cD336E3 | Market configurator         |
  |  5  | Configurator Implementation | 0xcFC1fA6b7ca982176529899D99af6473aD80DF4F | Configurator implementation |
  |  6  | Comet Admin                 | 0x1EC63B5883C3481134FD50D5DAebc83Ecd2E8779 | Admin contract              |
  |  7  | Comet Factory               | 0x1fA408992e74A42D1787E28b880C451452E8C958 | Factory contract            |
  |  8  | Rewards                     | 0x1B0e765F6224C21223AeA2af16c1C46E38885a40 | Rewards contract            |
  |  9  | Bulker                      | 0xa397a8C2086C554B531c02E29f3291c9704B00c7 | Bulker contract             |
  |  10 | Governor                    | 0x309a862bbC1A00e45506cB8A802D1ff10004c8C0 | Governance contract         |
  |  11 | Timelock                    | 0x6d903f6003cca6255D85CcA4D3B5E5146dC33925 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 850000000000000000 | 850000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |          380517503 |          380517503 | 2025-10-31 |
  |  3  | Supply Rate Slope High |        31709791983 |        31709791983 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 850000000000000000 | 850000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          443937087 |          443937087 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |        36466260781 |        36466260781 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                   | Symbol  | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :--------------------- | :------ | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Lombard Staked Bitcoin | LBTC    | 0x8236a87084f8B84306f72007F36F2618A5634494 |        8 | 0x5c29868C58b6e15e2b962943278969Ab6a7D3212 | 73.0% | 75.0% |  5.00% |        3.70x |
  |  2  | pumpBTC                | pumpBTC | 0xF469fBD2abcd6B9de8E169d128226C0Fc90a012e |        8 | 0x351a133Fd850ea81ed8a782016e308aCBADDec91 | 75.0% | 78.0% | 10.00% |        4.00x |

</details>

<details>
<summary><strong>cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xA17581A9E3356d9A858b789D68B4d866e593aE94 | Main market contract        |
  |  2  | Comet Implementation        | 0x2D0DfE7F9C2B7600EB145747DD3CDCc543356A6d | Implementation contract     |
  |  3  | Comet Extension             | 0x16F3532e6AF45A2C51B6C77b1267cEF34A9cf3B3 | Extension delegate contract |
  |  4  | Configurator                | 0x316f9708bB98af7dA9c68C1C3b5e79039cD336E3 | Market configurator         |
  |  5  | Configurator Implementation | 0xcFC1fA6b7ca982176529899D99af6473aD80DF4F | Configurator implementation |
  |  6  | Comet Admin                 | 0x1EC63B5883C3481134FD50D5DAebc83Ecd2E8779 | Admin contract              |
  |  7  | Comet Factory               | 0xBa8F83ffFC7097CBcD89fe323D31753CfaC33867 | Factory contract            |
  |  8  | Rewards                     | 0x1B0e765F6224C21223AeA2af16c1C46E38885a40 | Rewards contract            |
  |  9  | Bulker                      | 0xa397a8C2086C554B531c02E29f3291c9704B00c7 | Bulker contract             |
  |  10 | Governor                    | 0x309a862bbC1A00e45506cB8A802D1ff10004c8C0 | Governance contract         |
  |  11 | Timelock                    | 0x6d903f6003cca6255D85CcA4D3B5E5146dC33925 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |          684931506 |          684931506 | 2025-10-31 |
  |  3  | Supply Rate Slope High |        35673515981 |        35673515981 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          491501775 |          491501775 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |        39954337899 |        39954337899 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Coinbase Wrapped Staked ETH     | cbETH  | 0xBe9895146f7AF43049ca1c1AE358B0541Ea49704 |       18 | 0x23a982b74a3236A5F2297856d4391B2edBBB5549 | 90.0% | 93.0% |  2.50% |       10.00x |
  |  2  | Wrapped liquid staked Ether 2.0 | wstETH | 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0 |       18 | 0x4F67e4d9BD67eFa28236013288737D39AeF48e79 | 90.0% | 93.0% |  2.50% |       10.00x |
  |  3  | Rocket Pool ETH                 | rETH   | 0xae78736Cd615f374D3085123A210448E74Fc6393 |       18 | 0xA3A7fB5963D1d69B95EEC4957f77678EF073Ba08 | 90.0% | 93.0% |  2.50% |       10.00x |
  |  4  | rsETH                           | rsETH  | 0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7 |       18 | 0xFa454dE61b317b6535A0C462267208E8FdB89f45 | 90.0% | 93.0% |  4.00% |       10.00x |
  |  5  | Wrapped eETH                    | weETH  | 0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee |       18 | 0x1Ad4CEBa9f8135A557bBe317DB62Aa125C330F26 | 90.0% | 93.0% |  4.00% |       10.00x |
  |  6  | Staked ETH                      | osETH  | 0xf1C9acDc66974dFB6dEcB12aA385b9cD01190E38 |       18 | 0x66F5AfDaD14b30816b47b707240D1E8E3344D04d | 80.0% | 85.0% | 10.00% |        5.00x |
  |  7  | Wrapped BTC                     | WBTC   | 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599 |        8 | 0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  8  | Renzo Restaked ETH              | ezETH  | 0xbf5495Efe5DB9ce00f80364C8B423567e58d2110 |       18 | 0xdE43600De5016B50752cc2615332d8cCBED6EC1b | 90.0% | 93.0% |  4.00% |       10.00x |
  |  9  | Coinbase Wrapped BTC            | cbBTC  | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x57A71A9C632b2e6D8b0eB9A157888A3Fc87400D1 | 80.0% | 85.0% |  5.00% |        5.00x |
  |  10 | rswETH                          | rswETH | 0xFAe103DC9cf190eD75350761e95403b7b8aFa6c0 |       18 | 0xDd18688Bb75Af704f3Fb1183e459C4d4D41132D9 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  11 | tBTC v2                         | tBTC   | 0x18084fbA666a33d37592fA2633fD49a74DD93a88 |       18 | 0x1933F7e5f8B0423fbAb28cE9c8C39C2cC414027B | 76.0% | 81.0% | 10.00% |        4.17x |
  |  12 | ETHx                            | ETHx   | 0xA35b1B31Ce002FBF2058D22F30f95D405200A15b |       18 | 0x9F2F60f38BBc275aF8F88a21c0e2BfE751E97C1f | 85.0% | 90.0% |  5.00% |        6.67x |
  |  13 | Treehouse ETH                   | tETH   | 0xD11c452fc99cF405034ee446803b6F6c1F6d5ED8 |       18 | 0x7783a5c7656d75ed1144379c25142B7e43Da5F5E | 90.0% | 93.0% |  4.00% |       10.00x |
  |  14 | pufETH                          | pufETH | 0xD9A442856C234a39a81a089C06451EBAa4306a72 |       18 | 0x5546198BE8479Dcd69044e90F50783BA1A25A8F5 | 88.0% | 91.0% |  5.00% |        8.33x |
  |  15 | Wrapped OETH                    | wOETH  | 0xDcEe70654261AF21C44c093C300eD3Bb97b78192 |       18 | 0x835B92840b721D3A66EB9Da7FC4AdF092A8F77e7 | 88.0% | 90.0% |  5.00% |        8.33x |

</details>

<details>
<summary><strong>cWstETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x3D0bb1ccaB520A66e607822fC55BC921738fAFE3 | Main market contract        |
  |  2  | Comet Implementation        | 0x2e086a54B125857B72b1858993793C9b97412333 | Implementation contract     |
  |  3  | Comet Extension             | 0x055E53F50B84FD91c4Be367220EFD36c3d091E1f | Extension delegate contract |
  |  4  | Configurator                | 0x316f9708bB98af7dA9c68C1C3b5e79039cD336E3 | Market configurator         |
  |  5  | Configurator Implementation | 0xcFC1fA6b7ca982176529899D99af6473aD80DF4F | Configurator implementation |
  |  6  | Comet Admin                 | 0x1EC63B5883C3481134FD50D5DAebc83Ecd2E8779 | Admin contract              |
  |  7  | Comet Factory               | 0xBa8F83ffFC7097CBcD89fe323D31753CfaC33867 | Factory contract            |
  |  8  | Rewards                     | 0x1B0e765F6224C21223AeA2af16c1C46E38885a40 | Rewards contract            |
  |  9  | Bulker                      | 0x2c776041CCFe903071AF44aa147368a9c8EEA518 | Bulker contract             |
  |  10 | Governor                    | 0x309a862bbC1A00e45506cB8A802D1ff10004c8C0 | Governance contract         |
  |  11 | Timelock                    | 0x6d903f6003cca6255D85CcA4D3B5E5146dC33925 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 850000000000000000 | 850000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |          380517503 |          380517503 | 2025-10-31 |
  |  3  | Supply Rate Slope High |        31709791983 |        31709791983 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 850000000000000000 | 850000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          443937087 |          443937087 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |        36466260781 |        36466260781 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name               | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |    LP | Max Leverage |
  | :-: | :----------------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | ----: | -----------: |
  |  1  | rsETH              | rsETH  | 0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7 |       18 | 0xC49399814452B41dA8a7cd76a159f5515cb3e493 | 90.0% | 93.0% | 4.00% |       10.00x |
  |  2  | Renzo Restaked ETH | ezETH  | 0xbf5495Efe5DB9ce00f80364C8B423567e58d2110 |       18 | 0xc7986B6318C3f3aB5bE12BAF22892961158D3c24 | 90.0% | 93.0% | 4.00% |       10.00x |
  |  3  | Treehouse ETH      | tETH   | 0xD11c452fc99cF405034ee446803b6F6c1F6d5ED8 |       18 | 0x87641f6BC5aD796ea2f30af2A79aB2CF30f74188 | 90.0% | 93.0% | 4.00% |       10.00x |

</details>

---

## 🌐 MANTLE

<details>
<summary><strong>cUSDev3</strong></summary>

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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1236681887 |         1236681887 | 2025-10-31 |
  |  3  | Supply Rate Slope High |       114155251141 |       114155251141 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |         1055936073 |         1055936073 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       126839167935 |       126839167935 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

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
<summary><strong>cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x2e44e174f7D53F0212823acC11C01A11d58c5bCB | Main market contract        |
  |  2  | Comet Implementation        | 0xb2A3Af1E481645F0806E836560dC6C51798807a8 | Implementation contract     |
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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-10-31 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Optimism                        | OP     | 0x4200000000000000000000000000000000000042 |       18 | 0x0D276FC14719f9292D5C1eA2198673d1f4269246 | 65.0% | 70.0% | 20.00% |        2.86x |
  |  2  | Wrapped Ether                   | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x13e3Ee699D1909E989722E753853AE30b17e08c5 | 83.0% | 88.0% |  7.00% |        5.88x |
  |  3  | Wrapped BTC                     | WBTC   | 0x68f180fcCe6836688e9084f035309E29Bf0A2095 |        8 | 0x718A5788b89454aAE3A028AE9c111A29Be6c2a6F | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Wrapped liquid staked Ether 2.0 | wstETH | 0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb |       18 | 0x4f90C34dEF3516Ca5bd0a8276e01516fb09fB2Ab | 80.0% | 85.0% | 10.00% |        5.00x |
  |  5  | Wrapped Mountain Protocol USD   | wUSDM  | 0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812 |       18 | 0x8671d5e3a10639a573bACffEF448CA076b2d5cD7 |  0.0% | 0.01% |  0.00% |        1.00x |

</details>

<details>
<summary><strong>cUSDTv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x995E394b8B2437aC8Ce61Ee0bC610D617962B214 | Main market contract        |
  |  2  | Comet Implementation        | 0x288f4D1aBA4ea589Bce1f58F08B6c7E835142090 | Implementation contract     |
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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-10-31 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Optimism                        | OP     | 0x4200000000000000000000000000000000000042 |       18 | 0x0D276FC14719f9292D5C1eA2198673d1f4269246 | 65.0% | 70.0% | 20.00% |        2.86x |
  |  2  | Wrapped Ether                   | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x13e3Ee699D1909E989722E753853AE30b17e08c5 | 83.0% | 88.0% |  7.00% |        5.88x |
  |  3  | Wrapped BTC                     | WBTC   | 0x68f180fcCe6836688e9084f035309E29Bf0A2095 |        8 | 0x718A5788b89454aAE3A028AE9c111A29Be6c2a6F | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Wrapped liquid staked Ether 2.0 | wstETH | 0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb |       18 | 0x6846Fc014a72198Ee287350ddB6b0180586594E5 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  5  | Wrapped Mountain Protocol USD   | wUSDM  | 0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812 |       18 | 0x8671d5e3a10639a573bACffEF448CA076b2d5cD7 |  0.0% | 0.01% |  0.00% |        1.00x |

</details>

<details>
<summary><strong>cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xE36A30D249f7761327fd973001A32010b521b6Fd | Main market contract        |
  |  2  | Comet Implementation        | 0x7E013AB4FF345768699DaA02B7f2385e86C3296a | Implementation contract     |
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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |          684931506 |          684931506 | 2025-10-31 |
  |  3  | Supply Rate Slope High |        35673515981 |        35673515981 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          491501775 |          491501775 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |        39954337899 |        39954337899 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped liquid staked Ether 2.0 | wstETH | 0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb |       18 | 0x295d9F81298Fc44B4F329CBef57E67266091Cc86 | 88.0% | 93.0% |  3.00% |        8.33x |
  |  2  | Rocket Pool ETH                 | rETH   | 0x9Bcef72be871e61ED4fBbc7630889beE758eb81D |       18 | 0x5D409e56D886231aDAf00c8775665AD0f9897b56 | 90.0% | 93.0% |  3.00% |       10.00x |
  |  3  | Wrapped BTC                     | WBTC   | 0x68f180fcCe6836688e9084f035309E29Bf0A2095 |        8 | 0x4ed39CF78ffA4428DE6bcEDB8d0f5Ff84699e13D | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Tether USD                      | USDT   | 0x94b008aA00579c1307B0EF2c499aD98a8ce58e58 |        6 | 0xDdC326838f2B5E5625306C3cf33318666f3Cf002 | 80.0% | 85.0% |  5.00% |        5.00x |
  |  5  | USD Coin                        | USDC   | 0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85 |        6 | 0x403F2083B6E220147f8a8832f0B284B4Ed5777d1 | 80.0% | 85.0% |  5.00% |        5.00x |
  |  6  | Renzo Restaked ETH              | ezETH  | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0x69dD37A0EE3D15776A54e34a7297B059e75C94Ab | 90.0% | 93.0% |  4.00% |       10.00x |
  |  7  | Wrapped eETH                    | weETH  | 0x5A7fACB970D094B6C7FF1df0eA68D99E6e73CBFF |       18 | 0x5A20166Ed55518520B1F68Cab1Cf127473123814 | 90.0% | 93.0% |  4.00% |       10.00x |
  |  8  | rsETHWrapper                    | wrsETH | 0x87eEE96D50Fb761AD85B1c982d28A042169d61b1 |       18 | 0xeE7B99Dc798Eae1957713bBBEde98073098B0E68 | 90.0% | 93.0% |  4.00% |       10.00x |

</details>

---

## 🌐 POLYGON

<details>
<summary><strong>cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xF25212E676D1F7F89Cd72fFEe66158f541246445 | Main market contract        |
  |  2  | Comet Implementation        | 0xA265E611Cf0ccB49ca9B58c2e1e8aa9B922504e6 | Implementation contract     |
  |  3  | Comet Extension             | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Extension delegate contract |
  |  4  | Configurator                | 0x83E0F742cAcBE66349E3701B171eE2487a26e738 | Market configurator         |
  |  5  | Configurator Implementation | 0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf | Configurator implementation |
  |  6  | Comet Admin                 | 0xd712ACe4ca490D4F3E92992Ecf3DE12251b975F9 | Admin contract              |
  |  7  | Comet Factory               | 0x2F9E3953b2Ef89fA265f2a32ed9F80D00229125B | Factory contract            |
  |  8  | Rewards                     | 0x45939657d1CA34A8FA39A924B71D28Fe8431e581 | Rewards contract            |
  |  9  | Bulker                      | 0x59e242D352ae13166B4987aE5c990C232f7f7CD6 | Bulker contract             |
  |  10 | Governor                    | 0x18281dfC4d00905DA1aaA6731414EABa843c468A | Governance contract         |
  |  11 | Timelock                    | 0xCC3E7c85Bb0EE4f09380e041fee95a0caeDD4a02 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-10-31 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol  | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :------ | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped Ether                   | WETH    | 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619 |       18 | 0xF9680D99D6C9589e2a93a78A04A279e509205945 | 80.0% | 85.0% |  7.00% |        5.00x |
  |  2  | (PoS) Wrapped BTC               | WBTC    | 0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6 |        8 | 0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6 | 75.0% | 85.0% | 10.00% |        4.00x |
  |  3  | Wrapped Polygon Ecosystem Token | WPOL    | 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270 |       18 | 0xAB594600376Ec9fD91F8e885dADF0CE036862dE0 | 65.0% | 80.0% | 10.00% |        2.86x |
  |  4  | Liquid Staking Matic (PoS)      | MaticX  | 0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6 |       18 | 0x5d37E4b374E6907de8Fc7fb33EE3b0af403C7403 | 55.0% | 60.0% | 20.00% |        2.22x |
  |  5  | Staked MATIC (PoS)              | stMATIC | 0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4 |       18 | 0x97371dF4492605486e23Da797fA68e55Fc38a13f |  0.0% | 0.01% | 20.00% |        1.00x |

</details>

<details>
<summary><strong>cUSDTv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xaeB318360f27748Acb200CE616E389A6C9409a07 | Main market contract        |
  |  2  | Comet Implementation        | 0x83aBacAFaF625D84919cA769222579bC75AeA2D1 | Implementation contract     |
  |  3  | Comet Extension             | 0x2F4eAF29dfeeF4654bD091F7112926E108eF4Ed0 | Extension delegate contract |
  |  4  | Configurator                | 0x83E0F742cAcBE66349E3701B171eE2487a26e738 | Market configurator         |
  |  5  | Configurator Implementation | 0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf | Configurator implementation |
  |  6  | Comet Admin                 | 0xd712ACe4ca490D4F3E92992Ecf3DE12251b975F9 | Admin contract              |
  |  7  | Comet Factory               | 0x2F9E3953b2Ef89fA265f2a32ed9F80D00229125B | Factory contract            |
  |  8  | Rewards                     | 0x45939657d1CA34A8FA39A924B71D28Fe8431e581 | Rewards contract            |
  |  9  | Bulker                      | 0x59e242D352ae13166B4987aE5c990C232f7f7CD6 | Bulker contract             |
  |  10 | Governor                    | 0x18281dfC4d00905DA1aaA6731414EABa843c468A | Governance contract         |
  |  11 | Timelock                    | 0xCC3E7c85Bb0EE4f09380e041fee95a0caeDD4a02 | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-10-31 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol  | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :------ | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped Polygon Ecosystem Token | WPOL    | 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270 |       18 | 0xAB594600376Ec9fD91F8e885dADF0CE036862dE0 | 65.0% | 80.0% | 15.00% |        2.86x |
  |  2  | Wrapped Ether                   | WETH    | 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619 |       18 | 0xF9680D99D6C9589e2a93a78A04A279e509205945 | 80.0% | 85.0% |  7.00% |        5.00x |
  |  3  | Liquid Staking Matic (PoS)      | MaticX  | 0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6 |       18 | 0x5d37E4b374E6907de8Fc7fb33EE3b0af403C7403 | 60.0% | 70.0% | 20.00% |        2.50x |
  |  4  | Staked MATIC (PoS)              | stMATIC | 0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4 |       18 | 0x97371dF4492605486e23Da797fA68e55Fc38a13f |  0.0% | 0.01% | 20.00% |        1.00x |
  |  5  | (PoS) Wrapped BTC               | WBTC    | 0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6 |        8 | 0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6 | 75.0% | 85.0% | 10.00% |        4.00x |

</details>

---

## 🌐 RONIN

<details>
<summary><strong>cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x4006eD4097Ee51c09A04c3B0951D28CCf19e6DFE | Main market contract        |
  |  2  | Comet Implementation        | 0xA4c9Fa67b1b3e268683AFa51ae90c4e67F9C89a3 | Implementation contract     |
  |  3  | Comet Extension             | 0x2f0D0C958E4679c6b9225387d97260F7481C6131 | Extension delegate contract |
  |  4  | Configurator                | 0x966c72F456FC248D458784EF3E0b6d042be115F2 | Market configurator         |
  |  5  | Configurator Implementation | 0xaE0CCa27C15A534BAE106fC9957338549F82e81d | Configurator implementation |
  |  6  | Comet Admin                 | 0xfa64A82a3d13D4c05d5133E53b2EbB8A0FA9c3F6 | Admin contract              |
  |  7  | Comet Factory               | 0x4DF9E0f8e94a7A8A9aEa6010CD9d341F8Ecfe4c6 | Factory contract            |
  |  8  | Rewards                     | 0x31CdEe8609Bc15fD33cc525f101B70a81b2B1E59 | Rewards contract            |
  |  9  | Bulker                      | 0x840281FaD56DD88afba052B7F18Be2A65796Ecc6 | Bulker contract             |
  |  10 | Governor                    | 0x2c7EfA766338D33B9192dB1fB5D170Bdc03ef3F9 | Governance contract         |
  |  11 | Timelock                    | 0xBbb0Ebd903fafbb8fFF58B922fD0CD85E251ac2c | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-09-17 |
  |  2  | Supply Rate Slope Low  |          684931506 |          684931506 | 2025-09-17 |
  |  3  | Supply Rate Slope High |        35673515981 |        35673515981 | 2025-09-17 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-09-17 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-09-17 |
  |  6  | Borrow Rate Slope Low  |          491501775 |          491501775 | 2025-09-17 |
  |  7  | Borrow Rate Slope High |        39954337899 |        39954337899 | 2025-09-17 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-09-17 |

**💰 Collaterals**

  |  #  | Name                | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped Ronin       | WRON   | 0xe514d9DEB7966c8BE0ca922de8a064264eA6bcd4 |       18 | 0x692e4736f891CD940bA559d487845117e2c6b48D | 75.0% | 80.0% | 12.00% |        4.00x |
  |  2  | USD Coin            | USDC   | 0x0B7007c13325C48911F73A2daD5FA5dCBf808aDc |        6 | 0xC41CdfAE648A76EF471160F62bf38a03Ad5B67DF | 83.0% | 90.0% |  5.00% |        5.88x |
  |  3  | Axie Infinity Shard | AXS    | 0x97a9107C1793BC407d6F527b77e7fff4D812bece |       18 | 0xB2237b8F0690f7F8c7D03FE70da62213714F8B5D | 70.0% | 75.0% | 20.00% |        3.33x |

</details>

<details>
<summary><strong>cWRONv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xc0Afdbd1cEB621Ef576BA969ce9D4ceF78Dbc0c0 | Main market contract        |
  |  2  | Comet Implementation        | 0x4Bf84F33aFFd74d9857fbc997402313E700d1e99 | Implementation contract     |
  |  3  | Comet Extension             | 0x690f8eE32ce906c6288DD97Ce4f9aF57103D00D7 | Extension delegate contract |
  |  4  | Configurator                | 0x966c72F456FC248D458784EF3E0b6d042be115F2 | Market configurator         |
  |  5  | Configurator Implementation | 0xaE0CCa27C15A534BAE106fC9957338549F82e81d | Configurator implementation |
  |  6  | Comet Admin                 | 0xfa64A82a3d13D4c05d5133E53b2EbB8A0FA9c3F6 | Admin contract              |
  |  7  | Comet Factory               | 0x4DF9E0f8e94a7A8A9aEa6010CD9d341F8Ecfe4c6 | Factory contract            |
  |  8  | Rewards                     | 0x31CdEe8609Bc15fD33cc525f101B70a81b2B1E59 | Rewards contract            |
  |  9  | Bulker                      | 0x840281FaD56DD88afba052B7F18Be2A65796Ecc6 | Bulker contract             |
  |  10 | Governor                    | 0x2c7EfA766338D33B9192dB1fB5D170Bdc03ef3F9 | Governance contract         |
  |  11 | Timelock                    | 0xBbb0Ebd903fafbb8fFF58B922fD0CD85E251ac2c | Timelock contract           |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 850000000000000000 | 850000000000000000 | 2025-09-17 |
  |  2  | Supply Rate Slope Low  |          713470319 |          713470319 | 2025-09-17 |
  |  3  | Supply Rate Slope High |        42459411466 |        42459411466 | 2025-09-17 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-09-17 |
  |  5  | Borrow Kink            | 850000000000000000 | 850000000000000000 | 2025-09-17 |
  |  6  | Borrow Rate Slope Low  |          559582699 |          559582699 | 2025-09-17 |
  |  7  | Borrow Rate Slope High |        47564687975 |        47564687975 | 2025-09-17 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-09-17 |

**💰 Collaterals**

  |  #  | Name                | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | USD Coin            | USDC   | 0x0B7007c13325C48911F73A2daD5FA5dCBf808aDc |        6 | 0x88f415c12d45d4C6DC018553BBE472A4558ff3f8 | 75.0% | 80.0% | 12.00% |        4.00x |
  |  2  | Axie Infinity Shard | AXS    | 0x97a9107C1793BC407d6F527b77e7fff4D812bece |       18 | 0x81DfC7A054C8F60497e47579c5A5cEB37bc047e8 | 72.0% | 78.0% | 15.00% |        3.57x |
  |  3  | Ronin Wrapped Ether | WETH   | 0xc99a6A985eD2Cac1ef41640596C5A5f9F4E19Ef5 |       18 | 0x662Fdb0E7D95d89CD3458E4A3506296E48BB1F44 | 75.0% | 80.0% | 10.00% |        4.00x |

</details>

---

## 🌐 SCROLL

<details>
<summary><strong>cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xB2f97c1Bd3bf02f5e74d13f02E3e26F93D77CE44 | Main market contract        |
  |  2  | Comet Implementation        | 0xA038AaB16E8C1f5FB3865604B0B4DCFcDE2E68eE | Implementation contract     |
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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2025-10-31 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2025-10-31 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-10-31 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-10-31 |
  |  6  | Borrow Rate Slope Low  |         2994813689 |         2994813689 | 2025-10-31 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2025-10-31 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-10-31 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped Ether                   | WETH   | 0x5300000000000000000000000000000000000004 |       18 | 0x6bF14CB0A831078629D993FDeBcB182b21A8774C | 40.0% | 85.0% | 20.00% |        1.67x |
  |  2  | Wrapped liquid staked Ether 2.0 | wstETH | 0xf610A9dfB7C89644979b4A0f27063E9e7d7Cda32 |       18 | 0x709cef91Dd5d162d7047b678334d1Be41fe92843 | 32.0% | 80.0% | 30.00% |        1.47x |

</details>

---

## 🌐 UNICHAIN

<details>
<summary><strong>cUSDCv3</strong></summary>

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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-09-17 |
  |  2  | Supply Rate Slope Low  |         1712328767 |         1712328767 | 2025-09-17 |
  |  3  | Supply Rate Slope High |        96207508878 |        96207508878 | 2025-09-17 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-09-17 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-09-17 |
  |  6  | Borrow Rate Slope Low  |         1585489599 |         1585489599 | 2025-09-17 |
  |  7  | Borrow Rate Slope High |       107813292744 |       107813292744 | 2025-09-17 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-09-17 |

**💰 Collaterals**

  |  #  | Name          | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Uniswap       | UNI    | 0x8f187aA05619a017077f5308904739877ce9eA21 |       18 | 0x4A900f81dEdA753bbBab12453b3775D5f26df6F3 | 68.0% | 74.0% | 17.00% |        3.13x |
  |  2  | Wrapped Ether | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x72874CfE957bb47795548e5a9fd740D135ba5E45 | 83.0% | 90.0% |  5.00% |        5.88x |

</details>

<details>
<summary><strong>cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x6C987dDE50dB1dcDd32Cd4175778C2a291978E2a | Main market contract        |
  |  2  | Comet Implementation        | 0x51515144Cff7DC3623C52C5e91768a9955d2BEb1 | Implementation contract     |
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
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-09-17 |
  |  2  | Supply Rate Slope Low  |          684931506 |          684931506 | 2025-09-17 |
  |  3  | Supply Rate Slope High |        35673515981 |        35673515981 | 2025-09-17 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-09-17 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-09-17 |
  |  6  | Borrow Rate Slope Low  |          491501775 |          491501775 | 2025-09-17 |
  |  7  | Borrow Rate Slope High |        39954337899 |        39954337899 | 2025-09-17 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-09-17 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped liquid staked Ether 2.0 | wstETH | 0xc02fE7317D4eb8753a02c35fe019786854A92001 |       18 | 0x3870FAc3De911c12A57E5a2532D15aD8Ca275A60 | 90.0% | 93.0% |  3.00% |       10.00x |
  |  2  | Wrapped eETH                    | weETH  | 0x7DCC39B4d1C53CB31e1aBc0e358b43987FEF80f7 |       18 | 0x2e44e174f7D53F0212823acC11C01A11d58c5bCB | 90.0% | 93.0% |  4.00% |       10.00x |
  |  3  | Renzo Restaked ETH              | ezETH  | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0x1Ad4CEBa9f8135A557bBe317DB62Aa125C330F26 | 88.0% | 91.0% |  6.00% |        8.33x |
  |  4  | Uniswap                         | UNI    | 0x8f187aA05619a017077f5308904739877ce9eA21 |       18 | 0x84E93EC6170ED630f5ebD89A1AAE72d4F63f2713 | 70.0% | 75.0% | 20.00% |        3.33x |
  |  5  | Wrapped BTC                     | WBTC   | 0x927B51f251480a681271180DA4de28D44EC4AfB8 |        8 | 0xFa454dE61b317b6535A0C462267208E8FdB89f45 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  6  | KelpDao Restaked ETH            | rsETH  | 0xc3eACf0612346366Db554C991D7858716db09f58 |       18 | 0x85C4F855Bc0609D2584405819EdAEa3aDAbfE97D | 90.0% | 93.0% |  4.00% |       10.00x |

</details>

---

## 🎁 Rewards Summary

|  #  | Date       | Network  | Market    | Daily Rewards |  Yearly Rewards | Lend Daily Rewards | Borrow Daily Rewards | COMP on Reward Contract |
| :-: | :--------- | :------- | :-------- | ------------: | --------------: | -----------------: | -------------------: | ----------------------: |
|  1  | 2025-11-11 | arbitrum | cUSDCev3  |        0 COMP |          0 COMP |             0 COMP |               0 COMP |            3397.98 COMP |
|  2  | 2025-11-11 | arbitrum | cUSDCv3   |       35 COMP |      12775 COMP |            20 COMP |              15 COMP |            3397.98 COMP |
|  3  | 2025-11-11 | arbitrum | cUSDTv3   |       30 COMP |      10950 COMP |            15 COMP |              15 COMP |            3397.98 COMP |
|  4  | 2025-11-11 | arbitrum | cWETHv3   |        8 COMP |       2920 COMP |             3 COMP |               5 COMP |            3397.98 COMP |
|  5  | 2025-11-11 | base     | cAEROv3   |       11 COMP |       4015 COMP |             3 COMP |               8 COMP |            4435.64 COMP |
|  6  | 2025-11-11 | base     | cUSDbCv3  |        0 COMP |          0 COMP |             0 COMP |               0 COMP |            4435.64 COMP |
|  7  | 2025-11-11 | base     | cUSDCv3   |       20 COMP |       7300 COMP |            13 COMP |               7 COMP |            4435.64 COMP |
|  8  | 2025-11-11 | base     | cUSDSv3   |       36 COMP |      13140 COMP |            24 COMP |              12 COMP |            4435.64 COMP |
|  9  | 2025-11-11 | base     | cWETHv3   |        4 COMP |       1460 COMP |             2 COMP |               2 COMP |            4435.64 COMP |
|  10 | 2025-11-11 | linea    | cUSDCv3   |        7 COMP |       2555 COMP |             4 COMP |               3 COMP |            3238.40 COMP |
|  11 | 2025-11-11 | linea    | cWETHv3   |       10 COMP |       3650 COMP |             6 COMP |               4 COMP |            3238.40 COMP |
|  12 | 2025-11-11 | mainnet  | cUSDCv3   |      141 COMP |      51465 COMP |            70 COMP |              71 COMP |           26973.67 COMP |
|  13 | 2025-11-11 | mainnet  | cUSDSv3   |       17 COMP |       6205 COMP |            12 COMP |               5 COMP |           26973.67 COMP |
|  14 | 2025-11-11 | mainnet  | cUSDTv3   |      120 COMP |      43800 COMP |            70 COMP |              50 COMP |           26973.67 COMP |
|  15 | 2025-11-11 | mainnet  | cWBTCv3   |        1 COMP |        365 COMP |             1 COMP |               0 COMP |           26973.67 COMP |
|  16 | 2025-11-11 | mainnet  | cWETHv3   |       30 COMP |      10950 COMP |            10 COMP |              20 COMP |           26973.67 COMP |
|  17 | 2025-11-11 | mainnet  | cWstETHv3 |        3 COMP |       1095 COMP |             0 COMP |               3 COMP |           26973.67 COMP |
|  18 | 2025-11-11 | mantle   | cUSDev3   |        8 COMP |       2920 COMP |             4 COMP |               4 COMP |            2178.45 COMP |
|  19 | 2025-11-11 | optimism | cUSDCv3   |        6 COMP |       2190 COMP |             2 COMP |               4 COMP |            2155.70 COMP |
|  20 | 2025-11-11 | optimism | cUSDTv3   |       10 COMP |       3650 COMP |             5 COMP |               5 COMP |            2155.70 COMP |
|  21 | 2025-11-11 | optimism | cWETHv3   |        2 COMP |        730 COMP |             1 COMP |               1 COMP |            2155.70 COMP |
|  22 | 2025-11-11 | polygon  | cUSDCv3   |        0 COMP |          0 COMP |             0 COMP |               0 COMP |             916.91 COMP |
|  23 | 2025-11-11 | polygon  | cUSDTv3   |        0 COMP |          0 COMP |             0 COMP |               0 COMP |             916.91 COMP |
|  24 | 2025-11-11 | scroll   | cUSDCv3   |        0 COMP |          0 COMP |             0 COMP |               0 COMP |               0.00 COMP |
|  25 | 2025-11-11 | unichain | cUSDCv3   |        2 COMP |        730 COMP |             1 COMP |               1 COMP |             982.61 COMP |
|  26 | 2025-11-11 | unichain | cWETHv3   |       20 COMP |       7300 COMP |            12 COMP |               8 COMP |             982.61 COMP |
|     | **TOTAL**  |          |           |  **521 COMP** | **190165 COMP** |                    |                      |                         |

---

## 💎 Network COMP Balances

|  #  | Date       | Network  | Current COMP Balance |
| :-: | :--------- | :------- | -------------------: |
|  1  | 2025-11-11 | arbitrum |         3397.98 COMP |
|  2  | 2025-11-11 | base     |         4435.64 COMP |
|  3  | 2025-11-11 | linea    |         3238.40 COMP |
|  4  | 2025-11-11 | mainnet  |        26973.67 COMP |
|  5  | 2025-11-11 | mantle   |         2178.45 COMP |
|  6  | 2025-11-11 | optimism |         2155.70 COMP |
|  7  | 2025-11-11 | polygon  |          916.91 COMP |
|  8  | 2025-11-11 | scroll   |            0.00 COMP |
|  9  | 2025-11-11 | unichain |          982.61 COMP |
|     | **TOTAL**  |          |    **44279.36 COMP** |

---

*Last updated:* 2025-11-11 12:34:48.093 UTC
