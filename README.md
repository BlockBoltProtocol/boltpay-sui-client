# Boltpay Client SDK for Sui Network

## **What is BlockBolt Protocol**
BlockBolt is a decentralized payment protocol on the multichain. It offers seamless, secure, and efficient transactions for businesses and consumers, encouraging cryptocurrency adoption. BlockBolt provides an open-source SDK, plug-and-play services, and resources for developers to create or integrate payment solutions.

The Boltpay Client SDK is a highly beneficial tool that effortlessly integrates into merchant websites. With this tool, merchants can generate QR codes and authenticate payments on the Sui chain. By utilizing a hash verification technique, payments are only approved once they have been successfully processed on the blockchain. This feature enables merchants to conveniently verify payments on the checkout page. Moreover, the Boltpay SDK for Clients handles transactions on the Sui chain, guaranteeing safe and secure delivery of payments to the merchant's wallet.

Please take a look at the sequence diagram that explains the process of the Boltpay Client SDK.

![BlockBolt - Boltpay Client SDK Process](https://blockbolt.io/githubimages/boltpay-sdk-client-sui-network.jpg)

The process involves the following steps:

- **Merchant Website Requests QR Code**: The process begins when the Merchant Website sends a request to the BoltPay Client SDK. This request is for the creation of a QR Code that will be used for payment. This QR Code is unique to the specific transaction that is about to take place.

- **QR Code Creation and Customer Payment**: Upon receiving the request, the Boltpay Client SDK creates the QR Code. This QR Code is then displayed on the Merchant Website, ready to be scanned by the customer for payment. At this point, the customer scans the QR code on the checkout page and makes the payment using the Sui mobile wallet that has already been integrated with the Boltpay Wallet SDK.

- **Payment Verification Request**: After the QR Code has been created, the BoltPay Client SDK sends a request to the Sui Network. This request is to check the payment status for the specific transaction associated with the QR Code. The Boltpay Client SDK uses a listen function to wait for a response from the Sui Network.

- **Transaction Confirmation**: The Sui Network processes the request from the BoltPay Wallet SDK. Once the payment for the specific transaction has been verified, the Sui Network sends a confirmation back to the BoltPay Client SDK.

- **Payment Confirmation**: Upon receiving the confirmation from the Sui Network, the BoltPay Client SDK confirms the payment on the Merchant Website. This lets the Merchant Website know that the payment has been successfully processed.

- **Order Status Update**: Finally, the Merchant Website updates the order status based on the confirmation received from the BoltPay Client SDK. This could involve changing the order status to "Paid" or "Complete", and triggering any post-payment processes such as order fulfillment.

## **Prerequisites**

Before you start, it is important to keep in mind the following guidelines: 

- Do not refresh the checkout page: Please take note that it is crucial not to refresh the page at any given time while proceeding with the checkout process.

In addition, you should have prior knowledge of the following programming languages and frameworks: 

- React.js: A framework utilized for building user interfaces. 
- Next.js: It supports features like server-side rendering and static websites for React applications. 
- Vite: A build tool for modern web projects. 
- TypeScript: A statically typed superset of JavaScript that improves its scalability. 
- JavaScript: The primary language for web development. 

Having a basic understanding of these languages and frameworks will enable you to maximize the potential of the Sui Wallet SDK. Keep in mind that all operations are performed client-side.

## **Installation**
To install the Boltpay Client SDK, simply use npm and follow the straightforward process.

```bash
npm i @blockbolt/boltpay-sui-client
```

## Generate a QR code

The Boltpay Client SDK offers a useful feature - QR code generation. This QR code contains important transaction details that can be easily scanned, making the process of initiating transactions much simpler.

To generate a QR code, the SDK utilizes the `Generator` component that requires a `values` prop. This prop contains all the essential information needed for the QR code generation process.

Below is a thorough explanation of the `values` prop.

- **`merchantAmount`**: The merchant has provided a specific numerical value that they wish to transfer. However, if the customer's wallet balance is less than this amount, the transaction will not be successful.
- **`merchantAddress`**: Please provide the correct Sui wallet address (merchant wallet address) where the funds should be sent to ensure they reach the correct destination.
- **`merchantNetwork`**: To conduct a transaction, you must select the appropriate network. If you are conducting a trial run, you may opt for the "testnet." However, for actual transactions, the "mainnet" should be utilized.

Here's an example of how you can do this:

```bash
import Generator from '@blockbolt/boltpay-sui-client'

const generators = {
    merchantAmount: number // merchant transfer amount (ex. 1)
	  merchantAddress: string // merchant or receiver addrees
	  merchantNetwork: string // merchant selected network (ex. testnet)
}

return (
	<Geneartor values={generators} />
)
```

In this scenario, a QR code will be created to represent a transaction of transferring 1 unit of cryptocurrency (1 $sui) to the designated address on the testnet network. The address is specified as RECEIVER_ADDRESS.


### QR Code Generation for Payment-receiving DeFi Smart Contracts

The `Generator` component generates QR codes for Payment-receiving DeFi Smart Contracts. It receives an object `scanValues` that contains the necessary information for creating a QR code. Here is an example of how to use the component:

```bash
import { TransactionBlock } from '@mysten/sui.js'
import { listen, verifyPayment, Generator } from '@blockbolt/boltpay-sui-client'
const tx = new TransactionBlock();

const defiPaymentsData = {
SUI_PACKAGE_ID: 'someValue',
PACKAGE_MODULE_NAME: 'someValue',
FUNCTION_NAME: 'someValue',
network: 'someValue',
arguments: ['argument1', 'argument2', ...],
blockchain: 'someValue',
typeArguments: ['someValue'],
platform_name: 'someValue',
};
```

```bash
<Generator scanValues={defiPaymentsData} />
```
The object named "scanValues" must include the following properties:

- **`SUI_PACKAGE_ID`**: Here is the specific identification id for the DeFi package you are currently using.
- **`PACKAGE_MODULE_NAME`**: This is the name of the specific module within the DeFi package.
- **`FUNCTION_NAME`**: This is the specific function you are calling within the module.
- **`network`**: This is the network you are operating on (e.g., mainnet, testnet, etc.).
- **`arguments`**: This array of arguments will be passed to the function call. The arguments should be filled as per the requirements of the specific function being called.
- **`blockchain`**: This is the blockchain that you are operating on.
- **`typeArguments`**: This is an array of type arguments for the function call.
- **`platform_name`**: This is the name of the platform you are working with.


To initiate a transaction seamlessly, scan this QR code using a Sui wallet app that has integrated Blockbolt payment protocol. The app will auto-populate the transaction details and prompt you to confirm the transaction.

## Listening to Transaction Responses

When dealing with blockchain transactions, it's important to stay alert for any updates or modifications regarding the transaction status. The SDK offers a helpful solution with its **`listen`** function.

To utilize the **`listen`** function, simply provide an object as an argument that contains the necessary network details to monitor. The function will then continuously keep track of the network for any transaction-related updates.

To provide more insight, let's examine the **`details`** object:

- **`network`**: This parameter identifies the network where the transaction is taking place. You can choose from three options: `mainnet`, `testnet`, or `devnet`.

Here's an example of how you can use the `listen` function:

```bash
import { listen } from '@blockbolt/boltpay-sui-client'

const listens = {
    network: string // Options: mainnet, testnet, devnet
}

const onListen = async () => {
    const listen_response = await listen(details)
    console.log(listen_response)
}

useEffect(() => {
    onListen();
}, [])
```

Here's an example where we've created an asynchronous function called **`onListen`** that uses network details to call the **`listen`** function. The function's response, as well as the transaction status, are both logged in the console.

To ensure that it only runs once when the component mounts, we use **`useEffect`** to call **`onListen`**. This listener is set up during the rendering of the component, enabling you to react to changes in transaction status in real time.

## Verify Payment

To ensure the success of a transaction on the blockchain, verifying it is a crucial step. The Boltpay Client SDK has a useful function called "verifyPayment" that can assist you in this process.

To verify a payment, the function **`verifyPayment`** requires an object containing all the essential details for verification purposes. These details comprise:

- **`network`**: Please specify the network where the transaction occurred by choosing from one of the following options: "mainnet", "testnet", or "devnet".
- **`digest`**: Here is the transaction digest that you wish to verify.

Here's an example of how you can use the **`verifyPayment`** function:

```bash
import { verifyPayment } from '@blockbolt/boltpay-sui-client'

const verifyPayments = {
    network: string // Options: mainnet, testnet, devnet
    digest: string // transaction digest
  }

const onCheckTxn = async () => {
    const verify_response = await verifyPayment(digestData)
    console.log(verify_response)
}
```

In this example, we define an **`onCheckTxn`** async function which calls the **`verifyPayment`** function with the network and digest details. After that, the function logs the response from **`verifyPayment`** to the console, along with the status of the verification process.

Our Delay Order Solution addresses the issue of payments made by customers not being reflected on the merchant website due to blockchain network congestion. To overcome this situation, we have implemented a manual verification function that is activated upon receiving the 103 Error code. This allows for prompt resolution of any blockchain payment delays.

## **Errors & Responses**

- 101 = Transaction Success
- 102 = Transaction Fail
- 103 = We couldn't locate your transaction. You can attempt to find it using the "Verify Payment" function or by regenerating the QR code
- 104 = The shared transaction id for this order is invalid
- 105 = Passing object values are not correct
- 106 = The shared transaction id is not correct
- 107 = The shared merchant address is not correct


**Disclaimer: Please note that the BlockBolt protocol relies solely on blockchain verification for payment confirmation and process.**

**Do you encounter any issues or require assistance? Kindly send us an email at support@blockbolt.io or submit a support ticket on our Discord server https://discord.gg/Fb8CA6ny67. We are ready to help you out.**
