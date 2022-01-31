//VARIABLES
let displayVar = "";
let storedNum;
let storedOperator;

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
  displayVar = "";
  display.textContent = 0;
}

//click handlers
function handleDisplayClick (e) {
  let newEntry = e.target.innerText;
  displayVar += newEntry;
  display.textContent = displayVar;
}

function handleOperatorClick (e) {
  storedNum = Number(displayVar);
  storedOperator = e.target.id;
  displayVar = "";
}

function handleCalculateClick (e) {
  let secondNum = Number(displayVar)
  let result = operate(storedNum, storedOperator, secondNum);
  display.textContent = result;
  displayVar = "";
}

//EVENT LISTENERS
numberButtons.forEach(button => button.addEventListener("click", handleDisplayClick));
clearButton.addEventListener("click", clearCalc);
operatorButtons.forEach(button => button.addEventListener("click", handleOperatorClick));
calculateButton.addEventListener("click", handleCalculateClick)