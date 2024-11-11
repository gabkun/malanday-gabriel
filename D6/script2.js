const greet = function() {
    console.log("Hello! Welcome to the world of Gabriel Malanday.");
};

greet();

const add = function(a, b) {
    return a + b;
};

const sum = add(5, 3);

console.log("Sum:", sum);
const multiply = function(a, b) {
    return a * b;
};


const product = multiply(4, 2);


console.log("Product:", product);

const isEven = function(num) {
    return num % 2 === 0;
};

const even = isEven(6);


console.log("Is Even:", even);

const square = function(num) {
    return num * num;
};

const squaredValue = square(3);

console.log("Squared Value:", squaredValue);

const fullName = function(firstName, lastName) {
    return `${firstName} ${lastName}`;
};

const name = fullName("Gahriel", "Malanday");

console.log("Full Name:", name);

const capitalize = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const capitalizedString = capitalize("javascript");

console.log("Capitalized String:", capitalizedString);
