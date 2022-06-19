const {User} = require("../dataBase");

module.exports = {
    getUsers: (params = {}) => {
        return User.find(params);
    },

    getUserById: (params = {}) => {
        return User.findOne(params);
    },

    createUser: (user) => {
        return User.create(user);
    },

    deleteUserByID: (params) => {
        return User.deleteOne(params);
    },

    updateUserByID: (params, userData, option = {new: true}) => {
        return User.findOneAndUpdate(params, userData, option);
    },
};
