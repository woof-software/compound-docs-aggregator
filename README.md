# 📊 Comet Markets Overview

**Download full JSON:** [output.json](./output.json)

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

|  #  | Date       | Network  | Market  | Daily Rewards | Yearly Rewards | Lend Daily Rewards | Borrow Daily Rewards | COMP on Reward Contract |
| :-: | :--------- | :------- | :------ | ------------: | -------------: | -----------------: | -------------------: | ----------------------: |
|  1  | 2025-09-29 | unichain | cUSDCv3 |        2 COMP |       730 COMP |             1 COMP |               1 COMP |            1674.33 COMP |
|  2  | 2025-09-29 | unichain | cWETHv3 |       20 COMP |      7300 COMP |            12 COMP |               8 COMP |            1674.33 COMP |
|     | **TOTAL**  |          |         |   **22 COMP** |  **8030 COMP** |                    |                      |                         |

---

## 💎 Network COMP Balances

|  #  | Date       | Network  | Current COMP Balance |
| :-: | :--------- | :------- | -------------------: |
|  1  | 2025-09-29 | unichain |         1674.33 COMP |
|     | **TOTAL**  |          |     **1674.33 COMP** |

---

*Last updated:* 2025-09-29 12:30:35.804 UTC
