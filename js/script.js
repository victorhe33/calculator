//VARIABLES
let activeNum = "";
let storedNum = null;
let storedOperator = null;
let calcPressed = false; //avoids number presses adding to post = result.

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
  if (operator === "divide" && numB === 0) { //account for divide by 0
    return "Error"
  }

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
function handleNumberClick (e) {
  if (display.textContent === "Error") {//reset after errors
    clearCalc();
  } 

  if (calcPressed === true) {
    activeNum = "";
    calcPressed = false;
  }

  let newEntry = e.target.innerText;
  console.log(activeNum);
  if (activeNum.length < 17) { //limit number length to fit display
    activeNum += newEntry;
  }
  display.textContent = activeNum;
}

function handleOperatorClick (e) {
  if (activeNum === "") {
    storedOperator = e.target.id;
    return;
  }
  
  if (storedOperator === null) { //account for operator chains.
    storedOperator = e.target.id;
    storedNum = Number(activeNum);
    activeNum = "";
  } else {
    let secondNum = Number(activeNum)
    storedNum = operate(storedNum, storedOperator, secondNum)
    display.textContent = storedNum;
    storedOperator = e.target.id;
    activeNum = "";
  }
}

function handleCalculateClick (e) {
  if (storedNum === null || activeNum === "") { //prevent error when no calculations have been made.
    return;
  }

  let secondNum = Number(activeNum)
  let result = operate(storedNum, storedOperator, secondNum);
  if (String(result).length > 16) { //confirm result fits in display
    result = "Error";
  }
  display.textContent = result;
  storedOperator = null;
  storedNum = null;
  activeNum = result;
  calcPressed = true;
}

//clean display output to fit + floating decimal management. max = 17
// function sanitizeDisplay(dirtyString) {
//   if (typeof dirtyString === "number") {
//     let confirmedString = String(dirtyString)
//   }
//   let shortenedString = confirmedString.slice(0, 17);

//   return shortenedString;
// }

//EVENT LISTENERS
numberButtons.forEach(button => button.addEventListener("click", handleNumberClick));
clearButton.addEventListener("click", clearCalc);
operatorButtons.forEach(button => button.addEventListener("click", handleOperatorClick));
calculateButton.addEventListener("click", handleCalculateClick)