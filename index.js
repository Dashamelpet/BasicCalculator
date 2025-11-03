//variables

const display = document.querySelector('.display');
const buttonsSection = document.querySelector('.buttons-group');
const displayResult = document.querySelector('.display-result');
const numTags = document.querySelectorAll('[data-value]');

let a = '';
let b = '';
let condition = '';
let res = 0;
let is = false;

//проверка первого введенного символа
function checkFirstData() {
  if (a == '' && b == '') return false;
  else if (a && condition && b == '') return false;
  return true;
}

//определение условия фоормулы
function isOperator(value) {
  return ['+', '-', '/', '*'].some((item) => item == value);
}

//присваивание значения переменным
function setOperator(value) {
  if (condition) {
    a = res.toString();
  }
  condition = value;
  b = '';
  console.log('a:' + a + 'b:' + b + 'cond:' + condition);
  displayResult.textContent += value;
}

//фикс результата в случае большой дробной части
function fixedResult(res) {
  const result = res.toString();
  if (result.includes('.')) {
    const decimalCount = result.slice(result.indexOf('.') + 1).length;
    if (decimalCount > 4) {
      return Number(res.toFixed(4));
    }
  }
  return res;
}

//отработка при знаке =
function handleEqual() {
  is = true;
  display.textContent = fixedResult(res);
  displayResult.textContent = fixedResult(res);
  a = res.toString();
  b = '';
  condition = '';
  console.log('a:' + a + 'b:' + b + 'cond:' + condition);
}

// очистить всё
function clearAll() {
  is = false;
  display.textContent = '';
  displayResult.textContent = '';
  a = '';
  b = '';
  condition = '';
  res = 0;
}

//вычисление
function calculate(a, b, condition) {
  switch (condition) {
    case '+':
      res = +a + +b;
      break;
    case '-':
      res = +a - +b;
      break;
    case '*':
      res = +a * +b;
      break;
    case '/':
      res = +b === 0 ? 'Error' : +a / +b;
      break;
  }
  display.textContent = fixedResult(res);
}

function appendNumber(value) {
  display.textContent += value;
  displayResult.textContent += value;
  if (a && condition) {
    b += value;
    if (a && b && condition) {
      calculate(a, b, condition);
    }
  } else {
    if (is) {
      a = value;
      is = false;
      display.textContent = value;
      displayResult.textContent = value;
    } else {
      a += value;
    }
  }
}

//получение введенного значения
function getValue(tag) {
  const value = tag.getAttribute('data-value');
  if (isOperator(value)) {
    if (checkFirstData()) {
      setOperator(value);
    }
  } else {
    if (value == '=') {
      handleEqual();
    } else if (value == 'c') {
      clearAll();
    } else {
      appendNumber(value);
    }
  }
}

//events
numTags.forEach((tag) => tag.addEventListener('click', () => getValue(tag)));
