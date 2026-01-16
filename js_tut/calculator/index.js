//Calculator
const display = document.getElementById("display");

function appendToDisplay(input){
    if (display.value==="Error"){
        display.value = ""
    }
    display.value += input;
 
}

function calculate(){
    try{
        display.value = eval(display.value)
    }
    catch(error){
        display.value = "Error"
    }
}

function clearDisplay(){
    display.value = ""

}

function backspace(){
    if (display.value==="Error"){
        display.value = ""
    }
    
    display.value = display.value.slice(0,-1)
    
    
}

function changeSign(){
    if (display.value ==="Error"){
        display.value = ""
    }
    if (display.value.startsWith("-")){
        display.value = display.value.slice(1);
    }

    else { 
        display.value = "-" + display.value; 
    }
    
}