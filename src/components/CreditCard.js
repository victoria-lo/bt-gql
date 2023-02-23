import "../App.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { TOKENIZE_CARD } from "../gql/Mutation";
import { useValues } from "../ContextProvider";
import {Proceed} from "./index"

export default function CreditCardInput({proceed}) {
    const [cardNumber, setcardNumber] = useState("4111111111111111");
    const [expMonth, setexpMonth] = useState("12");
    const [expYear, setexpYear] = useState("24");
    const [cvv, setCvv] = useState("123");

    const [nonce, setNonce] = useState("");
    const [tokenize, setTokenize] = useState();
    const {transaction, setTransaction} = useValues();

    const capture = async () => {
        proceed(nonce, "charge");
      };
    
      const authorize = async () => {
        proceed(nonce, "authorize");
      };
    
      const vault = async () => {
        proceed(nonce, "vault");
      };

    const [tokenizeCreditCard] = useMutation(TOKENIZE_CARD, {
        onCompleted: (data) => {
            console.log(data);
            setTokenize(data);
            setNonce(data.tokenizeCreditCard.paymentMethod.id)
        },
        onError: (error) => {
            console.log(error);
            alert(error);
        },
    });

    const submitCardDetails = () => {
        tokenizeCreditCard({
            variables: {
                input: {
                    creditCard: {
                        number: cardNumber,
                        expirationYear: expYear,
                        expirationMonth: expMonth,
                        cvv: cvv
                    }
                }
            },
        });
    }

    const reset = () =>{
        setcardNumber("4111111111111111");
        setexpMonth("12");
        setexpYear("24")
        setCvv("123");
        setNonce("");
        setTransaction(null);
    }

    return (
        <div style={{ marginTop: "2rem", textAlign:"center"}}>
            <h3>GraphQL Only Flow</h3>
            {!nonce&&
            <>
            <div className="form-container">
                <div className="field-container">
                    <label htmlFor="cardnumber">Card Number</label>
                    <input id="cardnumber" type="text" pattern="[0-9]*" inputMode="numeric" value={cardNumber} onChange={e => setcardNumber(e.target.value)} />
                </div>
                <div className="field-container" style={{ display: "flex" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyItems: "start" }}>
                        <label htmlFor="expirationdate">ExpMonth</label>
                        <input id="expirationdate" type="text" pattern="[0-9]*" inputMode="numeric" value={expMonth} onChange={e => setexpMonth(e.target.value)} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", justifyItems: "start" }}>
                        <label htmlFor="expirationdate">ExpYear</label>
                        <input id="expirationdate" type="text" pattern="[0-9]*" inputMode="numeric" value={expYear} onChange={e => setexpYear(e.target.value)} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyItems: "start" }}>
                        <label htmlFor="cvv">CVV</label>
                        <input id="cvv" type="text" pattern="[0-9]*" inputMode="numeric" value={cvv} onChange={e => setCvv(e.target.value)} />
                    </div>
                </div>
            </div>

            <button
                className="css-button"
                onClick={submitCardDetails}
                style={{ marginTop: "1.2rem" }}
            >
                Submit
            </button>
            </>}

            {nonce&&!transaction&&
            <>
                <pre style={{ textAlign: "left" }}>
                    {JSON.stringify(tokenize, null, 2)}
                </pre>
                <Proceed buy={capture} auth={authorize} vault={vault} />
            </>}

            {transaction && 
            <div className="result">
                <h3>Process Successful!</h3>
                <pre style={{ textAlign: "left" }}>
                    {JSON.stringify(transaction, null, 2)}
                </pre>
                <button className="css-button" onClick={reset}>
                    Try Again
                </button>
            </div>}
        </div>
    )
}