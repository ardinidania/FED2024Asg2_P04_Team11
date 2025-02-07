document.addEventListener('DOMContentLoaded', () => {
    console.log('Payment script loaded');

    const submitButton = document.getElementById('submit-button');
    const paymentErrors = document.getElementById('payment-errors');
    const paymentSuccess = document.getElementById('payment-success');

    submitButton.addEventListener('click', () => {
        // Simulate payment validation and processing
        const cardHolderName = document.getElementById('card-holder-name').value.trim();
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiryDate = document.getElementById('expiry-date').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        paymentErrors.textContent = '';
        paymentSuccess.style.display = 'none';

        // Simple validation (for demo purposes only)
        if (!cardHolderName || !cardNumber || !expiryDate || !cvv) {
            paymentErrors.textContent = 'All fields are required.';
            return;
        }

        if (cardNumber.length !== 16 || isNaN(cardNumber)) {
            paymentErrors.textContent = 'Invalid card number. Must be 16 digits.';
            return;
        }

        if (cvv.length !== 3 || isNaN(cvv)) {
            paymentErrors.textContent = 'Invalid CVV. Must be 3 digits.';
            return;
        }

        // Disable button and provide feedback
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';

        // Simulate a successful payment after 2 seconds
        setTimeout(() => {
            // Save receipt data to localStorage
            const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
            const total = cart.reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0);

            const receiptData = {
                date: new Date().toLocaleString(),
                items: cart,
                total: `$${total.toFixed(2)}`
            };

            localStorage.setItem('paymentReceipt', JSON.stringify(receiptData));
            localStorage.removeItem('shoppingCart'); // Clear cart after payment

            // Display success message
            paymentSuccess.style.display = 'block';
            paymentSuccess.textContent = 'Payment successful!';

            // Clear input fields
            document.getElementById('card-holder-name').value = '';
            document.getElementById('card-number').value = '';
            document.getElementById('expiry-date').value = '';
            document.getElementById('cvv').value = '';

            // Re-enable the button after processing
            submitButton.disabled = false;
            submitButton.textContent = 'Pay Now';

            // Redirect to the success page after 2 seconds
            setTimeout(() => {
                window.location.href = '../html-files/success.html';
            }, 2000);
        }, 2000);
    });
});
