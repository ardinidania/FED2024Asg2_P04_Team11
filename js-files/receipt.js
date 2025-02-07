document.addEventListener('DOMContentLoaded', () => {
    const receiptContainer = document.getElementById('receipt-container');
    const receiptData = JSON.parse(localStorage.getItem('paymentReceipt'));

    if (!receiptData) {
        receiptContainer.innerHTML = '<p>No receipt found.</p>';
        return;
    }

    // Format and display receipt without duplicating the title
    const receiptHTML = `
        <p><strong>Date:</strong> ${receiptData.date}</p>
        <h3>Items Purchased:</h3>
        <ul class="receipt-items">
            ${receiptData.items.map(item => `
                <li class="receipt-item">
                    <img src="${item.image}" alt="${item.name}" class="receipt-item-image">
                    <span>${item.name} - $${item.price} x ${item.quantity}</span>
                </li>
            `).join('')}
        </ul>
        <p><strong>Total:</strong> ${receiptData.total}</p>
    `;

    receiptContainer.innerHTML = receiptHTML;

    // Clear receipt from local storage after displaying
    localStorage.removeItem('paymentReceipt');
});
