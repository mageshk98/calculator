import React, { useState } from "react";

import AppStyle from "./App.module.css";
import Calculator from "./Components/Calculator";
import CalcHistory from "./Components/listHistory";

function App() {
  const [calculatorHistory, setCalculatorHistory] = useState([]);
  const updateHistory = (payload) => {
    setCalculatorHistory((prevState) => [...prevState, payload]);
  };
  console.log(calculatorHistory);
  return (
    <div className={AppStyle.App}>
      <h1 className={`${AppStyle.AppTitle}`}>Let's Calculate!!</h1>
      <section className={`${AppStyle.BoxWrapper} container`}>
        <div className="d-flex w-100 h-100">
          <div className={`${AppStyle.leftLayout} ${AppStyle.layout}`}>
            <Calculator updateHistory={updateHistory} />
          </div>
          <div className={`${AppStyle.rightLayout} ${AppStyle.layout}`}>
            <h4 className={`${AppStyle.historyTitle}`}>History</h4>
            <section className={AppStyle.historyLayout}>
              <CalcHistory data={calculatorHistory} />
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
