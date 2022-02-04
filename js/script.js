//VARIABLES
let activeNum = "";
let storedNum = null;
let storedOperator = null;
let calcPressed = false; //avoids number presses adding to post = result.
let percentPressed = false; //track percent state

//SELECTORS
const display = document.querySelector(".calculator-display");
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector("#clear");
const operatorButtons = document.querySelectorAll(".operator");
const calculateButton = document.querySelector("#calculate");
const posNegButton = document.querySelector("#posNeg");
const percentButton = document.querySelector("#percent");
const decimalButton = document.querySelector("#decimal");

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
  // display.textContent = 0;
  populateDisplay(0);
  storedNum = null;
  storedOperator = null;
  calcPressed = false;
  percentPressed = false;
}

//serves to display and also santize output ie. decimals rounding.
function populateDisplay (input) {
  let result = String(input);
  
  if (result.includes(".") && !result.includes("e")) { //stop exponent format
    result = result.slice(0, 16);
  } else if (result.length > 16){
    result = "Error";
  }

  display.textContent = result;
}

//CLICK HANDLERS
function handleNumberClick (e) {
  if (display.textContent === "Error") {//reset after errors
    clearCalc();
  } 

  if (calcPressed === true) {//handle post calc number presses
    activeNum = "";
    calcPressed = false;
  }

  //handle "0" issues. long 0 strings, 0 before digits.
  if (activeNum === "0" && e.target.innerText === "0" 
    || activeNum === "" && e.target.innerText === "0") { 
    return;
  }

  //Primary function logic
  let newEntry = e.target.innerText;
  console.log(activeNum);
  if (activeNum.length < 17) { //limit number length to fit display
    activeNum += newEntry;
  }
  // display.textContent = activeNum;
  populateDisplay(activeNum);
}

function handleOperatorClick (e) {
  if (activeNum === "") { //handle changes in operator click.
    storedOperator = e.target.id;
    return;
  }
  
  if (storedOperator === null) { //account for operator chains.
    storedOperator = e.target.id;
    storedNum = Number(activeNum);
    activeNum = "";
    percentPressed = false;
  } else {
    let secondNum = Number(activeNum)
    storedNum = operate(storedNum, storedOperator, secondNum)
    // display.textContent = storedNum;
    populateDisplay(storedNum);
    storedOperator = e.target.id;
    activeNum = "";
    percentPressed = false;
  }
}

function handleCalculateClick (e) {
  //prevent error when no calculations have been made.
  if (storedNum === null || activeNum === "") { 
    return;
  }

  //Primary function logic
  let secondNum = Number(activeNum)
  let result = operate(storedNum, storedOperator, secondNum);
  // if (String(result).length > 16) { //confirm result fits in display
  //   result = "Error";
  // }
  // display.textContent = result;
  populateDisplay(result);
  storedOperator = null;
  storedNum = null;
  activeNum = result;
  calcPressed = true;
  percentPressed = false;
}

//ADJUNCT FEATURES
function handlePosNegClick () {
  if (activeNum === "") {
    return;
  }

  activeNum *= -1;
  // display.textContent = activeNum;
  populateDisplay(activeNum);
}

function handlePercentClick () {
  if (activeNum === "") {
    return;
  }

  if (percentPressed === false) {
    activeNum *= .01;
    // display.textContent = activeNum;
    populateDisplay(activeNum);
  }
  percentPressed = true;
}

function handleDecimalClick () {
  if(String(activeNum).includes(".")) {
    return;
  }
  
  if (activeNum === "") {
    activeNum += 0;
  }

  activeNum = String(activeNum);
  activeNum += ".";
  // display.textContent = activeNum;
  populateDisplay(activeNum);
  calcPressed = false;
}

//EVENT LISTENERS
numberButtons.forEach(button => button.addEventListener("click", handleNumberClick));
clearButton.addEventListener("click", clearCalc);
operatorButtons.forEach(button => button.addEventListener("click", handleOperatorClick));
calculateButton.addEventListener("click", handleCalculateClick);
//ADJUNCT FEATURES
posNegButton.addEventListener("click", handlePosNegClick);
percentButton.addEventListener("click", handlePercentClick);
decimalButton.addEventListener("click", handleDecimalClick);