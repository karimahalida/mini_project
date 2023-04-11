const router = require('express').Router()
const { userController } = require('../controllers')

router.post('/user/register', userController.register)
router.post('/user/login', userController.login)

module.exports = router