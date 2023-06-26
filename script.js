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
let decimalFirst = false;
let decimalSecond = false;

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
    decimalFirst = true;
    decimalSecond = false;
    result = round(result, 10);
}

const clickNumber = (number) => {
    if (!operator && !secondNumber && (result === '')) {
        firstNumber += number;
        displayTextUpdate();
    } else if (operator && firstNumber) {
        if (secondNumber === '0')
            secondNumber = number;
        else
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
    decimalFirst = false;
    decimalSecond = false;
    displayContainerOne.textContent = '0';
    displayContainerTwo.textContent = '';
    displayContainerThree.textContent = '';
    displayTextUpdate();
}

const clickBackspace = () => {
    let temp;

    if (!operator) {
        if (firstNumber.length > 1) {
            temp = firstNumber.slice(0, -1);
            firstNumber = temp;
        }
        else if (firstNumber.length == '1'){
            displayContainerOne.textContent = '0';
            firstNumber = '';
        }
    } else if (operator && secondNumber.length > 0) {
        if (secondNumber.length > 1)
            temp = secondNumber.slice(0, -1);
        else
            temp = '0';
        secondNumber = temp;
    }
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
            case 'decimal':
                if (!operator && !secondNumber && decimalFirst == false) {
                    if (firstNumber == '') firstNumber = '0.';
                    else firstNumber += '.';
                    decimalFirst = true;
                }
                else if (operator && decimalSecond == false) {
                    if (secondNumber == '') secondNumber = '0.';
                    else secondNumber += '.';
                    decimalSecond = true;
                }
                displayTextUpdate();
                break;
            case 'backspace':
                if (secondNumber.length > 0 || firstNumber.length > 0)
                    clickBackspace();
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

window.addEventListener('keydown', function(e) {
    const key = document.querySelector(`.buttons[data-key="${e.keyCode}"]`);
    if ((e.keyCode >= 96 && e.keyCode <= 107) || (e.keyCode >= 109 && e.keyCode <= 111)
        || e.keyCode == 13) 
        key.click();
});
  
