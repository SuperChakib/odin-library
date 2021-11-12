let myLibrary = [];

const bookModel = {
  init: function (title, author, year, nbPages, read) {
    this.title = title;
    this.author = author;
    this.year = `first release: ${year}`;
    this.nbPages = `${nbPages} pages`;
    this.read = read ? "already read" : "not read yet";
    return this;
  },
  // .info() doesn't work when using function expression... why???
  info: function () {
    return `${this.title} by ${this.author}, first published in ${year}, ${this.nbPages} pages, ${this.read}.`;
  },
};

function addToLibrary(title, author, year, nbPages, read) {
  let newBook = Object.create(bookModel).init(
    title,
    author,
    year,
    nbPages,
    read
  );
  myLibrary.push(newBook);
}

addToLibrary("The Hobbit", "J.R.R. Tolkien", 1937, 295, false);
addToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 1925, 110, true);
addToLibrary("To Kill a Mocking Bird", "Harper Lee", 1960, 384, false);

function displayLibrary() {
  let collection = document.querySelector("#collection");
  collection.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let book = document.createElement("div");
    collection.appendChild(book);
    for (ownProp of Object.keys(myLibrary[i])) {
      let elem = document.createElement("p");
      elem.textContent = myLibrary[i][ownProp];
      elem.classList.add(`${ownProp}`);
      book.appendChild(elem);
    }
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "-";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(i, 1);
      displayLibrary();
    });
    book.appendChild(deleteBtn);
  }
}

let bookForm = document.querySelector("#bookForm");
let addBtn = document.querySelector("#addBook");

addBtn.addEventListener("click", displayForm);

function displayForm() {
  bookForm.classList.remove("hiddenForm");
}

let titleForm = document.querySelector("#titleForm");
let authorForm = document.querySelector("#authorForm");
let pagesForm = document.querySelector("#pagesForm");
let yearForm = document.querySelector("#yearForm");
let readForm = document.querySelector("#readForm");
let submitBtn = document.querySelector('button[type="submit"]');
let cancelBtn = document.querySelector("#cancel");
let errorMsg = document.querySelector("#error");
submitBtn.addEventListener("click", submitBook);
cancelBtn.addEventListener("click", cancelForm);
window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") bookForm.classList.add("hiddenForm");
});

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
  /*   titleForm.value = "";
  authorForm.value = "";
  yearForm.value = "";
  pagesForm.value = "";
  readForm.checked = false; */
  bookForm.classList.add("hiddenForm");
  displayLibrary();
}
function cancelForm(e) {
  e.preventDefault();
  bookForm.classList.add("hiddenForm");
}

displayLibrary();
