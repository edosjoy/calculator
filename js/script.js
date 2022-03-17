'use strict';

const calcScreen = document.querySelector('.calc-screen-output');
const btnAC = document.querySelector('.ac');
const btnPlusMinus = document.querySelector('.plus-minus');
const btnPercent = document.querySelector('.percent');
const btnNum = document.querySelectorAll('.btn.num');
const btnAddition = document.querySelectorAll('.btn.addition');
const equal = document.querySelector('.equal');

calcScreen.value = '0';
let operandA = '';
let operandB = '';
let addition = '';
let additionSelected = false;
let result = '';

btnAC.addEventListener('click', () => {
    calcScreen.value = '0';
    operandA = '';
    operandB = '';
    result = '';
    addition = '';
    calcScreen.style.fontSize = '4rem';
});

btnPlusMinus.addEventListener('click', () => {
    +calcScreen.value > 0 ? calcScreen.value = `-${calcScreen.value}` : calcScreen.value = Math.abs(+calcScreen.value);
});

btnPercent.addEventListener('click', () => {
    calcScreen.value /= 100;
});

btnNum.forEach(item => {
    item.addEventListener('click', event => {

        if (additionSelected) {
            calcScreen.value = '0';
            calcScreen.style.fontSize = '4rem';
            event.target.textContent !== '.' ? calcScreen.value = event.target.textContent : calcScreen.value += event.target.textContent;
            additionSelected = false;
        } else {
            calcScreen.value === '0' && event.target.textContent !== '.' ? event.target.textContent === '00' ? calcScreen.value = '0' : calcScreen.value = event.target.textContent : calcScreen.value += event.target.textContent;
        }

        if (calcScreen.value.length > 6 && calcScreen.value.length < 9) {
            calcScreen.style.fontSize = '3rem';
        } else if (calcScreen.value.length > 8 && calcScreen.value.length < 14) {
            calcScreen.style.fontSize = '2rem';
        } else if (calcScreen.value.length > 13 && calcScreen.value.length < 16) {
            calcScreen.style.fontSize = '1.5rem';
        } else if (calcScreen.value.length > 15) {
            calcScreen.style.fontSize = '2rem';
            calcScreen.value = 'too many numbers';
        }
    });
});

btnAddition.forEach(item => {
    item.addEventListener('click', event => {

        if (operandA !== '') {

            switch (addition) {
                case '÷':
                    operandA /= +calcScreen.value;
                    break;
                case '×':
                    operandA *= +calcScreen.value;
                    break;
                case '-':
                    operandA -= +calcScreen.value;
                    break;
                case '+':
                    operandA += +calcScreen.value;
                    break;
                default:
                    calcScreen.value = 'Error';
            }

            calcScreen.value = operandA;

            if (operandA.toString().length > 6 && operandA.toString().length < 9) {
                calcScreen.style.fontSize = '3rem';
            } else if (operandA.toString().length > 8 && operandA.toString().length < 14) {
                calcScreen.style.fontSize = '2rem';
            } else if (operandA.toString().length > 13) {
                calcScreen.style.fontSize = '1.5rem';
            } else if (calcScreen.value.length > 15) {
                calcScreen.style.fontSize = '2rem';
                calcScreen.value = 'too many numbers';
            }

            addition = event.target.textContent;
            additionSelected = true;

        } else {

            operandA = +calcScreen.value;
            addition = event.target.textContent;
            additionSelected = true;

        }

    });
});

equal.addEventListener('click', () => {
    if (operandA !== '' && result === '') {
        operandB = +calcScreen.value;

        switch (addition) {
            case '÷':
                result = operandA / operandB;
                break;
            case '×':
                result = operandA * operandB;
                break;
            case '-':
                result = operandA - operandB;
                break;
            case '+':
                result = operandA + operandB;
                break;
            default:
                result = 'Error';
        }

        // operandA = '';
        // operandB = '';
        // addition = '';
        // additionSelected = false;

        calcScreen.value = result;

        if (result.toString().length > 6 && result.toString().length < 9) {
            calcScreen.style.fontSize = '3rem';
        } else if (result.toString().length > 8 && result.toString().length < 14) {
            calcScreen.style.fontSize = '2rem';
        } else if (result.toString().length > 13) {
            calcScreen.style.fontSize = '1.5rem';
        } else if (calcScreen.value.length > 15) {
            calcScreen.style.fontSize = '2rem';
            calcScreen.value = 'too many numbers';
        }
    } else if (operandA !== '' && result !== '') {
        switch (addition) {
            case '÷':
                result /= operandB;
                break;
            case '×':
                result *= operandB;
                break;
            case '-':
                result -= operandB;
                break;
            case '+':
                result += operandB;
                break;
            default:
                result = 'Error';
        }

        calcScreen.value = result;

        if (result.toString().length > 6 && result.toString().length < 9) {
            calcScreen.style.fontSize = '3rem';
        } else if (result.toString().length > 8 && result.toString().length < 14) {
            calcScreen.style.fontSize = '2rem';
        } else if (result.toString().length > 13) {
            calcScreen.style.fontSize = '1.5rem';
        } else if (calcScreen.value.length > 15) {
            calcScreen.style.fontSize = '2rem';
            calcScreen.value = 'too many numbers';
        }
    }
});