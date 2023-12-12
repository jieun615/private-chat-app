const express = require('express');
const path = require('path');
const app = express();

const http = require('http');
const { Server } = require('socket.io');
const { default: mongoose } = require('mongoose');
const crypto = require('crypto');
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

mongoose.connect(process.env.MOGOOSE_URI)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err))

const randomId = () => crypto.randomBytes(8).toString('hex');

app.post('/session', (req, res) => {
    const data = {
        username: req.body.username,
        userID: randomId()
    };
    res.send(data);
});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    const userID = socket.handshake.auth.userID;
    if(!username) {
        return next(new Error('Invalid username'));
    }

    socket.username = username;
    socket.id = userID;
})

let users = [];
io.on('connection', async socket => {
    let userData = {
        username: socket.username,
        userID: socket.id
    }
    users.push(userData);
    io.emit('users-data', { users });

    //client에서 보낸 메세지
    socket.on('message-to-server', () => {});

    //database에서 메세지 가져오기
    socket.on('fetch-messages', () => {});

    //user가 방에서 나갔을 때
    socket.on('disconnect', () => {});
});

const port = process.env.SERVER_PORT;
server.listen(port, () => {
    console.log(`listening on ${port}`);
});