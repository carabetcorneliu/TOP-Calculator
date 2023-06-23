const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let firstNumber;
let operator;
let secondNumber;
let result;

const operate = (op, a, b) => {
    switch (op) {
        case '+': {
            result = add(+a, +b);
            break;
        } case '-': {
            result = substract(a, b);
            break;
        } case '*': {
            result = multiply(a, b);
            break;
        } case '/': {
            result = divide(a, b);
            break;
        }
    }
}

const displayResult = () => {
    displayContainerOne.textContent = "";
    displayContainerTwo.textContent = "";
    displayContainerThree.textContent = "";
    displayContainerResult.textContent = result;
}

const displayContainerOne = document.querySelector('#displayContainerOne');
const displayContainerTwo = document.querySelector('#displayContainerTwo');
const displayContainerThree = document.querySelector('#displayContainerThree');
const displayContainerResult = document.querySelector('#displayContainerResult');

const displayTextUpdate = () => {
    if (firstNumber) {
        displayContainerOne.textContent = firstNumber;
    }
    if (operator) {
        displayContainerTwo.textContent = " " + operator + " ";
    }
    if (secondNumber) {
        displayContainerThree.textContent = secondNumber;
    }
}

const buttons = document.querySelectorAll('.buttons');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!operator) {
            switch (button.id) {
                case 'one':
                case 'two':
                case 'three':
                case 'four':
                case 'five':
                case 'six':
                case 'seven':
                case 'eight':
                case 'nine':
                case 'zero':
                    if (!firstNumber) firstNumber = button.textContent;
                    else firstNumber += button.textContent;
                    displayTextUpdate();
                    break;
                case 'add':
                case 'substract':
                case 'multiply':
                case 'divide':
                    operator = button.textContent;
                    displayTextUpdate();
                    break;
            }
        }
        else if (operator) {
            switch (button.id) {
                case 'one':
                case 'two':
                case 'three':
                case 'four':
                case 'five':
                case 'six':
                case 'seven':
                case 'eight':
                case 'nine':
                case 'zero':
                    if (!secondNumber) secondNumber = button.textContent;
                    else secondNumber += button.textContent;
                    displayTextUpdate();
                    break;
                case 'equal':
                    operate(operator, firstNumber, secondNumber);
                    displayResult();
                    break;
            }
        }
    });
});

