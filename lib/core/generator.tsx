import QRCode from "qrcode.react";
import React from "react";
import { ITEM_UNIQUE_KEY, STATUS_105, STATUS_107 } from "../utils/index";

interface Generators {
  merchantAmount: number;
  merchantAddress: string;
  merchantNetwork: string;
}

const Geneartor = (generators: Generators) => {
  const entries = Object.values(generators);
  const isValidObject =
    entries &&
    entries[0] &&
    entries[0].merchantAddress &&
    entries[0].merchantAmount &&
    entries[0].merchantNetwork
      ? "true"
      : "false";

  if (isValidObject !== "true") {
    throw new Error(`${STATUS_105}`);
  }

  const SUI_ADDRESS_REGEX = /^0x[a-fA-F0-9]{64}$/;
  const isValidForGenerateQr =
    isValidObject === "true" &&
    SUI_ADDRESS_REGEX.test(entries[0].merchantAddress)
      ? true
      : false;

  if (!isValidForGenerateQr) {
    throw new Error(`${STATUS_107}`);
  }

  let data = {
    merchant_id: ITEM_UNIQUE_KEY,
    merchant_address: entries && entries[0] && entries[0].merchantAddress,
    merchant_amount: entries && entries[0] && entries[0].merchantAmount,
    merchant_network: entries && entries[0] && entries[0].merchantNetwork,
  };
  let stringdata = JSON.stringify(data);

  return (
    <div>
      {isValidForGenerateQr && (
        <>
          <p>Please Do Not Refresh This Page</p>
          <QRCode value={stringdata} />
        </>
      )}
    </div>
  );
};

export default Geneartor;
