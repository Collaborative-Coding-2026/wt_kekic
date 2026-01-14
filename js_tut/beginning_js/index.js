// //Console Log allows us to output text
// console.log("Hello World!");

// // This is an alert window 
// window.alert("This is an alert window")

// document.getElementById("myh1").textContent = "Hello";

//Syntax for declaring and assigning var
// let x = 100;
// console.log(x);
// let age = 21;

//You must use back ticks to insert variable into string and print
// console.log(`I am ${age}`);
// console.log(typeof age);
// document.getElementById("myh1").textContent = age;

//Arithmetic operators work as they would in python

//Accepting User Input
//Window Prompt
// username = window.prompt("What is your username: ")

//Executes code when submit button is clicked
function greet_user(){
    let username=document.getElementById("myText").value; 
    document.getElementById("myh1").textContent = `Welcome ${username} !`;

}
document.getElementById("mysubmit").onclick = greet_user;

//Type conversion - user input is a string
function age_update(){
    let age = Number(document.getElementById("myAge").value);
    newage = age+1;
    document.getElementById("myh1").textContent = `Happy New Years Eve! You are ${age}, but will be ${newage} in 2026! Zoinks!`;
}

document.getElementById("myagesubmit").onclick = age_update;

