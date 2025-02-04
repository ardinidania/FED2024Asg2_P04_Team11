//========================================================================
// Account Settings (About You Page)
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-input");
    const profilePic = document.getElementById("profile-pic");
    const uploadButton = document.getElementById("upload-btn");
    const saveButton = document.querySelector(".save-button");
    const cancelButton = document.querySelector(".cancel-button");
    const lottieOverlay = document.getElementById("lottie-overlay");

    // Default profile picture path
    const defaultAvatar = "default-avatar.png";

    // Handle Profile Picture Upload
    if (fileInput && profilePic && uploadButton) {
        uploadButton.addEventListener("click", function () {
            fileInput.click(); // Simulate click on hidden file input
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

    // Handle Cancel Button - Clear Inputs
    if (cancelButton) {
        cancelButton.addEventListener("click", function () {
            document.getElementById("name").value = "";
            document.getElementById("password").value = "";
            document.getElementById("email").value = "";
            profilePic.src = defaultAvatar; // Reset profile picture
            fileInput.value = ""; // Clear file input
        });
    }

    // Show Lottie Animation when Saving
    if (saveButton) {
        saveButton.addEventListener("click", function (e) {
            e.preventDefault();

            // Ensure fields are filled before saving
            const nameValue = document.getElementById("name").value.trim();
            const passwordValue = document.getElementById("password").value.trim();
            const emailValue = document.getElementById("email").value.trim();

            if (nameValue === "" || passwordValue === "" || emailValue === "") {
                alert("⚠️ Please fill out all fields before saving.");
                return;
            }

            // Show Lottie Animation
            lottieOverlay.classList.remove("hidden");

            setTimeout(() => {
                lottieOverlay.classList.add("hidden");
                alert("✅ Changes Saved Successfully!");
            }, 2000);
        });
    }
});

// bell icon
document.addEventListener("DOMContentLoaded", function () {
    const notificationBell = document.getElementById("notification-icon");
    const notificationDot = document.querySelector(".notification-dot");

    // Mock function to simulate new notifications
    function checkForNewNotifications() {
        let hasNewNotifications = Math.random() < 0.5; // Simulate 50% chance of having new notifications

        if (hasNewNotifications) {
            notificationBell.classList.add("has-notifications");
        } else {
            notificationBell.classList.remove("has-notifications");
        }
    }

    // Simulate checking for notifications every 5 seconds
    setInterval(checkForNewNotifications, 5000);

    // When the bell is clicked, open notifications page
    notificationBell.addEventListener("click", function () {
        window.location.href = "notifications.html";
    });
});


