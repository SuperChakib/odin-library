let myLibrary = [];

const bookModel = {
  init: function (title, author, nbPages, read) {
    this.title = title;
    this.author = author;
    this.nbPages = `${nbPages} pages`;
    this.read = read ? "already read" : "not read yet";
    return this;
  },
  // .info() doesn't work when using function expression... why???
  info: function () {
    return `${this.title} by ${this.author}, ${this.nbPages} pages, ${this.read}.`;
  },
};

function addToLibrary(title, author, nbPages, read) {
  let newBook = Object.create(bookModel).init(title, author, nbPages, read);
  console.log(newBook);
  myLibrary.push(newBook);
  console.log(Object.keys(newBook));
  console.log(newBook.info());
}

addToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 110, true);
addToLibrary("To Kill a Mocking Bird", "Harper Lee", 384, false);

function displayLibrary() {
  for (let i = 0; i < myLibrary.length; i++) {
    let book = document.createElement("div");
    let collection = document.querySelector("div");
    collection.appendChild(book);
    for (ownProp of Object.keys(myLibrary[i])) {
      let elem = document.createElement("p");
      elem.textContent = myLibrary[i][ownProp];
      elem.classList.add(`${ownProp}`);
      book.appendChild(elem);
    }
  }
}

displayLibrary();
