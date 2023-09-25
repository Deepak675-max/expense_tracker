// Axois Instance
const axoisInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
})

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

            return getLeaderboardData();
        })
        .then(leaderboardData => {
            loadLeaderborad(leaderboardData);
        })
        .catch(error => {
            this.window.location.href = 'table.html'
        })
});

function loadLeaderborad(leaderboardData) {
    let listItems = '';
    leaderboardData.map(data => {
        listItems += `<li class="mt-3">Name - ${data.userName} Total Expense - ${data.totalExpense}</li>`
    })

    document.getElementById('leaderboardData').innerHTML = listItems;
    document.getElementById('leaderboard-box').style.display = 'block';

}