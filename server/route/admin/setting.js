const express = require('express')

const { upload, requireSignin } = require('../../middleware/index')

const SettingClass = require('../../controller/user/Setting');

const { settingTemplateMail, getSettingMail } = new SettingClass()


const router = express.Router()

router.post('/email/setting', requireSignin, settingTemplateMail)

router.get('/email/setting', requireSignin, getSettingMail)

module.exports = router
