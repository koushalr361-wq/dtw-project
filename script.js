let currentUser = localStorage.getItem("user");
let books = JSON.parse(localStorage.getItem("books")) || [];

// AUTO LOGIN
if (currentUser) {
    showApp();
}

// LOGIN FUNCTION
function login() {
    let name = document.getElementById("username").value;

    if (name === "") {
        alert("Enter name");
        return;
    }

    localStorage.setItem("user", name);
    currentUser = name;
    showApp();
}

function showApp() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("userDisplay").innerText = currentUser;

    displayBooks();
}

// DISPLAY BOOKS
function displayBooks(list = books) {
    let container = document.getElementById("bookList");
    container.innerHTML = "";

    list.forEach((b, index) => {
        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <span>${b.name} (by ${b.user})</span>
            <div>
                <button class="request-btn" onclick="requestBook('${b.name}')">Request</button>
                <button class="delete-btn" onclick="deleteBook(${index})">❌</button>
            </div>
        `;

        container.appendChild(div);
    });
}

// ADD BOOK
function addBook() {
    let book = document.getElementById("bookName").value;

    if (book === "") {
        alert("Enter book name");
        return;
    }

    books.push({ name: book, user: currentUser });
    localStorage.setItem("books", JSON.stringify(books));

    displayBooks();
    document.getElementById("bookName").value = "";
}

// DELETE
function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}

// SEARCH
function searchBooks() {
    let search = document.getElementById("search").value.toLowerCase();

    let filtered = books.filter(b =>
        b.name.toLowerCase().includes(search)
    );

    displayBooks(filtered);
}

// REQUEST (SIMULATED CHAT)
function requestBook(bookName) {
    alert("Request sent for: " + bookName + "\\nOwner will be notified!");
}