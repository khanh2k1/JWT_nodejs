const authController = require('../controller/auth.controller')

const router = require('express').Router()

router.post('/login', authController.login)

router.post('/register', authController.registerAccount)

module.exports = router