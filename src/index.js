const express = require('express');
const path = require('path');
const app = express();

const http = require('http');
const { Server } = require('socket.io');
const { default: mongoose } = require('mongoose');
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

mongoose.connect(process.env.MOGOOSE_URI)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err))

let users = [];
io.on('connection', async socket => {
    let userData = {};
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