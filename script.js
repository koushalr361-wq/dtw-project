const clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
// DEFAULT BOOKS
if(!localStorage.getItem("books")) {
    let defaultBooks = [
        {
            name: "Atomic Habits",
            img: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
            category: "Self Help",
            rating: 5,
            liked: false
        },
        {
            name: "Rich Dad Poor Dad",
            img: "https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg",
            category: "Finance",
            rating: 4,
            liked: false
        },
        {
            name: "The Alchemist",
            img: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg",
            category: "Fiction",
            rating: 5,
            liked: false
        }
    ];

    localStorage.setItem("books", JSON.stringify(defaultBooks));
}

function login() {
    document.body.style.opacity = 0;
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 400);
}
function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

function addBook() {
    let name = document.getElementById("bookName").value;
    let img = document.getElementById("bookImg").value;
    let category = document.getElementById("category").value;

    let books = JSON.parse(localStorage.getItem("books"));
    books.push({name, img, category, rating: 0, liked: false});
    localStorage.setItem("books", JSON.stringify(books));
    clickSound.play();

    displayBooks();
}

function displayBooks() {
    let books = JSON.parse(localStorage.getItem("books"));
    let list = document.getElementById("bookList");

    list.innerHTML = "";

    books.forEach((b, i) => {
        list.innerHTML += `
        <div class="card">
            <img src="${b.img}">
            <h3>${b.name}</h3>
            <p>${b.category}</p>
            <p>⭐ ${b.rating}</p>

            <div class="actions">
                <button onclick="rate(${i})">⭐</button>
                <button onclick="like(${i})">${b.liked ? '❤️' : '🤍'}</button>
                <button onclick="deleteBook(${i})">🗑️</button>
            </div>
        </div>
        `;
    });

    updateStats();
}

function rate(i) {
    let books = JSON.parse(localStorage.getItem("books"));
    books[i].rating++;
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}

function like(i) {
    let books = JSON.parse(localStorage.getItem("books"));
    books[i].liked = !books[i].liked;
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
    clickSound.play();
}

function deleteBook(i) {
    let books = JSON.parse(localStorage.getItem("books"));
    books.splice(i, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
    clickSound.play();
}

function updateStats() {
    let books = JSON.parse(localStorage.getItem("books"));

    document.getElementById("totalBooks").innerText = books.length;
    document.getElementById("likedBooks").innerText =
        books.filter(b => b.liked).length;

    let categories = {};
    books.forEach(b => {
        categories[b.category] = (categories[b.category] || 0) + 1;
    });

    let top = Object.keys(categories).reduce((a,b)=>
        categories[a] > categories[b] ? a : b, "-");

    document.getElementById("topCategory").innerText = top;
}

if(window.location.pathname.includes("dashboard.html")) {
    displayBooks();
}
// LOADER + TYPING EFFECT
window.addEventListener("load", () => {
    let loader = document.getElementById("loader");
    let card = document.querySelector(".glass-card");

    if(loader) loader.style.display = "none";

    if(card){
        card.classList.remove("hidden");
        card.classList.add("show");
    }

    typeEffect();
});

// TYPING TEXT
function typeEffect() {
    let el = document.getElementById("typing");
    if(!el) return;

    let text = "Book Exchange";
    let i = 0;

    function typing() {
        if(i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, 70);
        }
    }

    typing();
}
function toggleTheme() {
    document.body.classList.toggle("light");
}
