
# About
#### This is fundraising for helping homeless animals, based on NEAR blockchain. You can donate any amount of NEAR :)
### File structure
- *Contract* - contains smart contract binaries, written in rust. 
- *Frontend* - contains frontend files

### Smart contract functions
  Smart contract contains three methods:
  - **new_payment()** - incrementing counter value by attached amount, in yoctoNEAR
  - **get_total()** - view method, returns total raised funds, in yoctoNEAR
  - **reset_counter()** - view method, sets the counter to zero if call was from ippishio.testnet account (my account :p). For test purposes only
