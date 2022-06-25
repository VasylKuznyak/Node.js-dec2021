const {userService, passwordService} = require("../services");
const {userPresenter} = require("../presenters");

module.exports = {

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAll(req.query).exec();

            const userForResponse = users.map((user) => userPresenter.userPresenter(user));

            res.status(200).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    postUser: async (req, res, next) => {
        try {
            const hash = await passwordService.hashPassword(req.body.password);

            const newUser = await userService.post({...req.body, password: hash});

            const userForResponse = userPresenter.userPresenter(newUser);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    getOneUser: async (req, res, next) => {
        try {
            const {user} = req;

            const userForResponse = userPresenter.userPresenter(user);
            res.status(200).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    deleteOneUser: async (req, res, next) => {
        try {
            const {id} = req.params;

            await userService.delete({_id: id});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    updateOneUser: async (req, res, next) => {
        try {
            const {id} = req.params;

            const userForUpdate = await userService.update({_id: id}, req.body);

            const userForResponse = userPresenter.userPresenter(userForUpdate);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

};
