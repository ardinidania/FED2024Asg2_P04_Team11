document.addEventListener('DOMContentLoaded', function () {
    const addReviewButton = document.querySelector('.add-review');
    const reviewFormContainer = document.querySelector('.add-review-form');
    const reviewForm = document.querySelector('#reviewForm');
    const loadMoreButton = document.querySelector('.load-more');

    // Mock data for additional reviews
    const mockReviews = [
        {
            name: "Chris",
            rating: 5,
            text: "Great customer service!",
            date: "2025-01-28"
        },
        {
            name: "Sophia",
            rating: 5,
            text: "Amazing products, will buy again!",
            date: "2025-01-29"
        },
        {
            name: "John",
            rating: 5,
            text: "Good quality products. Will recommend to my friends.",
            date: "2025-01-30"
        },
        {
            name: "Xavier",
            rating: 5,
            text: "The customer support team resolved my issue quickly and professionally.",
            date: "2025-01-31"
        },
        {
            name: "Bobby",
            rating: 5,
            text: "Top-notch quality paired with fantastic service—what more could you ask for?.",
            date: "2025-02-01"
        },
        {
            name: "Khloe",
            rating: 5,
            text: "Amazing service—quick, friendly, and hassle-free!",
            date: "2025-02-02"
        },
        {
            name: "Jane",
            rating: 5,
            text: "I was pleasantly surprised by how fast my order arrived!",
            date: "2025-02-03"
        },
    ];

    // Show the form when the "Add review" button is clicked
    addReviewButton.addEventListener('click', function () {
        reviewFormContainer.classList.remove('hidden');
    });

    // Handle form submission
    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get and validate form values
        const name = document.querySelector('#reviewerName').value;
        let rating = parseFloat(document.querySelector('#ratingInput').value);
        const reviewText = document.querySelector('#reviewText').value;

        // Ensure the rating is between 1.0 and 5.0
        rating = Math.max(1.0, Math.min(rating, 5.0));

        // Calculate the star width for filled stars
        const starWidth = (rating / 5) * 100;

        // Create a new review card
        const newReviewCard = document.createElement('div');
        newReviewCard.classList.add('review-card');
        newReviewCard.innerHTML = `
            <div class="review-initial">${name.charAt(0).toUpperCase()}</div>
            <div class="review-content">
                <h3>${name}</h3>
                <div class="stars">
                    <span class="star-overlay">★★★★★</span>
                    <span class="filled-stars" style="width: ${starWidth.toFixed(2)}%;">★★★★★</span>
                </div>
                <p>${reviewText}</p>
                <span class="review-date">${new Date().toISOString().split('T')[0]}</span>
            </div>
        `;

        // Add the new review to the reviews grid
        document.querySelector('.reviews-grid').appendChild(newReviewCard);

        // Clear and hide the form
        reviewForm.reset();
        reviewFormContainer.classList.add('hidden');
    });

    // Load more reviews on button click
    loadMoreButton.addEventListener('click', function () {
        mockReviews.forEach(review => {
            const newReviewCard = document.createElement('div');
            newReviewCard.classList.add('review-card');
            newReviewCard.innerHTML = `
                <div class="review-initial">${review.name.charAt(0).toUpperCase()}</div>
                <div class="review-content">
                    <h3>${review.name}</h3>
                    <div class="stars">
                        <span class="star-overlay">★★★★★</span>
                        <span class="filled-stars" style="width: ${(review.rating / 5) * 100}%;">★★★★★</span>
                    </div>
                    <p>${review.text}</p>
                    <span class="review-date">${review.date}</span>
                </div>
            `;

            document.querySelector('.reviews-grid').appendChild(newReviewCard);
        });

        // Optionally disable the button after all reviews are loaded
        loadMoreButton.disabled = true;
        loadMoreButton.textContent = 'No more reviews';
    });
});
