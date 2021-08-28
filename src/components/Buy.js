import "../App.css";

function Buy({buy, amount, setAmount}) {

  return (
    <div className="amount-div">
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

      <button className="css-button" onClick={buy}>
        Buy
      </button>
    </div>
  );
}

export default Buy;
