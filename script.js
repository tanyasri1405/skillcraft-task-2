const display = document.getElementById("display");
const expression = document.getElementById("expression");

let currentInput = "";
let degreeMode = true;
let lastAnswer = 0;

const buttons = document.querySelectorAll(".buttons button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent.trim();

        handleInput(value);

    });

});

function handleInput(value){

    switch(value){

        case "AC":

            clearCalculator();
            break;

        case "DEL":

            deleteLast();
            break;

        case "=":

            calculate();
            break;

        case "×":

            append("*");
            break;

        case "÷":

            append("/");
            break;

        default:

            append(value);

    }

}

function append(value){

    currentInput += value;

    updateDisplay();

}

function updateDisplay(){

    display.textContent = currentInput || "0";

}

function clearCalculator(){

    currentInput = "";

    expression.textContent = "";

    display.textContent = "0";

}

function deleteLast(){

    currentInput = currentInput.slice(0,-1);

    updateDisplay();

}

function calculate(){

    if(currentInput === "") return;

    try{

        const result = eval(currentInput);

        expression.textContent = currentInput + " =";

        display.textContent = result;

        lastAnswer = result;

        currentInput = result.toString();

    }

    catch{

        display.textContent = "Error";

        currentInput = "";

    }

}

document.addEventListener("keydown",(e)=>{

    const key = e.key;

    if(!isNaN(key) || "+-*/().".includes(key)){

        append(key);

    }

    else if(key === "Enter"){

        e.preventDefault();

        calculate();

    }

    else if(key === "Backspace"){

        deleteLast();

    }

    else if(key === "Escape"){

        clearCalculator();

    }

});
const degBtn = document.getElementById("degBtn");
const radBtn = document.getElementById("radBtn");

degBtn.classList.add("active");

degBtn.addEventListener("click", () => {
    degreeMode = true;
    degBtn.classList.add("active");
    radBtn.classList.remove("active");
});

radBtn.addEventListener("click", () => {
    degreeMode = false;
    radBtn.classList.add("active");
    degBtn.classList.remove("active");
});

function factorial(n){

    if(n < 0) return NaN;

    if(n === 0 || n === 1) return 1;

    let result = 1;

    for(let i = 2; i <= n; i++){

        result *= i;

    }

    return result;

}

function calculate(){

    if(currentInput === "") return;

    try{

        let exp = currentInput;

        exp = exp.replace(/π/g,Math.PI);

        exp = exp.replace(/\be\b/g,Math.E);

        exp = exp.replace(/Ans/g,lastAnswer);

        exp = exp.replace(/√\((.*?)\)/g,"Math.sqrt($1)");

        exp = exp.replace(/√([0-9.]+)/g,"Math.sqrt($1)");

        exp = exp.replace(/([0-9.]+)²/g,"Math.pow($1,2)");

        exp = exp.replace(/([0-9.]+)\^([0-9.]+)/g,"Math.pow($1,$2)");

        exp = exp.replace(/([0-9.]+)!/g,(m,n)=>factorial(Number(n)));

        exp = exp.replace(/([0-9.]+)%/g,"($1/100)");

        exp = exp.replace(/1\/([0-9.]+)/g,"(1/$1)");

        exp = exp.replace(/sin\((.*?)\)/g,(m,n)=>{

            let value = eval(n);

            if(degreeMode){

                value = value * Math.PI / 180;

            }

            return Math.sin(value);

        });

        exp = exp.replace(/cos\((.*?)\)/g,(m,n)=>{

            let value = eval(n);

            if(degreeMode){

                value = value * Math.PI / 180;

            }

            return Math.cos(value);

        });

        exp = exp.replace(/tan\((.*?)\)/g,(m,n)=>{

            let value = eval(n);

            if(degreeMode){

                value = value * Math.PI / 180;

            }

            return Math.tan(value);

        });

        exp = exp.replace(/log\((.*?)\)/g,(m,n)=>Math.log10(eval(n)));

        exp = exp.replace(/ln\((.*?)\)/g,(m,n)=>Math.log(eval(n)));

        const result = eval(exp);

        expression.textContent = currentInput + " =";

        display.textContent = Number(result.toFixed(12));

        lastAnswer = Number(result.toFixed(12));

        currentInput = lastAnswer.toString();

    }

    catch{

        display.textContent = "Error";

        currentInput = "";

    }

}

function handleInput(value){

    switch(value){

        case "AC":
            clearCalculator();
            break;

        case "DEL":
            deleteLast();
            break;

        case "=":
            calculate();
            break;

        case "×":
            append("*");
            break;

        case "÷":
            append("/");
            break;

        case "π":
            append("π");
            break;

        case "e":
            append("e");
            break;

        case "Ans":
            append("Ans");
            break;

        case "√":
            append("√(");
            break;

        case "sin":
            append("sin(");
            break;

        case "cos":
            append("cos(");
            break;

        case "tan":
            append("tan(");
            break;

        case "log":
            append("log(");
            break;

        case "ln":
            append("ln(");
            break;

        case "x²":
            append("²");
            break;

        case "xʸ":
            append("^");
            break;

        case "!":
            append("!");
            break;

        case "%":
            append("%");
            break;

        case "±":

            if(currentInput.startsWith("-")){

                currentInput = currentInput.substring(1);

            }else{

                currentInput = "-" + currentInput;

            }

            updateDisplay();

            break;

        default:

            append(value);

    }

}
const modeSelect = document.getElementById("mode");

let history = [];

modeSelect.addEventListener("change", () => {

    const mode = modeSelect.value;

    if(mode === "Standard"){

        document.querySelectorAll(".function").forEach(btn=>{

            btn.style.display = "none";

        });

    }

    else{

        document.querySelectorAll(".function").forEach(btn=>{

            btn.style.display = "inline-block";

        });

    }

});

function saveHistory(exp,result){

    history.unshift({

        expression:exp,
        answer:result

    });

    if(history.length>10){

        history.pop();

    }

    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(history)
    );

}

function loadHistory(){

    const data = localStorage.getItem(
        "calculatorHistory"
    );

    if(data){

        history = JSON.parse(data);

    }

}

const oldCalculate = calculate;

calculate = function(){

    if(currentInput==="") return;

    try{

        let exp=currentInput;

        exp=exp.replace(/π/g,Math.PI);
        exp=exp.replace(/\be\b/g,Math.E);
        exp=exp.replace(/Ans/g,lastAnswer);

        exp=exp.replace(/√\((.*?)\)/g,"Math.sqrt($1)");
        exp=exp.replace(/√([0-9.]+)/g,"Math.sqrt($1)");

        exp=exp.replace(/([0-9.]+)²/g,"Math.pow($1,2)");

        exp=exp.replace(/([0-9.]+)\^([0-9.]+)/g,"Math.pow($1,$2)");

        exp=exp.replace(/([0-9.]+)!/g,(m,n)=>factorial(Number(n)));

        exp=exp.replace(/([0-9.]+)%/g,"($1/100)");

        exp=exp.replace(/1\/([0-9.]+)/g,"(1/$1)");

        exp=exp.replace(/sin\((.*?)\)/g,(m,n)=>{

            let x=eval(n);

            if(degreeMode){

                x=x*Math.PI/180;

            }

            return Math.sin(x);

        });

        exp=exp.replace(/cos\((.*?)\)/g,(m,n)=>{

            let x=eval(n);

            if(degreeMode){

                x=x*Math.PI/180;

            }

            return Math.cos(x);

        });

        exp=exp.replace(/tan\((.*?)\)/g,(m,n)=>{

            let x=eval(n);

            if(degreeMode){

                x=x*Math.PI/180;

            }

            return Math.tan(x);

        });

        exp=exp.replace(/log\((.*?)\)/g,
        (m,n)=>Math.log10(eval(n)));

        exp=exp.replace(/ln\((.*?)\)/g,
        (m,n)=>Math.log(eval(n)));

        const result=Number(eval(exp).toFixed(12));

        expression.textContent=currentInput+" =";

        display.textContent=result;

        lastAnswer=result;

        saveHistory(currentInput,result);

        currentInput=result.toString();

    }

    catch{

        display.textContent="Error";

        currentInput="";

    }

};

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="l"){

        e.preventDefault();

        clearCalculator();

    }

    if(e.key==="Delete"){

        clearCalculator();

    }

});

buttons.forEach(button=>{

    button.addEventListener("mousedown",()=>{

        button.style.transform="scale(.95)";

    });

    button.addEventListener("mouseup",()=>{

        button.style.transform="scale(1)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="scale(1)";

    });

});

loadHistory();
