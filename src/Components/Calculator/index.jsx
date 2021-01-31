import React, { useState } from "react";

import CalcStyle from "./calculator.module.css";
function Calculator(props) {
  const InitialState = {
    expression: "0",
    value: null,
    resultValue: "0",
    isOperatorGiven: false,
    operator: null,
  };
  const [calState, setCalState] = useState(InitialState);
  const [state, setState] = useState(false);
  const OPERATIONS = {
    "/": (operand1, operand2) => operand1 / operand2,
    "*": (operand1, operand2) => operand1 * operand2,
    "+": (operand1, operand2) => operand1 + operand2,
    "-": (operand1, operand2) => operand1 - operand2,
    "=": (operand1, operand2) => operand2,
    power: (operand) => Math.pow(operand, 2),
    sqrt: (operand) => Math.sqrt(operand),
    negate: (operand) => operand * -1,
  };
  const updateDisplay = (val) => {
    let { isOperatorGiven, expression, resultValue } = calState;
    if (isOperatorGiven) {
      // if (/power|sqrt/g.test(expression)) {
      //   console.log("yeah poweror sqrt is there");
      // }
      setCalState({
        ...calState,
        resultValue: state ? String(val) : resultValue + val,
        expression: /power|sqrt/g.test(expression)
          ? expression
          : expression === "0"
          ? String(val)
          : expression + val,
      });
      if (state) {
        setState(false);
      }
    } else {
      setCalState({
        ...calState,
        resultValue: resultValue === "0" ? String(val) : resultValue + val,
      });
    }
  };
  //   const validate = (coperator) => {
  //     let expression = { calState };
  //     if (/\W/g.search(expression)) {
  //       return true;
  //     }
  //     return false;
  //   };
  const calculate = (currentoperator) => {
    let { value, resultValue, operator } = calState;

    let tempState = { ...calState };
    let inputValue = parseFloat(resultValue);
    // if (validate(currentoperator)) return;
    // if (isOperatorGiven && value !== null && resultValue !== "0") {
    //   let trimmed = String(expression).slice(
    //     expression.length * -1,
    //     expression.length - 1
    //   );
    //   console.log(trimmed);
    //   tempState.expression = trimmed + String(currentoperator);
    // } else
    if (value === null) {
      tempState.value = inputValue;
      tempState.isOperatorGiven = true;
      if (["sqrt", "power"].includes(currentoperator)) {
        tempState.expression = `${currentoperator}(${resultValue})`;
        tempState.isOperatorGiven = false;
      } else if (currentoperator !== "=") {
        tempState.expression = resultValue + String(currentoperator);
      }

      setState(true);
    } else if (operator) {
      let result = "";
      result = OPERATIONS[operator](value, inputValue);
      props.updateHistory({ expression: tempState.expression, result });
      tempState.value = null;
      tempState.resultValue = String(result);
      tempState.isOperatorGiven = true;
    }
    tempState.operator = String(currentoperator);
    setCalState(tempState);
  };
  const handleKeyBoard = (e) => {
    let { key, target } = e;
    e.preventDefault();
    let currentKey = key || target.name;

    if (!currentKey) return;
    if (currentKey === "Enter") {
      currentKey = "=";
    }
    if (/\d/.test(currentKey)) {
      updateDisplay(parseInt(currentKey));
    } else if (currentKey === "negate") {
      let result = OPERATIONS[currentKey](resultValue);
      setCalState({ ...calState, resultValue: result });
    } else if (currentKey in OPERATIONS) {
      calculate(currentKey);
    } else if (currentKey === "dot") {
      if (!/\./.test(resultValue)) {
        setCalState({ ...calState, resultValue: resultValue + "." });
      }
    } else if (currentKey === "backspace") {
      let newValue = "";
      if (!["Cannot divide by Zero", "NaN", "Infinity"].includes(resultValue)) {
        newValue = resultValue.slice(0, -1) || "0";
      }
      setCalState({
        ...calState,
        resultValue: newValue,
      });
    } else if (currentKey === "clear") {
      setCalState(InitialState);
    }
  };

  let { expression, resultValue } = calState;

  return (
    <div className="d-flex flex-column h-100">
      <div className={`${CalcStyle.topLayout}`}>
        <p className={`${CalcStyle.expression}`}>{expression}</p>

        <strong className={`${CalcStyle.result}`}>{resultValue}</strong>
      </div>
      <div className={`${CalcStyle.bottomLayout}`}>
        <div className="d-flex w-100 h-100">
          <ul className={`${CalcStyle.calcBtnList}`} onClick={handleKeyBoard}>
            <li>
              <button name="clear" title="Clear">
                C
              </button>
            </li>
            <li>
              <button name="power">
                x<sup>2</sup>
              </button>
            </li>
            <li>
              <button name="sqrt">&#8730;</button>
            </li>
            <li>
              <button name="7">7</button>
            </li>
            <li>
              <button name="8">8</button>
            </li>
            <li>
              <button name="9">9</button>
            </li>
            <li>
              <button name="4">4</button>
            </li>
            <li>
              <button name="5">5</button>
            </li>
            <li>
              <button name="6">6</button>
            </li>
            <li>
              <button name="1">1</button>
            </li>
            <li>
              <button name="2">2</button>
            </li>
            <li>
              <button name="3">3</button>
            </li>
            <li>
              <button name="negate">+/-</button>
            </li>
            <li>
              <button name="0">0</button>
            </li>
            <li>
              <button name="dot">.</button>
            </li>
          </ul>
          <ul
            className={`${CalcStyle.calcActionList}`}
            onClick={handleKeyBoard}
          >
            <li>
              <button name="backspace">DEL</button>
            </li>
            <li>
              <button name="/">/</button>
            </li>
            <li>
              <button name="*">x</button>
            </li>
            <li>
              <button name="+">+</button>
            </li>
            <li>
              <button name="-">-</button>
            </li>
            <li>
              <button name="=">=</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Calculator;
