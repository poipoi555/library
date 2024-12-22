let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

/*
// troubleshooting

const clearAll = document.querySelector(".clear");
clearAll.addEventListener("click", () => {
    myLibrary = [];
    const books = document.querySelector(".books");
    books.innerHTML = "";
});
*/

// adding a book --> popup displays 

const addBook = document.querySelector(".addbutton");
const popup = document.querySelector(".popup");

addBook.addEventListener("click", () => {
    popup.style.display = "block";
});


// submitting a new book --> 

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", createBook);

function createBook() {
    // get the inputs from the popup
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const numPages = document.querySelector("#pages");
    const read = document.querySelector("#read");

    const tVal = title.value;
    const aVal = author.value;
    const pVal = numPages.value;
    const rVal = read.checked;

    if (tVal == undefined || aVal == undefined || pVal == undefined) {
        alert("Please fill in all fields");
        return;
    }

    const newBook = new Book(tVal, aVal, pVal, rVal);
    addBookToLibrary(newBook);
    popup.style.display = "none";
    displayBooks();

    title.value = "";
    author.value = "";
    numPages.value = "";
    read.checked = false;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}


// cancelling book submission --> 

const cancelButton = document.querySelector(".cancel");
cancelButton.addEventListener("click", () => {
    popup.style.display = "none";
});


// displaying books --> 

function displayBooks() {
    const books = document.querySelector(".books");
    // clear current books to prevent copies
    books.innerHTML = "";

    myLibrary.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("newBook");

        const titleDiv =  document.createElement("div");
        titleDiv.classList.add("bookTitle");
        const title = book.title;
        titleDiv.textContent = "Title: " + title;
        bookDiv.appendChild(titleDiv);

        const authorDiv = document.createElement("div");
        authorDiv.classList.add("bookAuthor");
        const author = book.author;
        authorDiv.textContent = "Author: " + author;
        bookDiv.appendChild(authorDiv);

        const pagesDiv = document.createElement("div");
        pagesDiv.classList.add("bookPages");
        const pages = book.pages;
        pagesDiv.textContent = "Pages: " + pages;
        bookDiv.appendChild(pagesDiv);

        const readDiv = document.createElement("div");
        readDiv.classList.add("bookRead");
        const read = book.read;
        if (read) {
            readDiv.textContent = "Status: Have read";
        }
        else {
            readDiv.textContent = "Status: Have not read";
        }
        bookDiv.appendChild(readDiv);

        const updateButton = document.createElement("button");
        updateButton.classList.add("bookUpdate");
        updateButton.textContent = "Read";
        updateButton.addEventListener("click", updateStatus);
        bookDiv.appendChild(updateButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("bookDelete");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", deleteBook);
        bookDiv.appendChild(deleteButton);

        books.appendChild(bookDiv);
    });
}


// updating book status to read/unread -->

function updateStatus(event) {
    const buttonClicked = event.target;
    const bookDiv = buttonClicked.parentNode;
    const titleDiv = bookDiv.querySelector(".bookTitle");
    const title = titleDiv.textContent;

    for (let i = 0; i < myLibrary.length; i++) {
        if (title === "Title: " + myLibrary[i].title) {
            myLibrary[i].read = true;
        }
    }

    const bookRead = bookDiv.querySelector(".bookRead");
    bookRead.textContent = "Status: Have read";

    displayBooks();
}


// deleting book from library --> 

function deleteBook(event) {
    const buttonClicked = event.target;
    const bookDiv = buttonClicked.parentNode;
    const titleDiv = bookDiv.querySelector(".bookTitle");
    const title = titleDiv.textContent;

    for (let i = 0; i < myLibrary.length; i++) {
        if (title === "Title: " + myLibrary[i].title) {
            myLibrary.splice(i, 1);
        }
    }

    bookDiv.remove();
}
