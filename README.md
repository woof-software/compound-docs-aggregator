# 📊 Comet Markets Overview

**Download full JSON:** [output.json](./output.json)

---

## 🌐 ARBITRUM

<details>
<summary><strong>cUSDCev3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                              |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------------- |
  |  1  | Comet                       | 0xA5EDBDD9646f8dFF606d7448e414884C7d905dCA | Main market contract              |
  |  2  | Comet Implementation        | 0x5Ee554a59b93Bb61A50a0d66Eb002Fa254043950 | Implementation contract           |
  |  3  | Comet Extension             | 0xb971973b595C43cb59492dd0ec9b56c648daea33 | Extension delegate contract       |
  |  4  | Configurator                | 0xb21b06D71c75973babdE35b49fFDAc3F82Ad3775 | Market configurator               |
  |  5  | Configurator Implementation | 0x8495AF03fb797E2965bCB42Cb0693e1c15614798 | Configurator implementation       |
  |  6  | Comet Admin                 | 0xD10b40fF1D92e2267D099Da3509253D9Da4D715e | Admin contract                    |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract                  |
  |  8  | Rewards                     | 0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae | Rewards contract                  |
  |  9  | Bulker                      | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Bulker contract                   |
  |  10 | Governor                    | 0x42480C37B249e33aABaf4c22B20235656bd38068 | Governance contract               |
  |  11 | Timelock                    | 0x3fB4d38ea7EC20D91917c09591490Eeda38Cf88A | Timelock contract                 |
  |  12 | COMP                        | 0x354a6da3fcde098f8389cad84b0182725c6c91de | COMP Token                        |
  |  12 | SVR Fee Receiver            | 0xb3e79c7cac540ca833015e63d96d3032ba0c4129 | SVR protocol fee receiver address |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |         1236681887 |         1236681887 | 2026-06-02 |
  |  3  | Supply Rate Slope High |       114155251141 |       114155251141 | 2026-06-02 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |         1055936073 |         1055936073 | 2026-06-02 |
  |  7  | Borrow Rate Slope High |       126839167935 |       126839167935 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2026-06-02 |

**🪙 Base Token**

  |  #  | Name            | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :-------------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | USD Coin (Arb1) | USDC   | 0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8 |        6 | 0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3 |

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

  |  #  | Name                        | Address                                    | Note                              |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------------- |
  |  1  | Comet                       | 0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf | Main market contract              |
  |  2  | Comet Implementation        | 0x5D3DfD6B0C855DCfE2CB768bB0800D16553C758b | Implementation contract           |
  |  3  | Comet Extension             | 0x0d4Bd55A755134950027cE1F43190A354e648e20 | Extension delegate contract       |
  |  4  | Configurator                | 0xb21b06D71c75973babdE35b49fFDAc3F82Ad3775 | Market configurator               |
  |  5  | Configurator Implementation | 0x8495AF03fb797E2965bCB42Cb0693e1c15614798 | Configurator implementation       |
  |  6  | Comet Admin                 | 0xD10b40fF1D92e2267D099Da3509253D9Da4D715e | Admin contract                    |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract                  |
  |  8  | Rewards                     | 0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae | Rewards contract                  |
  |  9  | Bulker                      | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Bulker contract                   |
  |  10 | Governor                    | 0x42480C37B249e33aABaf4c22B20235656bd38068 | Governance contract               |
  |  11 | Timelock                    | 0x3fB4d38ea7EC20D91917c09591490Eeda38Cf88A | Timelock contract                 |
  |  12 | COMP                        | 0x354a6da3fcde098f8389cad84b0182725c6c91de | COMP Token                        |
  |  12 | SVR Fee Receiver            | 0xb3e79c7cac540ca833015e63d96d3032ba0c4129 | SVR protocol fee receiver address |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2026-06-02 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2026-06-02 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2026-06-02 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2026-06-02 |

**🪙 Base Token**

  |  #  | Name     | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | USD Coin | USDC   | 0xaf88d065e77c8cC2239327C5EDb3A432268e5831 |        6 | 0x880D36763Bb470cd395B7d6c76b50446FA70ACe5 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Arbitrum                        | ARB    | 0x912CE59144191C1204E64559FE8253a0e49E6548 |       18 | 0x5998a5C516bD5E479E0B6aa6F243d372730B68d2 | 70.0% | 80.0% | 10.00% |        3.33x |
  |  2  | GMX                             | GMX    | 0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a |       18 | 0xDB98056FecFff59D032aB628337A4887110df3dB | 60.0% | 75.0% | 15.00% |        2.50x |
  |  3  | Wrapped Ether                   | WETH   | 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 |       18 | 0xb2988bDAdc45c43e3fE1A728F715E94bee4DB406 | 83.0% | 88.0% |  7.00% |        5.88x |
  |  4  | Wrapped BTC                     | WBTC   | 0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f |        8 | 0xcc392d2c3b37520e01712320bE331D41F7661013 | 75.0% | 85.0% | 10.00% |        4.00x |
  |  5  | Wrapped liquid staked Ether 2.0 | wstETH | 0x5979D7b546E38E414F7E9822514be443A4800529 |       18 | 0x92014e7f331dFaB2848A5872AA8b2E7b6f3cE8B4 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  6  | Renzo Restaked ETH              | ezETH  | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0x5Eba6Ec97843163C92Ab48a7aC0CCc8423c652b1 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  7  | Wrapped Mountain Protocol USD   | wUSDM  | 0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812 |       18 | 0x5D173813B4505701e79E654b36A95E6c1FAD4448 |  0.0% | 0.01% |  0.00% |        1.00x |
  |  8  | Treehouse ETH                   | tETH   | 0xd09ACb80C1E8f2291862c4978A008791c9167003 |       18 | 0x5372Bcf3486D59C23F5fC85745B41F180EFFf881 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  9  | Arbitrum tBTC v2                | tBTC   | 0x6c84a8f1c29108F47a79964b5Fe888D4f4D0dE40 |       18 | 0xE808488e8627F6531bA79a13A9E0271B39abEb1C | 80.0% | 85.0% | 10.00% |        5.00x |

</details>

<details>
<summary><strong>cUSDTv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                              |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------------- |
  |  1  | Comet                       | 0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07 | Main market contract              |
  |  2  | Comet Implementation        | 0x423717a277eaD7A33Ccc47fa38755FBaf8aDec2B | Implementation contract           |
  |  3  | Comet Extension             | 0x5F5406b32ca3Da65e40978190C88B9809A95c6Ba | Extension delegate contract       |
  |  4  | Configurator                | 0xb21b06D71c75973babdE35b49fFDAc3F82Ad3775 | Market configurator               |
  |  5  | Configurator Implementation | 0x8495AF03fb797E2965bCB42Cb0693e1c15614798 | Configurator implementation       |
  |  6  | Comet Admin                 | 0xD10b40fF1D92e2267D099Da3509253D9Da4D715e | Admin contract                    |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract                  |
  |  8  | Rewards                     | 0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae | Rewards contract                  |
  |  9  | Bulker                      | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Bulker contract                   |
  |  10 | Governor                    | 0x42480C37B249e33aABaf4c22B20235656bd38068 | Governance contract               |
  |  11 | Timelock                    | 0x3fB4d38ea7EC20D91917c09591490Eeda38Cf88A | Timelock contract                 |
  |  12 | COMP                        | 0x354a6da3fcde098f8389cad84b0182725c6c91de | COMP Token                        |
  |  12 | SVR Fee Receiver            | 0xb3e79c7cac540ca833015e63d96d3032ba0c4129 | SVR protocol fee receiver address |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2026-06-02 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2026-06-02 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2026-06-02 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2026-06-02 |

**🪙 Base Token**

  |  #  | Name  | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :---- | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | USD₮0 | USD₮0  | 0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9 |        6 | 0xedfB5fD27B0259B0A696364b183223B5ca3CBE62 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Arbitrum                        | ARB    | 0x912CE59144191C1204E64559FE8253a0e49E6548 |       18 | 0x5998a5C516bD5E479E0B6aa6F243d372730B68d2 | 70.0% | 80.0% | 10.00% |        3.33x |
  |  2  | Wrapped Ether                   | WETH   | 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 |       18 | 0xb2988bDAdc45c43e3fE1A728F715E94bee4DB406 | 83.0% | 88.0% |  7.00% |        5.88x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH | 0x5979D7b546E38E414F7E9822514be443A4800529 |       18 | 0xC35137f62b825AeEaF30B69B6b32e3953D8d624a | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Wrapped BTC                     | WBTC   | 0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f |        8 | 0xcc392d2c3b37520e01712320bE331D41F7661013 | 70.0% | 80.0% | 10.00% |        3.33x |
  |  5  | GMX                             | GMX    | 0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a |       18 | 0xDB98056FecFff59D032aB628337A4887110df3dB | 60.0% | 70.0% | 20.00% |        2.50x |
  |  6  | Arbitrum tBTC v2                | tBTC   | 0x6c84a8f1c29108F47a79964b5Fe888D4f4D0dE40 |       18 | 0xE808488e8627F6531bA79a13A9E0271B39abEb1C | 80.0% | 85.0% | 10.00% |        5.00x |
  |  7  | Treehouse ETH                   | tETH   | 0xd09ACb80C1E8f2291862c4978A008791c9167003 |       18 | 0x5372Bcf3486D59C23F5fC85745B41F180EFFf881 | 80.0% | 85.0% | 10.00% |        5.00x |

</details>

<details>
<summary><strong>cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                              |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------------- |
  |  1  | Comet                       | 0x6f7D514bbD4aFf3BcD1140B7344b32f063dEe486 | Main market contract              |
  |  2  | Comet Implementation        | 0x1084493Ffb34c9dC0573a0E8f74d8dFec5346931 | Implementation contract           |
  |  3  | Comet Extension             | 0xF3BBe5807feA997d540939Cbf138c134b11e3CF1 | Extension delegate contract       |
  |  4  | Configurator                | 0xb21b06D71c75973babdE35b49fFDAc3F82Ad3775 | Market configurator               |
  |  5  | Configurator Implementation | 0x8495AF03fb797E2965bCB42Cb0693e1c15614798 | Configurator implementation       |
  |  6  | Comet Admin                 | 0xD10b40fF1D92e2267D099Da3509253D9Da4D715e | Admin contract                    |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract                  |
  |  8  | Rewards                     | 0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae | Rewards contract                  |
  |  9  | Bulker                      | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Bulker contract                   |
  |  10 | Governor                    | 0x42480C37B249e33aABaf4c22B20235656bd38068 | Governance contract               |
  |  11 | Timelock                    | 0x3fB4d38ea7EC20D91917c09591490Eeda38Cf88A | Timelock contract                 |
  |  12 | COMP                        | 0x354a6da3fcde098f8389cad84b0182725c6c91de | COMP Token                        |
  |  12 | SVR Fee Receiver            | 0xb3e79c7cac540ca833015e63d96d3032ba0c4129 | SVR protocol fee receiver address |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |          475646879 |          475646879 | 2026-06-02 |
  |  3  | Supply Rate Slope High |         4280821917 |         4280821917 | 2026-06-02 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |          176165511 |          176165511 | 2026-06-02 |
  |  7  | Borrow Rate Slope High |         4756468797 |         4756468797 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2026-06-02 |

**🪙 Base Token**

  |  #  | Name          | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | Wrapped Ether | WETH   | 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 |       18 | 0xdB7EdFa090061D9367CbEAF6bE16ECbDE596676C |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped eETH                    | weETH  | 0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe |       18 | 0x4F12633d511dC3049DE1ea923b7047fBeD0070D2 | 90.0% | 93.0% |  4.00% |       10.00x |
  |  2  | Rocket Pool ETH                 | rETH   | 0xEC70Dcb4A1EFa46b8F2D97C310C9c4790ba5ffA8 |       18 | 0x60F2058379716A64a7A5d29219397e79bC552194 | 90.0% | 93.0% |  3.00% |       10.00x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH | 0x5979D7b546E38E414F7E9822514be443A4800529 |       18 | 0x311930889C61E141E15a61D11BE974D749390E7A | 88.0% | 93.0% |  3.00% |        8.33x |
  |  4  | Wrapped BTC                     | WBTC   | 0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f |        8 | 0xFa454dE61b317b6535A0C462267208E8FdB89f45 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  5  | KelpDao Restaked ETH            | rsETH  | 0x4186BFC76E2E237523CBC30FD220FE055156b41F |       18 | 0xA4F2e977CAb3177D61E2e7eAEcd257Bf09F2f915 |  0.0% | 93.0% |  4.00% |        1.00x |
  |  6  | USD₮0                           | USD₮0  | 0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9 |        6 | 0x15Eb948705933433826B9a7956741764e1432156 | 80.0% | 85.0% |  5.00% |        5.00x |
  |  7  | USD Coin                        | USDC   | 0xaf88d065e77c8cC2239327C5EDb3A432268e5831 |        6 | 0x675DAfae7d2711032615bd32E6D352AF32e5a8Bd | 80.0% | 85.0% |  5.00% |        5.00x |
  |  8  | Renzo Restaked ETH              | ezETH  | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0xA2699232B341881B1Ed85d91592b7c259E029aCf | 90.0% | 93.0% |  4.00% |       10.00x |
  |  9  | Treehouse ETH                   | tETH   | 0xd09ACb80C1E8f2291862c4978A008791c9167003 |       18 | 0x250BD3Da70b1844dbe7491C521B9490abd57B709 | 88.0% | 93.0% |  4.00% |        8.33x |

</details>

---

## 🌐 BASE

<details>
<summary><strong>cAEROv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                              |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------------- |
  |  1  | Comet                       | 0x784efeB622244d2348d4F2522f8860B96fbEcE89 | Main market contract              |
  |  2  | Comet Implementation        | 0x4eDcC21F4E8Dfa10D426e36A3B5D872dcCB40228 | Implementation contract           |
  |  3  | Comet Extension             | 0x7E5873DD6a92802b280D8d59DEc2aa6Ce0EEB13A | Extension delegate contract       |
  |  4  | Configurator                | 0x45939657d1CA34A8FA39A924B71D28Fe8431e581 | Market configurator               |
  |  5  | Configurator Implementation | 0x83E0F742cAcBE66349E3701B171eE2487a26e738 | Configurator implementation       |
  |  6  | Comet Admin                 | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Admin contract                    |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract                  |
  |  8  | Rewards                     | 0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1 | Rewards contract                  |
  |  9  | Bulker                      | 0x78D0677032A35c63D142a48A2037048871212a8C | Bulker contract                   |
  |  10 | Governor                    | 0x18281dfC4d00905DA1aaA6731414EABa843c468A | Governance contract               |
  |  11 | Timelock                    | 0xCC3E7c85Bb0EE4f09380e041fee95a0caeDD4a02 | Timelock contract                 |
  |  12 | COMP                        | 0x9e1028f5f1d5ede59748ffcee5532509976840e0 | COMP Token                        |
  |  12 | SVR Fee Receiver            | 0xb3e79c7cac540ca833015e63d96d3032ba0c4129 | SVR protocol fee receiver address |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 850000000000000000 | 850000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |         1268391679 |         1268391679 | 2026-06-02 |
  |  3  | Supply Rate Slope High |        87940766108 |        87940766108 | 2026-06-02 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 850000000000000000 | 850000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |         1043252156 |         1043252156 | 2026-06-02 |
  |  7  | Borrow Rate Slope High |       116270294266 |       116270294266 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          697615423 |          697615423 | 2026-06-02 |

**🪙 Base Token**

  |  #  | Name      | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :-------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | Aerodrome | AERO   | 0x940181a94A35A4569E4529A3CDfB74e38FD98631 |       18 | 0xdB7EdFa090061D9367CbEAF6bE16ECbDE596676C |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped Ether                   | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0xe6eb5B9b85cFF2C84Df3De6e7855bC9E76f034d5 | 60.0% | 65.0% | 25.00% |        2.50x |
  |  2  | USD Coin                        | USDC   | 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 |        6 | 0x3e6D1ccA8Eee6d02f1f578B613374EB53E6823B4 | 65.0% | 70.0% | 20.00% |        2.86x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH | 0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452 |       18 | 0x1738FCAe8D5A6aEf39985dF31Fe60e5Dc5e1a7b3 | 60.0% | 65.0% | 25.00% |        2.50x |
  |  4  | Coinbase Wrapped BTC            | cbBTC  | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x8df378453Ff9dEFFa513367CDF9b3B53726303e9 | 60.0% | 65.0% | 25.00% |        2.50x |

</details>

<details>
<summary><strong>cUSDbCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                              |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------------- |
  |  1  | Comet                       | 0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf | Main market contract              |
  |  2  | Comet Implementation        | 0x3a82A35fe68D975F8eDB5E8DfFA60B13FbB4e040 | Implementation contract           |
  |  3  | Comet Extension             | 0xD149132Db93C44e0B306493dC3021966167B1b02 | Extension delegate contract       |
  |  4  | Configurator                | 0x45939657d1CA34A8FA39A924B71D28Fe8431e581 | Market configurator               |
  |  5  | Configurator Implementation | 0x83E0F742cAcBE66349E3701B171eE2487a26e738 | Configurator implementation       |
  |  6  | Comet Admin                 | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Admin contract                    |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract                  |
  |  8  | Rewards                     | 0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1 | Rewards contract                  |
  |  9  | Bulker                      | 0x78D0677032A35c63D142a48A2037048871212a8C | Bulker contract                   |
  |  10 | Governor                    | 0x18281dfC4d00905DA1aaA6731414EABa843c468A | Governance contract               |
  |  11 | Timelock                    | 0xCC3E7c85Bb0EE4f09380e041fee95a0caeDD4a02 | Timelock contract                 |
  |  12 | COMP                        | 0x9e1028f5f1d5ede59748ffcee5532509976840e0 | COMP Token                        |
  |  12 | SVR Fee Receiver            | 0xb3e79c7cac540ca833015e63d96d3032ba0c4129 | SVR protocol fee receiver address |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 850000000000000000 | 850000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |          634195839 |          634195839 | 2026-06-02 |
  |  3  | Supply Rate Slope High |        28116026128 |        28116026128 | 2026-06-02 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 850000000000000000 | 850000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |         1119165398 |         1119165398 | 2026-06-02 |
  |  7  | Borrow Rate Slope High |       109927289446 |       109927289446 | 2026-06-02 |
  |  8  | Borrow Rate Base       |         1585489599 |         1585489599 | 2026-06-02 |

**🪙 Base Token**

  |  #  | Name          | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | USD Base Coin | USDbC  | 0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA |        6 | 0x7e860098F58bBFC8648a4311b374B1D669a2bc6B |

**💰 Collaterals**

  |  #  | Name                        | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :-------------------------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Coinbase Wrapped Staked ETH | cbETH  | 0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22 |       18 | 0x4687670f5f01716fAA382E2356C103BaD776752C | 45.0% | 60.0% | 20.00% |        1.82x |
  |  2  | Wrapped Ether               | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70 | 45.0% | 64.0% | 15.00% |        1.82x |

</details>

<details>
<summary><strong>cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                              |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------------- |
  |  1  | Comet                       | 0xb125E6687d4313864e53df431d5425969c15Eb2F | Main market contract              |
  |  2  | Comet Implementation        | 0xC1455ae6Df6cd808ed677F048E434E22892682a7 | Implementation contract           |
  |  3  | Comet Extension             | 0x0d4Bd55A755134950027cE1F43190A354e648e20 | Extension delegate contract       |
  |  4  | Configurator                | 0x45939657d1CA34A8FA39A924B71D28Fe8431e581 | Market configurator               |
  |  5  | Configurator Implementation | 0x83E0F742cAcBE66349E3701B171eE2487a26e738 | Configurator implementation       |
  |  6  | Comet Admin                 | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Admin contract                    |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract                  |
  |  8  | Rewards                     | 0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1 | Rewards contract                  |
  |  9  | Bulker                      | 0x78D0677032A35c63D142a48A2037048871212a8C | Bulker contract                   |
  |  10 | Governor                    | 0x18281dfC4d00905DA1aaA6731414EABa843c468A | Governance contract               |
  |  11 | Timelock                    | 0xCC3E7c85Bb0EE4f09380e041fee95a0caeDD4a02 | Timelock contract                 |
  |  12 | COMP                        | 0x9e1028f5f1d5ede59748ffcee5532509976840e0 | COMP Token                        |
  |  12 | SVR Fee Receiver            | 0xb3e79c7cac540ca833015e63d96d3032ba0c4129 | SVR protocol fee receiver address |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2026-06-02 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2026-06-02 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2026-06-02 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2026-06-02 |

**🪙 Base Token**

  |  #  | Name     | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | USD Coin | USDC   | 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 |        6 | 0x3e6D1ccA8Eee6d02f1f578B613374EB53E6823B4 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Coinbase Wrapped Staked ETH     | cbETH  | 0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22 |       18 | 0x0866Fc8a76BfC485B8E8C7D543A54bd72F015b1C | 80.0% | 85.0% | 10.00% |        5.00x |
  |  2  | Wrapped Ether                   | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0xe6eb5B9b85cFF2C84Df3De6e7855bC9E76f034d5 | 85.0% | 90.0% |  5.00% |        6.67x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH | 0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452 |       18 | 0x1738FCAe8D5A6aEf39985dF31Fe60e5Dc5e1a7b3 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Coinbase Wrapped BTC            | cbBTC  | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x8C74B2811D2F1aD65517ADB5C65773c1E520ed2f | 80.0% | 85.0% |  5.00% |        5.00x |
  |  5  | Base tBTC v2                    | tBTC   | 0x236aa50979D5f3De3Bd1Eeb40E81137F22ab794b |       18 | 0x6D75BFB5A5885f841b132198C9f0bE8c872057BF | 80.0% | 85.0% | 10.00% |        5.00x |

</details>

<details>
<summary><strong>cUSDSv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                              |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------------- |
  |  1  | Comet                       | 0x2c776041CCFe903071AF44aa147368a9c8EEA518 | Main market contract              |
  |  2  | Comet Implementation        | 0x8AC1747bE2B6c7534f1a1fd086306a80996C0F0c | Implementation contract           |
  |  3  | Comet Extension             | 0xeCB8e46FcEa6339D68fdA37cC3FfBBC6838759Ff | Extension delegate contract       |
  |  4  | Configurator                | 0x45939657d1CA34A8FA39A924B71D28Fe8431e581 | Market configurator               |
  |  5  | Configurator Implementation | 0x83E0F742cAcBE66349E3701B171eE2487a26e738 | Configurator implementation       |
  |  6  | Comet Admin                 | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Admin contract                    |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract                  |
  |  8  | Rewards                     | 0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1 | Rewards contract                  |
  |  9  | Bulker                      | 0x78D0677032A35c63D142a48A2037048871212a8C | Bulker contract                   |
  |  10 | Governor                    | 0x18281dfC4d00905DA1aaA6731414EABa843c468A | Governance contract               |
  |  11 | Timelock                    | 0xCC3E7c85Bb0EE4f09380e041fee95a0caeDD4a02 | Timelock contract                 |
  |  12 | COMP                        | 0x9e1028f5f1d5ede59748ffcee5532509976840e0 | COMP Token                        |
  |  12 | SVR Fee Receiver            | 0xb3e79c7cac540ca833015e63d96d3032ba0c4129 | SVR protocol fee receiver address |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |         1712328767 |         1712328767 | 2026-06-02 |
  |  3  | Supply Rate Slope High |        96207508878 |        96207508878 | 2026-06-02 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |         1585489599 |         1585489599 | 2026-06-02 |
  |  7  | Borrow Rate Slope High |       107813292744 |       107813292744 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2026-06-02 |

**🪙 Base Token**

  |  #  | Name            | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :-------------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | USDS Stablecoin | USDS   | 0x820C137fa70C8691f0e44Dc420a5e53c168921Dc |       18 | 0x2330aaE3bca5F05169d5f4597964D44522F62930 |

**💰 Collaterals**

  |  #  | Name                 | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |    LP | Max Leverage |
  | :-: | :------------------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | ----: | -----------: |
  |  1  | Savings USDS         | sUSDS  | 0x5875eEE11Cf8398102FdAd704C9E96607675467a |       18 | 0x72e9B6F907365d76C6192aD49C0C5ba356b7Fa48 | 93.0% | 95.0% | 4.00% |       14.29x |
  |  2  | Coinbase Wrapped BTC | cbBTC  | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0x8C74B2811D2F1aD65517ADB5C65773c1E520ed2f | 80.0% | 85.0% | 5.00% |        5.00x |

</details>

<details>
<summary><strong>cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                              |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------------- |
  |  1  | Comet                       | 0x46e6b214b524310239732D51387075E0e70970bf | Main market contract              |
  |  2  | Comet Implementation        | 0x3E631eF28AA80a3234de3c8FD704E6Bb17D80721 | Implementation contract           |
  |  3  | Comet Extension             | 0xF3BBe5807feA997d540939Cbf138c134b11e3CF1 | Extension delegate contract       |
  |  4  | Configurator                | 0x45939657d1CA34A8FA39A924B71D28Fe8431e581 | Market configurator               |
  |  5  | Configurator Implementation | 0x83E0F742cAcBE66349E3701B171eE2487a26e738 | Configurator implementation       |
  |  6  | Comet Admin                 | 0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d | Admin contract                    |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract                  |
  |  8  | Rewards                     | 0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1 | Rewards contract                  |
  |  9  | Bulker                      | 0x78D0677032A35c63D142a48A2037048871212a8C | Bulker contract                   |
  |  10 | Governor                    | 0x18281dfC4d00905DA1aaA6731414EABa843c468A | Governance contract               |
  |  11 | Timelock                    | 0xCC3E7c85Bb0EE4f09380e041fee95a0caeDD4a02 | Timelock contract                 |
  |  12 | COMP                        | 0x9e1028f5f1d5ede59748ffcee5532509976840e0 | COMP Token                        |
  |  12 | SVR Fee Receiver            | 0xb3e79c7cac540ca833015e63d96d3032ba0c4129 | SVR protocol fee receiver address |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |          475646879 |          475646879 | 2026-06-02 |
  |  3  | Supply Rate Slope High |         4280821917 |         4280821917 | 2026-06-02 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |          176165511 |          176165511 | 2026-06-02 |
  |  7  | Borrow Rate Slope High |         4756468797 |         4756468797 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2026-06-02 |

**🪙 Base Token**

  |  #  | Name          | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | Wrapped Ether | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x9f485610E26B9c0140439f88Dc0C7742903Bd1CF |

**💰 Collaterals**

  |  #  | Name                            | Symbol      | Address                                    | Decimals | Price Feed                                 |    CF |    LF |    LP | Max Leverage |
  | :-: | :------------------------------ | :---------- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | ----: | -----------: |
  |  1  | Coinbase Wrapped Staked ETH     | cbETH       | 0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22 |       18 | 0x59e242D352ae13166B4987aE5c990C232f7f7CD6 | 90.0% | 93.0% | 2.50% |       10.00x |
  |  2  | Renzo Restaked ETH              | ezETH       | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0x41E345A046A73Ef15316191b41f3ABEA4cEF1168 | 90.0% | 93.0% | 4.00% |       10.00x |
  |  3  | Wrapped liquid staked Ether 2.0 | wstETH      | 0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452 |       18 | 0x0090A563C4832E4E519F5f054483519b1A83c8C3 | 90.0% | 93.0% | 2.50% |       10.00x |
  |  4  | USD Coin                        | USDC        | 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 |        6 | 0x3dc83e4c67d99b935e07771F36060DEAefFFF45D | 80.0% | 85.0% | 5.00% |        5.00x |
  |  5  | Wrapped eETH                    | weETH       | 0x04C0599Ae5A44757c0af6F9eC3b93da8976c150A |       18 | 0x5D173813B4505701e79E654b36A95E6c1FAD4448 | 90.0% | 93.0% | 4.00% |       10.00x |
  |  6  | rsETHWrapper                    | wrsETH      | 0xEDfa23602D0EC14714057867A78d01e94176BEA0 |       18 | 0xB88e4078AAc88F10C0Ca71086ddCF512Ec54498a |  0.0% | 93.0% | 4.00% |        1.00x |
  |  7  | Coinbase Wrapped BTC            | cbBTC       | 0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf |        8 | 0xc4A9fFF2152fe11FBB40F059100ce1271a330C51 | 80.0% | 85.0% | 5.00% |        5.00x |
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
  |  2  | Comet Implementation        | 0xA27483387D1Fe437E786cC0563A8AD527145526c | Implementation contract     |
  |  3  | Comet Extension             | 0xBC7B80c97b560e83A229a6417Ed4fC2d75Fc1209 | Extension delegate contract |
  |  4  | Configurator                | 0x970FfD8E335B8fa4cd5c869c7caC3a90671d5Dc3 | Market configurator         |
  |  5  | Configurator Implementation | 0xdB7EdFa090061D9367CbEAF6bE16ECbDE596676C | Configurator implementation |
  |  6  | Comet Admin                 | 0x4b5DeE60531a72C1264319Ec6A22678a4D0C8118 | Admin contract              |
  |  7  | Comet Factory               | 0x74a241aA5E2C0D62Ac267fC481790f3474ED5aAF | Factory contract            |
  |  8  | Rewards                     | 0x2c7118c4C88B9841FCF839074c26Ae8f035f2921 | Rewards contract            |
  |  9  | Bulker                      | 0x023ee795361B28cDbB94e302983578486A0A5f1B | Bulker contract             |
  |  10 | Governor                    | 0x1F71901daf98d70B4BAF40DE080321e5C2676856 | Governance contract         |
  |  11 | Timelock                    | 0x4A900f81dEdA753bbBab12453b3775D5f26df6F3 | Timelock contract           |
  |  12 | COMP                        | 0x0ece76334fb560f2b1a49a60e38cf726b02203f0 | COMP Token                  |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |                  0 |         1871955859 | 2026-08-20 |
  |  3  | Supply Rate Slope High |                  0 |        96292935058 | 2026-08-20 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |                  0 |         1585489599 | 2026-07-03 |
  |  7  | Borrow Rate Slope High |       107813292744 |       107813292744 | 2026-06-02 |
  |  8  | Borrow Rate Base       |         1902587519 |          475646879 | 2026-07-03 |

**🪙 Base Token**

  |  #  | Name | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :--- | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | USDC | USDC   | 0x176211869cA2b568f2A7D4EE941E073a821EE1ff |        6 | 0xAADAa473C1bDF7317ec07c915680Af29DeBfdCb5 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped Ether                   | WETH   | 0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f |       18 | 0x3c6Cd9Cc7c7a4c2Cf5a82734CD249D7D593354dA | 42.0% | 90.0% |  5.00% |        1.72x |
  |  2  | Wrapped liquid staked Ether 2.0 | wstETH | 0xB5beDd42000b71FddE22D3eE8a79Bd49A568fC8F |       18 | 0x0746928E47f858944D189996829Ca711f64461a7 | 41.0% | 87.0% |  5.00% |        1.69x |
  |  3  | Wrapped BTC                     | WBTC   | 0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4 |        8 | 0x7A99092816C8BD5ec8ba229e3a6E6Da1E628E1F9 | 40.0% | 85.0% | 10.00% |        1.67x |

</details>

<details>
<summary><strong>cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x60F2058379716A64a7A5d29219397e79bC552194 | Main market contract        |
  |  2  | Comet Implementation        | 0x3Bbc6ef751b773454cDCD1e492c99e691697FD81 | Implementation contract     |
  |  3  | Comet Extension             | 0x78eE842Bf092CaAa68dE542A8b1d1BF337EAD33F | Extension delegate contract |
  |  4  | Configurator                | 0x970FfD8E335B8fa4cd5c869c7caC3a90671d5Dc3 | Market configurator         |
  |  5  | Configurator Implementation | 0xdB7EdFa090061D9367CbEAF6bE16ECbDE596676C | Configurator implementation |
  |  6  | Comet Admin                 | 0x4b5DeE60531a72C1264319Ec6A22678a4D0C8118 | Admin contract              |
  |  7  | Comet Factory               | 0x74a241aA5E2C0D62Ac267fC481790f3474ED5aAF | Factory contract            |
  |  8  | Rewards                     | 0x2c7118c4C88B9841FCF839074c26Ae8f035f2921 | Rewards contract            |
  |  9  | Bulker                      | 0x023ee795361B28cDbB94e302983578486A0A5f1B | Bulker contract             |
  |  10 | Governor                    | 0x1F71901daf98d70B4BAF40DE080321e5C2676856 | Governance contract         |
  |  11 | Timelock                    | 0x4A900f81dEdA753bbBab12453b3775D5f26df6F3 | Timelock contract           |
  |  12 | COMP                        | 0x0ece76334fb560f2b1a49a60e38cf726b02203f0 | COMP Token                  |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |                  0 |          467988964 | 2026-08-20 |
  |  3  | Supply Rate Slope High |                  0 |         4273639649 | 2026-08-20 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |                  0 |          176165511 | 2026-07-03 |
  |  7  | Borrow Rate Slope High |         4756468797 |         4756468797 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          475646879 |          317097919 | 2026-07-03 |

**🪙 Base Token**

  |  #  | Name          | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | Wrapped Ether | WETH   | 0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f |       18 | 0xc4A9fFF2152fe11FBB40F059100ce1271a330C51 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Renzo Restaked ETH              | ezETH  | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0x13933885C9A392Ce73f396707EC61f30a8b05e37 | 90.0% | 93.0% |  6.00% |       10.00x |
  |  2  | Wrapped liquid staked Ether 2.0 | wstETH | 0xB5beDd42000b71FddE22D3eE8a79Bd49A568fC8F |       18 | 0xF1cEe2A82Cc42246c8C38253f118AbB6cAAd715B | 45.0% | 93.0% |  3.00% |        1.82x |
  |  3  | Wrapped BTC                     | WBTC   | 0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4 |        8 | 0xA2699232B341881B1Ed85d91592b7c259E029aCf | 40.0% | 85.0% | 10.00% |        1.67x |
  |  4  | Wrapped eETH                    | weETH  | 0x1Bf74C010E6320bab11e2e5A532b5AC15e0b8aA6 |       18 | 0xfd5282968119c348C1E47fBCaDD13069d9857Bf2 | 45.0% | 93.0% |  4.00% |        1.82x |
  |  5  | rsETHWrapper                    | wrsETH | 0xD2671165570f41BBB3B0097893300b6EB6101E6C |       18 | 0x8D50B433C0Dcf3636c29695122464Df5deb37eDc |  0.0% | 93.0% |  4.00% |        1.00x |

</details>

---

## 🌐 MANTLE

<details>
<summary><strong>cUSDev3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x606174f62cd968d8e684c645080fa694c1D7786E | Main market contract        |
  |  2  | Comet Implementation        | 0x6e29E1542006317a7e11835F4bB4547779b356e0 | Implementation contract     |
  |  3  | Comet Extension             | 0x63fB5e296B9e7423B9281Df31bcdB0282BbeeE25 | Extension delegate contract |
  |  4  | Configurator                | 0xb77Cd4cD000957283D8BAf53cD782ECf029cF7DB | Market configurator         |
  |  5  | Configurator Implementation | 0x3c851CbE2740747f5cE4e8894842A313e5A3aee3 | Configurator implementation |
  |  6  | Comet Admin                 | 0xe268B436E75648aa0639e2088fa803feA517a0c7 | Admin contract              |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract            |
  |  8  | Rewards                     | 0xCd83CbBFCE149d141A5171C3D6a0F0fCCeE225Ab | Rewards contract            |
  |  9  | Bulker                      | 0x67DFCa85CcEEFA2C5B1dB4DEe3BEa716A28B9baa | Bulker contract             |
  |  10 | Governor                    | 0xc91EcA15747E73d6dd7f616C49dAFF37b9F1B604 | Governance contract         |
  |  11 | Timelock                    | 0x16C7B5C1b10489F4B111af11de2Bd607c9728107 | Timelock contract           |
  |  12 | COMP                        | 0x52b7d8851d6ccbc6342ba0855be65f7b82a3f17f | COMP Token                  |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |                  0 |         1403966894 | 2026-08-20 |
  |  3  | Supply Rate Slope High |                  0 |       113233146245 | 2026-08-20 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |                  0 |         1055936073 | 2026-07-02 |
  |  7  | Borrow Rate Slope High |       126839167935 |       126839167935 | 2026-06-02 |
  |  8  | Borrow Rate Base       |         1426940639 |          475646879 | 2026-07-02 |

**🪙 Base Token**

  |  #  | Name | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :--- | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | USDe | USDe   | 0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34 |       18 | 0x0090A563C4832E4E519F5f054483519b1A83c8C3 |

**💰 Collaterals**

  |  #  | Name         | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :----------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | mETH         | mETH   | 0xcDA86A272531e8640cD7F1a92c01839911B90bb0 |       18 | 0x731564585278f228FB8F93a0BF62729E24367662 | 40.0% | 85.0% | 10.00% |        1.67x |
  |  2  | Ether        | WETH   | 0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111 |       18 | 0xAdD81aAF528784531E888317AFcD429b00C9f1b3 | 41.0% | 87.0% |  7.00% |        1.69x |
  |  3  | Fire Bitcoin | FBTC   | 0xC96dE26018A54D51c097160568752c4E3BD6C364 |        8 | 0x41E345A046A73Ef15316191b41f3ABEA4cEF1168 | 39.0% | 83.0% | 12.00% |        1.64x |

</details>

---

## 🌐 OPTIMISM

<details>
<summary><strong>cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x2e44e174f7D53F0212823acC11C01A11d58c5bCB | Main market contract        |
  |  2  | Comet Implementation        | 0xa3D6eE70cF0b0aEC013A364759B45A85648AA61A | Implementation contract     |
  |  3  | Comet Extension             | 0x0d4Bd55A755134950027cE1F43190A354e648e20 | Extension delegate contract |
  |  4  | Configurator                | 0x84E93EC6170ED630f5ebD89A1AAE72d4F63f2713 | Market configurator         |
  |  5  | Configurator Implementation | 0x371DB45c7ee248dAFf4Dc1FFB67A20faa0ecFE02 | Configurator implementation |
  |  6  | Comet Admin                 | 0x24D86Da09C4Dd64e50dB7501b0f695d030f397aF | Admin contract              |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract            |
  |  8  | Rewards                     | 0x443EA0340cb75a160F31A440722dec7b5bc3C2E9 | Rewards contract            |
  |  9  | Bulker                      | 0xcb3643CC8294B23171272845473dEc49739d4Ba3 | Bulker contract             |
  |  10 | Governor                    | 0xC3a73A70d1577CD5B02da0bA91C0Afc8fA434DAF | Governance contract         |
  |  11 | Timelock                    | 0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07 | Timelock contract           |
  |  12 | COMP                        | 0x7e7d4467112689329f7e06571ed0e8cbad4910ee | COMP Token                  |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2026-06-02 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2026-06-02 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |          352327498 |          880834601 | 2026-07-02 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          951293759 |          475646879 | 2026-07-02 |

**🪙 Base Token**

  |  #  | Name     | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | USD Coin | USDC   | 0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85 |        6 | 0x16a9FA2FDa030272Ce99B29CF780dFA30361E0f3 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Optimism                        | OP     | 0x4200000000000000000000000000000000000042 |       18 | 0x0D276FC14719f9292D5C1eA2198673d1f4269246 | 65.0% | 70.0% | 20.00% |        2.86x |
  |  2  | Wrapped Ether                   | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x13e3Ee699D1909E989722E753853AE30b17e08c5 | 83.0% | 88.0% |  7.00% |        5.88x |
  |  3  | Wrapped BTC                     | WBTC   | 0x68f180fcCe6836688e9084f035309E29Bf0A2095 |        8 | 0x718A5788b89454aAE3A028AE9c111A29Be6c2a6F | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Wrapped liquid staked Ether 2.0 | wstETH | 0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb |       18 | 0x5D173813B4505701e79E654b36A95E6c1FAD4448 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  5  | Wrapped Mountain Protocol USD   | wUSDM  | 0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812 |       18 | 0x8671d5e3a10639a573bACffEF448CA076b2d5cD7 |  0.0% | 0.01% |  0.00% |        1.00x |

</details>

<details>
<summary><strong>cUSDTv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x995E394b8B2437aC8Ce61Ee0bC610D617962B214 | Main market contract        |
  |  2  | Comet Implementation        | 0x8c27De31D9a371A25Fc1C1A5A6Ff2B947AFc967F | Implementation contract     |
  |  3  | Comet Extension             | 0x5F5406b32ca3Da65e40978190C88B9809A95c6Ba | Extension delegate contract |
  |  4  | Configurator                | 0x84E93EC6170ED630f5ebD89A1AAE72d4F63f2713 | Market configurator         |
  |  5  | Configurator Implementation | 0x371DB45c7ee248dAFf4Dc1FFB67A20faa0ecFE02 | Configurator implementation |
  |  6  | Comet Admin                 | 0x24D86Da09C4Dd64e50dB7501b0f695d030f397aF | Admin contract              |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract            |
  |  8  | Rewards                     | 0x443EA0340cb75a160F31A440722dec7b5bc3C2E9 | Rewards contract            |
  |  9  | Bulker                      | 0xcb3643CC8294B23171272845473dEc49739d4Ba3 | Bulker contract             |
  |  10 | Governor                    | 0xC3a73A70d1577CD5B02da0bA91C0Afc8fA434DAF | Governance contract         |
  |  11 | Timelock                    | 0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07 | Timelock contract           |
  |  12 | COMP                        | 0x7e7d4467112689329f7e06571ed0e8cbad4910ee | COMP Token                  |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |         1141552511 |         1141552511 | 2026-06-02 |
  |  3  | Supply Rate Slope High |       101344495180 |       101344495180 | 2026-06-02 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |          352327498 |          880834601 | 2026-07-02 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          951293759 |          475646879 | 2026-07-02 |

**🪙 Base Token**

  |  #  | Name       | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :--------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | Tether USD | USDT   | 0x94b008aA00579c1307B0EF2c499aD98a8ce58e58 |        6 | 0xECef79E109e997bCA29c1c0897ec9d7b03647F5E |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Optimism                        | OP     | 0x4200000000000000000000000000000000000042 |       18 | 0x0D276FC14719f9292D5C1eA2198673d1f4269246 | 65.0% | 70.0% | 20.00% |        2.86x |
  |  2  | Wrapped Ether                   | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x13e3Ee699D1909E989722E753853AE30b17e08c5 | 83.0% | 88.0% |  7.00% |        5.88x |
  |  3  | Wrapped BTC                     | WBTC   | 0x68f180fcCe6836688e9084f035309E29Bf0A2095 |        8 | 0x718A5788b89454aAE3A028AE9c111A29Be6c2a6F | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Wrapped liquid staked Ether 2.0 | wstETH | 0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb |       18 | 0x5D173813B4505701e79E654b36A95E6c1FAD4448 | 80.0% | 85.0% | 10.00% |        5.00x |
  |  5  | Wrapped Mountain Protocol USD   | wUSDM  | 0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812 |       18 | 0x8671d5e3a10639a573bACffEF448CA076b2d5cD7 |  0.0% | 0.01% |  0.00% |        1.00x |

</details>

<details>
<summary><strong>cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xE36A30D249f7761327fd973001A32010b521b6Fd | Main market contract        |
  |  2  | Comet Implementation        | 0x3b8548aB4B337d84665613A2267B62996011F4A3 | Implementation contract     |
  |  3  | Comet Extension             | 0xF3BBe5807feA997d540939Cbf138c134b11e3CF1 | Extension delegate contract |
  |  4  | Configurator                | 0x84E93EC6170ED630f5ebD89A1AAE72d4F63f2713 | Market configurator         |
  |  5  | Configurator Implementation | 0x371DB45c7ee248dAFf4Dc1FFB67A20faa0ecFE02 | Configurator implementation |
  |  6  | Comet Admin                 | 0x24D86Da09C4Dd64e50dB7501b0f695d030f397aF | Admin contract              |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract            |
  |  8  | Rewards                     | 0x443EA0340cb75a160F31A440722dec7b5bc3C2E9 | Rewards contract            |
  |  9  | Bulker                      | 0xcb3643CC8294B23171272845473dEc49739d4Ba3 | Bulker contract             |
  |  10 | Governor                    | 0xC3a73A70d1577CD5B02da0bA91C0Afc8fA434DAF | Governance contract         |
  |  11 | Timelock                    | 0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07 | Timelock contract           |
  |  12 | COMP                        | 0x7e7d4467112689329f7e06571ed0e8cbad4910ee | COMP Token                  |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |          475646879 |          475646879 | 2026-06-02 |
  |  3  | Supply Rate Slope High |         4280821917 |         4280821917 | 2026-06-02 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |          176165511 |          176165511 | 2026-06-02 |
  |  7  | Borrow Rate Slope High |         4756468797 |         4756468797 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2026-06-02 |

**🪙 Base Token**

  |  #  | Name          | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | Wrapped Ether | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x0be923b1716115d742E35Fa359d415598c50510F |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped liquid staked Ether 2.0 | wstETH | 0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb |       18 | 0x92014e7f331dFaB2848A5872AA8b2E7b6f3cE8B4 | 88.0% | 93.0% |  3.00% |        8.33x |
  |  2  | Rocket Pool ETH                 | rETH   | 0x9Bcef72be871e61ED4fBbc7630889beE758eb81D |       18 | 0x3e6D1ccA8Eee6d02f1f578B613374EB53E6823B4 | 90.0% | 93.0% |  3.00% |       10.00x |
  |  3  | Wrapped BTC                     | WBTC   | 0x68f180fcCe6836688e9084f035309E29Bf0A2095 |        8 | 0x4ed39CF78ffA4428DE6bcEDB8d0f5Ff84699e13D | 80.0% | 85.0% | 10.00% |        5.00x |
  |  4  | Tether USD                      | USDT   | 0x94b008aA00579c1307B0EF2c499aD98a8ce58e58 |        6 | 0xDdC326838f2B5E5625306C3cf33318666f3Cf002 | 80.0% | 85.0% |  5.00% |        5.00x |
  |  5  | USD Coin                        | USDC   | 0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85 |        6 | 0x403F2083B6E220147f8a8832f0B284B4Ed5777d1 | 80.0% | 85.0% |  5.00% |        5.00x |
  |  6  | Renzo Restaked ETH              | ezETH  | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0x3fb418B74Ec30bC3e940221F58A04e16afC6378B | 90.0% | 93.0% |  4.00% |       10.00x |
  |  7  | Wrapped eETH                    | weETH  | 0x5A7fACB970D094B6C7FF1df0eA68D99E6e73CBFF |       18 | 0xe6eb5B9b85cFF2C84Df3De6e7855bC9E76f034d5 | 90.0% | 93.0% |  4.00% |       10.00x |
  |  8  | rsETHWrapper                    | wrsETH | 0x87eEE96D50Fb761AD85B1c982d28A042169d61b1 |       18 | 0x5Eba6Ec97843163C92Ab48a7aC0CCc8423c652b1 |  0.0% | 93.0% |  4.00% |        1.00x |

</details>

---

## 🌐 POLYGON

<details>
<summary><strong>cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xF25212E676D1F7F89Cd72fFEe66158f541246445 | Main market contract        |
  |  2  | Comet Implementation        | 0xCB25eDf8178d36166564707A15B98862251928af | Implementation contract     |
  |  3  | Comet Extension             | 0x0d4Bd55A755134950027cE1F43190A354e648e20 | Extension delegate contract |
  |  4  | Configurator                | 0x83E0F742cAcBE66349E3701B171eE2487a26e738 | Market configurator         |
  |  5  | Configurator Implementation | 0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf | Configurator implementation |
  |  6  | Comet Admin                 | 0xd712ACe4ca490D4F3E92992Ecf3DE12251b975F9 | Admin contract              |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract            |
  |  8  | Rewards                     | 0x45939657d1CA34A8FA39A924B71D28Fe8431e581 | Rewards contract            |
  |  9  | Bulker                      | 0x59e242D352ae13166B4987aE5c990C232f7f7CD6 | Bulker contract             |
  |  10 | Governor                    | 0x18281dfC4d00905DA1aaA6731414EABa843c468A | Governance contract         |
  |  11 | Timelock                    | 0xCC3E7c85Bb0EE4f09380e041fee95a0caeDD4a02 | Timelock contract           |
  |  12 | COMP                        | 0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c | COMP Token                  |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |                  0 |         1141552511 | 2026-07-22 |
  |  3  | Supply Rate Slope High |                  0 |       101344495180 | 2026-07-22 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2026-06-02 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2026-06-02 |

**🪙 Base Token**

  |  #  | Name           | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :------------- | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | USD Coin (PoS) | USDC   | 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174 |        6 | 0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7 |

**💰 Collaterals**

  |  #  | Name                            | Symbol  | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :------ | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped Ether                   | WETH    | 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619 |       18 | 0xF9680D99D6C9589e2a93a78A04A279e509205945 | 40.0% | 85.0% |  7.00% |        1.67x |
  |  2  | (PoS) Wrapped BTC               | WBTC    | 0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6 |        8 | 0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6 | 37.5% | 85.0% | 10.00% |        1.60x |
  |  3  | Wrapped Polygon Ecosystem Token | WPOL    | 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270 |       18 | 0xAB594600376Ec9fD91F8e885dADF0CE036862dE0 | 32.5% | 80.0% | 10.00% |        1.48x |
  |  4  | Liquid Staking Matic (PoS)      | MaticX  | 0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6 |       18 | 0x5d37E4b374E6907de8Fc7fb33EE3b0af403C7403 |  0.0% | 60.0% | 20.00% |        1.00x |
  |  5  | Staked MATIC (PoS)              | stMATIC | 0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4 |       18 | 0x5D173813B4505701e79E654b36A95E6c1FAD4448 |  0.0% | 0.01% | 20.00% |        1.00x |

</details>

<details>
<summary><strong>cUSDTv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0xaeB318360f27748Acb200CE616E389A6C9409a07 | Main market contract        |
  |  2  | Comet Implementation        | 0xD7F19060f9B6daCa9A5cE591F077E15B07089524 | Implementation contract     |
  |  3  | Comet Extension             | 0x5F5406b32ca3Da65e40978190C88B9809A95c6Ba | Extension delegate contract |
  |  4  | Configurator                | 0x83E0F742cAcBE66349E3701B171eE2487a26e738 | Market configurator         |
  |  5  | Configurator Implementation | 0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf | Configurator implementation |
  |  6  | Comet Admin                 | 0xd712ACe4ca490D4F3E92992Ecf3DE12251b975F9 | Admin contract              |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract            |
  |  8  | Rewards                     | 0x45939657d1CA34A8FA39A924B71D28Fe8431e581 | Rewards contract            |
  |  9  | Bulker                      | 0x59e242D352ae13166B4987aE5c990C232f7f7CD6 | Bulker contract             |
  |  10 | Governor                    | 0x18281dfC4d00905DA1aaA6731414EABa843c468A | Governance contract         |
  |  11 | Timelock                    | 0xCC3E7c85Bb0EE4f09380e041fee95a0caeDD4a02 | Timelock contract           |
  |  12 | COMP                        | 0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c | COMP Token                  |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  2  | Supply Rate Slope Low  |                  0 |         1141552511 | 2026-07-22 |
  |  3  | Supply Rate Slope High |                  0 |       101344495180 | 2026-07-22 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2026-06-02 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2026-06-02 |
  |  6  | Borrow Rate Slope Low  |          880834601 |          880834601 | 2026-06-02 |
  |  7  | Borrow Rate Slope High |       114155251141 |       114155251141 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2026-06-02 |

**🪙 Base Token**

  |  #  | Name  | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :---- | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | USDT0 | USDT0  | 0xc2132D05D31c914a87C6611C10748AEb04B58e8F |        6 | 0x0A6513e40db6EB1b165753AD52E80663aeA50545 |

**💰 Collaterals**

  |  #  | Name                            | Symbol  | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :------ | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped Polygon Ecosystem Token | WPOL    | 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270 |       18 | 0xAB594600376Ec9fD91F8e885dADF0CE036862dE0 | 32.5% | 80.0% | 15.00% |        1.48x |
  |  2  | Wrapped Ether                   | WETH    | 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619 |       18 | 0xF9680D99D6C9589e2a93a78A04A279e509205945 | 40.0% | 85.0% |  7.00% |        1.67x |
  |  3  | Liquid Staking Matic (PoS)      | MaticX  | 0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6 |       18 | 0x5d37E4b374E6907de8Fc7fb33EE3b0af403C7403 |  0.0% | 70.0% | 20.00% |        1.00x |
  |  4  | Staked MATIC (PoS)              | stMATIC | 0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4 |       18 | 0x5D173813B4505701e79E654b36A95E6c1FAD4448 |  0.0% | 0.01% | 20.00% |        1.00x |
  |  5  | (PoS) Wrapped BTC               | WBTC    | 0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6 |        8 | 0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6 | 37.5% | 85.0% | 10.00% |        1.60x |

</details>

---

## 🌐 UNICHAIN

<details>
<summary><strong>cUSDCv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x2c7118c4C88B9841FCF839074c26Ae8f035f2921 | Main market contract        |
  |  2  | Comet Implementation        | 0x3015606B09e6A2C8464cBE4fc225AA656656272c | Implementation contract     |
  |  3  | Comet Extension             | 0x0d4Bd55A755134950027cE1F43190A354e648e20 | Extension delegate contract |
  |  4  | Configurator                | 0x8df378453Ff9dEFFa513367CDF9b3B53726303e9 | Market configurator         |
  |  5  | Configurator Implementation | 0x5404872d8f2e24b230EC9B9eC64E3855F637FB93 | Configurator implementation |
  |  6  | Comet Admin                 | 0xaeB318360f27748Acb200CE616E389A6C9409a07 | Admin contract              |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract            |
  |  8  | Rewards                     | 0x6f7D514bbD4aFf3BcD1140B7344b32f063dEe486 | Rewards contract            |
  |  9  | Bulker                      | 0x58EbB8Db8b4FdF2dCbbB16E04c2F5b952963B514 | Bulker contract             |
  |  10 | Governor                    | 0x4b5DeE60531a72C1264319Ec6A22678a4D0C8118 | Governance contract         |
  |  11 | Timelock                    | 0x2F4eAF29dfeeF4654bD091F7112926E108eF4Ed0 | Timelock contract           |
  |  12 | COMP                        | 0xdf78e4f0a8279942ca68046476919a90f2288656 | COMP Token                  |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-11-17 |
  |  2  | Supply Rate Slope Low  |                  0 |         1712328767 | 2026-07-22 |
  |  3  | Supply Rate Slope High |                  0 |        96207508878 | 2026-07-22 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-11-17 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-11-17 |
  |  6  | Borrow Rate Slope Low  |         1585489599 |         1585489599 | 2025-11-17 |
  |  7  | Borrow Rate Slope High |       107813292744 |       107813292744 | 2025-11-17 |
  |  8  | Borrow Rate Base       |          475646879 |          475646879 | 2025-11-17 |

**🪙 Base Token**

  |  #  | Name | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :--- | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | USDC | USDC   | 0x078D782b760474a361dDA0AF3839290b0EF57AD6 |        6 | 0x1F71901daf98d70B4BAF40DE080321e5C2676856 |

**💰 Collaterals**

  |  #  | Name          | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Uniswap       | UNI    | 0x8f187aA05619a017077f5308904739877ce9eA21 |       18 | 0x4A900f81dEdA753bbBab12453b3775D5f26df6F3 | 34.0% | 74.0% | 17.00% |        1.52x |
  |  2  | Wrapped Ether | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x72874CfE957bb47795548e5a9fd740D135ba5E45 | 41.5% | 90.0% |  5.00% |        1.71x |

</details>

<details>
<summary><strong>cWETHv3</strong></summary>

**📋 Contracts**

  |  #  | Name                        | Address                                    | Note                        |
  | :-: | :-------------------------- | :----------------------------------------- | :-------------------------- |
  |  1  | Comet                       | 0x6C987dDE50dB1dcDd32Cd4175778C2a291978E2a | Main market contract        |
  |  2  | Comet Implementation        | 0xA8feE4A2B19C29fA96f297062BD19Ec9cC572Fa6 | Implementation contract     |
  |  3  | Comet Extension             | 0xF3BBe5807feA997d540939Cbf138c134b11e3CF1 | Extension delegate contract |
  |  4  | Configurator                | 0x8df378453Ff9dEFFa513367CDF9b3B53726303e9 | Market configurator         |
  |  5  | Configurator Implementation | 0x5404872d8f2e24b230EC9B9eC64E3855F637FB93 | Configurator implementation |
  |  6  | Comet Admin                 | 0xaeB318360f27748Acb200CE616E389A6C9409a07 | Admin contract              |
  |  7  | Comet Factory               | 0x30beAd17D2641bCc900dc1ABC5d55c88059D176F | Factory contract            |
  |  8  | Rewards                     | 0x6f7D514bbD4aFf3BcD1140B7344b32f063dEe486 | Rewards contract            |
  |  9  | Bulker                      | 0x58EbB8Db8b4FdF2dCbbB16E04c2F5b952963B514 | Bulker contract             |
  |  10 | Governor                    | 0x4b5DeE60531a72C1264319Ec6A22678a4D0C8118 | Governance contract         |
  |  11 | Timelock                    | 0x2F4eAF29dfeeF4654bD091F7112926E108eF4Ed0 | Timelock contract           |
  |  12 | COMP                        | 0xdf78e4f0a8279942ca68046476919a90f2288656 | COMP Token                  |

**📈 Interest Rate Curve**

  |  #  | Parameter              |      Current Value |     Previous Value | Date Set   |
  | :-: | :--------------------- | -----------------: | -----------------: | :--------- |
  |  1  | Supply Kink            | 900000000000000000 | 900000000000000000 | 2025-11-17 |
  |  2  | Supply Rate Slope Low  |                  0 |          475646879 | 2026-07-22 |
  |  3  | Supply Rate Slope High |                  0 |         4280821917 | 2026-07-22 |
  |  4  | Supply Rate Base       |                  0 |                  0 | 2025-11-17 |
  |  5  | Borrow Kink            | 900000000000000000 | 900000000000000000 | 2025-11-17 |
  |  6  | Borrow Rate Slope Low  |          176165511 |          491501775 | 2026-06-02 |
  |  7  | Borrow Rate Slope High |         4756468797 |        39954337899 | 2026-06-02 |
  |  8  | Borrow Rate Base       |          317097919 |          317097919 | 2025-11-17 |

**🪙 Base Token**

  |  #  | Name          | Symbol | Address                                    | Decimals | Price Feed                                 |
  | :-: | :------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- |
  |  1  | Wrapped Ether | WETH   | 0x4200000000000000000000000000000000000006 |       18 | 0x3C30B5a5A04656565686f800481580Ac4E7ed178 |

**💰 Collaterals**

  |  #  | Name                            | Symbol | Address                                    | Decimals | Price Feed                                 |    CF |    LF |     LP | Max Leverage |
  | :-: | :------------------------------ | :----- | :----------------------------------------- | -------: | :----------------------------------------- | ----: | ----: | -----: | -----------: |
  |  1  | Wrapped liquid staked Ether 2.0 | wstETH | 0xc02fE7317D4eb8753a02c35fe019786854A92001 |       18 | 0x73D3e8b769bC687AeEc487AAeFCAd31F4d9F84A7 | 45.0% | 93.0% |  3.00% |        1.82x |
  |  2  | Wrapped eETH                    | weETH  | 0x7DCC39B4d1C53CB31e1aBc0e358b43987FEF80f7 |       18 | 0x731564585278f228FB8F93a0BF62729E24367662 | 45.0% | 93.0% |  4.00% |        1.82x |
  |  3  | Renzo Restaked ETH              | ezETH  | 0x2416092f143378750bb29b79eD961ab195CcEea5 |       18 | 0x8671d5e3a10639a573bACffEF448CA076b2d5cD7 | 88.0% | 91.0% |  6.00% |        8.33x |
  |  4  | Uniswap                         | UNI    | 0x8f187aA05619a017077f5308904739877ce9eA21 |       18 | 0x84E93EC6170ED630f5ebD89A1AAE72d4F63f2713 | 70.0% | 75.0% | 20.00% |        3.33x |
  |  5  | Wrapped BTC                     | WBTC   | 0x927B51f251480a681271180DA4de28D44EC4AfB8 |        8 | 0xFa454dE61b317b6535A0C462267208E8FdB89f45 | 40.0% | 85.0% | 10.00% |        1.67x |
  |  6  | KelpDao Restaked ETH            | rsETH  | 0xc3eACf0612346366Db554C991D7858716db09f58 |       18 | 0x0090A563C4832E4E519F5f054483519b1A83c8C3 |  0.0% | 93.0% |  4.00% |        1.00x |

</details>

---

*Last updated:* 2026-08-21 12:34:17.922 UTC
