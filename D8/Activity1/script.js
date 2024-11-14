
let number = 25;  // example number
let squareRoot = Math.sqrt(number);
console.log(`Square root of ${number} is ${squareRoot}`);

let randomNumber = Math.floor(Math.random() * 10) + 1;
console.log(`Random number between 1 and 10: ${randomNumber}`);

let stringNumber = "42";
let actualNumber = Number(stringNumber);
console.log(`Converted "${stringNumber}" to number: ${actualNumber}`);

let value = "hello";
let isNotANumber = isNaN(value);
console.log(`Is "${value}" not a number? ${isNotANumber}`);

let num = 123;
let numAsString = num.toString();
console.log(`Converted ${num} to string: "${numAsString}"`);