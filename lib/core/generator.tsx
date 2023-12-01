import QRCode from "qrcode.react";
import React from "react";
import {
  BLOCKCHAIN_NAME,
  COIN_NAME,
  COIN_TYPE,
  ITEM_UNIQUE_KEY,
  STATUS_107,
} from "../utils/index";

interface Generators {
  merchantAmount: number;
  merchantAddress: string;
  merchantName: string;
  merchantNetwork: string;
}

interface GeneratorProps {
  generators: Generators;
}

const Generator: React.FC<GeneratorProps> = ({ generators }) => {
  const SUI_ADDRESS_REGEX = /^0x[a-fA-F0-9]{64}$/;
  const isValidForGenerateQr = SUI_ADDRESS_REGEX.test(
    generators.merchantAddress
  )
    ? true
    : false;

  if (!isValidForGenerateQr) {
    throw new Error(`${STATUS_107}`);
  }

  let data = {
    merchant_address: generators.merchantAddress,
    merchant_name: generators.merchantName,
    order_id: ITEM_UNIQUE_KEY,
    amount: generators.merchantAmount,
    network: generators.merchantNetwork,
    blockchain: BLOCKCHAIN_NAME,
    coin_name: COIN_NAME,
    coin_type: COIN_TYPE,
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

export default Generator;
