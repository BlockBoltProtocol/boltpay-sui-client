export const RPC_TESTNET = "https://wallet-rpc.testnet.sui.io/";
export const RPC_DEVNET = "https://wallet-rpc.devnet.sui.io/";
export const RPC_MAINNET = "https://wallet-rpc.mainnet.sui.io/";

export const PACKAGE_MAINNET =
  "0x20d8abb0943081c206cd6a58c1cbc3fd529184d973aa1723f923a680c1970ffb";
export const PACKAGE_DEVNET =
  "0x0ebba601ea064e9c65ffad57b4c4ba499bae334fef9b023b3655eeee51c418a4";
export const PACKAGE_TESTNET =
  "0x2b4232ac9939d5569a8ef75f951c8448749b02a25143000d89c336238ec69558";

export const BLOCKCHAIN_NAME = "SUI";
export const COIN_NAME = "SUI";
export const COIN_TYPE =
  "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI";

export const ITEM_UNIQUE_KEY = Math.floor(100000 + Math.random() * 900000);

export const STATUS_101 = 101; //'Transaction Success'
export const STATUS_102 = 102; //'Transaction Fail'
export const STATUS_103 = 103; //'We couldnt find your transaction, we provide two function "Verify Payment" && "Refresh QR Code"'
export const STATUS_104 = 104; //'The shared transaction id for this order is invalid'
export const STATUS_105 = 105; //'Passing object values are not correct'
export const STATUS_106 = 106; //'The shared transaction id is not correct'
export const STATUS_107 = 107; //'The shared merchant address is not correct'

export const getNetworkUrl = (network: any) => {
  switch (network) {
    case "Testnet":
      return RPC_TESTNET;
    case "Devnet":
      return RPC_DEVNET;
    case "Mainnet":
      return RPC_MAINNET;

    default:
      return RPC_TESTNET;
  }
};

export const getPackageID = (network: any) => {
  switch (network) {
    case "Testnet":
      return PACKAGE_TESTNET;
    case "Devnet":
      return PACKAGE_DEVNET;
    case "Mainnet":
      return PACKAGE_MAINNET;

    default:
      return PACKAGE_TESTNET;
  }
};
