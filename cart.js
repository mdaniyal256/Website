<!--Self written-->
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    displayCart();
});

// Function to Add Item to Cart
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 }); // Store price properly
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Function to Update Cart Count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    let cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Function to Display Cart Items
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsDiv = document.getElementById("cart-items");
    let totalItemsDiv = document.getElementById("total-items");
    let totalAmountDiv = document.getElementById("total-amount");

    cartItemsDiv.innerHTML = "";
    let totalAmount = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
        if (totalAmountDiv) totalAmountDiv.innerText = "0.00";
        if (totalItemsDiv) totalItemsDiv.innerText = "0";
        return;
    }

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        totalItems += item.quantity;

        cartItemsDiv.innerHTML += `
            <div class="col-md-12 mb-3">
                <div class="card p-3 d-flex flex-row align-items-center">
                    <div class="ms-3">
                        <h5 class="card-title">${item.name}</h5>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <p>Total: $<span id="total-${index}">${itemTotal.toFixed(2)}</span></p>
                        <div class="d-flex align-items-center">
                            <label for="quantity-${index}" class="me-2">Qty:</label>
                            <input type="number" id="quantity-${index}" class="form-control w-25" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                        </div>
                        <button class="btn btn-danger mt-2" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });

    if (totalAmountDiv) totalAmountDiv.innerText = totalAmount.toFixed(2);
    if (totalItemsDiv) totalItemsDiv.innerText = totalItems;
}

// Function to Update Quantity
function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    newQuantity = parseInt(newQuantity);
    if (newQuantity < 1) return;

    cart[index].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    displayCart();
}

// Function to Remove Item from Cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Function to Clear Cart
function clearCart() {
    localStorage.removeItem("cart");
    updateCartCount();
    displayCart();
}

// Function to Open Checkout Modal
function openCheckout() {
    document.getElementById("checkoutModal").style.display = "block";
}

// Function to Close Checkout Modal
function closeCheckout() {
    document.getElementById("checkoutModal").style.display = "none";
}

// Function to Process Checkout
function processCheckout() {
    let name = document.getElementById("customerName").value.trim();
    let address = document.getElementById("customerAddress").value.trim();
    let paymentMethod = document.getElementById("paymentMethod").value;

    if (name === "" || address === "") {
        alert("Please enter your full name and address.");
        return;
    }

    if (paymentMethod === "card") {
        let cardNumber = document.getElementById("cardNumber").value.trim();
        let cardExpiry = document.getElementById("cardExpiry").value.trim();
        let cardCVC = document.getElementById("cardCVC").value.trim();

        if (cardNumber === "" || cardExpiry === "" || cardCVC === "") {
            alert("Please enter all card details.");
            return;
        }

        alert(`Payment Successful! Order placed for ${name} at ${address} using Credit/Debit Card.`);
    } else {
        alert(`Thank you, ${name}! Your order has been placed.\nDelivery Address: ${address}\nPayment Method: Cash on Delivery.`);
    }

    closeCheckout();
    clearCart();
}
