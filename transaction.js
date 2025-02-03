document.addEventListener('DOMContentLoaded', function () {
    const showMoreBtn = document.getElementById('show-more-btn');
    const transactionBody = document.getElementById('transaction-body');
    const hiddenTransactions = document.getElementById('hidden-transactions');

    // Event listener for the Show More button
    showMoreBtn.addEventListener('click', function () {
        // Move the hidden transactions to the visible transaction body
        transactionBody.innerHTML += hiddenTransactions.innerHTML;

        // Clear and hide the hidden transactions and the button
        hiddenTransactions.innerHTML = '';
        hiddenTransactions.style.display = 'none';
        showMoreBtn.style.display = 'none';
    });
});
