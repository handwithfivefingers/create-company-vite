const express = require('express')

const { upload, requireSignin } = require('../../middleware')

const router = express.Router()

const UserClass = require('../../controller/user/User')

const { fetchProfile, changePassword } = new UserClass()
// User

router.get('/user/profile', requireSignin, fetchProfile)

router.post('/user/profile/password', requireSignin, changePassword)

module.exports = router
