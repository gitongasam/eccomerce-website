// Retrieve cart data from local storage
const storedCart = JSON.parse(localStorage.getItem('cart'));

// Display stored cart items
if (storedCart && storedCart.length > 0) {
  storedCart.forEach(product => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <h4>${product.title}</h4>
      <p>Price: $${product.price}</p>
      <img src="${product.image}" alt="Product Image">
      <button class="button" onclick="removeFromCart(${product.id})">Remove</button>
    `;
    cartItems.appendChild(cartItem);
  });
}
