// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrf-mQaNwiyCrMQxdYtqXhxkZdIht8GAo",
    authDomain: "mokesell-cd8cb.firebaseapp.com",
    projectId: "mokesell-cd8cb",
    storageBucket: "mokesell-cd8cb.appspot.com",
    messagingSenderId: "47596399929",
    appId: "1:47596399929:web:a38d73ff3e846fd0f80ce8",
    measurementId: "G-VENZT9ZF64"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get elements
const productContainer = document.querySelector(".products-section");
const searchInput = document.querySelector(".search-bar input");
const searchButton = document.getElementById("searchFilters");

// ✅ Update cart count in the header
function updateCartCount() {
    const cartIcon = document.querySelector('.fas.fa-shopping-cart');
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update or create the cart count badge
    let countBadge = cartIcon.querySelector('.cart-count');
    if (!countBadge) {
        countBadge = document.createElement('span');
        countBadge.classList.add('cart-count');
        cartIcon.appendChild(countBadge);
    }
    countBadge.textContent = count;
}

// ✅ Add an item to the cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image || "https://via.placeholder.com/150"
        });
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// ✅ Fetch products from Firestore, then apply search locally
async function fetchProducts(filters = {}, searchQuery = "") {
    try {
        let productQuery = collection(db, "products");

        console.log("Selected Filters:", filters);
        console.log("Search Query:", searchQuery);

        let conditions = [];

        if (filters.brand && filters.brand.length > 0) {
            conditions.push(where("brand", "in", filters.brand));
        }

        if (filters.type && filters.type.length > 0) {
            conditions.push(where("type", "in", filters.type));
        }

        if (conditions.length > 0) {
            productQuery = query(productQuery, ...conditions);
        }

        const querySnapshot = await getDocs(productQuery);
        let products = [];

        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        if (searchQuery) {
            searchQuery = searchQuery.toLowerCase();
            products = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery) ||
                (product.description || "").toLowerCase().includes(searchQuery) ||
                (product.type || "").toLowerCase().includes(searchQuery) ||
                (product.brand || "").toLowerCase().includes(searchQuery)
            );
        }

        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        productContainer.innerHTML = "<p>Error loading products.</p>";
    }
}

// ✅ Display products based on filters and search
function displayProducts(products) {
    productContainer.innerHTML = "";

    if (products.length === 0) {
        productContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/150'">
            <h4>${product.name}</h4>
            <p>${product.description || ''}</p>
            <strong>$${product.price.toFixed(2)}</strong>
            <div class="buttons">
                <button class="add-to-cart-btn">Add to cart</button>
                <a href="../html-files/follow-feature.html">
                    <button class="follow-button">Follow</button>
                </a>
            </div>
        `;

        // Set up add-to-cart button event listener
        const addToCartButton = productCard.querySelector('.add-to-cart-btn');
        addToCartButton.addEventListener('click', () => addToCart(product));

        productContainer.appendChild(productCard);
    });
}

// ✅ Collect selected filters and update products when "Search" button is clicked
function updateFilters() {
    const selectedBrands = [...document.querySelectorAll('input[name="brand"]:checked')].map(cb => cb.value);
    const selectedTypes = [...document.querySelectorAll('input[name="type"]:checked')].map(cb => cb.value);
    const searchQuery = searchInput.value.trim();

    fetchProducts({ brand: selectedBrands, type: selectedTypes }, searchQuery);
}

// ✅ Handle Search Button Click
searchButton.addEventListener("click", updateFilters);
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") updateFilters();
});

// ✅ Load All Products When Page Loads
fetchProducts();
updateCartCount();
