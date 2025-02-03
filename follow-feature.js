document.addEventListener("DOMContentLoaded", function () {
    const followButton = document.getElementById("follow-btn");
    const chatButton = document.getElementById("chat-btn");
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    // Ensure first tab is active on load
    tabContents.forEach(content => content.classList.remove("active"));
    document.getElementById("products").classList.add("active");

    // Toggle Follow Button
    if (followButton) {
        followButton.addEventListener("click", function () {
            if (followButton.classList.contains("following")) {
                followButton.textContent = "Follow";
                followButton.classList.remove("following");
            } else {
                followButton.textContent = "Following";
                followButton.classList.add("following");
            }
        });
    }

    // Chat Button Alert
    if (chatButton) {
        chatButton.addEventListener("click", function () {
            alert("Opening chat with seller...");
        });
    }

    // Tab Switching
    tabLinks.forEach((tab) => {
        tab.addEventListener("click", function () {
            // Remove active class from all tabs and contents
            tabLinks.forEach(t => t.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Add active class to selected tab and its content
            tab.classList.add("active");
            const targetTab = document.getElementById(tab.dataset.tab);
            if (targetTab) {
                targetTab.classList.add("active");
            }
        });
    });
});

