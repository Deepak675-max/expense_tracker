// Axois Instance

const axoisInstance = axios.create({
    baseURL: 'http://localhost:3000/api/expense'
})


async function getExpense() {
    try {
        const data = {
            expenseId: null
        }
        const responseData = await axoisInstance.post('/get-expense', data)
        if (responseData.data.error) {
            throw responseData.data.error
        }
        console.log(responseData.data);
        loadExpenseData(responseData.data.data.expenses);
    } catch (error) {
        console.log(error);
    }
}


async function createExpense(data) {
    try {
        const responseData = await axoisInstance.post('/create-expense', data)
        if (responseData.data.error) {
            throw responseData.data.error
        }
        await getExpense();
    } catch (error) {
        console.log(error);
    }
}


async function updateExpense(data) {
    try {
        const expenseData = {
            expenseId: parseInt(data.expenseId),
            amount: data.amount,
            description: data.description,
            category: data.category
        }
        console.log(expenseData);
        const responseData = await axoisInstance.put('/update-expense', expenseData)
        if (responseData.data.error) {
            throw responseData.data.error
        }
        await getExpense();
    } catch (error) {
        console.log(error);
    }
}


async function deleteExpense(id) {
    try {
        const data = {
            expenseId: parseInt(id)
        }
        console.log(data);
        const responseData = await axoisInstance.put('/delete-expense', data)
        if (responseData.data.error) {
            throw responseData.data.error
        }
        await getExpense();
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('DOMContentLoaded', getExpense);


// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const expenseAmount = document.querySelector('#amount');
const description = document.querySelector('#description');
const category = document.querySelector('#category');
const msg = document.querySelector('.msg');
const addBtn = document.querySelector('#add');
const updateBtn = document.querySelector('#update');

const expenseList = document.querySelector('#expenses');

// Listen for form submit
addBtn.addEventListener('click', addData);

updateBtn.addEventListener('click', updateData);


expenseList.addEventListener('click', removeItem);
expenseList.addEventListener('click', editItem);


function addData(e) {
    e.preventDefault();
    console.log("inside add data function");
    if (expenseAmount.value === '' || description.value === '' || category.value === '') {
        // alert('Please enter all fields');
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
    } else {
        const expenseData = {
            amount: expenseAmount.value,
            description: description.value,
            category: category.value,
        }

        createExpense(expenseData);

        // Clear fields
        expenseAmount.value = '';
        description.value = '';
        category.value = '';
    }
}

function updateData(e) {
    e.preventDefault();
    console.log("inside update data function");
    if (expenseAmount.value === '' || description.value === '' || category.value === '') {
        // alert('Please enter all fields');
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
    } else {
        const expenseData = {
            expenseId: expenseid.value,
            amount: expenseAmount.value,
            description: description.value,
            category: category.value,
        }


        updateExpense(expenseData);

        // Clear fields
        expenseAmount.value = '';
        description.value = '';
        category.value = '';
    }
}



function loadExpenseData(expenses) {
    expenseList.innerHTML = '';
    expenses.map((data, index) => {
        const li = document.createElement('li');
        console.log('li');

        li.setAttribute('id', `${data.id}`);
        // Add text node with input values
        li.appendChild(document.createTextNode(`${data.amount} - ${data.description} - ${data.category}`));

        var editBtn = document.createElement('button');

        // Add classes to del button
        editBtn.className = 'mx-2 btn btn-danger btn-sm float-right edit';

        // Append text node
        editBtn.appendChild(document.createTextNode('Edit Expense'));

        // Append button to li
        li.appendChild(editBtn);

        var deleteBtn = document.createElement('button');

        // Add classes to del button
        deleteBtn.className = 'mx-2 btn btn-danger btn-sm float-right delete';

        // Append text node
        deleteBtn.appendChild(document.createTextNode('Delete Expense'));

        // Append button to li
        li.appendChild(deleteBtn);

        // Append to ul
        expenseList.appendChild(li);
    })

}

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            var li = e.target.parentElement;
            const id = li.getAttribute('id');
            deleteExpense(id);
        }
    }
}


function editItem(e) {
    if (e.target.classList.contains('edit')) {
        var li = e.target.parentElement;
        const data = li.firstChild.textContent.split(' - ');
        const expenseAmount = document.querySelector('#amount');
        expenseAmount.value = data[0];
        const description = document.querySelector('#description');
        description.value = data[1];
        const cotegories = document.querySelectorAll('.option');
        const category = document.querySelector('#category');
        for (var i = 0; i < cotegories.length; i++) {
            if (cotegories[i].value === data[2]) {
                category.value = data[2]; // Set the selected index
                break;
            }
        }
        const id = li.getAttribute('id');
        const expenseid = document.querySelector('#expenseid');
        expenseid.value = id;
    }
}