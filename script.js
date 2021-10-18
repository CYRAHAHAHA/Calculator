const operatorsB = document.querySelectorAll(".operator")
const equalB = document.querySelector(".equal");
const numbersB = document.querySelectorAll(".number");
const decimalB = document.querySelector(".decimal");
const clrB = document.querySelector(".clr");
const dltB = document.querySelector(".dlt");
const display = document.querySelector(".label");
const subdisplay = document.querySelector(".sublabel"); 
let label = '0';
let sublabel = '0';
let operator = '';
let first = 0;
let second = 0;

//Buttons to clear, equals, delete
clrB.onclick = () => clrDisp();
equalB.onclick = () => evaluate();
dltB.onclick = () => deleteNumber();

const add = (a, b) => parseFloat(a)+parseFloat(b); //To deal with big +- numbers
const minus = (a, b) => a-b;
const times = (a, b) => a*b;
const divide = (a, b) => a/b;

//Decimal button
decimalB.onclick = () => {
    if(!label.includes('.'))
        label = label + '.';
        display.textContent = label;
}
//Numbers button
numbersB.forEach( (button) => {
    button.addEventListener('click', function(e){
        enterKey(e.target.textContent);
    });
});
//Operators button
operatorsB.forEach((button) => {
    button.addEventListener('click', function(e){
        enterOperator(e.target.textContent);
    });
});
//Calculation function
function equal(a,b,operator){
    switch(operator){
        case '+': return add(a,b);
        case '-': return minus(a,b);
        case '*': return times(a,b);
        case '/': return (b == 0 ? 'fuck you' : divide(a,b));
        default:
    }
}
//Numbers
function enterKey(pressed){
    if(typeof label != 'string') clrDisp(); //clears screen if number input immediately after previous answer evaluated
        if(label.slice(-1) == operator && sublabel.slice(-1) != '-'){       
            sublabel = label.slice(0, -1) + ' ' + operator;
            subdisplay.textContent = sublabel;
            first = sublabel.slice(0, -2);
            label = '0';
        }
        if(label === '0') label = pressed;
        else if(label.length <= 9) (label += pressed);
        display.textContent = label;
}
//Clear screen
function clrDisp() {
    label = '0';
    sublabel = '0';
    operator = '';
    display.textContent = '0';
    subdisplay.textContent = '0';
}
//Limit numbers to the screen display
function shorten(number) {
    let answer = 0;
    console.log(number)
    if(label == 'fuck you') answer = label;
    else if(Math.abs(number) >= 10000000000) {answer = number.toExponential(3)}
    else{
        let length = 9 - (Math.ceil(number)).toString().length;
        length = Math.pow(10, length);
        answer = Math.round((number + Number.EPSILON) * length) / length;
    }
    return answer;
}
//When Enter key is pressed
function evaluate() {
    if(sublabel.slice(-1) == operator){
        second = label;
        sublabel = sublabel + ' ' + second;
        label = equal(first, second, operator);
        console.log(label);
        if(label.toString() == 'fuck you') {
            sublabel = label;
            label = '0';
        }
        else label = shorten(label);
        display.textContent = label;
        subdisplay.textContent = sublabel;
        operator = '';
    }
}
//Deletes
function deleteNumber(){
    if(typeof label == 'string'){ //Delete will not work if used directly after previous answer evaluated
        if(label.slice(-1) == operator) operator = '';
        label = label.slice(0, -1);
        label === '' ? label = '0': label = label;
        display.textContent = label;
    }
}

function enterOperator(key){ 
    if(label == '0' && key == '-'){ //To enter negatives
        label = '-';
        display.textContent = label;
    } 
    else if(operator == ''){ //rest of operators
        operator = key;
        label += operator;
        display.textContent = label;
    }
    else{
        if(key == '-'){
            if(label.toString().slice(-1) == operator){ //inputing negative directly after another operator (e.g. 100 * -100)
                label = label.toString();      
                sublabel = label.slice(0, -1) + ' ' + operator;
                subdisplay.textContent = sublabel;
                first = sublabel.slice(0, -2);
                label = '-';
                display.textContent = label;
            }
        }
    }
}

window.addEventListener('keydown', handleKeyboardInput)
function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) enterKey(e.key);
    if (e.key === '.') enterKey(e.key);
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clrDisp();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      enterOperator(e.key);
}

