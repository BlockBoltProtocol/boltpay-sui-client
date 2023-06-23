export const RPC_TESTNET = 'https://wallet-rpc.testnet.sui.io/';
export const RPC_DEVNET = 'https://wallet-rpc.devnet.sui.io/';
export const RPC_MAINNET = 'https://wallet-rpc.mainnet.sui.io/';

export const PACKAGE_MAINNET = '0x20d8abb0943081c206cd6a58c1cbc3fd529184d973aa1723f923a680c1970ffb';
export const PACKAGE_DEVNET = '0x0ebba601ea064e9c65ffad57b4c4ba499bae334fef9b023b3655eeee51c418a4';
export const PACKAGE_TESTNET = '0x14df724b18a097adfb18e6fa1b0c52a021ecae570338ac61921b94d502ebf44d';

export const ITEM_UNIQUE_KEY = Math.floor(100000 + Math.random() * 900000);

export const STATUS_101 = 101 //'Transaction Success'
export const STATUS_102 = 102 //'Transaction Fail'
export const STATUS_103 = 103 //'We couldnt find your transaction, we provide two function "Verify Payment" && "Refresh QR Code"'
export const STATUS_104 = 104 //'The shared transaction id for this order is invalid'
export const STATUS_105 = 105 //'Passing object values are not correct'
export const STATUS_106 = 106 //'The shared transaction id is not correct'
export const STATUS_107 = 107 //'The shared merchant address is not correct'