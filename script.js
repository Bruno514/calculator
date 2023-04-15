let calculatorContent = "0";
let slots = [];
let slotsIndex = 0;
let currentOperator = "";
const allOperators = ["add", "subtract", "multiply", "divide"];

function resetCalculator() {
  calculatorContent = 0;
  slots = [];
  slotsIndex = 0;
  currentOperator = "";
}

function debug() {
  console.log(slots);
  console.log(currentOperator);
  console.log(slotsIndex);
}

function updateCalcScreen() {
  const visor = document.querySelector(".visor .displaying");
  visor.textContent = calculatorContent;
}

function hasOperator() {
  return !!currentOperator;
}

function invert() {
  if (slots[slotsIndex]) {
    slots[slotsIndex] *= -1;
  }
  calculatorContent = slots[slotsIndex];
}

function appendNumberToArrayIndex(number) {
  if (!slots[slotsIndex] || currentOperator == "result") {
    slots[slotsIndex] = number;
    if (currentOperator == "result") currentOperator = ""
  }
  else slots[slotsIndex] += number;
}

function operate(op) {
  let result = calcResult(slots, op);
  (slots = [result]), (slotsIndex = 0);
  calculatorContent = slots[slotsIndex];
  //currentOperator = "";
}

function calcResult(numbers, op) {
  if (op == "add") return parseInt(numbers[0]) + parseInt(slots[1]);
  else if (op == "subtract") return numbers[0] - slots[1];
  else if (op == "divide") return numbers[0] / slots[1];
  else if (op == "multiply") return numbers[0] * slots[1];
}

function onButtonPress() {
  const classList = this.classList;

  if (classList.contains("number")) {
    const number = this.dataset.button;

    appendNumberToArrayIndex(number);

    calculatorContent = slots[slotsIndex];
  } else if (classList.contains("operator")) {
    const operator = this.dataset.operator;

    if (operator == "result") {
      if (slotsIndex == 1) {
        operate(currentOperator);
        currentOperator = operator;
      }
    }
    if (allOperators.includes(operator)) {
      // check if first slot has a number
      if (slotsIndex == 0) {
        slotsIndex = 1;
        currentOperator = operator;
      } else if (slotsIndex == 1) {
        operate(currentOperator);
        slotsIndex = 1;
        currentOperator = operator;
      }
    }
  } else if (classList.contains("all-clear")) {
    resetCalculator();
  } else if (classList.contains("invert")) {
    invert();
  } else if (classList.contains("other")) {
    console.log(slots[slotsIndex])
    if (!slots[slotsIndex].includes(".")) {
      slots[slotsIndex] += "."
      console.log(slots[slotsIndex])
      calculatorContent = slots[slotsIndex]
    }
  }
  debug();
  updateCalcScreen();
}

// add button listeners
const buttons = document.querySelectorAll("button");
updateCalcScreen();

buttons.forEach((e) => {
  e.addEventListener("click", onButtonPress);
});
