import React from "react";
import "../App.css";
import { useValues } from "../ContextProvider";

export default function Result() {
  const {transaction, reset} = useValues();
  return (
    <div className="result">
      <h3>Process Successful!</h3>
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(transaction, null, 2)}
      </pre>
      <button className="css-button" onClick={reset}>
        Try Again
      </button>
    </div>
  );
}
