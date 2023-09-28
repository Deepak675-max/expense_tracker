const axoisInstance = axios.create({
    baseURL: 'http://52.66.114.142:3000/api/auth'
})

const loginBtn = document.querySelector('#login-btn');

loginBtn.addEventListener('click', login);

function login(event) {
    event.preventDefault();
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    if (email.value === '' || password.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(() => msg.remove(), 3000);
    } else {
        const userData = {
            email: email.value,
            password: password.value
        }
        loginUser(userData)
            .then(responseData => {
                console.log(responseData);
                const token = responseData.token;
                localStorage.setItem('token', token);
                window.location.href = `index.html`;
            })
            .catch(error => {
                const errorMsg = document.getElementById('err-msg');
                errorMsg.innerHTML = `<h5>Invalid username or password.</h5>`
                errorMsg.style.color = 'red';
                errorMsg.style.textAlign = 'center';
                setTimeout(() => errorMsg.remove(), 5000);
                console.log(error);
            })
    }

}

async function loginUser(userData) {
    try {
        const responseData = await axoisInstance.post('/login', userData);
        if (responseData.data.error) {
            throw responseData.data.error
        }
        return responseData.data.data
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// async function sendResetPasswordLink(userData) {
//     try {
//         const responseData = await axoisInstance.post('/forgot-password', userData);
//         if (responseData.data.error) {
//             throw responseData.data.error
//         }
//         return responseData.data.data.emailDetails
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }


// document.getElementById('forgotpassword-btn').addEventListener('click', async function (event) {
//     event.preventDefault();
//     const email = document.getElementById('email').value;
//     const userData = {
//         email: email
//     }
//     const res = await sendResetPasswordLink(userData);
//     document.getElementById('msg').innerText = res.message;
// })