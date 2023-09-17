const express = require('express')

const { upload, requireSignin } = require('@middleware')

const UserManageAdmin = require('@controller/admin/User')

const User = new UserManageAdmin()

const router = express.Router()

router.post('/', requireSignin, User.fetchUser)

router.delete('/:id', requireSignin, User.deleteUser)

module.exports = router
