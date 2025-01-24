var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.sakari.io/v1/accounts/12345/messages", // Replace 12345 with your account ID
    "method": "GET",
    "headers": {
      "Authorization": "Bearer YOUR_API_TOKEN" // Replace YOUR_API_TOKEN with your actual token
    }
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  






























// Helper function to toggle visibility of elements
function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

// Event Listener for Login Button
const loginButton = document.getElementById("loginButton");
if (loginButton) {
    loginButton.addEventListener("click", () => {
        toggleVisibility("loginForm");
    });
}

// Event Listener for Signup Button
const signupButton = document.getElementById("signupButton");
if (signupButton) {
    signupButton.addEventListener("click", () => {
        toggleVisibility("signupForm");
    });
}

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
