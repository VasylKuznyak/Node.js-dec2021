const express = require('express');

const {userRouter} = require("./routes");
const {constants} = require("./constants");
const mongoose = require("mongoose");

mongoose.connect(constants.MONGO_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('*', (req, res) => {
    res.status(404).json('page not found');
});
app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error',
            code: err.status || 500,
        });
});

app.listen(constants.PORT, () => {
    console.log(`You listen port ${constants.PORT}`);
});