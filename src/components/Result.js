import React from "react";
import "../App.css";

export default function Result({transaction, reset}) {
  return (
    <div className="result">
      <h3>Payment Successful!</h3>
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(transaction, null, 2)}
      </pre>
      <button className="css-button" onClick={reset}>
        Try Again
      </button>
    </div>
  );
}
