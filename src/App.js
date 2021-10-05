import "./App.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CLIENT_TOKEN, CHARGE, AUTHORIZE, VAULT } from "./gql/Mutation";
import { DropInComponent, Hosted, Search } from "./components";

function App() {
  const [customerId, setCustomerId] = useState("victoria");
  const [flow, setFlow] = useState("checkout");

  const [createClientToken] = useMutation(CREATE_CLIENT_TOKEN, {
    onCompleted: (data) => {
      console.log(data);
      setClientToken(data.createClientToken.clientToken);
    },
  });

  const [chargePaymentMethod] = useMutation(CHARGE, {
    onCompleted: (data) => {
      console.log("Payment Successful");
      console.log(data);
      setTransaction(data);
    },
  });

  const [authorizePaymentMethod] = useMutation(AUTHORIZE, {
    onCompleted: (data) => {
      console.log("Authorize Successful");
      console.log(data);
      setTransaction(data);
    },
  });

  const [vaultFromNonce] = useMutation(VAULT, {
    onCompleted: (data) => {
      console.log("Vault Successful");
      console.log(data);
      setTransaction(data);
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

  const [clientToken, setClientToken] = useState();
  const [transaction, setTransaction] = useState(null);
  const [amount, setAmount] = useState(1);
  const [paymentType, setPaymentType] = useState();

  const reset = () => {
    setClientToken(null);
    setTransaction(null);
    setPaymentType(null);
    setFlow("checkout");
  };

  return (
    <div className="App">
      <h1>Braintree GraphQL Demo</h1>
      <p>Mutations</p>

      {clientToken && paymentType === "dropin" ? (
        <div style={{ textAlign: "left" }}>
          <DropInComponent
            clientToken={clientToken}
            amount={amount}
            setAmount={setAmount}
            transaction={transaction}
            proceed={proceed}
            flow={flow}
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
            proceed={proceed}
            flow={flow}
            reset={reset}
          />
        </div>
      ) : (
        <div className="center">
          <div className="flow-options">
            <input
              type="radio"
              id="choice1"
              value="checkout"
              name="flow"
              defaultChecked
              onChange={(e) => setFlow(e.target.value)}
            />{" "}
            One-time Checkout
            <input
              style={{ marginLeft: "105px" }}
              type="radio"
              id="choice2"
              value="vault"
              name="flow"
              onChange={(e) => setFlow(e.target.value)}
            />{" "}
            Vault Flow
          </div>
          <div className="center">
            <button
              className="css-button"
              onClick={() => {
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
                setPaymentType("dropin");
              }}
            >
              Load Drop-In
            </button>
            <button
              className="css-button"
              onClick={() => {
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
                setPaymentType("hosted");
              }}
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
