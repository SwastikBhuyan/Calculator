let currentValue = "";
let previousValue = "";
let operator = "";

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const previousScreen = document.querySelector(".previous");
const currentScreen = document.querySelector(".current");

const equals = document.querySelector(".equals");
equals.addEventListener("click", () => {
    if (currentValue != "" && previousValue != "") {
        compute();
    }
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalculator);


numbers.forEach(number => {
    number.addEventListener("click", function(e) {
        handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
    console.log(number);
    if (previousValue !== "" && currentValue !== "" && operator === "") {
        previousValue = "";
        currentScreen.textContent = currentValue;
    }
    if (currentValue.length <= 11) {
        currentValue += number;
        currentScreen.textContent = currentValue;
    }
}

operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        handleOperator(e.target.textContent);
    })
})

function handleOperator(op) {
    if (previousValue === "") {
        previousValue = currentValue;
        operatorCheck(op);
    }
    else if (currentValue === "") {
        operatorCheck(op);
    }
    else {
        compute();
        operator = op;
        currentScreen.textContent = "0";
        previousScreen.textContent = previousValue + " " + operator;
    }
    console.log(operator);
}

function operatorCheck(text) {
    operator = text;
    previousScreen.textContent = previousValue + " " + operator;
    currentScreen.textContent = "0";
    currentValue = "";
  }

function compute() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if (operator === "+") {
        previousValue += currentValue;
    }
    else if (operator === "-") {
        previousValue -= currentValue;
    }
    else if (operator === "*") {
        previousValue *= currentValue;
    }
    else if (operator === "/") {
        if (currentValue <= 0) {
            previousValue = "Error";
            displayResults();
            return;
        }
        previousValue /= currentValue;
    }
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    displayResults();
}

function displayResults() {
    if (previousValue.length <= 11) {
      currentScreen.textContent = previousValue;
    } else {
      currentScreen.textContent = previousValue.slice(0, 11) + "...";
    }
    previousScreen.textContent = "";
    operator = "";
    currentValue = "";
  }

  function clearCalculator() {
    currentValue = "";
    previousValue = "";
    operator = "";
    currentScreen.textContent = "0";
    previousScreen.textContent = "";
  }
  
  function roundNumber(num) {
    return Math.round(num * 100000) / 100000;
  }