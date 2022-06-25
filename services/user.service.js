const {User} = require("../dataBase");

module.exports = {

    getAll: (params = {}) => {
        return User.find(params);
    },

    getOne: (params = {}) => {
        return User.findOne(params);
    },

    post: (user) => {
        return User.create(user);
    },

    delete: (params) => {
        return User.deleteOne(params);
    },

    update: (params, data, options = {new: true}) => {
        return User.findOneAndUpdate(params, data, options);
    },

};
