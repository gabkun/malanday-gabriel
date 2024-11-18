class Item {
    constructor(title) {
        this.title = title;
    }

    displayInfo() {
        console.log(`Title: ${this.title}`);
    }
}

class Book extends Item {
    constructor(title, author, genre) {
        super(title); 
        this.author = author;
        this.genre = genre;
        this.availability = true; 
    }

    displayInfo() {
        super.displayInfo(); 
        console.log(`Author: ${this.author}`);
        console.log(`Genre: ${this.genre}`);
        console.log(`Available: ${this.availability ? "Yes" : "No"}`);
    }

    borrowBook() {
        if (this.availability) {
            this.availability = false;
            console.log(`You have borrowed "${this.title}".`);
        } else {
            console.log(`Sorry, "${this.title}" is currently unavailable.`);
        }
    }

    returnBook() {
        if (!this.availability) {
            this.availability = true;
            console.log(`You have returned "${this.title}". Thank you!`);
        } else {
            console.log(`"${this.title}" was not borrowed.`);
        }
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(title, author, genre) {
        const newBook = new Book(title, author, genre);
        this.books.push(newBook);
        console.log(`Added book: "${title}" by ${author}`);
    }

    searchBook(title) {
        const book = this.books.find(b => b.title.toLowerCase() === title.toLowerCase());
        if (book) {
            console.log("\nBook Found:");
            book.displayInfo();
        } else {
            console.log(`Book titled "${title}" not found in the library.`);
        }
    }

    displayBooks() {
        console.log("\nAvailable books in the library:");
        this.books.forEach(book => {
            if (book.availability) {
                console.log(`- ${book.title} by ${book.author} [${book.genre}]`);
            }
        });
    }
}

const library = new Library();

library.addBook("The Night Circus", "Erin Morgenstern", "Fantasy");
library.addBook("The Shadow of the Wind", "Carlos Ruiz Zafón", "Mystery");
library.addBook("A Man Called Ove", "Fredrik Backman", "Fiction");
library.addBook("The Song of Achilles", "Madeline Miller", "Historical Fiction");
library.addBook("The Ocean at the End of the Lane", "Neil Gaiman", "Fantasy");
library.addBook("Stoner", "John Williams", "Literary Fiction");
library.addBook("The Ten Thousand Doors of January", "Alix E. Harrow", "Fantasy");
library.addBook("The Housekeeper and the Professor", "Yoko Ogawa", "Mathematical Fiction");
library.addBook("Pachinko", "Min Jin Lee", "Historical Fiction");
library.addBook("Circe", "Madeline Miller", "Mythology");

console.log("\nSearching for a book:");
library.searchBook("Circe");

console.log("\nList of available books:");
library.displayBooks();

console.log("\nBorrowing a book:");
const bookToBorrow = library.books.find(b => b.title === "Circe");
if (bookToBorrow) bookToBorrow.borrowBook();

console.log("\nDisplaying available books after borrowing:");
library.displayBooks();

console.log("\nReturning a book:");
if (bookToBorrow) bookToBorrow.returnBook();

console.log("\nDisplaying available books after returning:");
library.displayBooks();