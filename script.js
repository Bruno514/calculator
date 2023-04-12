let calculatorContent = "0";
let numbers = [];
let currentOperator = "";
const allOperators = ["add", "subtract", "multiply", "divide"]

function updateCalcScreen() {
  const visor = document.querySelector(".visor .displaying");
  visor.textContent = calculatorContent;
}

function hasOperator() {
  return !!currentOperator;
}

function calcResult(numbers, op) {
  if (op == "add") return numbers[0] + numbers[1];
  else if (op == "subtract") return numbers[0] - numbers[1];
  else if (op == "divide") return numbers[0] / numbers[1];
  else if (op == "multiply") return numbers[0] * numbers[1];
}

function onButtonPress() {
  const classList = this.classList;

  if (classList.contains("number")) {
    number = this.dataset.button;

    // Check if there aren't numbers to calculator or
    // if it`s a result of a previous calc, if so, this resets
    if (!numbers.length || currentOperator == "result" || hasOperator()) {
      calculatorContent = number;
    } else {
      // continue appending numbers
      calculatorContent += number;
    }

    // check if this number is the first or second to calculate
    if (numbers.length <= 1) {
      numbers[0] = calculatorContent;
    } else if (numbers.length == 2 || hasOperator()) {
      numbers[1] = calculatorContent;
    }
  } else if (classList.contains("operator")) {
    operator = this.dataset.operator;
    if (operator == "result") {
      let result = calcResult(numbers, currentOperator);
      currentOperator = operator;
      numbers = [result];
      calculatorContent = result;
    } else if (allOperators.includes(operator)) {
      if (numbers[0] != undefined) {
        currentOperator = operator;
      }

      if (numbers[1] != undefined) {
        let result = calcResult(numbers, currentOperator);
        numbers = [result];
        calculatorContent = result;
      }
    }
  } else if (classList.contains("all-clear")) {
    calculatorContent = 0;
    numbers = [];
    currentOperator = "";
  }
  updateCalcScreen();
}

// add button listeners
const buttons = document.querySelectorAll("button");
buttons.forEach((e) => {
  e.addEventListener("click", onButtonPress);
});

updateCalcScreen();
