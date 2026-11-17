
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const cards = document.querySelectorAll(".product-card");

function formatPrice(price) {
    return Number(price).toLocaleString("uz-UZ");
}

// Mahsulotlarni qidirish
function searchProducts() {
    const value = document
        .getElementById("searchInput")
        .value.toLowerCase();

    cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();

        card.style.display = name.includes(value)
            ? "block"
            : "none";
    });
}

// Kategoriyalar bo'yicha filter
function filterProducts(category) {
    cards.forEach(card => {
        card.style.display =
            category === "all" ||
            card.dataset.category === category
                ? "block"
                : "none";
    });
}

// Savatchaga qo'shish
function addToCart(id) {
    const card = document.querySelector(
        `.product-card button[onclick="addToCart(${id})"]`
    ).closest(".product-card");

    const name = card.dataset.name;
    const price = Number(card.querySelector(".price").dataset.price);

    const item = cart.find(p => p.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity: 1
        });
    }

    saveCart();
    alert("Mahsulot savatchaga qo'shildi!");
}

// Savatchani saqlash
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    renderCart();
}

// Savatcha sonini hisoblash
function updateCart() {
    const count = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    document.getElementById("cartCount").textContent = count;
}

// Savatchani ochish
function showCart() {
    document.getElementById("cartOverlay").style.display = "flex";
    renderCart();
}

function closeCart() {
    document.getElementById("cartOverlay").style.display = "none";
}

// Savatcha mahsulotlarini chiqarish
function renderCart() {
    const container = document.getElementById("cartItems");

    let total = 0;
    container.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>${formatPrice(item.price)} so'm</p>

                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity(${item.id}, 1)">+</button>

                <button onclick="removeFromCart(${item.id})">🗑</button>
            </div>
        `;
    });

    document.getElementById("totalPrice").textContent =
        formatPrice(total);
}

// Mahsulot sonini o'zgartirish
function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    saveCart();
}

// Savatchadan o'chirish
function removeFromCart(id) {
    cart = cart.filter(p => p.id !== id);
    saveCart();
}

// Sevimlilarga qo'shish
function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    updateFavorites();
}

// Sevimlilar holatini yangilash
function updateFavorites() {
    cards.forEach(card => {
        const button = card.querySelector(".favorite-btn");
        const id = Number(
            card.querySelector(".add-btn")
                .getAttribute("onclick")
                .match(/\d+/)[0]
        );

        button.textContent = favorites.includes(id) ? "❤️" : "🤍";
    });
}

// Sevimlilarni ko'rsatish
function showFavorites() {
    cards.forEach(card => {
        const id = Number(
            card.querySelector(".add-btn")
                .getAttribute("onclick")
                .match(/\d+/)[0]
        );

        card.style.display = favorites.includes(id)
            ? "block"
            : "none";
    });
}

// Buyurtma
function checkout() {
    if (cart.length === 0) {
        alert("Savatcha bo'sh!");
        return;
    }

    alert("Buyurtmangiz qabul qilindi!");

    cart = [];
    saveCart();
    closeCart();
}

// Qidiruv
document.getElementById("searchInput")
    .addEventListener("input", searchProducts);

// Dastlabki holat
updateCart();
updateFavorites();
