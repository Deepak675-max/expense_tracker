// Axois Instance

const axoisInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
})

async function getExpense() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log(token);
            throw new Error('unauthorized user');
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const responseData = await axoisInstance.get('/expense/get-expense', config);
        if (responseData.error) {
            throw responseData.error
        }
        return responseData.data.data.expenses;
    } catch (error) {
        throw error;
    }
}

async function createExpense(expenseData) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('unauthorized user');
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const responseData = await axoisInstance.post('/expense/create-expense', expenseData, config);
        if (responseData.data.error) {
            throw responseData.data.error
        }
        return responseData.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateExpense(expenseData) {
    try {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const responseData = await axoisInstance.put('/expense/update-expense', expenseData, config)
        if (responseData.data.error) {
            throw responseData.data.error
        }
        return responseData.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteExpense(expenseData) {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const responseData = await axoisInstance.put('expense/delete-expense', expenseData, config)
        if (responseData.data.error) {
            throw responseData.data.error
        }
        return responseData.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUserFromToken() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('unauthorized user');
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const responseData = await axoisInstance.get('/auth/get-user', config);
        if (responseData.data.error) {
            throw responseData.data.error
        }
        return responseData.data.data.user;
    } catch (error) {
        throw error;
    }
}

async function logoutUser() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('unauthorized user');
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        console.log(config)
        const responseData = await axoisInstance.get('/auth/logout', config);
        console.log(responseData);
        if (responseData.data.error) {
            throw responseData.data.error
        }
        return responseData.data.data;
    } catch (error) {
        throw error;
    }
}

async function getLeaderboardData() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('unauthorized user');
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const responseData = await axoisInstance.get('/premium/get-leaderboard', config);
        if (responseData.data.error) {
            throw responseData.data.error;
        }
        return responseData.data.data.leaderboardData;
    } catch (error) {

    }
}

window.addEventListener('DOMContentLoaded', function (event) {
    event.preventDefault();
    getUserFromToken()
        .then(user => {
            document.querySelector('#profile').innerHTML = user.userName
            console.log(user.isPremiumUser);
            if (user.isPremiumUser) {
                document.getElementById('buy-premium-btn').style.display = 'none';
                document.getElementById('premium-item').innerHTML = '<p>premium Acocunt</p>';
                document.getElementById('premium-item').style.color = 'yellowgreen';
                document.getElementById('leaderboard').style.display = 'block';
                document.getElementById('leaderboard-box').style.display = 'none';
            }

            return getExpense();
        })
        .then(expenses => {
            loadExpenseData(expenses);
        })
        .catch(error => {
            this.window.location.href = 'login.html'
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
const logoutBtn = document.querySelector('#logout-btn');

addBtn.addEventListener('click', addData);
updateBtn.addEventListener('click', updateData);
expenseList.addEventListener('click', removeItem);
expenseList.addEventListener('click', editItem);
logoutBtn.addEventListener('click', logoutUserHelper)

function logoutUserHelper(e) {
    e.preventDefault();
    logoutUser()
        .then(responseData => {
            localStorage.clear('token');
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.log(error);
        })
}

document.getElementById('buy-premium-btn').addEventListener('click', async function (e) {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    const responseData = await axoisInstance.get('/order/purchase-premium-membership', config)
    console.log(responseData);
    const options = {
        "key": responseData.data.data.key_id,
        "order_id": responseData.data.data.order.id,
        "handler": async function (response) {
            console.log('handler function argument = ', response);
            await axoisInstance.post('/order/update-transaction-status', {
                orderId: options.order_id,
                paymentId: response.razorpay_payment_id,
                status: "SUCCESSFUL"

            },
                config
            );
            document.getElementById('premium-item').innerHTML = '<p>premium Acocunt</p>';
            document.getElementById('premium-item').style.color = 'yellowgreen';
            document.getElementById('leaderboard').style.display = 'block';
            alert('You are now premium user.')
        }

    }
    const rzp = new Razorpay(options);
    // Open the Razorpay payment widget
    rzp.open();
    e.preventDefault();
    rzp.on("payment.failed", async function (response) {
        console.log(response);
        await axoisInstance.post('/order/update-transaction-status', {
            orderId: options.order_id,
            paymentId: response.razorpay_payment_id,
            status: "FAILED"
        },
            config
        );
        alert('something went wrong');
    })
})

document.getElementById('leaderboard').addEventListener('click', async function (e) {
    const leaderboardData = await getLeaderboardData();
    loadLeaderborad(leaderboardData);
})


function addData(e) {
    e.preventDefault();
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
        document.getElementById('update').style.display = 'none';
        document.getElementById('add').style.display = 'block';
        document.getElementById('add').style.backgroundColor = 'lightgreen';

    }
}

function loadLeaderborad(leaderboardData) {
    document.getElementById('expense-box').style.display = 'none';
    let listItems = '';
    leaderboardData.map(data => {
        listItems += `<li class="mt-3">Name - ${data.userName} Total Expense - ${data.totalAmount}</li>`
    })

    document.getElementById('leaderboardData').innerHTML = listItems;
    document.getElementById('leaderboard-box').style.display = 'block';

}



function loadExpenseData(expenses) {
    expenseList.innerHTML = '';
    expenses.map((data, index) => {
        const li = document.createElement('li');

        li.setAttribute('id', `${data.id}`);
        li.setAttribute('class', 'list-item mt-3');

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