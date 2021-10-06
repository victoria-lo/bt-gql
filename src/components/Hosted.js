import { Braintree, HostedField } from "react-braintree-fields";
import "../App.css";
import { useState } from "react";
import {Proceed, Result} from "./index";
import { useValues } from "../ContextProvider";

export default function Hosted({
  proceed
}) {
  const [tokenize, setTokenizeFunc] = useState();
  const {clientToken, reset, transaction} = useValues();
  const capture = () => {
    tokenize().then((data) => proceed(data.nonce, "charge"));
  };

  const authorize = () => {
    tokenize().then((data) => proceed(data.nonce, "authorize"));
  };
  const vault = () => {
    tokenize().then((data) => proceed(data.nonce, "vault"));
  };
  
  return (
    <div>
      <button style={{marginBottom:"18px"}} onClick={reset}>Back</button>
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
        <Proceed buy={capture} auth={authorize} vault={vault} />
      )}
    </div>
  );
}
