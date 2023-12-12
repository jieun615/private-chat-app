const express = require('express');
const path = require('path');
const app = express();

const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const port = process.env.SERVER_PORT;
server.listen(port, () => {
    console.log(`listening on ${port}`);
});