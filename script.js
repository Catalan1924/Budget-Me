const transactionForm = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const transactionList = document.getElementById("transaction-list");
const balanceDisplay = document.getElementById("balance");
const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");
const filterAllBtn = document.getElementById("filter-all");
const filterIncomeBtn = document.getElementById("filter-income");
const filterExpenseBtn = document.getElementById("filter-expense");

let transactions = [];

function init() {
  const savedTransactions = localStorage.getItem("transactions");
  if (savedTransactions) {
    transactions = JSON.parse(savedTransactions);
  }

  updateAll();
  setupEventListeners();
}

function setupEventListeners() {
  transactionForm.addEventListener("submit", addTransaction);

  filterAllBtn.addEventListener("click", () => {
    setActiveFilter("all");
    updateTransactionList();
  });

  filterIncomeBtn.addEventListener("click", () => {
    setActiveFilter("income");
    updateTransactionList();
  });

  filterExpenseBtn.addEventListener("click", () => {
    setActiveFilter("expense");
    updateTransactionList();
  });
}

function addTransaction(e) {
  e.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (!description || isNaN(amount) || amount <= 0) {
    alert("Please enter valid description and amount");
    return;
  }

  const transaction = {
    id: Date.now(),
    description,
    amount,
    type,
  };

  transactions.push(transaction);
  saveTransactions();
  updateAll();

  transactionForm.reset();
  descriptionInput.focus();
}

function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  saveTransactions();
  updateAll();
}

function updateAll() {
  updateBalance();
  updateIncome();
  updateExpense();
  updateTransactionList();
}

function updateBalance() {
  const balance = transactions.reduce((total, transaction) => {
    return transaction.type === "income"
      ? total + transaction.amount
      : total - transaction.amount;
  }, 0);

  balanceDisplay.textContent = formatCurrency(balance);
}

function updateIncome() {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  incomeDisplay.textContent = formatCurrency(income);
}

function updateExpense() {
  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  expenseDisplay.textContent = formatCurrency(expense);
}

function updateTransactionList() {
  const activeFilter = document.querySelector(".filter-btn.active").id;

  let filteredTransactions = [...transactions];

  if (activeFilter === "filter-income") {
    filteredTransactions = transactions.filter((t) => t.type === "income");
  } else if (activeFilter === "filter-expense") {
    filteredTransactions = transactions.filter((t) => t.type === "expense");
  }

  filteredTransactions.sort((a, b) => b.id - a.id);

  transactionList.innerHTML = filteredTransactions
    .map(
      (transaction) => `
                <li class="transaction-item">
                    <div class="transaction-details">
                        ${transaction.description}
                    </div>
                    <div class="transaction-amount ${transaction.type}-text">
                        ${
                          transaction.type === "income" ? "+" : "-"
                        }${formatCurrency(transaction.amount)}
                    </div>
                    <button class="delete-btn" onclick="deleteTransaction(${
                      transaction.id
                    })">
                        Delete
                    </button>
                </li>
            `
    )
    .join("");
}

function setActiveFilter(filter) {
  filterAllBtn.classList.remove("active");
  filterIncomeBtn.classList.remove("active");
  filterExpenseBtn.classList.remove("active");

  if (filter === "all") {
    filterAllBtn.classList.add("active");
  } else if (filter === "income") {
    filterIncomeBtn.classList.add("active");
  } else if (filter === "expense") {
    filterExpenseBtn.classList.add("active");
  }
}


function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function formatCurrency(amount) {
  return "Ksh-" + amount.toFixed(2);
}
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("invitation-form");
  const invitationDetails = document.getElementById("invitation-details");
  const eventNameDisplay = document.getElementById("display-event-name");
  const numberOfPeopleDisplay = document.getElementById(
    "display-number-of-people"
  );
  const eventDateDisplay = document.getElementById("display-event-date");
  const eventTimeDisplay = document.getElementById("display-event-time");

  
});


document.addEventListener("DOMContentLoaded", init);
