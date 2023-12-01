import superagent from "superagent";
import {
  ITEM_UNIQUE_KEY,
  RPC_TESTNET,
  RPC_DEVNET,
  RPC_MAINNET,
  STATUS_104,
  STATUS_101,
  STATUS_102,
  STATUS_105,
  STATUS_106,
} from "../utils/index";

interface VerifyPayments {
  network: string;
  digest: string;
}

export const verifyPayment = async (verifyPayments: VerifyPayments) => {
  const onHashTransaction = async (randomKey: number) => {
    const getNetwork = verifyPayments.network;
    const getTxnDigest = verifyPayments.digest;

    const networkUrl =
      getNetwork == "testnet"
        ? RPC_TESTNET
        : getNetwork == "devnet"
        ? RPC_DEVNET
        : RPC_MAINNET;

    const data = {
      jsonrpc: "2.0",
      id: 1,
      method: "sui_getTransactionBlock",
      params: [
        getTxnDigest,
        {
          showInput: true,
          showEffects: true,
        },
      ],
    };

    try {
      const res = await superagent.post(networkUrl).send(data);
      if (res && res.body && res.body.error) {
        return STATUS_106;
      }
      if (res && res.body && res.body.result) {
        const { transaction } = res.body.result;
        const { effects } = res.body.result;
        if (
          transaction &&
          transaction.data.transaction.inputs.length === 4 &&
          transaction.data.transaction.inputs[2].value === randomKey.toString()
        ) {
          if (
            effects &&
            effects.status &&
            effects.status.status === "success"
          ) {
            return STATUS_101;
          } else if (
            effects &&
            effects.status &&
            effects.status.status === "failure"
          ) {
            return STATUS_102;
          }
        } else {
          return STATUS_104;
        }
      }
    } catch (error) {
      return `${error}`;
    }
  };

  if (
    verifyPayments &&
    verifyPayments.network !== null &&
    verifyPayments !== undefined &&
    verifyPayments.digest !== null &&
    verifyPayments.digest !== undefined
  ) {
    const ts = await onHashTransaction(ITEM_UNIQUE_KEY);
    return ts;
  } else {
    return STATUS_105;
  }
};
