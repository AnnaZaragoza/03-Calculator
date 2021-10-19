'use strict'

/*
1. Set up the constants (with querySelector)
2. Set up the functions of the calculator:
  - delete
  - appendNumber
  - chooseOperations
  - makeOperation
  - updateDisplay
*/

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const historyDisplayed = document.querySelector('[data-history]');
const outputDisplayed = document.querySelector('[data-output]');

let history = '';
let output = '';
let lastOperationValue = '';
let dot = false;
let result = null;

numberButtons.forEach (number => {
  number.addEventListener('click', (e) => {
    if(e.target.innerText === '.' && !dot) {
      dot = true;
    }else if(e.target.innerText === '.' && dot){
      return;
    }
    output += e.target.innerText;
    outputDisplayed.innerText = output;
  })
})

operationButtons.forEach (operation => {
  operation.addEventListener('click', (e) => {
    if(!output) return;
    dot = false;
    var operationValue = e.target.innerText;
    if(history && output){
      mathOperation();
    }else{
      result = parseFloat(output);
    }
    moveValue(lastOperationValue);
    lastOperationValue = operationValue;
  })
})

// Move the value from output to history:
function moveValue(value = ''){
  history += output + ' ' + value + ' ';
  historyDisplayed.innerText = result;
  outputDisplayed.innerText = '0';
  output = '';
}

// Math operations:
function mathOperation(){
  if(lastOperationValue === '+'){
    result = parseFloat(result) + parseFloat(output);
  }else if(lastOperationValue === '-'){
    result = parseFloat(result) - parseFloat(output);
  }else if(lastOperationValue === '×'){
    result = parseFloat(result) * parseFloat(output);
  }else if(lastOperationValue === '÷'){
    result = parseFloat(result) / parseFloat(output);
  }
}

equalsButton.addEventListener('click', (e) => {
  if(!history || !output) return;
  dot = false;
  mathOperation();
  moveValue();
  outputDisplayed.innerText = result;
  history = '';
  historyDisplayed.innerText = '0';
})

allClearButton.addEventListener('click', (e) => {
    output = '';
    history = '';
    outputDisplayed.innerText = 0;
    historyDisplayed.innerText = 0;
    result = '';
})

deleteButton.addEventListener('click', (e) => {
    output = '';
    outputDisplayed.innerText = 0;
})
