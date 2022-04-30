import { greet, message, generate_random_seq } from "./libFunctions.js";

let size_grid = [1, 2, 3, 4, 5, 6];
let dificulty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let random_sequence = [];
let seq_user = [];
let but = document.createElement("div");
but.classList.add("square")
but.classList.add("bg-primary")
document.getElementById("f").appendChild(but)
console.log(but)
const greet_scaler = greet("Scaler");

console.log(greet_scaler); // Hello, Scaler
console.log(message); // How you doing?
console.log(generate_random_seq(5, [3, 3]));

let square = document.querySelector(".square");
let f = true;
let j=10000; 

while (j!=0) {
  console.log("hola");
  f ? square.style.backgroundColor('red') : square.style.backgroundColor('blue');
  f = !f;
  j--;
}
