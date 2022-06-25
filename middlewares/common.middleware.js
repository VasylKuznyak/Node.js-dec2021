const {Types} = require("mongoose");

const {CError} = require('../errors');

module.exports = {

    isIdValid: (req, res, next) => {
        try {
            const {id} = req.params;

            if (!Types.ObjectId.isValid(id)) {
                return next(new CError('Id is not valid'));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
