const axoisInstance = axios.create({
    baseURL: 'http://13.126.13.196:3000/api/auth'
})

async function signupUser(userData) {
    try {
        console.log(userData);
        const responseData = await axoisInstance.post('/signup', userData);
        if (responseData.data.error) {
            throw responseData.data.error
        }
        return responseData.data.data
    } catch (error) {
        console.log(error);
        msg.classList.add('error');
        msg.innerHTML = 'user with this email already exist';
        setTimeout(() => msg.remove(), 3000);
        throw error;
    }
}

const signupBtn = document.querySelector('#signup-btn');
const msg = document.querySelector('.msg');

signupBtn.addEventListener('click', createAccount);

function createAccount(event) {
    event.preventDefault();
    const userName = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    if (userName.value === '' || email.value === '' || password.value === '') {
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(() => msg.remove(), 3000);
    } else {
        const userData = {
            userName: userName.value,
            email: email.value,
            password: password.value,
        }

        signupUser(userData)
            .then(data => {
                console.log(data);
                window.location.href = "login.html";
            })
            .catch(error => {
                console.log(error);
            })

        // Clear fields
        userName.value = '';
        email.value = '';
        password.value = '';
    }
}
