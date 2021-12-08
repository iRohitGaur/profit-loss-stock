import "./styles.css";
import { useState } from "react";

export default function App() {
  const [initialPrice, setInitialPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [currentPrice, setCurrentPrice] = useState();
  const [isProfitable, setIsProfitable] = useState(false);
  const [result, setResult] = useState("");

  const checkPnL = (e) => {
    const buyPrice = Number(initialPrice);
    const qty = Number(quantity);
    const curPrice = Number(currentPrice);
    if (
      !isNaN(buyPrice) &&
      !isNaN(qty) &&
      !isNaN(curPrice) &&
      initialPrice !== "" &&
      quantity !== "" &&
      currentPrice !== ""
    ) {
      if (buyPrice <= 0 || qty <= 0 || curPrice < 0) {
        setIsProfitable(false);
        setResult("values cannot be zero or negative");
      } else {
        if (buyPrice < curPrice) {
          const profit = (curPrice - buyPrice) * qty;
          const perc = ((curPrice - buyPrice) / buyPrice) * 100;
          setIsProfitable(true);
          setResult(
            `▲ Stock is up by ${perc.toFixed(2)}%. Your profit is ${profit}.`
          );
        } else if (buyPrice > curPrice) {
          const loss = (buyPrice - curPrice) * qty;
          const perc = ((buyPrice - curPrice) / buyPrice) * 100;
          setIsProfitable(false);
          setResult(
            `▼ Stock is down by ${perc.toFixed(2)}%. Your loss is ${loss}.`
          );
        } else {
          setIsProfitable(true);
          setResult("No Profit. No Loss");
        }
      }
    } else {
      setIsProfitable(false);
      setResult("invalid or incomplete details");
    }
  };

  return (
    <div className="App">
      <div className="app__title">Stock profit & loss calculator</div>
      <input
        className="pnl__items pnl__inputname pnl__input"
        type="number"
        placeholder="Buying Price of Stock"
        onChange={(e) => setInitialPrice(e.target.value)}
      />
      <input
        className="pnl__items pnl__inputname pnl__input"
        type="number"
        placeholder="Quantity of Stock"
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        className="pnl__items pnl__inputname pnl__input"
        type="number"
        placeholder="Current Price of Stock"
        onChange={(e) => setCurrentPrice(e.target.value)}
      />
      <input
        type="submit"
        className="pnl__inputname pnl__submit"
        value="Calculate"
        onClick={checkPnL}
      />
      <div className={`app__resultlabel ${isProfitable ? "greenres" : ""}`}>
        {result}
      </div>
      <div className="footer">
        Made by <a href="https://rohit.xyz">Rohit Gaur</a> with{" "}
        <i className="fab fa-react"></i> and <i className="fa fa-heart"></i>
      </div>
    </div>
  );
}
