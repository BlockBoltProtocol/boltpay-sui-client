import superagent from "superagent";
import {
  ITEM_UNIQUE_KEY,
  RPC_TESTNET,
  RPC_DEVNET,
  RPC_MAINNET,
  PACKAGE_TESTNET,
  PACKAGE_DEVNET,
  PACKAGE_MAINNET,
  STATUS_103,
  STATUS_101,
  STATUS_102,
  STATUS_105,
  getNetworkUrl,
  getPackageID,
} from "../utils/index";

interface Listens {
  network: string;
}

export const listen = async (listens: Listens) => {
  let checkData = 1;
  let attempts = 1;
  var responses: any[] = [];

  const onLastTransaction = async (randomKey: number) => {
    const getNetwork = listens.network.toLowerCase();
    const networkUrl = getNetworkUrl(getNetwork);
    const packageId = getPackageID(getNetwork);

    const data = {
      method: "suix_queryTransactionBlocks",
      jsonrpc: "2.0",
      params: [
        {
          filter: {
            InputObject: packageId,
          },
          options: {
            showEffects: true,
            showInput: true,
          },
        },
        null,
        1,
        true,
      ],
      id: "1",
    };

    try {
      const res = await superagent.post(networkUrl).send(data);
      if (res && res.body && res.body.result) {
        const { data } = res.body.result;
        if (
          data &&
          data[0] &&
          data[0].transaction &&
          data[0].transaction.data.transaction.inputs.length === 4 &&
          data[0].transaction.data.transaction.inputs[2].value ===
            randomKey.toString()
        ) {
          if (
            data &&
            data[0] &&
            data[0].effects &&
            data[0].effects.status &&
            data[0].effects.status.status == "success"
          ) {
            checkData += 1;
            responses.push(STATUS_101);
          } else {
            responses.push(STATUS_102);
          }
        } else {
          if (checkData == 1 && attempts <= 100) {
            attempts += 1;
            const ts = await onLastTransaction(randomKey);
            if (ts !== undefined) {
              responses.push(ts);
            }
          } else {
            responses.push(STATUS_103);
          }
        }
      }
    } catch (error) {
      responses.push(`${error}`);
    }
  };

  if (listens.network !== null && listens.network !== undefined) {
    const ts = await onLastTransaction(ITEM_UNIQUE_KEY);
    return responses && responses[0];
  } else {
    return STATUS_105;
  }
};
