const form = document.querySelector('#transaction-form');
const amountInput = document.querySelector('#amount');
const descriptionInput = document.querySelector('#text');
const transactionList = document.querySelector('#transaction-list');
const categoryInput = document.querySelector('#category');
const typeInput = document.querySelector('#type');
const balanceEl = document.querySelector('#balance');
const incomeEl = document.querySelector('#income');
const expenseEl = document.querySelector('#expense');

// Function to update totals
function updateTotals() {
    let totalIncome = 0;
    let totalExpense = 0;

    document.querySelectorAll('#transaction-list li').forEach(item => {
        const amountText = item.querySelector('.amount').textContent;
        const amount = parseFloat(amountText.replace(/[^\d.-]/g, '')); // remove non-numeric chars

        if (item.classList.contains('income-item')) {
            totalIncome += amount;
        } else if (item.classList.contains('expense-item')) {
            totalExpense += amount;
        }
    });

    incomeEl.textContent = `Rs ${totalIncome.toFixed(2)}`;
    expenseEl.textContent = `Rs ${totalExpense.toFixed(2)}`;
    balanceEl.textContent = `Rs ${(totalIncome - totalExpense).toFixed(2)}`;
}

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const description = descriptionInput.value.trim();
    const category = categoryInput.value.trim();
    const type = typeInput.value;

    if (isNaN(amount) || description === '' || category === '' || type === '') {
        alert('Please fill in all fields with valid values');
        return;
    }

    const transaction = document.createElement('li');
    transaction.classList.add(type + '-item');

    const sign = type === 'income' ? '+' : '-';
    transaction.innerHTML = `
        <div class="left">
            <strong>${description}</strong>
            <small>${type} • ${category}</small>
        </div>
        <div class="right">
            <span class="amount">${sign} Rs ${amount}</span>
            <button class="delete-btn">✖</button>
        </div>
    `;

    transactionList.appendChild(transaction);

    // Clear inputs
    amountInput.value = '';
    descriptionInput.value = '';
    categoryInput.value = '';
    typeInput.value = '';

    updateTotals(); // update totals after adding
});

// Event delegation for delete buttons
transactionList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const transaction = e.target.closest('li');
        if (transaction) {
            transaction.remove();
            updateTotals(); // update totals after deletion
        }
    }
});