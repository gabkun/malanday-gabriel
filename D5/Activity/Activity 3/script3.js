const secretNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 0;
let guessedNumber;
console.log("Welcome to the Guess the Secret Number Game!");
console.log("I'm thinking of a number between 1 and 10. Can you guess it?");

do {
  guessedNumber = parseInt(prompt("Enter your guess (1-10):"));
  attempts += 1;

  if (guessedNumber < secretNumber) {
    console.log("Too low! Try again.");
  } else if (guessedNumber > secretNumber) {
    console.log("Too high! Try again.");
  } else if (guessedNumber === secretNumber) {
    console.log(`Congratulations! You guessed the correct number: ${secretNumber}`);
    console.log(`It took you ${attempts} attempts.`);
  } else {
    console.log("Please enter a valid number.");
  }
} while (guessedNumber !== secretNumber);