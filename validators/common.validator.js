const Joi = require('joi');

const {constants} = require("../constants");

module.exports = {
    nameValidator: Joi.string().alphanum().min(2).max(10),
    ageValidator: Joi.number().integer().min(1).max(100),
    emailValidator: Joi.string().regex(constants.EMAIL_REGEX).trim().lowercase(),
    passwordValidator: Joi.string().regex(constants.PASSWORD_REGEX).trim().required(),
};
