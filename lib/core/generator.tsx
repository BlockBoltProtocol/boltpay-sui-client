import QRCode from "qrcode.react";
import React from "react";
import { ITEM_UNIQUE_KEY } from "../utils/index";

interface Generators {
  merchantAmount: number;
  merchantAddress: string;
  merchantNetwork: string;
}

interface DefiPayments {
  SUI_PACKAGE_ID: string;
  PACKAGE_MODULE_NAME: string;
  FUNCTION_NAME: string;
  network: string;
  arguments: any[];
  blockchain: string;
  typeArguments: string[];
  platform_name: string;
}
type ScanValues = Generators | DefiPayments;

const Generator: React.FC<{ scanValues: ScanValues }> = ({ scanValues }) => {
  let isValidForGenerateQr = false;
  let stringdata = '';
  const STATUS_105 = 'Error status 105';
  const STATUS_111 = 'Enter Values are wrong!';



  if ('merchantAmount' in scanValues && 'merchantAddress' in scanValues && 'merchantNetwork' in scanValues) {
    const generators = scanValues as Generators;
    const SUI_ADDRESS_REGEX = /^0x[a-fA-F0-9]{64}$/;

    if (!generators.merchantAddress || !generators.merchantAmount || !generators.merchantNetwork || !SUI_ADDRESS_REGEX.test(generators.merchantAddress)) {
      throw new Error(STATUS_105);
    } else {
      isValidForGenerateQr = true;
    }

    let data = {
      merchant_id: ITEM_UNIQUE_KEY,
      merchant_address: generators.merchantAddress,
      merchant_amount: generators.merchantAmount,
      merchant_network: generators.merchantNetwork,
    };

    stringdata = JSON.stringify(data);
  }

  else if ('SUI_PACKAGE_ID' in scanValues && 'PACKAGE_MODULE_NAME' in scanValues && 'FUNCTION_NAME' in scanValues && "network" in scanValues && "arguments" in scanValues && "blockchain" in scanValues && 'typeArguments' in scanValues && 'platform_name' in scanValues) {

    const defiPayments = scanValues as DefiPayments;

    if (!defiPayments.SUI_PACKAGE_ID || !defiPayments.PACKAGE_MODULE_NAME || !defiPayments.FUNCTION_NAME || !defiPayments.network || !defiPayments.blockchain) {

      throw new Error(STATUS_111);
    } else {
      isValidForGenerateQr = true;

    }
    let data = {
      sui_package_id: defiPayments.SUI_PACKAGE_ID,
      package_module: defiPayments.PACKAGE_MODULE_NAME,
      module_function_name: defiPayments.FUNCTION_NAME,
      merchant_network: defiPayments.network,
      function_arguments: defiPayments.arguments,
      blockchain_name: defiPayments.blockchain,
      coin_typeArguments: defiPayments.typeArguments,
      platform_name: defiPayments.platform_name,
    };

    stringdata = JSON.stringify(data);

  } else {
    console.log('Lost in Space');

  }

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
