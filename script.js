const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let firstNumber;
let operator;
let secondNumber;

const operate = (op, a, b) => {
    switch(op) {
        case '+': {
            add(a, b);
            break;
        } case '-': {
            substract(a, b);
            break;
        } case '*': {
            multiply(a, b);
            break;
        } case '/': {
            divide(a, b);
            break;
        }
    }
}