//1
let students = [
    { name: "Gabriel", age: 22, grade: "A" },
    { name: "Joanna", age: 22, grade: "A" },
    { name: "Charlie", age: 21, grade: "C" }
];

console.log(students[1].name);
students.push({ name: "Gabriel", age: 23, grade: "B" });
students.forEach(student => {
    console.log(`${student.name} - Grade: ${student.grade}`);
});

let book = {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960
};

console.log(book.title);

book.year = 1930;

book.getSummary = function() {
    return `${this.title} by ${this.author}, published in ${this.year}.`;
};

console.log(book.getSummary());

let library = [book];

console.log(library);
let car = {
    brand: "Mitsubishi",
    model: "Galant",
    year: 2009
};

console.log(car.model);
car.year = 2009;

car.startEngine = function() {
    console.log(`The engine of the ${this.brand} ${this.model} is starting...`);
};

car.startEngine();

let garage = [car];

console.log(garage);

let person = {
    name: "John",
    age: 30,
    city: "New York"
};

console.log(person.age);