const axoisInstance = axios.create({
    baseURL: 'http://localhost:3000/api/auth'
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
            .then(user => {
                console.log(user);
                window.location.href = `app.html?userid=${user.id}&username=${user.userName}`;
            })
            .catch(error => {
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
        return responseData.data.data.user
    } catch (error) {
        console.log(error);
        throw error;
    }
}