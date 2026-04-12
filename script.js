function login() {
    let user = document.getElementById("username").value;
    if(user){
        localStorage.setItem("user", user);
        window.location.href = "dashboard.html";
    }
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

function addBook() {
    let book = document.getElementById("bookName").value;
    let books = JSON.parse(localStorage.getItem("books")) || [];

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));

    displayBooks();
}

function displayBooks() {
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let list = document.getElementById("bookList");

    if(!list) return;

    list.innerHTML = "";

    books.forEach((b, index) => {
        list.innerHTML += `
            <li>
                ${b}
                <button onclick="requestBook('${b}')">Request</button>
                <button onclick="deleteBook(${index})">Delete</button>
            </li>
        `;
    });
}

function deleteBook(index) {
    let books = JSON.parse(localStorage.getItem("books"));
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}

function searchBook() {
    let input = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll("#bookList li");

    items.forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(input) ? "" : "none";
    });
}

function requestBook(book) {
    localStorage.setItem("currentBook", book);
    window.location.href = "chat.html";
}

function sendMessage() {
    let msg = document.getElementById("message").value;
    let chat = document.getElementById("chatBox");

    chat.innerHTML += `<p>${msg}</p>`;
}

if(window.location.pathname.includes("dashboard.html")) {
    displayBooks();
}