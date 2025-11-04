const balanceElement = document.getElementById('balance');
const incomeAmountElement = document.getElementById('income-amount');
const expenseAmountElement = document.getElementById('expense-amount');
const transactionListElement = document.getElementById('transaction-list');
const transactionFormElement = document.getElementById('transaction-form');
const descriptionElement = document.getElementById('description');
const amountElement = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormElement.addEventListener('submit', addTransaction);

function addTransaction(event) {
    event.preventDefault();

    //Form values
    const description = descriptionElement.value.trim();
    const amount = parseFloat(amountElement.value.trim());

    transactions.push({
        id: Date.now(),
        description: description,
        amount: amount
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();

    transactionFormElement.reset();
}

function updateTransactionList() {
    transactionListElement.innerHTML = "";

    const sortedTransactions = [...transactions].reverse();

    sortedTransactions.forEach(transaction => {
        const transactionElement = createTransactionElement(transaction);
        transactionListElement.appendChild(transactionElement);
    });
}

function createTransactionElement(transaction) {
    const li = document.createElement('li');
    li.classList.add('transaction');
    li.classList.add(transaction.amount < 0 ? 'expense' : 'income');
    li.innerHTML = `
        <span>${transaction.description}</span>
        <span>R$${transaction.amount}
         <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        </span>
    `;
    return li;
}

function updateSummary(){
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const income = transactions
        .filter(transaction => transaction.amount > 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expense = transactions
        .filter(transaction => transaction.amount < 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    balanceElement.textContent = `R$${balance.toFixed(2)}`;
    incomeAmountElement.textContent = `R$${income.toFixed(2)}`;
    expenseAmountElement.textContent = `R$${Math.abs(expense).toFixed(2)}`;
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTransactionList();
    updateSummary();
}

/*function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}*/

updateTransactionList();
updateSummary();