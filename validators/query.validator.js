const Joi = require('joi');

const {nameValidator, ageValidator, emailValidator} = require("./common.validator");

module.exports = {
    getAll: Joi.object({
        name: nameValidator,
        age: ageValidator,
        email: emailValidator,
    }),
};
