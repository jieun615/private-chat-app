const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const port = process.env.SERVER_PORT;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});