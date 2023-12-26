function addItem() {
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const type = document.getElementById('type').value;
  const transactionDate = document.getElementById('transactionDate').value;

  const dateParts = transactionDate.split('-');
  const currentDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

  const transaction = { description, amount, type, date: currentDate };

  let transactionsByMonthYear = JSON.parse(localStorage.getItem('transactionsByMonthYear')) || {};

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  if (!transactionsByMonthYear[year]) {
    transactionsByMonthYear[year] = {};
  }
  if (!transactionsByMonthYear[year][month]) {
    transactionsByMonthYear[year][month] = [];
  }

  transactionsByMonthYear[year][month].push(transaction);

  localStorage.setItem('transactionsByMonthYear', JSON.stringify(transactionsByMonthYear));

  displayTransactions();
}

function deleteTransaction(year, month, index) {
  let transactionsByMonthYear = JSON.parse(localStorage.getItem('transactionsByMonthYear')) || {};

  if (transactionsByMonthYear[year] && transactionsByMonthYear[year][month]) {
    transactionsByMonthYear[year][month].splice(index, 1);
    localStorage.setItem('transactionsByMonthYear', JSON.stringify(transactionsByMonthYear));
    displayTransactions();
  }
}

function displayTransactions() {
  const transactionList = document.getElementById('transactionList');
  transactionList.innerHTML = '';

  let transactionsByMonthYear = JSON.parse(localStorage.getItem('transactionsByMonthYear')) || {};

  for (const year in transactionsByMonthYear) {
    for (const month in transactionsByMonthYear[year]) {
      transactionsByMonthYear[year][month].forEach((transaction, index) => {
        const newRow = transactionList.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);

        cell1.innerHTML = transaction.description;
        cell2.innerHTML = transaction.amount;
        cell3.innerHTML = transaction.type;
        cell4.innerHTML = new Date(transaction.date).toLocaleDateString();

        if (transaction.type === 'expense') {
          newRow.style.color = 'red';
        } else {
          newRow.style.color = 'green';
        }

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Удалить';
        deleteButton.addEventListener('click', () => deleteTransaction(year, month, index));
        cell5.appendChild(deleteButton);
      });
    }
  }
    let income = 0;
  let expense = 0;

  for (const year in transactionsByMonthYear) {
    for (const month in transactionsByMonthYear[year]) {
      transactionsByMonthYear[year][month].forEach(transaction => {
        if (transaction.type === 'income') {
          income += parseFloat(transaction.amount);
        } else if (transaction.type === 'expense') {
          expense += parseFloat(transaction.amount);
        }
      });
    }
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Доходы', 'Расходы'],
      datasets: [{
        label: 'Сумма',
        data: [income, expense],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

window.onload = function () {
  displayTransactions();
};
