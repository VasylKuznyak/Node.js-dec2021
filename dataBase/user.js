const {model, Schema} = require("mongoose");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});

module.exports = model('user', UserSchema);