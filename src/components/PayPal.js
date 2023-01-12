import { Result } from "./index";
import { useValues } from "../ContextProvider";
import {
    PayPalScriptProvider,
    BraintreePayPalButtons,
} from "@paypal/react-paypal-js";
import { useRef } from "react";

export function PayPalComponent({proceed}) {
    const {amount, setAmount, clientToken, reset, flow, transaction} = useValues();
    const amountRef = useRef(null);

    return (
        <div>
            <PayPalScriptProvider
                options={{
                    "client-id": process.env.REACT_APP_CLIENT_ID,
                    "data-client-token": clientToken,
                    intent: flow==="vault"?"tokenize":"capture",
					vault: flow==="vault",
                    currency:"SGD"
                }}
            >
                {flow==="vault"?
                <BraintreePayPalButtons
                fundingSource="paypal"
                createBillingAgreement={(data, actions) => {
                    return actions.braintree.createPayment({
                        flow: "vault",
                        amount: amountRef.current.value,
                        currency: "SGD",
                        intent: "tokenize",
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.braintree
                        .tokenizePayment(data)
                        .then((payload) => {
                            proceed(payload.nonce, "vault");
                        });
                }}
            />:
            <BraintreePayPalButtons
                    fundingSource="paypal"
                    createOrder={(data, actions) => {
                        return actions.braintree.createPayment({
                            flow: "checkout",
                            amount: amountRef.current.value,
                            currency: "SGD",
                            intent: "capture",
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.braintree
                            .tokenizePayment(data)
                            .then((payload) => {
                                proceed(payload.nonce, "charge");
                            });
                    }}
                />         
            }    
            </PayPalScriptProvider>
            {transaction?
                <Result transaction={transaction} reset={reset} />: 
                <div className="input-div">
                <label htmlFor="amount">
                  <span className="input-label">Amount (SGD)</span>
                  <div>
                    <input
                      type="tel"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      ref={amountRef}
                    />
                  </div>
                </label>
              </div>
            }
        </div>
    )
}