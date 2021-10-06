import DropIn from "braintree-web-drop-in-react";
import "../App.css";
import { useState } from "react";
import {Proceed, Result} from "./index";
import { useValues } from "../ContextProvider";

export default function DropInComponent({
  proceed
}) {
  const {amount, clientToken, reset, flow, transaction} = useValues();
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
      {flow==="vault"?<p>Note: Vaulted GooglePay cards will not be displayed in Drop-in.</p>:null}
      {transaction ? <Result /> : <Proceed buy={capture} auth={authorize} vault={vault} />}
    </div>
  );
}
