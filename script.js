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


clrB.onclick = () => clrDisp();

decimalB.onclick = () => {
    if(!label.includes('.'))
        label = label + '.';
        display.textContent = label;
}

equalB.onclick = () => {
    if(sublabel.slice(-1) == operator){
        second = label;
        sublabel = sublabel + ' ' + second;
        label = shorten(equal(first, second, operator));
        if(label == 'fuck you') {
            sublabel = label;
            label = '0';
        }
        display.textContent = label;
        console.log(label);
        subdisplay.textContent = sublabel;
        operator = '';
    }
}

dltB.onclick = () => {
    if(typeof label == 'string'){
        if(label.slice(-1) == operator) operator = '';
        label = label.slice(0, -1);
        label === '' ? label = '0': label = label;
        display.textContent = label;
    }
}

numbersB.forEach( (button) => {
    button.addEventListener('click', function(e){
        enterKey(e.target.textContent);
    });
});

operatorsB.forEach((button) => {
    button.addEventListener('click', function(e){
        if(operator == ''){
            operator = e.target.textContent;
            label += operator;
            display.textContent = label;
        }
    });
});

const add = (a, b) => parseFloat(a)+parseFloat(b);
const minus = (a, b) => a-b;
const times = (a, b) => a*b;
const divide = (a, b) => a/b;

function equal(a,b,operator){
    switch(operator){
        case '+': return add(a,b);
        case '-': return minus(a,b);
        case '*': return times(a,b);
        case '/': return (b == 0 ? 'fuck you' : divide(a,b));
        default:
    }
}

function enterKey(pressed){
    if(typeof label != 'string') clrDisp();
        if(label.slice(-1) == operator){       
            sublabel = label.slice(0, -1) + ' ' + operator;
            subdisplay.textContent = sublabel;
            first = sublabel.slice(0, -2);
            label = '0';
        }
        if(label === '0') label = pressed;
        else if(label.length <= 9) (label += pressed);
        display.textContent = label;
}

function clrDisp() {
    label = '0';
    sublabel = '0';
    operator = '';
    display.textContent = '0';
    subdisplay.textContent = '0';
}

function shorten(number) {
    console.log(number)
    if(number <= 10000000000){
        let length = 9 - (Math.ceil(number)).toString().length;
        length = Math.pow(10, length);
        answer = Math.round((number + Number.EPSILON) * length) / length;
    }
    else if(number >= 10000000000) {answer = number.toExponential(4)};
    return answer;
}