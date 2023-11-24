const express = require('express')
const router = express.Router()
const UserController = require('../../controller/v1/admin/user.controller')

router.post('/', new UserController().onGetUser)

router.delete('/:id', new UserController().onDeleteUser)

module.exports = router
