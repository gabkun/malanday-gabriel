const square = (num) => num * num;
console.log(`Square of 5 is: ${square(5)}`);

let name = "Alice";
let age = 30;
let welcomeMessage = `Welcome, ${name}! You are ${age} years old.`;
console.log(welcomeMessage);

const person = { firstName: "John", lastName: "Doe" };
const { firstName, lastName } = person;
console.log(`First Name: ${firstName}, Last Name: ${lastName}`);

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const mergedArray = [...array1, ...array2];
console.log("Merged Array:", mergedArray);

const calculateArea = (length = 1, width = 1) => length * width;
console.log(`Area of rectangle (3, 4): ${calculateArea(3, 4)}`);
console.log(`Area of rectangle (default): ${calculateArea()}`);

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(`Hi, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

const personInstance = new Person("Bob", 25);
personInstance.introduce();