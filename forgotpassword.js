const axoisInstance = axios.create({
    baseURL: 'http://localhost:3000/api/auth'
})

async function sendResetPasswordLink(userData) {
    try {
        const responseData = await axoisInstance.post('/forgot-password', userData);
        if (responseData.data.error) {
            throw responseData.data.error
        }
        console.log(responseData.data.data);
        return responseData.data.data
    } catch (error) {
        console.log(error);
        throw error;
    }
}


document.getElementById('forgotpassword-btn').addEventListener('click', async function (event) {
    event.preventDefault();
    try {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const userData = {
            email: email
        }
        const res = await sendResetPasswordLink(userData);
        const msg = document.getElementById('msg');
        msg.innerText = res.message;
        msg.style.color = 'green';
        setTimeout(() => msg.remove(), 3000);
    } catch (error) {
        const msg = document.getElementById('msg');
        msg.innerText = error.message;
        msg.style.color = 'red';
        setTimeout(() => msg.remove(), 3000);
    }
})