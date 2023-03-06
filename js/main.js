const clearEntryButton = document.querySelector('#clear-entry');
const clearButton = document.querySelector('#clear');
const percentButton = document.querySelector('#percent');
const divideButton = document.querySelector('#divide');
const multiplyButton = document.querySelector('#multiply');
const subtractButton = document.querySelector('#subtract');
const sumButton = document.querySelector('#sum');
const plusMinusButton = document.querySelector('#plus-minus');
const commaButton = document.querySelector('#comma');
const equalsButton = document.querySelector('#equals-button');
const equalIcon = document.querySelector('#equal')

const toggleButton = document.querySelector('#onoff');
const body = document.querySelector('body');

const numbers = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operators')

let currentOperandText = document.querySelector('#current-operand');
let previousOperandText = document.querySelector('#previous-operand');

class Calculator {
  constructor(currentOperandText, previousOperandText) {
    this.currentOperandText = currentOperandText
    this.previousOperandText = previousOperandText
    this.clearDisplay()
  };


  clearDisplay() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    equalIcon.classList.add('hide');
  };

  deleteNumber() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    equalIcon.classList.add('hide');
  };

  addNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand += number;
  };
  
  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.calculate();
    }
    this.operation = operation
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    equalIcon.classList.add('hide');
  };

  calculate() {
    let result;
    const firstNumber = Number(this.previousOperand);
    const secondNumber = Number(this.currentOperand);
    if (isNaN(firstNumber) || isNaN(secondNumber)) return;
    
    switch (this.operation) {
      case '+':
        result = firstNumber + secondNumber
        break;
      case '-':
        result = firstNumber - secondNumber
        break;
      case '*':
        result = firstNumber * secondNumber
        break;
      case '÷':
        result = firstNumber / secondNumber
        break;
    
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = '';
    equalIcon.classList.remove('hide');
  };
  
  convertPositiveNegative() {
    if (this.currentOperand < 0) {
      this.currentOperand = Math.abs(this.currentOperand);
    } 
    else if (this.currentOperand > 0) {
      this.currentOperand *= -1;
    }
  }

  dividePerHundred() {
    this.currentOperand = this.currentOperand / 100;
  }

  applyComma(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0 });
    };

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    };
  } 

  updateDisplay() {
    this.currentOperandText.textContent = 
      this.applyComma(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandText.textContent = 
        `${this.applyComma(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandText.textContent = '';
    }
  };
}

/* ---------------------- */

function toggleDarkMode () {
  body.classList.toggle('dark-mode');
};


const calculator = new Calculator(currentOperandText, previousOperandText);

numbers.forEach(button => {
  button.addEventListener('click', () => {
    calculator.addNumber(button.textContent)
    calculator.updateDisplay();
  })
})

sumButton.addEventListener('click', () => {
  calculator.chooseOperation('+');
  calculator.updateDisplay();
});

subtractButton.addEventListener('click', () => {
  calculator.chooseOperation('-');
  calculator.updateDisplay();
});

multiplyButton.addEventListener('click', () => {
  calculator.chooseOperation('*');
  calculator.updateDisplay();
});

divideButton.addEventListener('click', () => {
  calculator.chooseOperation('÷');
  calculator.updateDisplay();
});

percentButton.addEventListener('click', () => {
  calculator.dividePerHundred();
  calculator.updateDisplay();
});

equalsButton.addEventListener('click', button => {
  calculator.calculate();
  calculator.updateDisplay();
  console.log(calculator.previousOperand)
});

clearButton.addEventListener('click', () => {
  calculator.clearDisplay()
  calculator.updateDisplay()
});

clearEntryButton.addEventListener('click', () => {
  calculator.deleteNumber()
  calculator.updateDisplay()
});

plusMinusButton.addEventListener('click', () => {
  calculator.convertPositiveNegative();
  calculator.updateDisplay();
})

toggleButton.addEventListener('click', toggleDarkMode);