import "./App.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CLIENT_TOKEN, CHARGE, AUTHORIZE, VAULT } from "./gql/Mutation";
import { DropInComponent, Hosted, Search } from "./components";
import { useValues } from "./ContextProvider";

function App() {
  const [customerId, setCustomerId] = useState("victoria");

  const [createClientToken] = useMutation(CREATE_CLIENT_TOKEN, {
    onCompleted: (data) => {
      console.log(data);
      setClientToken(data.createClientToken.clientToken);
    },
    onError: (error) => {
      console.log(error);
      alert(error);
    },
  });

  const [chargePaymentMethod] = useMutation(CHARGE, {
    onCompleted: (data) => {
      console.log("Payment Successful");
      console.log(data);
      setTransaction(data);
    },
    onError: (error) => {
      console.log(error);
      alert(error);
    },
  });

  const [authorizePaymentMethod] = useMutation(AUTHORIZE, {
    onCompleted: (data) => {
      console.log("Authorize Successful");
      console.log(data);
      setTransaction(data);
    },
    onError: (error) => {
      console.log(error);
      alert(error);
    },
  });

  const [vaultFromNonce] = useMutation(VAULT, {
    onCompleted: (data) => {
      console.log("Vault Successful");
      console.log(data);
      setTransaction(data);
    },
    onError: (error) => {
      console.log(error);
      alert(error);
    },
  });

  const proceed = async (nonce, action) => {
    console.log(nonce);
    switch (action) {
      case "charge":
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
        break;
      case "authorize":
        authorizePaymentMethod({
          variables: {
            input: {
              paymentMethodId: nonce,
              transaction: {
                amount: amount,
              },
            },
          },
        });
        break;
      case "vault":
        vaultFromNonce({
          variables: {
            input: {
              paymentMethodId: nonce,
              customerId: customerId,
            },
          },
        });
        break;
      default:
        break;
    }
  };

  const loadUI = (paymentType) => {
    createClientToken(
      flow === "vault"
        ? {
            variables: {
              input: {
                clientToken: {
                  customerId: customerId,
                },
              },
            },
          }
        : {}
    );
    setPaymentType(paymentType);
  };

  const {
    amount,
    clientToken,
    setTransaction,
    setFlow,
    setClientToken,
    flow,
    paymentType,
    setPaymentType,
  } = useValues();

  return (
    <div className="App">
      <h1>Braintree GraphQL Demo</h1>
      <p>Mutations</p>
      {clientToken && paymentType === "dropin" ? (
        <div style={{ textAlign: "left" }}>
          <DropInComponent proceed={proceed} />
        </div>
      ) : clientToken && paymentType === "hosted" ? (
        <div className="result" style={{ textAlign: "left" }}>
          <Hosted proceed={proceed} />
        </div>
      ) : (
        <div className="center">
          <div className="flow-options">
            <input
              type="radio"
              value="checkout"
              name="flow"
              defaultChecked
              onChange={(e) => setFlow(e.target.value)}
            />{" "}
            One-time Checkout
            <input
              style={{ marginLeft: "105px" }}
              type="radio"
              value="vault"
              name="flow"
              onChange={(e) => setFlow(e.target.value)}
            />{" "}
            Vault Flow
          </div>
          <div className="center">
            <button className="css-button" onClick={() => loadUI("dropin")}>
              Load Drop-In
            </button>
            <button
              className="css-button"
              onClick={() => loadUI("hosted")}
              style={{ marginTop: "2rem" }}
            >
              Load Hosted Fields
            </button>
          </div>
          <Search />
        </div>
      )}
    </div>
  );
}

export default App;
