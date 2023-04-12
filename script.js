let calculatorContent = "0";
let calculatorLogic = { numbers: [], currentOperator: "" };

function updateCalcScreen() {
  const visor = document.querySelector(".visor .displaying");
  visor.textContent = calculatorContent;
}

function calcResult(numbers, op) {
  if (op == "add") return numbers[0] + numbers[1]
  else if (op == "subtract") return numbers[0] - numbers[1]
  else if (op == "divide") return numbers[0] / numbers[1]
  else if (op == "multiply") return numbers[0] * numbers[1]
}

function onButtonPress() {
  const classList = this.classList;

  console.log(calculatorLogic)
  if (classList.contains("number")) {
    if (calculatorLogic.currentOperator && calculatorLogic.numbers.length == 1) {
      calculatorContent = "0"
      calculatorLogic.numbers.push(calculatorContent);
    }

    if (calculatorContent == "0") {
      calculatorContent = this.dataset.button;
    } else {
      calculatorContent += this.dataset.button;
    }

    if (calculatorLogic.numbers.length == 1) {
      calculatorLogic.numbers[0] = calculatorContent;
    } else if (calculatorLogic.numbers.length == 2) {
      calculatorLogic.numbers[1] = calculatorContent;
    } 
  } else if (classList.contains("operator")) {
    if (this.dataset.button === "result") {
      let result = calcResult(
        calculatorLogic.numbers,
        calculatorLogic.currentOperator
      );
      calculatorLogic.currentOperator = "";
      calculatorLogic.numbers.pop();
      calculatorLogic.numbers[0] = result;
      calculatorContent = result;
    } else {
      if (calculatorLogic.numbers.length == 2) {
        let result = calcResult(
          calculatorLogic.numbers,
          calculatorLogic.currentOperator
        );
        calculatorLogic.numbers.pop();
        calculatorLogic.numbers[0] = result;
        calculatorContent = result;
      }
      calculatorLogic.currentOperator = this.dataset.operator;
    }
  } else if (classList.contains("all-clear")) {
    calculatorContent = 0;
    calculatorLogic.numbers = [];
    calculatorLogic.currentOperator = "";
  }
  updateCalcScreen();
}

// add button listeners
const buttons = document.querySelectorAll("button");
buttons.forEach((e) => {
  e.addEventListener("click", onButtonPress);
});

updateCalcScreen();
