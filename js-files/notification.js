// Handle "Close" button click for notifications
document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.notification-card').style.display = 'none';
    });
});

// Handle notification bell click
document.querySelector('.notification-bell').addEventListener('click', () => {
    alert('You clicked the notification bell!');
});

// Handle "Shop Now" button click
document.querySelector('.promo-btn').addEventListener('click', () => {
    window.location.href = 'shop.html';  // Redirect to shop page
});

// Handle "Update" button click
document.querySelector('.update-btn').addEventListener('click', () => {
    alert('Updating the app...');
});

// Handle "See Order Details" button click
document.querySelectorAll('.order-details-btn').forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.getElementById('order-details-modal');
        modal.style.display = 'flex';
    });
});

// Handle modal close button click
document.querySelectorAll('.close-modal').forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        closeButton.closest('.modal').style.display = 'none';
    });
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    const modal = document.querySelector('.modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle "Show More" toggle for additional notifications
const showMoreContainer = document.querySelector('.show-more-container');
if (showMoreContainer) {
    const arrowIcon = document.querySelector('.arrow-icon');
    const showMoreText = document.querySelector('.show-more-text');
    const additionalNotifications = document.querySelector('.additional-notifications');

    showMoreContainer.addEventListener('click', () => {
        const isHidden = additionalNotifications.style.display === 'none';

        // Toggle visibility and update text and icon
        additionalNotifications.style.display = isHidden ? 'block' : 'none';
        arrowIcon.textContent = isHidden ? '▲' : '▼';
        showMoreText.textContent = isHidden ? 'Show Less' : 'Show More';
    });
}

// Handle "Open Image" button click
const openButton = document.querySelector('.open-btn');
const imageModal = document.getElementById('image-modal');

if (openButton && imageModal) {
    openButton.addEventListener('click', () => {
        imageModal.style.display = 'flex';
    });

    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });
}
