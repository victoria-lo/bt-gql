import "../App.css";

function Proceed({ buy, auth, vault, flow, amount, setAmount }) {
  //Buy, Authorize or Vault Payment method
  return (
    <div className="input-div">
      <label htmlFor="amount">
        <span className="input-label">Amount (SGD)</span>
        <div>
          <input
            type="tel"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </label>

      <div className="buttons-div">
        <button className="css-button" onClick={buy}>
          Capture
        </button>

        <button className="css-button" onClick={auth}>
          Authorize
        </button>
        {flow === "vault" ? (
          <button className="css-button" onClick={vault}>
            Save Pmt Method
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Proceed;
