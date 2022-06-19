const {userService} = require("../services");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await userService.getUsers();
            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const {user} = req;
            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    deleteById: async (req, res, next) => {
        try {
            const {id} = req.params;
            await userService.deleteUserByID(id);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    updateById: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedUser = await userService.updateUserByID({_id: id}, req.dateForUpdate);
            res.status(201).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

};
