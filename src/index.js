function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let exprWithoutSpaces = '';
    for (let value of expr) {
        if (value != ' ' && value != '') exprWithoutSpaces += value;
    }
    let arrWithoutSpaces = exprWithoutSpaces.split('');

    let count1 = 0;
    let count2 = 0;
    for (let value of arrWithoutSpaces) {
        if (value === '(') count1++;
        if (value === ')') count2++;
    }

    if (count1 != count2) throw new Error('ExpressionError: Brackets must be paired');

    let arr = [];
    if (expr.includes(' ')) {
        arr = expr.split(' ');
    } else arr = expr.split('');

    let priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }

    let calculation = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    }

    let numbers = [];
    let signs = [];

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] === '' || arr[i] === ' ') continue;
        if (arr[i] === '0' && arr[i - 1] === '/') throw new Error('TypeError: Division by zero.')
        if (arr[i] != '+' && arr[i] != '*' && arr[i] != '-' && arr[i] != '' && arr[i] != '(' && arr[i] != ')' && arr[i] != '/') {
            numbers.push(arr[i]);
        } else if (signs.length === 0) {
            signs.push(arr[i]);
        } else if (priority[arr[i]] > priority[signs[signs.length - 1]] || arr[i] == '(' || signs[signs.length - 1] == '(' && arr[i] != ')') {
            signs.push(arr[i]);
        } else if (priority[arr[i]] <= priority[signs[signs.length - 1]]) {
            let result = calculation[signs.pop()](+numbers[numbers.length - 2], +numbers[numbers.length - 1]);
            numbers.splice(numbers.length - 2, 2, result);
            i--;
        } else if (arr[i] == ')' && signs[signs.length - 1] != '(') {
            let result = calculation[signs.pop()](+numbers[numbers.length - 2], +numbers[numbers.length - 1]);
            numbers.splice(numbers.length - 2, 2, result);
            i--;
        } else if (arr[i] == ')' && signs[signs.length - 1] == '(') {
            signs.splice(signs.length - 1, 1);
        }
    }
    for (let i = 0; i < signs.length; i++) {
        let result = calculation[signs.pop()](+numbers[numbers.length - 2], +numbers[numbers.length - 1]);
        numbers.splice(numbers.length - 2, 2, result);
        i--;
    }
    return numbers[0];
}

module.exports = {
    expressionCalculator
}
