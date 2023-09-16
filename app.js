// Axois Instance

const axoisInstance = axios.create({
    baseURL: 'http://localhost:3000/api/expense'
})

// Function to retrieve query parameters from URL
function getQueryParam(id) {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("url params = ", urlParams);
    return urlParams.get(id);
}

// Get the username from the query parameters
const userId = getQueryParam("userid");
const userName = getQueryParam("username");


document.getElementById('userId').setAttribute('key', userId);
document.getElementById('userId').innerHTML = `<h6>${userName}</h6>`

async function getExpense() {
    try {
        const data = {
            expenseId: null,
            userId: userId
        }
        const responseData = await axoisInstance.post('/get-expense', data)
        if (responseData.data.error) {
            throw responseData.data.error
        }
        console.log(responseData.data);
        return responseData.data.data.expenses;
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
        return responseData.data.data;
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
        return responseData.data.data;
    } catch (error) {
        console.log(error);
    }
}


async function deleteExpense(expenseData) {
    try {
        const responseData = await axoisInstance.put('/delete-expense', expenseData)
        if (responseData.data.error) {
            throw responseData.data.error
        }
        return responseData.data.data;
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('DOMContentLoaded', function (event) {
    event.preventDefault();
    getExpense()
        .then(expenses => {
            loadExpenseData(expenses);
        })
        .catch(error => {
            console.log(error);
        })
});


// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const expenseAmount = document.querySelector('#amount');
const description = document.querySelector('#description');
const category = document.querySelector('#category');
const msg = document.querySelector('.msg');
const addBtn = document.querySelector('#add');
const updateBtn = document.querySelector('#update');
const expenseList = document.querySelector('#expenses');

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
            userId: userId,
            amount: expenseAmount.value,
            description: description.value,
            category: category.value,
        }

        createExpense(expenseData)
            .then(data => {
                console.log(data);
                return getExpense();
            })
            .then(data => {
                loadExpenseData(data);
            })
            .catch(error => {
                console.log(error);
            })

        // Clear fields
        expenseAmount.value = '';
        description.value = '';
        category.value = '';
    }
}

function updateData(e) {
    e.preventDefault();
    if (expenseAmount.value === '' || description.value === '' || category.value === '') {
        // alert('Please enter all fields');
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        // Remove error after 3 seconds
        setTimeout(() => msg.remove(), 3000);
    } else {

        const expenseData = {
            userId: userId,
            expenseId: expenseid.value,
            amount: expenseAmount.value,
            description: description.value,
            category: category.value,
        }

        updateExpense(expenseData)
            .then(data => {
                console.log(data);
                return getExpense();
            })
            .then(data => {
                loadExpenseData(data);
            })
            .catch(error => {
                console.log(error);
            })

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
            const expenseId = li.getAttribute('id');
            const expenseData = {
                expenseId: expenseId,
                userId: userId
            }
            deleteExpense(expenseData)
                .then(data => {
                    console.log(data);
                    return getExpense();
                })
                .then(data => {
                    loadExpenseData(data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}


function editItem(e) {
    if (e.target.classList.contains('edit')) {
        document.getElementById('update').style.display = 'block';
        document.getElementById('add').style.display = 'none';
        document.getElementById('update').style.backgroundColor = 'green';
        document.getElementById('update').style.color = 'white';

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