let myLibrary = [];

class bookModel {
  constructor(title, author, year, nbPages, read) {
    this.title = title;
    this.author = author;
    this.year = `${year}`;
    this.nbPages = `${nbPages}`;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}, first released in ${this.year}, ${
      this.nbPages
    } pages, ${this.read ? "already read" : "not read yet"}.`;
  }
}

/* const bookModel = {
  init: function (title, author, year, nbPages, read) {
    this.title = title;
    this.author = author;
    this.year = `first released in ${year}`;
    this.nbPages = `${nbPages} pages`;
    this.read = read;
    return this;
  },
  // .info() doesn't work when using function expression... why???
  // since ES6? we can simply write info() {...}
  info: function () {
    return `${this.title} by ${this.author}, ${this.year}, ${this.nbPages}, ${
      this.read ? "already read" : "not read yet"
    }.`;
  },
}; */
let collection = document.querySelector("#collection");
let addBtn = document.querySelector("#addBook");
let bookForm = document.querySelector("#bookForm");
let titleForm = document.querySelector("#titleForm");
let authorForm = document.querySelector("#authorForm");
let yearForm = document.querySelector("#yearForm");
let pagesForm = document.querySelector("#pagesForm");
let readForm = document.querySelector("#readForm");
let submitBtn = document.querySelector('button[type="submit"]');
let errorMsg = document.querySelector("#error");
let cancelBtn = document.querySelector("#cancel");

addBtn.addEventListener("click", displayForm);
submitBtn.addEventListener("click", submitBook);
cancelBtn.addEventListener("click", cancelForm);
window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") bookForm.classList.add("hiddenForm");
});

initLibrary();
displayLibrary();

function initLibrary() {
  if (localStorage.length && localStorage.getItem("library") !== "[]") {
    let tempLibrary = JSON.parse(localStorage.getItem("library"));
    tempLibrary.forEach((book) =>
      addToLibrary(book.title, book.author, book.year, book.nbPages, book.read)
    );
    /* myLibrary.forEach((book) => Object.setPrototypeOf(book, bookModel)); */
  } else {
    addToLibrary("The Hobbit", "J.R.R. Tolkien", 1937, 295, false);
    addToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 1925, 110, true);
    addToLibrary("To Kill a Mocking Bird", "Harper Lee", 1960, 384, false);
  }
}
function addToLibrary(title, author, year, nbPages, read) {
  let newBook = new bookModel(title, author, year, nbPages, read);
  /* let newBook = Object.create(bookModel).init(
    title,
    author,
    year,
    nbPages,
    read
  ); */
  myLibrary.push(newBook);
  //the Storage.setItem the functionality seems to be limited to handle only string key/value pairs
  //that's why JSON.stringify is used as a workaround
  localStorage.setItem("library", JSON.stringify(myLibrary));
}
function displayForm() {
  bookForm.classList.remove("hiddenForm");
}
function submitBook(e) {
  e.preventDefault();
  if (
    !(titleForm.value && authorForm.value && yearForm.value && pagesForm.value)
  ) {
    errorMsg.textContent = "You must fill all fields!";
    return;
  }
  errorMsg.textContent = "";
  addToLibrary(
    titleForm.value,
    authorForm.value,
    yearForm.value,
    pagesForm.value,
    readForm.checked
  );
  titleForm.value = "";
  authorForm.value = "";
  yearForm.value = "";
  pagesForm.value = "";
  readForm.checked = false;
  bookForm.classList.add("hiddenForm");
  displayLibrary();
}
function cancelForm(e) {
  e.preventDefault();
  bookForm.classList.add("hiddenForm");
}
function displayLibrary() {
  collection.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = document.createElement("div");
    collection.appendChild(book);
    //Object.keys also works as it does not take into account inherited keys,
    //as opoosed to for...in;
    //the only difference is that Object.keys only lists enumerable properties
    //(no consequences here though)
    for (ownProp of Object.getOwnPropertyNames(myLibrary[i])) {
      let elem = document.createElement("p");
      if (ownProp === "read") {
        elem.innerHTML = `${
          myLibrary[i][ownProp]
            ? '<button class="read">Read</button>'
            : '<button class="notRead">Not Read</button>'
        }`;
        elem.firstElementChild.setAttribute("data-index", i);
        elem.firstElementChild.addEventListener("click", toggleRead);
      } else
        elem.textContent = `${myLibrary[i][ownProp]}${
          ownProp === "nbPages" ? " pages" : ""
        }`;
      elem.classList.add(`${ownProp}`);
      book.appendChild(elem);
    }
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "-";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.setAttribute("data-index", i);
    deleteBtn.addEventListener("click", removeBook);
    book.appendChild(deleteBtn);
  }
}
function removeBook(e) {
  {
    myLibrary.splice(e.target.getAttribute("data-index"), 1);
    displayLibrary();
    localStorage.setItem("library", JSON.stringify(myLibrary));
  }
}
function toggleRead(e) {
  let i = e.target.getAttribute("data-index");
  myLibrary[i].read = !myLibrary[i].read;
  displayLibrary();
  localStorage.setItem("library", JSON.stringify(myLibrary));
}
