document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let currentOperand = '';
    let previousOperand = '';
    let operation = undefined;

    const updateDisplay = () => {
        display.innerText = currentOperand || '0';
    };

    const appendNumber = (number) => {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand = currentOperand.toString() + number.toString();
        updateDisplay();
    };

    const chooseOperation = (op) => {
        if (currentOperand === '' && previousOperand !== '') {
            operation = op;
            return;
        }
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = currentOperand;
        currentOperand = '';
        updateDisplay();
    };

    const compute = () => {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }

        currentOperand = computation.toString();
        operation = undefined;
        previousOperand = '';
        updateDisplay();
    };

    const clear = () => {
        currentOperand = '';
        previousOperand = '';
        operation = undefined;
        updateDisplay();
    };

    const backspace = () => {
        currentOperand = currentOperand.toString().slice(0, -1);
        updateDisplay();
    };

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const { id } = button;
            if (!isNaN(id) || id === 'decimal') {
                appendNumber(button.innerText);
            } else if (id === 'add' || id === 'subtract' || id === 'multiply' || id === 'divide') {
                chooseOperation(button.innerText);
            } else if (id === 'eqauls') {
                compute();
            } else if (id === 'backspace') {
                backspace();
            }
        });
    });
});
