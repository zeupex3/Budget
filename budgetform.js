// Get the form and its elements on submit action
const budgetForm = document.querySelector('#budgetForm');
let budgetArray = [];

budgetForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Get the values 
    const name = document.querySelector('#list').value;

    if (name.length > 50) {
        alert("ชื่อรายการยาวเกิน 50 ตัวอักษร กรุณากรอกใหม่");
        return;
    }

    const amount = parseFloat(document.querySelector('#money').value);
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;
    
    const type = document.querySelector('input[name="type"]:checked').value;

    const budgetData = {
        name: name,
        amount: amount,
        date: date,
        time: time,
        type: type
    };

    console.log('Name:', name);
    console.log('Amount:', amount);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Type:', type);
    
    budgetArray.push(budgetData);

    renderTransactions();
    updateSummary();

    budgetForm.reset();
});

function renderTransactions() {
    const itemList = document.querySelector('#transactionList');
    itemList.innerHTML = "";

    budgetArray.forEach(function (transaction, index) {
        const listItem = document.createElement("li");
        let textColor = "";
        
        if (transaction.type === "รายรับ") {
            textColor = "green";
        } else if (transaction.type === "รายจ่าย") {
            textColor = "red";
        }
        
        listItem.innerHTML = `
            <span style="color: ${textColor};">
                <strong>${transaction.date} - ${transaction.time}</strong> - ${transaction.name} - ${transaction.amount} บาท (${transaction.type})
            </span> 
            <button onclick="deleteTransaction(${index})" style="margin-left: 10px;">ลบ</button>
        `;
        itemList.appendChild(listItem);
    });
}

function updateSummary() {
    const totalIncomeEl = document.querySelector('#totalIncome');
    const totalExpenseEl = document.querySelector('#totalExpense');
    const balanceEl = document.querySelector('#balance');

    // แยกรายรับและรวมเงิน
    const incomeTransactions = budgetArray.filter(t => t.type === "รายรับ");
    const totalIncome = incomeTransactions.reduce((sum, curr) => sum + curr.amount, 0);

    // แยกรายจ่ายและรวมเงิน
    const expenseTransactions = budgetArray.filter(t => t.type === "รายจ่าย");
    const totalExpense = expenseTransactions.reduce((sum, curr) => sum + curr.amount, 0);

    // คำนวณยอดคงเหลือ
    const balance = totalIncome - totalExpense;

    // แสดงผลบนหน้า HTML
    totalIncomeEl.textContent = `จำนวนทั้งหมด : ${totalIncome} บาท`;
    totalExpenseEl.textContent = `จำนวนทั้งหมด : ${totalExpense} บาท`;
    balanceEl.innerHTML = `<h4>ยอดคงเหลือ : ${balance} บาท</h4>`;
}

function deleteTransaction(index) {
    budgetArray.splice(index, 1);

    renderTransactions();
    updateSummary();
}