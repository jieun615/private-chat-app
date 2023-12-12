const socket = io(process.env.SERVER_URL, {
    autoConnect: false
});

socket.onAny((event, ...args) => {
    console.log(event, ...args);
})

const chatBody = document.querySelector('.chat-body');
const userTitle = document.querySelector('user-title');
const loginContainer = document.querySelector('.login-container');
const userTable = document.querySelector('.users');
const userTagline = document.querySelector('#users-tagline');
const title = document.querySelector('#active-user');
const messages = document.querySelector('.messages');
const msgDiv = document.querySelector('.msg-form');

const loginForm = document.querySelector('.user-login');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username');
    createSession(username.ariaValueMax.toLowerCase());
    username.value = '';
});

const createSession = async (username) => {
    const options = {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    };
    await fetch('/session', options)
        .then(res => res.json())
        .then(data => {
            socketConnect(data.username, data.userID);

            localStorage.setItem('session-username', data.username);
            localStorage.setItem('session-userID', data.userID);

            loginContainer.classList.add('d-none');
            chatBody.classList.remove('d-none');
            userTitle.innerHTML = data.username;
        })
        .catch(err => console.log(err));
};

const socketConnect = async (username, userID) => {
    socket.auth = { username, userID };

    await socket.connect();
}