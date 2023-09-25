// Axois Instance

const axoisInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
})

// async function getExpense() {
//     try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             console.log(token);
//             throw new Error('unauthorized user');
//         }
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         }
//         const responseData = await axoisInstance.post('/expense/get-expense', config);
//         if (responseData.error) {
//             throw responseData.error
//         }
//         return responseData.data.data.expenses;
//     } catch (error) {
//         throw error;
//     }
// }

const token = localStorage.getItem('token');


const table = $('#example').DataTable({
    lengthMenu: [[5, 10, 25, 50, -1], ['5', '10', '25', '50', 'All']],
    pageLength: 5,
    processing: true,
    serverSide: true,
    ajax: {
        url: 'http://localhost:3000/api/expense/get-expense',
        type: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    },
    columns: [
        { data: 'id' },
        { data: 'amount' },
        { data: 'description' },
        { data: 'category' },
        {
            data: null,
            render: function (data, type, row) {
                return `<button id="edit-button" class="btn btn-warning" data-toggle="modal" data-target="#editModal">Edit</button>`;
            }
        },
        {
            data: null,
            render: function (data, type, row) {
                return `<button id="delete-button" class="btn btn-danger">Delete</button>`;
            }
        }
    ],
    language: {
        emptyTable: "No data available in this table"
    }
});

console.log(table);

// Rest of your code...


async function createExpense(expenseData) {
    try {
        // const token = localStorage.getItem('token');
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
        console.log(responseData);
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
        // const token = localStorage.getItem('token');

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
        // const token = localStorage.getItem('token');
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
        // const token = localStorage.getItem('token');
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
        // const token = localStorage.getItem('token');
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
        // const token = localStorage.getItem('token');
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

// const table = $('#example').DataTable({
//     lengthMenu: [[5, 10, 25, 50, -1], ['5', '10', '25', '50', 'All']], // Customize the entries per page options
//     pageLength: 5,
//     // order: [[0, 'desc']],
//     // paging: true,
//     // searching: true,
//     // ordering: true,
//     serverSide: true, // Enable server-side processing
//     ajax: {
//         url: 'http://localhost:3000/api/expense/get-expenses', // Replace with your backend API endpoint
//         type: 'POST', // Use POST method to send data to the backend
//     },
//     columns: [
//         { data: 'amount' }, // Match 'column1' to your API response structure
//         { data: 'description' }, // Match 'column2' to your API response structure
//         { data: 'category' }, // Match 'column2' to your API response structure
//         {
//             // New column for Edit functionality
//             data: null,
//             render: function (data, type, row) {
//                 return `<button class="edit-button">Edit</button>`;
//             }
//         },
//         {
//             // New column for Edit functionality
//             data: null,
//             render: function (data, type, row) {
//                 return `<button class="delete-button">Delete</button>`;
//             }
//         }
//         // Add more columns as needed
//     ],
// });



// const table = new DataTable('#example', {
//     lengthMenu: [[5, 10, 25, 50, -1], ['5', '10', '25', '50', 'All']],
//     pageLength: 5,
//     // order: [[0, 'desc']],
//     // paging: true,
//     // searching: true,
//     // ordering: true,
//     processing: true,
//     serverSide: true,
//     ajax: {
//         url: 'http://localhost:3000/api/expense/get-expense',
//         type: 'POST',
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     },
//     columns: [
//         { data: 'id' },
//         { data: 'amount' },
//         { data: 'description' },
//         { data: 'category' },
//         {
//             // New column for Edit functionality
//             data: null,
//             render: function (data, type, row) {
//                 return `<button id="edit-button" class="btn btn-warning" data-toggle="modal" data-target="#editModal">Edit</button>`;
//             }
//         },
//         {
//             // New column for Edit functionality
//             data: null,
//             render: function (data, type, row) {
//                 return `<button id="delete-button" class="btn btn-danger">Delete</button>`;
//             }
//         }
//         // Add more columns as needed
//     ],
//     language: {
//         emptyTable: "No data available in this table" // Customize the empty table message
//     }
// });

$(document).ready(function () {

    // Event delegation for modal trigger buttons
    $('#example').on('click', '#edit-button', function () {
        const data = table.row($(this).closest('tr')).data(); // Get the data for the clicked row
        console.log(data);
        if (data) {
            // Populate the form fields with data from the row
            $('#editamount').val(data.amount);
            $('#editdescription').val(data.description);
            $('#editcategory').val(data.category);
            $('#expenseId').val(data.id);
            // Populate other form fields as needed

            // Open the edit modal
            $('#editModal').modal('show');
        }
    });

    $('#example').on('click', '#delete-button', function () {
        // Handle the click event for the "Delete" button
        const data = table.row($(this).closest('tr')).data(); // Get the data for the clicked row
        if (data) {
            // Populate the form fields with data from the row
            const expenseData = {
                expenseId: data.id
            }
            deleteExpense(expenseData)
                .then(res => {
                    loadExpenseData();
                })
                .catch(error => {
                    console.log(error);
                    throw error;
                })
            // Open the edit modal
        }
    });
});

function loadExpenseData() {
    // Load new data into the DataTable
    table.ajax.reload();
}

document.getElementById('buy-premium-btn').addEventListener('click', async function (e) {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const responseData = await axoisInstance.get('/order/purchase-premium-membership', config)
        console.log("res = ", responseData);
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
                // document.getElementById('leaderboard').style.display = 'block';
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
    } catch (error) {
        console.log(error);
    }
    // const token = localStorage.getItem('token');

})

document.getElementById('addExpense').addEventListener('click', async function (event) {
    event.preventDefault();
    const expenseAmount = document.querySelector('#amount');
    const description = document.querySelector('#description');
    const category = document.querySelector('#category');
    const msg = document.querySelector('.msg');
    try {

        if (expenseAmount.value === '' || description.value === '' || category.value === '') {
            console.log("deepak");

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

            await createExpense(expenseData);
            loadExpenseData();
            // Clear fields
            expenseAmount.value = '';
            description.value = '';
            category.value = '';
        }
    } catch (error) {
        // throw new Error('Error occured while adding data');
        console.log(error);
    }
});



document.getElementById('editExpense').addEventListener('click', async function (event) {
    event.preventDefault();
    const expenseAmount = document.querySelector('#editamount');
    const description = document.querySelector('#editdescription');
    const category = document.querySelector('#editcategory');
    const msg = document.querySelector('.msg');
    try {
        console.log("category", category)
        if (expenseAmount.value === '' || description.value === '' || category.value === '') {
            // alert('Please enter all fields');
            msg.classList.add('error');
            msg.innerHTML = 'Please enter all fields';

            // Remove error after 3 seconds
            setTimeout(() => msg.remove(), 3000);
        } else {
            const expenseId = document.getElementById('expenseId');
            const expenseData = {
                expenseId: expenseId.value,
                amount: expenseAmount.value,
                description: description.value,
                category: category.value,
            }
            await updateExpense(expenseData);
            loadExpenseData();
            // Clear fields
            expenseAmount.value = '';
            description.value = '';
            category.value = '';
        }
    } catch (error) {
        console.log(error);
    }
});



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
                document.getElementById('nav-item').style.display = 'block';
            }
        })
        .then(expenses => {
            loadExpenseData();
        })
        .catch(error => {
            this.window.location.href = 'login.html'
        })
});


document.getElementById('logout-btn').addEventListener('click', function (e) {
    e.preventDefault();
    logoutUser()
        .then(responseData => {
            localStorage.clear('token');
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.log(error);
        })
});


// function loadExpenseData(expenses) {
//     // const table = new DataTable('#example');
//     table.clear();
//     expenses.map((expense, index) => {
//         table.row
//             .add([
//                 expense.id,
//                 expense.amount,
//                 expense.description,
//                 expense.category,
//                 `<button class="edit-button" expenseId="${expense.id}">Edit</button>`,
//                 `<button class="delete-button" expenseId="${expense.id}">Delete</button>`
//             ])
//             .draw(false);
//     });
// }

// function populateDataTable(expenses) {
//     const dataTable = $('#example').DataTable({
//         serverSide: true, // Enable server-side processing
//         ajax: {
//             url: '/your-backend-api-endpoint', // Replace with your backend API endpoint
//             type: 'POST', // Use POST method to send data to the backend
//         },
//         data: expenses, // Use the fetched data as the data source
//         columns: [
//             { data: 'amount' }, // Match 'column1' to your API response structure
//             { data: 'description' }, // Match 'column2' to your API response structure
//             { data: 'category' }, // Match 'column2' to your API response structure
//             {
//                 // New column for Edit functionality
//                 data: null,
//                 render: function (data, type, row) {
//                     return `<button class="edit-button">Edit</button>`;
//                 }
//             },
//             {
//                 // New column for Edit functionality
//                 data: null,
//                 render: function (data, type, row) {
//                     return `<button class="delete-button">Delete</button>`;
//                 }
//             }
//             // Add more columns as needed
//         ],

//     });

//     // dataTable.destroy();
// }


// function populateTable(expenses) {
//     const tableBody = document.querySelector('#example tbody');

//     expenses.forEach((expense) => {
//         const newRow = tableBody.insertRow();

//         // Add cells (columns) to the new row
//         const cell1 = newRow.insertCell(0);
//         const cell2 = newRow.insertCell(1);
//         const cell3 = newRow.insertCell(2);


//         // Set cell values based on your data structure
//         cell1.textContent = expense.amount;
//         cell2.textContent = expense.description;
//         cell3.textContent = expense.category;

//         // Add more cells as needed
//     });
// }




