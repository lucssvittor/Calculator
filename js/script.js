let display = document.querySelector(".display");
let buttons = document.querySelectorAll(".buttonbox");

let currentInput = "";
let operator = "";
let previousInput = "";
let resultDisplayed = false;

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        let buttonText = button.innerText;

        if (buttonText == "C") {
            currentInput = "";
            previousInput = "";
            operator = "";
            display.innerText = "";
        } else if (buttonText == "DEL") {
            currentInput = currentInput.slice(0, -1);
            display.innerText = formatNumber(currentInput);
        } else if (buttonText == "+" || buttonText == "-" || buttonText == "*" || buttonText == "/") {
            if (currentInput !== "") {
                operator = buttonText;
                previousInput = currentInput;
                currentInput = "";
                display.innerText = formatNumber(previousInput) + " " + operator;
            }
        } else if (buttonText == "%") {
            let percent = parseFloat(currentInput) / 100;
            currentInput = (parseFloat(previousInput) * percent).toString();
            display.innerText = formatNumber(currentInput);
        } else if (buttonText == "=") {
            if (currentInput !== "" && previousInput !== "") {
                let result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
                display.innerText = formatNumber(result);
                currentInput = result.toString();
                previousInput = "";
                resultDisplayed = true;
            }
        } else {
            if (resultDisplayed) {
                currentInput = "";
                resultDisplayed = false;
            }
            currentInput += buttonText;
            display.innerText = formatNumber(currentInput);
        }
    });
});

function calculate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 === 0) {
                return "Error";
            } else {
                return num1 / num2;
            }
        default:
            return "Error";
    }
}

function formatNumber(value) {
    if (!value) return "";
    return parseFloat(value).toLocaleString("en-US").replace(",", ".");

}
