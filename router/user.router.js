const {userController} = require("../controllers");
const router = require('express').Router();

router.get('/', userController.getAll);
router.post('/:id', userController.createUser);

router.get('/:id', userController.getById);
router.delete('/:id', userController.deleteById);
router.update('/:id', userController.updateById);

module.exports = router;