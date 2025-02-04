document.addEventListener("DOMContentLoaded", function () {
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");
    const followButton = document.getElementById("follow-btn");

    // Default active tab
    document.getElementById("products").classList.add("active");

    // Tab Switching
    tabLinks.forEach((tab) => {
        tab.addEventListener("click", function () {
            tabLinks.forEach(t => t.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });

    // Toggle Follow Button
    followButton.addEventListener("click", function () {
        if (followButton.classList.contains("following")) {
            followButton.textContent = "Follow";
            followButton.classList.remove("following");
        } else {
            followButton.textContent = "Following";
            followButton.classList.add("following");
        }
    });

    // Reviews Functionality
    const addReviewButton = document.querySelector('.add-review');
    const reviewFormContainer = document.querySelector('.add-review-form');
    const reviewForm = document.querySelector('#reviewForm');

    addReviewButton.addEventListener('click', function () {
        reviewFormContainer.classList.remove('hidden');
    });

    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.querySelector('#reviewerName').value;
        const reviewText = document.querySelector('#reviewText').value;
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card');
        reviewCard.innerHTML = `<div class="review-initial">${name.charAt(0).toUpperCase()}</div>
            <div class="review-content">
                <h3>${name}</h3>
                <p>${reviewText}</p>
                <span class="review-date">${new Date().toISOString().split('T')[0]}</span>
            </div>`;
        document.querySelector('.reviews-grid').appendChild(reviewCard);
        reviewForm.reset();
        reviewFormContainer.classList.add('hidden');
    });
});






