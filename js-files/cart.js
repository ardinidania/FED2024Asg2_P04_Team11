document.addEventListener('DOMContentLoaded', function () { 
    console.log('cart.js loaded successfully');

    // Update cart count in the header
    function updateCartCount() {
        const cartIcon = document.querySelector('.fas.fa-shopping-cart');
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);

        // Remove old count span if it exists
        let oldCount = cartIcon.querySelector('.cart-count');
        if (oldCount) oldCount.remove();

        // Add new count if cart is not empty
        if (count > 0) {
            const countSpan = document.createElement('span');
            countSpan.classList.add('cart-count');
            countSpan.textContent = count;
            cartIcon.appendChild(countSpan);
        }
    }

    // Add a product to the cart
    function addToCart(productElement) {
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.getAttribute('data-name');
        const productPrice = productElement.getAttribute('data-price');
        const productImage = productElement.getAttribute('data-image'); // Include the image attribute

        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            // Add the product with its image to the cart
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImage || "https://via.placeholder.com/150" // Default image fallback
            });
        }

        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        updateCartCount();
        alert(`${productName} added to cart!`);
    }

    // Set up "Add to cart" button listeners
    function setupAddToCartButtons() {
        const buttons = document.querySelectorAll('.add-to-cart');
        if (buttons.length === 0) {
            console.log('No add-to-cart buttons found. Skipping setup.');
            return;
        }

        buttons.forEach(button => {
            button.addEventListener('click', function () {
                console.log('Add-to-cart button clicked');
                const productElement = this.closest('.product');
                if (productElement) {
                    addToCart(productElement);
                } else {
                    console.error('Product element not found for button:', this);
                }
            });
        });

        console.log('Add-to-cart button listeners attached.');
    }

    // Render the cart on the cart page
    function renderCart() {
        const cartContainer = document.getElementById('cart-container');
        if (!cartContainer) {
            console.log('Not on cart page, skipping render.');
            return;
        }

        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            document.getElementById('cart-total').textContent = '$0.00';
            return;
        }

        let total = 0;

        cart.forEach(item => {
            total += item.quantity * parseFloat(item.price);

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
        });

        document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;

        // Handle remove item functionality
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const itemId = this.getAttribute('data-id');
                removeFromCart(itemId);
            });
        });
    }

    // Remove an item from the cart
    function removeFromCart(itemId) {
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        const item = cart.find(item => item.id === itemId);
    
        if (item) {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                cart = cart.filter(item => item.id !== itemId); // Remove the item if quantity is 0
            }
        }
    
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
    

    // Initial setup
    setupAddToCartButtons();
    renderCart();
    updateCartCount();
});
