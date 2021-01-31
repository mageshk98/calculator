import React, { useState } from "react";

import AppStyle from "./App.module.css";
import Calculator from "./Components/Calculator";
import CalcHistory from "./Components/listHistory";

function App() {
  const [calculatorHistory, setCalculatorHistory] = useState([]);
  const updateHistory = (payload) => {
    setCalculatorHistory((prevState) => [...prevState, payload]);
  };
  const clearHistory = () => {
    setCalculatorHistory([]);
  };

  return (
    <div className={AppStyle.App}>
      <h1 className={`${AppStyle.AppTitle}`}>Let's Calculate!!</h1>
      <section className={`${AppStyle.BoxWrapper} container`}>
        <div className="d-flex w-100 h-100">
          <div className={`${AppStyle.leftLayout} ${AppStyle.layout}`}>
            <Calculator updateHistory={updateHistory} />
          </div>
          <div className={`${AppStyle.rightLayout} ${AppStyle.layout}`}>
            <div className="d-flex justify-content-between align-items-center mx-4 ">
              <h4 className={`${AppStyle.historyTitle}`}>History</h4>
              <button
                className={`${AppStyle.historyClear}`}
                onClick={clearHistory}
              >
                clear
              </button>
            </div>

            <section className={AppStyle.historyLayout}>
              <CalcHistory data={calculatorHistory} />
            </section>
            <p className={`${AppStyle.credits}`}>
              Developed by{" "}
              <a href="https://www.linkedin.com/in/mageshkumarofficial/">
                Magesh K
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
