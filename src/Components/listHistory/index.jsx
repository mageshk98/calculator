import React from "react";
import HistoryStyle from "./style.module.css";
function CalcHistory({ data = [] }) {
  return (
    <ul className={`${HistoryStyle.list}`}>
      {data.length > 0 ? (
        data.map((_history, index) => (
          <li key={index}>
            <small className={`${HistoryStyle.expression}`}>
              {_history.expression}
            </small>
            <strong className={`${HistoryStyle.result}`}>
              {_history.result}
            </strong>
          </li>
        ))
      ) : (
        <li>There is no history yet.</li>
      )}
    </ul>
  );
}
export default CalcHistory;
