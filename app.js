const express = require('express');
const mongoose = require("mongoose");

const {MONGO_URL, PORT} = require("./constants/constants");
const {userRouter} = require("./router");

mongoose.connect(MONGO_URL);

const app = express();
app.use(express.json());

app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Page not found');
});

app.use((error, req, res, next) => {
    res
        .status(error.status || 500)
        .json({
            error: error.message || "Unknown Error",
            status: error.status || 500,
        });
});

app.listen(PORT, () => {
    console.log(`You listen ${PORT} port`);
});