// Function to display cart items
function displayCart() {
    const cartContainer = document.getElementById('cartContainer');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'product cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>Price: ₹${item.price}</p>
        `;
        cartContainer.appendChild(itemElement);
    });
}

// Call the function to display cart items on page load
displayCart();
