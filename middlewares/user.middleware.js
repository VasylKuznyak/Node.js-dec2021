const {userService} = require("../services");
const {userValidator, queryValidator} = require("../validators");
const {CError} = require('../errors');

module.exports = {
    isValidForCreate: async (req, res, next) => {
        try {
            const {error, value} = userValidator.newUserValidator.validate(req.body);

            if (error) {
                return next(new CError(error.details[0].message));
            }

            req.body = value;

            next();
        } catch (e) {
            next(e)
        }
    },

    isValidForUpdate: async (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                return next(new CError(error.details[0].message));
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.getOne({email});

            if (user) {
                return next(new CError('User already exist', 409));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isExist: async (req, res, next) => {
        try {
            const {id} = req.params;

            const user = await userService.getOne({_id: id});

            if (!user) {
                return next(new CError('User not found'));
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isQueryValid: async (req, res, next) => {
        try {
            const {error, value} = queryValidator.getAll.validate(req.query);

            if (error) {
                return next(new CError(error.details[0].message));
            }

            req.query = value;

            next();
        } catch (e) {
            next(e);
        }
    }

};
