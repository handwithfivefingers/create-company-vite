const express = require('express')

const { upload, requireSignin } = require('../../middleware/index')

const UserManageAdmin = require('../../controller/admin/User/index')

const User = new UserManageAdmin()

const router = express.Router()

router.post('/user', requireSignin, User.fetchUser)

router.post('/delete/:id', requireSignin, User.deleteUser)

module.exports = router
