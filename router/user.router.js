const router = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware, commonMiddleware} = require("../middlewares");

router.get('/',
    userMiddleware.isQueryValid,
    userController.getAllUsers);

router.post('/',
    userMiddleware.isValidForCreate,
    userMiddleware.isUnique,
    userController.postUser);

router.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isExist,
    userController.getOneUser);

router.delete('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isExist,
    userController.deleteOneUser);

router.put('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isValidForUpdate,
    userMiddleware.isExist,
    userController.updateOneUser);

module.exports = router;