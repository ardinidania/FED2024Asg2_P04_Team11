
// Helper function to toggle visibility of elements
function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Login / SignUp on Home page
document.addEventListener("DOMContentLoaded", function () {
    const authToggle = document.getElementById("auth-toggle");
    const accountSection = document.getElementById("account-section");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const showLogin = document.getElementById("show-login");
    const showRegister = document.getElementById("show-register");
    const closeAccount = document.getElementById("close-account");

    const loginButton = document.getElementById("login-btn");
    const createAccountButton = document.getElementById("create-account-btn");
    const cancelButtons = document.querySelectorAll(".cancel-button");

    const loadingOverlay = document.getElementById("loading-animation");

    // Ensure Lottie animation is hidden on load
    if (loadingOverlay) {
        loadingOverlay.classList.add("hidden");
    }

    // Show Login/Register popup
    if (authToggle) {
        authToggle.addEventListener("click", function () {
            accountSection.classList.toggle("hidden");
        });
    }

    if (closeAccount) {
        closeAccount.addEventListener("click", function () {
            accountSection.classList.add("hidden");
        });
    }

    if (showRegister) {
        showRegister.addEventListener("click", function (e) {
            e.preventDefault();
            loginForm.classList.add("hidden");
            registerForm.classList.remove("hidden");
        });
    }

    if (showLogin) {
        showLogin.addEventListener("click", function (e) {
            e.preventDefault();
            registerForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
        });
    }

    // Function to validate fields
    function validateForm(email, password, errorContainer) {
        let errors = [];

        if (!email.value.includes("@")) {
            errors.push("❌ Please enter a valid email address.");
        }
        if (password.value.trim() === "") {
            errors.push("❌ Password cannot be empty.");
        }

        if (errors.length > 0) {
            errorContainer.innerHTML = errors.join("<br>");
            return false;
        } else {
            errorContainer.innerHTML = ""; // Clear errors
            return true;
        }
    }

    // Show Lottie Animation then Redirect
    function showLoadingAndRedirect() {
        if (!loadingOverlay) {
            console.error("❌ Lottie animation element not found!");
            return;
        }

        loadingOverlay.classList.remove("hidden"); // Show animation

        setTimeout(() => {
            loadingOverlay.classList.add("hidden");
            window.location.href = "shop.html";
        }, 2000);
    }

    // Handle Login
    if (loginButton) {
        loginButton.addEventListener("click", function (e) {
            e.preventDefault();
            const emailInput = document.querySelector("#login-form input[type='email']");
            const passwordInput = document.querySelector("#login-form input[type='password']");
            const errorContainer = document.querySelector("#login-form .error-message");

            if (validateForm(emailInput, passwordInput, errorContainer)) {
                showLoadingAndRedirect();
            }
        });
    }

    // Handle Sign Up
    if (createAccountButton) {
        createAccountButton.addEventListener("click", function (e) {
            e.preventDefault();
            const emailInput = document.querySelector("#register-form input[type='email']");
            const passwordInput = document.querySelector("#register-form input[type='password']");
            const errorContainer = document.querySelector("#register-form .error-message");

            if (validateForm(emailInput, passwordInput, errorContainer)) {
                showLoadingAndRedirect();
            }
        });
    }

    // Clear fields when cancel is clicked
    cancelButtons.forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll("input").forEach(input => input.value = "");
        });
    });

    // Hide Login/Register on non-home pages
    const authContainer = document.getElementById("auth-container");
    const currentPage = window.location.pathname;
    const hideAuthPages = ["/about-you.html", "/shop.html", "/listings.html", "/help.html"];

    if (hideAuthPages.some(page => currentPage.endsWith(page))) {
        if (authContainer) {
            authContainer.style.display = "none";
        }
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////
// About-you Settings
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-input");
    const profilePic = document.getElementById("profile-pic");
    const uploadBtn = document.getElementById("upload-btn");

    if (fileInput) {
        // Handle Profile Picture Upload
        uploadBtn.addEventListener("click", function () {
            fileInput.click(); // Trigger file input when clicking upload button
        });

        fileInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    profilePic.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
// Lottie Animation for account settings
document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.querySelector(".save-button");
    const cancelButton = document.querySelector(".cancel-button");
    const lottieOverlay = document.getElementById("lottie-overlay");
    const lottiePlayer = document.querySelector("#lottie-overlay dotlottie-player");

    saveButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevents form submission

        // Get input fields
        const nameInput = document.getElementById("name");
        const passwordInput = document.getElementById("password");
        const emailInput = document.getElementById("email");

        // Remove any previous error messages
        document.querySelectorAll(".error-message").forEach(el => el.remove());

        let hasError = false;

        // Function to display error message
        function showError(inputField, message) {
            const errorMsg = document.createElement("p");
            errorMsg.classList.add("error-message");
            errorMsg.style.color = "red";
            errorMsg.style.fontSize = "14px";
            errorMsg.style.marginTop = "5px";
            errorMsg.innerText = message;
            inputField.insertAdjacentElement("afterend", errorMsg);
        }

        // Check if fields are empty
        if (nameInput.value.trim() === "") {
            showError(nameInput, "Please enter your name.");
            hasError = true;
        }
        if (passwordInput.value.trim() === "") {
            showError(passwordInput, "Please enter a password.");
            hasError = true;
        }
        if (emailInput.value.trim() === "") {
            showError(emailInput, "Please enter your email.");
            hasError = true;
        }

        // If there's an error, stop execution
        if (hasError) return;

        // If all fields are filled, show Lottie animation
        lottieOverlay.classList.remove("hidden");

        // Restart the animation every time Save is clicked
        lottiePlayer.stop();
        lottiePlayer.play();

        // Hide the animation after 3 seconds
        setTimeout(() => {
            lottieOverlay.classList.add("hidden");
        }, 3000);
    });

    // **Cancel Button Functionality**
    cancelButton.addEventListener("click", function () {
        document.getElementById("name").value = "";
        document.getElementById("password").value = "";
        document.getElementById("email").value = "";

        // Remove error messages when clearing
        document.querySelectorAll(".error-message").forEach(el => el.remove());
    });
});


///////////////////////////////////////////////////////////////////////////////////////////////////
// Search Functionality
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const productList = document.getElementById("productList");

if (searchButton) {
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase();
        const products = productList.getElementsByClassName("product");

        Array.from(products).forEach((product) => {
            const productName = product.textContent.toLowerCase();
            if (productName.includes(query)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Chat Functionality
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const chatWindow = document.getElementById("chatWindow");

if (sendButton) {
    sendButton.addEventListener("click", () => {
        const messageText = chatInput.value;
        if (messageText.trim() !== "") {
            const message = document.createElement("div");
            message.classList.add("message", "buyer");
            message.textContent = messageText;
            chatWindow.appendChild(message);
            chatInput.value = "";
        }
    });
}

// Feedback Form Submission
const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
    feedbackForm.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Thank you for your feedback!");
        feedbackForm.reset();
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Notification Example
function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Example: Notify when a new product is added
const addProductButton = document.getElementById("addProductButton");
if (addProductButton) {
    addProductButton.addEventListener("click", () => {
        showNotification("New product added successfully!");
    });
}

//========================================================================
// Javascript for shopping page
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".filter-checkbox");
    const products = document.querySelectorAll(".product-card");
    const searchButton = document.getElementById("searchFilters"); // Updated ID

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            updateFilters();
        });
    });

    searchButton.addEventListener("click", function () {
        updateFilters();
    });

    function updateFilters() {
        const selectedFilters = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        // Keep the grid layout intact while hiding/showing products
        products.forEach(product => {
            const category = product.getAttribute("data-category");
            if (selectedFilters.length === 0 || selectedFilters.includes(category)) {
                product.style.opacity = "1";
                product.style.pointerEvents = "auto";
                product.style.visibility = "visible";
                product.style.height = "auto";
                product.style.transform = "scale(1)"; // Normal size
            } else {
                product.style.opacity = "0";
                product.style.pointerEvents = "none";
                product.style.visibility = "hidden";
                product.style.height = "0px";
                product.style.transform = "scale(0)"; // Shrinks without breaking layout
            }
        });
    }
});
//======================================================================




///////////////////////////////////////////////////////////////////////////////////////////////////
// Follow Feature Page
document.addEventListener("DOMContentLoaded", function () {
    const followButton = document.getElementById("follow-btn");
    const chatButton = document.getElementById("chat-btn");
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    // Follow Button
    if (followButton) {
        followButton.addEventListener("click", function () {
            if (followButton.textContent === "Follow") {
                followButton.textContent = "Following";
                followButton.style.backgroundColor = "#219150"; // Softer green
            } else {
                followButton.textContent = "Follow";
                followButton.style.backgroundColor = "#27ae60"; // Default
            }
        });
    }

    // Chat Button
    if (chatButton) {
        chatButton.addEventListener("click", function () {
            alert("Opening chat with seller...");
        });
    }

    // Tab Switching
    tabLinks.forEach((tab) => {
        tab.addEventListener("click", function () {
            tabLinks.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            tabContents.forEach(content => content.classList.remove("active"));
            document.getElementById(tab.getAttribute("data-tab")).classList.add("active");
        });
    });
});

