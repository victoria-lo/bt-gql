import "./App.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CLIENT_TOKEN, CHARGE_PAYMENT_METHOD } from "./gql/Mutation";
import DropInComponent from "./components/DropIn";
import Hosted from "./components/Hosted";

function App() {
  const [createClientToken] = useMutation(CREATE_CLIENT_TOKEN, {
    onCompleted: (data) => {
      console.log(data);
      setClientToken(data.createClientToken.clientToken);
    },
  });

  const [chargePaymentMethod] = useMutation(CHARGE_PAYMENT_METHOD, {
    onCompleted: (data) => {
      console.log("Payment Successful");
      console.log(data);
      setTransaction(data);
    },
  });

  const buy = async (nonce) => {
    console.log(nonce);
    chargePaymentMethod({
      variables: {
        input: {
          paymentMethodId: nonce,
          transaction: {
            amount: amount,
          },
        },
      },
    });
  };

  
  const [clientToken, setClientToken] = useState();
  const [transaction, setTransaction] = useState(null);
  const [amount, setAmount] = useState(1);
  const [paymentType, setPaymentType] = useState();

  const reset = () => {
    setClientToken(null);
    setTransaction(null);
    setPaymentType(null);
  };

  return (
    <div className="App">
      <h1>Braintree GraphQL Demo</h1>
      {clientToken && paymentType === "dropin" ? (
        <div style={{ textAlign: "left" }}>
          <DropInComponent
            clientToken={clientToken}
            amount={amount}
            setAmount={setAmount}
            transaction={transaction}
            buy={buy}
            reset={reset}
          />
        </div>
      ) : clientToken && paymentType === "hosted" ? (
        <div className="result" style={{ textAlign: "left" }}>
          <Hosted
            clientToken={clientToken}
            amount={amount}
            setAmount={setAmount}
            transaction={transaction}
            buy={buy}
            reset={reset}
          />
        </div>
      ) : (
        <div className="payment-methods">
          <button
            className="css-button"
            onClick={() => {
              createClientToken();
              setPaymentType("dropin");
            }}
          >
            Load Drop-In
          </button>
          <button
            className="css-button"
            onClick={() => {
              createClientToken();
              setPaymentType("hosted");
            }}
            style={{ marginTop: "2rem" }}
          >
            Load Hosted Fields
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
