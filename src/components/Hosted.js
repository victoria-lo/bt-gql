import { Braintree, HostedField } from "react-braintree-fields";
import "../App.css";
import { useState } from "react";
import Buy from "./Buy";
import Result from "./Result";

export default function Hosted({
  clientToken,
  transaction,
  reset,
  amount,
  setAmount,
  buy,
}) {
  const [tokenize, setTokenizeFunc] = useState();

  const getToken = () => {
    tokenize().then((data) => buy(data.nonce));
  };
  
  return (
    <div>
      <Braintree
        authorization={clientToken}
        getTokenRef={(ref) => setTokenizeFunc(() => ref)}
      >
        <div>
          <span className="input-hosted">Card Number</span>
          <HostedField
            className="hosted-fields"
            type="number"
            prefill="4111 1111 1111 1111"
          />
          <span className="input-hosted">Expiration Date</span>
          <HostedField
            className="hosted-fields"
            type="expirationDate"
            prefill="12/23"
          />
          <span className="input-hosted">CVV</span>
          <HostedField className="hosted-fields" type="cvv" prefill="123" />
        </div>
      </Braintree>

      {transaction ? (
        <Result transaction={transaction} reset={reset} />
      ) : (
        <Buy buy={getToken} amount={amount} setAmount={setAmount} />
      )}
    </div>
  );
}
