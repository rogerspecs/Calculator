
const calculatorDisplay = document.getElementById('input');
const output = document.getElementById('output');

const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const undoBtn = document.getElementById('undo');
const calcswitchBtn = document.getElementById('calcswitch');
// const historyView = document.getElementById('history');
const historyBtn = document.getElementById('historyBtn');

// DECLAER LIST OF OPERATORS
let listOperators = ['-', '+', '×', '÷'];
let firstValue = 0;
let secondValue = 0;
let op = '';
let removeCharacters = [];

let is_calc_on = false;
let nextOperation = false;

if(is_calc_on){

}else{
    calculatorDisplay.textContent = "";
    output.textContent = "";
    // historyView.textContent = "";
}

let history =[];


// --------------------------------------------------------------------------
const NEXTBTN = document.getElementById('next');
const PREVIOUSBTN = document.getElementById('prev');
const HISTORY = document.getElementById('history');

let currentIndex = 0;
NEXTBTN.addEventListener('click', () => showNextValue());
PREVIOUSBTN.addEventListener('click', () => showPreviousValue());

const POSiTIONVIEW = document.getElementById('position');

let position = 0;
let full_position = "";
let historyTotal = 0;

function showNextValue(){
    historyTotal = history.length
    if(historyTotal != 0){
        console.log(historyTotal)
        console.log(history)

        let lastIndex = historyTotal  - 1;

        position = currentIndex + 1;

        if(currentIndex <= lastIndex){
            full_position = position + "/" + historyTotal
            HISTORY.innerHTML = history[currentIndex] + '<button class="remove" value="0"> <img src="delete.png" title="Delete icon"></button>';
            currentIndex++;
        }else{
            full_position = "1/" + historyTotal
            currentIndex = 0;
            alert("No more history");
        }
        POSiTIONVIEW.textContent = full_position
    }
}

function showPreviousValue(){

    historyTotal = history.length
    if(historyTotal != 0){
        let shownHistory = document.getElementById('history');
        let history_content = shownHistory.textContent;
        let history_value = history_content.split(" ");
        // console.log(history_value)

        let actual_history = history_value[0];
        let shownHistoryIndex = history.indexOf(actual_history);

        if(shownHistoryIndex >= 0){
            if(shownHistoryIndex != 0){
                let previousIndex = shownHistoryIndex - 1;

                position = previousIndex + 1;
                full_position = position + "/" + historyTotal

                HISTORY.innerHTML = history[previousIndex] + '<button class="remove" value="0"> <img src="delete.png" title="Delete icon"></button>';
            }
            
        }else{
            // alert("This is the First History Value")
            full_position = historyTotal + "/" + historyTotal

            let previousIndex = history.length - 1;
            HISTORY.innerHTML = history[previousIndex] + '<button class="remove" value="0"> <img src="delete.png" title="Delete icon"></button>';
        }

        POSiTIONVIEW.textContent = full_position
    }

}



// ------------------------------------------------------------------















function addToHistory(equation){
    history.push(equation);
    // console.log(history);
}
historyBtn.addEventListener('click', () => clearHistory())
function clearHistory(){
    history = [];
    // historyView.innerHTML = "";
}

function showHistory(){
    console.log(history)
    // VARIABLE TO HOLD HISTORY VALUES
    // let allHistory = "";//historyView.textContent;
    // CLEAR CONTENT IN HISTORY VIEW
    // historyView.textContent = "";
    // LOOP THROUGHT THROUGH EACH HISTORY ARRAY
    history.forEach((historyValue) => {
        // ADD EACH HISTORY 
        allHistory += "<span>"+historyValue + "<button class=\"remove\" onclick=\" removeThis(this.value) \" value=" + history.indexOf(historyValue) +">Delete</button></span>"; 
        console.log(historyValue);
    });
    // historyView.innerHTML = allHistory;
    
}

function removeThis(itemIndex){
    history.splice(itemIndex, 1);
    // showHistory();
}
// they hear
calcswitchBtn.addEventListener('click', () => switchCalc());

function switchCalc(){
    if(is_calc_on){
        calculatorDisplay.textContent = "";
        output.textContent = "";
        // historyView.textContent = "";

        // SWITCH OFF THE CALCULATOR
        is_calc_on = false;
        calcswitchBtn.textContent = "On";
    }else{
        calculatorDisplay.textContent = "0";
        output.textContent = "0";
        // SWITCH ON THE CALCULATOR 
        is_calc_on = true;
        calcswitchBtn.textContent = "Off";
        // showHistory();
    }
}
// list of all buttons
// console.log(inputBtns);

// 1 show the number
function sendNumberValue(number){
    //calculatorDisplay.textContent = number// replaces what is their
    if(is_calc_on){
        if(nextOperation)
        {
            // console.log("We are going to the next operation")
            calculatorDisplay.textContent = "";
            if(listOperators.includes(number)){
                calculatorDisplay.textContent = output.textContent + number;
            }else{
                calculatorDisplay.textContent = calculatorDisplay.textContent + number;
            }
            nextOperation = false;
        }else{
            // console.log('we are still on the current operation')
            const displayValue = calculatorDisplay.textContent;
            // // if current number is 0, replace else add multiple numbers together to form big number
            calculatorDisplay.textContent = displayValue === "0" ? number: displayValue + number;
        }
        
    }
}

function splitValues(){
    let equation = calculatorDisplay.textContent;
    // CREATE NEW ARRAY
    var equationBreakdown = new Array();
    // LOOP THROUGH THE LIST OF OPERATOR
    listOperators.forEach((operator) => {
        // CHECK IF THE OPERATOR EXIT IN OUR INPUT STRING
        if(equation.includes(operator)){
            equationBreakdown = equation.split(operator);
            equationBreakdown.push(operator);
        }  
    });
    
    return equationBreakdown;
}

function hundleSplitValues(splitValue){
    if(is_calc_on){
        if(nextOperation)
        {
            console.log("We are going to the next operation")
        }else{
            console.log('we are still on the current operation')
        }

        if(splitValue.length == 3 & splitValue[1] != ""){
            // ASSIGN VALUES
            firstValue = splitValue[0];
            secondValue = splitValue[1];
            op = splitValue[2];

            // console.log(splitValue);
            // console.log('First Value: ', firstValue);
            // console.log('Second Value: ', secondValue);
            // console.log("Operator: ", op);

            performOperation(firstValue, secondValue, op);
        }else{
            alert("Equation not complete");
        }
    }
}

function performOperation(firstNumber, secondNumber, operator){
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    let answer;
    // RE-ASSIGN NEXT OPERATION TO TRUE
    nextOperation = true;
    
    switch(operator){
        case operator = "+":
            answer = firstNumber + secondNumber;
        break;
        case operator = "-":
            answer = firstNumber - secondNumber;
        break;
        case operator = "×":
            answer = firstNumber * secondNumber;
        break;
        case operator = "÷":
            answer = firstNumber / secondNumber;
        break;
    }

    // console.log(answer);
    output.textContent = answer;
    // MAKE THE FULL OPERATION AND THEN ADD IT TO THE HISTORY ARRAY
    equationWithNoAnswer = calculatorDisplay.textContent;
    let completeEquation = equationWithNoAnswer + ' = ' + answer;
    addToHistory(completeEquation);
    // showHistory()

}

// 2 Add event listners for buttons      
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    }
    else if(inputBtn.classList.contains("equal")){
        inputBtn.addEventListener('click', () => hundleSplitValues(splitValues()));
    }
    else if(inputBtn.classList.contains("op")){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    }
    else if(inputBtn.classList.contains("decimal")){
        inputBtn.addEventListener('click', () => addDecimal());
    }
});
// INITAUL FUNCTION TO ADD DECIMALL(CAN'T ADD DECIMAL TO BOTH VALUES)
// function addDecimal(){
//     // 2 if no decimal add one
//     if(!calculatorDisplay.textContent.includes(".")){
//         calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
//     }
// }

function addDecimal(){
    if(is_calc_on){
        let splitEquation = checkDecimal();
        // console.log(splitEquation)
        if(!calculatorDisplay.textContent.includes(".")){
            calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
        }
        else if(splitEquation.length > 1){
            secondValue = splitEquation[1];
            if(!secondValue.includes(".")){
                calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
            }
        }
    }
}

function checkDecimal(){
    let currentEquation = calculatorDisplay.textContent;

    var currentEquationBreakdown = new Array();
    // LOOP THROUGH THE LIST OF OPERATOR
    listOperators.forEach((operator) => {
        // CHECK IF THE OPERATOR EXIT IN OUR INPUT STRING
        if(currentEquation.includes(operator)){
            currentEquationBreakdown = currentEquation.split(operator);
        }  
    });

    return currentEquationBreakdown;
}

 // 3 Reset display
 function resetAll(){
    if(is_calc_on){
        calculatorDisplay.textContent = "0";
        output.textContent = "0";
    }
}

// 4 clear event listener
clearBtn.addEventListener('click', () => resetAll());

function deleteLastInput(){
    if(is_calc_on){
        let currentEquation = calculatorDisplay.textContent;
        // SPLIT EACH CHARACTER AS AN ARRAY ELEMENT
        let currentEquationCharacters = currentEquation.split('');
        if(currentEquationCharacters.length > 0){
            let removeCharacter = currentEquationCharacters.pop();
            removeCharacters.push(removeCharacter);
        }
        // console.log("Current array of equation Characters: ",currentEquationCharacters);
        // console.log("Removed Characters: ",removeCharacter);

        var newEquation = "";
        currentEquationCharacters.forEach((currentEquationCharacter) => {
            newEquation += currentEquationCharacter;
        });
        calculatorDisplay.textContent = newEquation;
    }

}

deleteBtn.addEventListener('click', () => deleteLastInput());


undoBtn.addEventListener('click', () => undo());
function undo(){
    if(is_calc_on){
        if(removeCharacters.length > 0){
            let lastRemovedCharacterPosition = (removeCharacters.length - 1);
            let lastRemovedCharacter = removeCharacters[lastRemovedCharacterPosition];
            calculatorDisplay.textContent = `${calculatorDisplay.textContent}` + lastRemovedCharacter;
            removeCharacters.pop();
        }else{ 
            alert("All values restored");
        }
    }
}