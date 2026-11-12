// Shopping Cart functionality

const cartModal = document.getElementById("cart-modal");
const openCartButton = document.getElementById("open-cart-button");
const closeCartButton = document.getElementById("close-cart-button");
const cartCount = document.getElementById("cart-count");

const cart = [];

// Select HTML elements
const addToCartButtons = document.querySelectorAll(".product-card button");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");

// Add products to cart
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");

    const productName = productCard.querySelector("h3").textContent;
    const priceText = productCard.querySelector("p").textContent;
    const price = parseFloat(priceText.match(/[\d.]+/)[0]);

    // Check if product already exists in cart
    const existingProduct = cart.find(
      (product) => product.name === productName,
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({
        name: productName,
        price: price,
        quantity: 1,
      });
    }

    updateCart();
  });
});

function updateCart() {
  cartItems.innerHTML = "";

  let total = 0;

  const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);

  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItems.textContent = "Your cart is empty.";
    cartTotal.textContent = "0.00";
    return;
  }

  cart.forEach((product, index) => {
    const subtotal = product.price * product.quantity;
    total += subtotal;

    const item = document.createElement("div");

    const description = document.createElement("span");

    description.textContent = `${product.name} - €${product.price.toFixed(2)} x ${product.quantity} = €${subtotal.toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", () => {
      cart.splice(index, 1);
      updateCart();
    });

    item.appendChild(description);
    item.appendChild(removeButton);

    cartItems.appendChild(item);
  });

  cartTotal.textContent = total.toFixed(2);
}

// Checkout functionality
checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Thank you for your purchase!");

  cart.length = 0;
  updateCart();
});

// Open cart modal
openCartButton.addEventListener("click", () => {
  cartModal.style.display = "flex";
});

// Close cart modal
closeCartButton.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Close modal when clicking outside
cartModal.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

// Close modal with ESC key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    cartModal.style.display = "none";
  }
});

// Product Details Modal functionality

const productModal = document.getElementById("product-modal");

const closeProductModalButton = document.getElementById("close-product-modal");

const productModalTitle = document.getElementById("product-modal-title");

const productModalImage = document.getElementById("product-modal-image");

const productModalDescription = document.getElementById(
  "product-modal-description",
);

const productModalPrice = document.getElementById("product-modal-price");

const addToCartModalButton = document.getElementById(
  "add-to-cart-modal-button",
);

let selectedProductCard = null;

// Select all product images
const productImages = document.querySelectorAll(".product-card img");

// Open modal when clicking a product image
productImages.forEach((image) => {
  image.addEventListener("click", () => {
    const productCard = image.closest(".product-card");
    selectedProductCard = productCard;

    const productName = productCard.querySelector("h3").textContent;

    const productPrice = productCard.querySelector("p").textContent;

    const productDescription =
      productCard.dataset.description || "No description available.";

    // Update modal information
    productModalTitle.textContent = productName;

    productModalImage.src = image.src;

    productModalImage.alt = image.alt;

    productModalDescription.textContent = productDescription;

    productModalPrice.textContent = productPrice;

    // Show modal
    productModal.style.display = "flex";
    addToCartModalButton.addEventListener("click", () => {
      if (!selectedProductCard) return;

      const productName = selectedProductCard.querySelector("h3").textContent;

      const priceText = selectedProductCard.querySelector("p").textContent;

      const price = parseFloat(priceText.match(/[\d.]+/)[0]);

      // Check if product already exists in cart
      const existingProduct = cart.find(
        (product) => product.name === productName,
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({
          name: productName,
          price: price,
          quantity: 1,
        });
      }

      // Update shopping cart
      updateCart();

      // Close product modal
      productModal.style.display = "none";
    });
  });
});

// Close modal using close button
closeProductModalButton.addEventListener("click", () => {
  productModal.style.display = "none";
});

// Close modal when clicking outside
productModal.addEventListener("click", (event) => {
  if (event.target === productModal) {
    productModal.style.display = "none";
  }
});

// Close modal using ESC key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    productModal.style.display = "none";
  }
});

// Product Search Functionality

const searchInput = document.getElementById("product-search");
const searchButton = document.getElementById("search-button");

const productCards = document.querySelectorAll(".product-card");

// Search products
function searchProducts() {
  const searchText = searchInput.value.toLowerCase().trim();

  productCards.forEach((card) => {
    const productName = card.querySelector("h3").textContent.toLowerCase();

    if (productName.includes(searchText)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

// Search when clicking the button
searchButton.addEventListener("click", searchProducts);

// Search while typing
searchInput.addEventListener("input", searchProducts);
