// ===============================
// PRODUCT DATA
// ===============================
const products = [
  {
    id: 1,
    name: "Wireless Headphone",
    price: 2500,
    image: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 4000,
    image: "assert/a.jpg"
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 5500,
    image: "https://via.placeholder.com/200"
  }
];

// ===============================
// SELECT ELEMENTS
// ===============================
const productContainer = document.querySelector(".products");
const cartItemsContainer = document.querySelector(".cart-items");
const cartCount = document.getElementById("cart-count");
const totalPriceElement = document.getElementById("total-price");

// ===============================
// CART ARRAY (STATE)
// ===============================
let cart = [];

// ===============================
// RENDER PRODUCTS
// ===============================
function renderProducts() {
  productContainer.innerHTML = "";

  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">Rs ${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productContainer.appendChild(productCard);
  });
}

// ===============================
// ADD TO CART
// ===============================
function addToCart(id) {
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// ===============================
// UPDATE CART UI
// ===============================
function updateCart() {
  cartItemsContainer.innerHTML = "";

  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">

      <div class="cart-details">
        <h4>${item.name}</h4>
        <p>Price: Rs ${item.price}</p>

        <div class="quantity-control">
          <button onclick="decreaseQty(${item.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQty(${item.id})">+</button>
        </div>
      </div>

      <div class="cart-price">
        Rs ${item.price * item.quantity}
      </div>

      <button class="remove-btn" onclick="removeItem(${item.id})">✖</button>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  updateCartCount();
  updateTotalPrice();
}

// ===============================
// INCREASE QUANTITY
// ===============================
function increaseQty(id) {
  const item = cart.find(item => item.id === id);
  item.quantity += 1;
  updateCart();
}

// ===============================
// DECREASE QUANTITY
// ===============================
function decreaseQty(id) {
  const item = cart.find(item => item.id === id);

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(item => item.id !== id);
  }

  updateCart();
}

// ===============================
// REMOVE ITEM
// ===============================
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// ===============================
// UPDATE CART COUNT
// ===============================
function updateCartCount() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// ===============================
// UPDATE TOTAL PRICE
// ===============================
function updateTotalPrice() {
  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  totalPriceElement.textContent = total;
}

// ===============================
// INITIALIZE
// ===============================
renderProducts();