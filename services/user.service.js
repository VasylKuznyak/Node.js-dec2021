const {User} = require("../dataBase");

module.exports = {
    getUsers: (params = {}) => {
        return User.find(params);
    },
    getUser: (params = {}) => {
        return User.findOne(params);
    },
    createUser: (user) => {
        return User.create(user);
    },
    updateUser: (params, userData, option = {new: true}) => {
        return User.findOneAndUpdate(params, userData, option);
    },
    deleteUser: (params) => {
        return User.deleteOne(params);
    },
}
