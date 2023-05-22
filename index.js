const productList = document.getElementById('productList');
const productDetailsModal = document.getElementById('productDetailsModal');
const productDetails = document.getElementById('productDetails');
const closeBtn = document.querySelector('.close');

const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cart = []; // Array to store cart items

// Fetch all products
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(products => {
    // Display products
    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product');
      productItem.innerHTML = `
        <h3>${product.title}</h3>
        <img src="${product.image}" alt="Product Image">
        <p>Price: $${product.price}</p>
        <button class="button" onclick="addToCart(${product.id})">Add to Cart</button>
        <button class="button" onclick="deleteProduct(${product.id})">Delete</button>
        <button class="button" onclick="viewProductDetails(${product.id})">View</button>
      `;
      productList.appendChild(productItem);
    });
  });


// Add item to cart
function addToCart(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      cart.push(product); // Add product to the cart array
      renderCart(); // Update the cart items display
      
      // Store cart data in local storage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Redirect to the cart page
      window.location.href = "cart.html";
    });
}



// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1); // Remove item from cart array
  renderCart(); // Update the cart items display
}

// Render cart items and calculate total amount
function renderCart() {
  cartItems.innerHTML = '';
  let totalAmount = 0;

  cart.forEach((product, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span class="item-image"><img src="${product.image}" alt="Product Image"></span>
      <div class="item-details">
        <h4>${product.title}</h4>
        <p>Price: $${product.price}</p>
        <button class="button" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartItems.appendChild(cartItem);

    totalAmount += product.price;
  });

  cartTotal.textContent = `Total Amount: $${totalAmount.toFixed(2)}`; // Display total amount in cart
}

// Delete product
function deleteProduct(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`, {
    method: 'DELETE',
  })
    .then(() => {
      const productItem = document.getElementById(`product-${productId}`);
      if (productItem) {
        productItem.parentNode.removeChild(productItem);
      }
      renderCart(); // Update the cart items display and total amount after deleting the product
    })
    .catch(error => console.error(error));
}

// View product details
function viewProductDetails(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      productDetails.innerHTML = `
        <h3>${product.title}</h3>
        <img src="${product.image}" alt="Product Image">
        <p>Category: ${product.category}</p>
        <p>Description: ${product.description}</p>
        <p>Price: $${product.price}</p>
      `;
      productDetailsModal.style.display = 'block';
    });
}

//

// Close product details modal
closeBtn.addEventListener('click', () => {
  productDetailsModal.style.display = 'none';
  });
  
  // Close modal when clicking outside the modal content
  window.addEventListener('click', event => {
  if (event.target === productDetailsModal) {
  productDetailsModal.style.display = 'none';
  }
  });