const {CustomError} = require("../errors");
const {userService} = require("../services");

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params;

            const user = await userService.getUser({_id: id});

            if (!user) {
                return next(new CustomError('User not found'));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserValidForCreate: async (req, res, next) => {
        try {
            const {name, age, email, password} = req.body;

            if (!Number.isInteger(age) || age < 18) {
                return next(new CustomError('Set valid age'));
            }

            if (!name || age.length < 2) {
                return next(new CustomError('Set valid name'));
            }

            if (!email || !email.includes('@')) {
                return next(new CustomError('Set valid email'));
            }

            if (!password || password.length < 8) {
                return next(new CustomError('Set valid password'));
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserValidForUpdate: async (req, res, next) => {
        try {
            const {name, age} = req.body;

            if (age && !Number.isInteger(age) || age < 18) {
                return res.status(400).json('Set valid age');
            }

            if (name && name.length < 2) {
                return res.status(400).json('Set valid name');
            }
            req.dateForUpdate = {name, age};
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.getUser({email});
            if (user) {
                return next(new CustomError(`User with email ${email} already exist`, 409));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
