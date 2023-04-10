const accountController = require('../controller/account.controller')
const middlewareController = require('../controller/middleware.controller')
const router = require('express').Router()


router.get('/', middlewareController.verifyToken, accountController.getAllAccount)
router.delete('/:id', middlewareController.verifyTokenAndAdminAuth, accountController.deleteAccount)

module.exports = router