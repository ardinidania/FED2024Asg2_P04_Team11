//========================================================================
// Login / Register Handling
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

    // ✅ Ensure Lottie animation is hidden on page load
    if (loadingOverlay) {
        loadingOverlay.classList.add("hidden");
        loadingOverlay.style.display = "none";
    }

    // ✅ Show Login/Register Popup
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

    // ✅ Function to validate fields
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

    // ✅ Show Lottie Animation then Redirect
    function showLoadingAndRedirect() {
        if (!loadingOverlay) {
            console.error("❌ Lottie animation element not found!");
            return;
        }

        console.log("✅ Showing loading animation...");

        // Show only when login/signup is clicked
        loadingOverlay.classList.remove("hidden");
        loadingOverlay.style.display = "flex";

        setTimeout(() => {
            loadingOverlay.classList.add("hidden");
            loadingOverlay.style.display = "none";
            window.location.href = "shop.html";
        }, 2000);
    }

    // ✅ Handle Login
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

    // ✅ Handle Sign Up
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

    // ✅ Clear fields when cancel is clicked
    cancelButtons.forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll("input").forEach(input => input.value = "");
        });
    });

    // ✅ Hide Login/Register on non-home pages
    const authContainer = document.getElementById("auth-container");
    const currentPage = window.location.pathname;
    const hideAuthPages = ["/about-you.html", "/shop.html", "/listings.html", "/help.html"];

    if (hideAuthPages.some(page => currentPage.endsWith(page))) {
        if (authContainer) {
            authContainer.style.display = "none";
        }
    }
});

//  Function to handle Google Sign-Up and Redirect to shop.html
function handleGoogleSignUp(response) {
    console.log("Google Sign-Up Success:", response);

    // Show loading animation if available
    const loadingOverlay = document.getElementById("loading-animation");
    if (loadingOverlay) {
        loadingOverlay.classList.remove("hidden");
        loadingOverlay.style.display = "flex";
    }

    //  Redirect to shop.html after 2 seconds
    setTimeout(() => {
        window.location.href = "shop.html";
    }, 2000);
}
