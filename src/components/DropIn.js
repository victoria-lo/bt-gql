import DropIn from "braintree-web-drop-in-react";
import "../App.css";
import { useState } from "react";
import Buy from "./Buy";
import Result from "./Result";

export default function DropInComponent({
  clientToken,
  transaction,
  reset,
  buy,
  amount,
  setAmount,
}) {
  const [instance, setInstance] = useState(null);

  const getNonce = async () => {
    const { nonce } = await instance.requestPaymentMethod();
    buy(nonce);
  };

  return (
    <div className="result" style={{ textAlign: "left" }}>
      <DropIn
        options={{
          authorization: clientToken,
          //paypal: { flow: "checkout", amount, currency: "SGD" },
        }}
        onInstance={(instance) => setInstance(instance)}
      />
      {transaction ? (
        <Result transaction={transaction} reset={reset} />
      ) : (
        <Buy buy={getNonce} amount={amount} setAmount={setAmount} />
      )}
    </div>
  );
}
