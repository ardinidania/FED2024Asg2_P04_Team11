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
const checkboxes = document.querySelectorAll(".filter-checkbox");
const searchInput = document.querySelector(".search-bar input");
const searchButton = document.getElementById("searchFilters"); // Ensure button has this ID

// ✅ Fetch products from Firestore, then apply search locally
async function fetchProducts(filters = {}, searchQuery = "") {
    try {
        let productQuery = collection(db, "products");

        // Debugging: Log selected filters before querying
        console.log("Selected Filters:", filters);
        console.log("Search Query:", searchQuery);

        let conditions = [];

        // Apply brand filter
        if (filters.brand && filters.brand.length > 0) {
            conditions.push(where("brand", "in", filters.brand));
        }

        // Apply type filter
        if (filters.type && filters.type.length > 0) {
            conditions.push(where("type", "in", filters.type));
        }

        // Apply conditions if filters exist
        if (conditions.length > 0) {
            productQuery = query(productQuery, ...conditions);
        }

        // Fetch data from Firestore
        const querySnapshot = await getDocs(productQuery);
        let products = [];

        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });

        console.log("Fetched Products:", products);

        // 🔥 **NEW: Apply Search Locally**
        if (searchQuery) {
            searchQuery = searchQuery.toLowerCase(); // Convert search to lowercase
            products = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery) ||
                product.description.toLowerCase().includes(searchQuery) ||
                product.type.toLowerCase().includes(searchQuery) ||
                product.brand.toLowerCase().includes(searchQuery)
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

        let productImage = product.image ? product.image : "https://via.placeholder.com/150";

        productCard.innerHTML = `
            <img src="${productImage}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/150'">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <strong>$${product.price.toFixed(2)}</strong>
            <div class="buttons">
                <button>Add to cart</button>
                <a href="../html-files/follow-feature.html">
                    <button class="follow-button">Follow</button>
                </a>
            </div>
        `;

        productContainer.appendChild(productCard);
    });
}

// ✅ Collect selected filters and update products when "Search" button is clicked
function updateFilters() {
    const selectedBrands = [...document.querySelectorAll('input[name="brand"]:checked')].map(cb => cb.value);
    const selectedTypes = [...document.querySelectorAll('input[name="type"]:checked')].map(cb => cb.value);
    const searchQuery = searchInput.value.trim();

    // Fetch products with filters and search applied
    fetchProducts({ brand: selectedBrands, type: selectedTypes }, searchQuery);
}

// ✅ Restore All Products When No Search or Filters Are Applied
function restoreProducts() {
    searchInput.value = ""; // Clear search field
    checkboxes.forEach(cb => cb.checked = false); // Uncheck all filters
    fetchProducts(); // Load all products
}

// ✅ Handle Search Button Click
searchButton.addEventListener("click", updateFilters);
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") updateFilters(); // Apply search on pressing "Enter"
});

// ✅ Load All Products When Page Loads
fetchProducts();




