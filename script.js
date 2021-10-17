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
let first = '0';
let second = '0';
let operator = '+';
let secondfoo = false;

clrB.onclick = () => {
    label = "0";
    sublabel = "000";
    display.textContent = label;
    subdisplay.textContent = sublabel;
};

function equal(a,b,operator){
    switch(operator){
        case '+': return add(a,b);
        case '-': return minus(a,b);
        case '*': return times(a,b);
        case '/': return divide(a,b);
        default:
    }
}

equalB.onclick = () => {
}

dltB.onclick = () => {
    label = label.slice(0, -1);
    label === '' ? display.textContent = '0': display.textContent = label;
}

numbersB.forEach( (button) => {
    button.addEventListener('click', function(e){
        if(label === '0') label = e.target.textContent;
        else if(label.length <= 8) (label += e.target.textContent);
        display.textContent = label;
    });
});

operatorsB.forEach( (button) => {
    button.addEventListener('click', function(e){
        if(/\d/.test(display.textContent)){
            if(secondfoo == false){
                sublabel = label;
                first = label;
                subdisplay.textContent = sublabel;
                operator = e.target.textContent;
                label = e.target.textContent;
                display.textContent = label;
                secondfoo = true;
            }
            else{
                second = label.slice(1);
                label = equal(first, second, operator);
                sublabel = label;
                first = sublabel;
                subdisplay.textContent = sublabel;
                operator = e.target.textContent;
                label = e.target.textContent;
                display.textContent = label;
            }
        };
    })
});

const add = (a, b) => parseInt(a)+parseInt(b);
const minus = (a, b) => a-b;
const times = (a, b) => a*b;
const divide = (a, b) => a/b;
