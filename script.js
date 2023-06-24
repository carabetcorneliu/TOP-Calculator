const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const buttons = document.querySelectorAll('.buttons');
const displayContainerOne = document.querySelector('#displayContainerOne');
const displayContainerTwo = document.querySelector('#displayContainerTwo');
const displayContainerThree = document.querySelector('#displayContainerThree');

let firstNumber = '';
let operator = '';
let secondNumber = ''
let result = '';

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
    result = round(result, 10);
}

const clickNumber = (number) => {
    if (!operator && !secondNumber && (result === '')) {
        firstNumber += number;
        displayTextUpdate();
    } else if (operator && firstNumber) {
        secondNumber += number;
        displayTextUpdate();
    }
}

const clickOperator = (oper) => {
    if (firstNumber && secondNumber) {
        operate(oper, firstNumber, secondNumber);
        displayResult();
        operator = oper;
        displayTextUpdate();
    } else if (firstNumber && !secondNumber) {
        operator = oper;
        displayTextUpdate();
    }
}

const clickClear = () => {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    result = '';
    displayContainerOne.textContent = '0';
    displayContainerTwo.textContent = '';
    displayContainerThree.textContent = '';
    displayTextUpdate();
}

const displayResult = () => {
    displayContainerOne.textContent = result;
    firstNumber = result;
    displayContainerTwo.textContent = "";
    operator = '';
    displayContainerThree.textContent = "";
    secondNumber = '';
}

const displayTextUpdate = () => {
    if (firstNumber) {
        displayContainerOne.textContent = firstNumber;
    }
    if (operator) {
        displayContainerTwo.textContent = operator;
    }
    if (secondNumber) {
        displayContainerThree.textContent = secondNumber;
    }
}

const round = (number, decimalPlaces) => {
    const factorOfTen = Math.pow(10, decimalPlaces);
    return Math.round(number * factorOfTen) / factorOfTen;
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        switch (button.id) {
            case 'clear':
                clickClear();
                break;
            case 'one':
            case 'two':
            case 'three':
            case 'four':
            case 'five':
            case 'six':
            case 'seven':
            case 'eight':
            case 'nine':
                clickNumber(button.textContent);
                break;
            case 'zero':
                if (!operator && !secondNumber && firstNumber != '')
                    clickNumber(button.textContent);
                else if (operator && secondNumber != '')
                    clickNumber(button.textContent);
                break;
            case 'add':
            case 'substract':
            case 'multiply':
            case 'divide':
                clickOperator(button.textContent);
                break;
            case 'equal':
                if (firstNumber && secondNumber) {
                    operate(operator, firstNumber, secondNumber);
                    displayResult();
                    break;
                }
        }
    });
});

