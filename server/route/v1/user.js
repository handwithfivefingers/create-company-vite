const express = require('express')
const ProfileController = require('@controller/v1/user/profile.controller')
const router = express.Router()

router.get('/profile', new ProfileController().onGetUser)
router.post('/profile/:_id', new ProfileController().onUpdateProfile)

// router.post('/user/profile/password', requireSignin, changePassword)

module.exports = router
