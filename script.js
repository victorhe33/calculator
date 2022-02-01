//VARIABLES
let activeNum = "";
let storedNum = null;
let storedOperator = null;

//SELECTORS
const display = document.querySelector(".calculator-display");
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector("#clear");
const operatorButtons = document.querySelectorAll(".operator");
const calculateButton = document.querySelector("#calculate");


const addButton = document.querySelector(".add");

//FUNCTIONS
function add (numA, numB) {
  return numA + numB;
}

function subtract (numA, numB) {
  return numA - numB;
}

function multiply (numA, numB) {
  return numA * numB;
}

function divide (numA, numB) {
  return numA / numB;
}

function operate (numA, operator, numB) {
  return operator === "add" ? add(numA, numB)
       : operator === "subtract" ? subtract(numA, numB)
       : operator === "multiply" ? multiply(numA, numB)
       : operator === "divide" ? divide(numA, numB)
       : "Error";
}

function clearCalc () {
  activeNum = "";
  display.textContent = 0;
  storedNum = null;
  storedOperator = null;
}

//click handlers
function handleDisplayClick (e) {
  let newEntry = e.target.innerText;
  activeNum += newEntry;
  display.textContent = activeNum;
}

function handleOperatorClick (e) {
  if (storedOperator === null) { //account for operator chains.
    storedNum = Number(activeNum);
  } else {
    let secondNum = Number(activeNum)
    storedNum = operate(storedNum, storedOperator, secondNum);
    display.textContent = storedNum;
  }

  storedOperator = e.target.id;
  activeNum = "";
}

function handleCalculateClick (e) {
  if (storedNum === null) { //prevent error when no calculations have been made.
    return;
  }

  let secondNum = Number(activeNum)
  let result = operate(storedNum, storedOperator, secondNum);
  display.textContent = result;
}

//EVENT LISTENERS
numberButtons.forEach(button => button.addEventListener("click", handleDisplayClick));
clearButton.addEventListener("click", clearCalc);
operatorButtons.forEach(button => button.addEventListener("click", handleOperatorClick));
calculateButton.addEventListener("click", handleCalculateClick)