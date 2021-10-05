import DropIn from "braintree-web-drop-in-react";
import "../App.css";
import { useState } from "react";
import {Proceed, Result} from "./index";

export default function DropInComponent({
  clientToken,
  transaction,
  reset,
  proceed,
  flow,
  amount,
  setAmount,
}) {
  const [instance, setInstance] = useState(null);

  const capture = async () => {
    const { nonce } = await instance.requestPaymentMethod();
    proceed(nonce, "charge");
  };

  const authorize = async () => {
    const { nonce } = await instance.requestPaymentMethod();
    proceed(nonce, "authorize");
  };

  const vault = async () => {
    const { nonce } = await instance.requestPaymentMethod();
    proceed(nonce, "vault");
  };

  return (
    <div className="result" style={{ textAlign: "left" }}>
      <button style={{marginBottom:"18px"}} onClick={reset}>Back</button>
      <DropIn
        options={{
          authorization: clientToken,
          paypal: { flow: flow==="checkout"?"checkout": "vault", amount, currency: "SGD" },
          vaultManager: true,
          googlePay: {
            googlePayVersion: 2,
            merchantId: 'merchant-id-from-google',
            transactionInfo: {
              totalPriceStatus: 'FINAL',
              totalPrice: amount.toString(),
              currencyCode: 'SGD'
            },
            allowedPaymentMethods: [{
              type: 'CARD',
              parameters: {
                billingAddressRequired: true,
                billingAddressParameters: {
                  format: 'FULL'
                }
              }
            }]
          }
        }}
        onInstance={(instance) => setInstance(instance)}
      />
      {transaction ? (
        <Result transaction={transaction} reset={reset} />
      ) : (
        <Proceed buy={capture} auth={authorize} flow={flow} vault={vault} amount={amount} setAmount={setAmount} />
      )}
    </div>
  );
}
