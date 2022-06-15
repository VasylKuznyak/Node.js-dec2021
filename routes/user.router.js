const router = require('express').Router();

const {userController} = require("../controllers");

router.get('/', userController.getAll);
router.post('/', userController.createUser);

router.get('/:userId', userController.getByID);
router.put('/:userId', userController.updateById);
router.delete('/:userId', userController.deleteById);

module.exports = router;