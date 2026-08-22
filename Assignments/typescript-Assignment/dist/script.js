"use strict";
// ------------------------------------------------------------------
// Data — a typed array of Product objects
// ------------------------------------------------------------------
const products = [
    {
        id: 101, // number ID
        name: "Aurora Wireless Headphones",
        price: 89.99,
        category: "Electronics",
        available: true,
        glyph: "🎧",
    },
    {
        id: "CL-204", // string ID
        name: "Heritage Denim Jacket",
        price: 59.99,
        category: "Clothing",
        available: false,
        glyph: "🧥",
    },
    {
        id: 305, // number ID
        name: "Woven Leather Wallet",
        price: 34.99,
        category: "Accessories",
        available: true,
        glyph: "👛",
    },
];
// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------
// Formats a price as USD, e.g. 89.99 -> "$89.99"
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}
// Builds the single markup string for one product card
function renderCard(product) {
    const availabilityClass = product.available ? "in-stock" : "out-of-stock";
    const availabilityLabel = product.available ? "Available" : "Out of Stock";
    const buttonAttrs = product.available ? "" : "disabled";
    return `
    <article class="product-card" data-id="${product.id}">
      <div class="card-spotlight">
        <span class="shelf-tag">ID · ${product.id}</span>
        <span class="glyph" aria-hidden="true">${product.glyph}</span>
      </div>
      <div class="card-body">
        <div class="card-top-row">
          <h3 class="product-name">${product.name}</h3>
          <span class="price">${formatPrice(product.price)}</span>
        </div>
        <div class="meta-row">
          <span class="category-badge">${product.category}</span>
          <span class="availability ${availabilityClass}">
            <span class="dot"></span>${availabilityLabel}
          </span>
        </div>
        <button class="view-btn" data-id="${product.id}" ${buttonAttrs}>
          ${product.available ? "View Product" : "Notify Me"}
        </button>
      </div>
    </article>
  `;
}
// Renders the full array of products into the grid container
function renderProducts(list) {
    const grid = document.getElementById("product-grid");
    if (!grid)
        return;
    grid.innerHTML = list.map(renderCard).join("");
    // Wire up the "View Product" buttons after they exist in the DOM
    const buttons = grid.querySelectorAll(".view-btn");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            // Union type in action: id from the DOM is always a string,
            // so we compare loosely against product.id (number | string)
            const product = products.find((p) => String(p.id) === id);
            if (product) {
                alert(`${product.name}\n${formatPrice(product.price)} · ${product.category}`);
            }
        });
    });
}
// ------------------------------------------------------------------
// Entry point
// ------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
});
