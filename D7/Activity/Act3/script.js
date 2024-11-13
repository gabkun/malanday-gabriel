let cart = {};

function addToCart(name, price) {
    if (cart[name]) {
        cart[name].quantity++;
    } else {
        cart[name] = { price: price, quantity: 1 };
    }
    renderCart();
}

function removeFromCart(name) {
    if (cart[name]) {
        cart[name].quantity--;
        if (cart[name].quantity === 0) {
            delete cart[name];
        }
    }
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");
    cartItems.innerHTML = "";
    
    let total = 0;
    for (let item in cart) {
        const cartItem = document.createElement("li");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            ${item} $${cart[item].price.toFixed(2)} 
            <button onclick="removeFromCart('${item}')">Remove</button>
            <span>${cart[item].quantity}</span>
        `;
        
        total += cart[item].price * cart[item].quantity;
        cartItems.appendChild(cartItem);
    }
    
    totalElement.innerText = `Total: $${total.toFixed(2)}`;
}

function checkout() {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your purchase!");
        cart = {};
        renderCart();
    }
}