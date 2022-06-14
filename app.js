const express = require('express');
const {fileService} = require("./services");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    const users = await fileService.read();

    res.json(users);
});


app.listen(5000, () => {
    console.log('You listen port 5000');
});