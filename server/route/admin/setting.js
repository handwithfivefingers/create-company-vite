const express = require('express')

const { upload, requireSignin } = require('../../middleware/index')

const { settingTemplateMail, getSettingMail } = require('../../controller')

const router = express.Router()

router.post('/email/setting', requireSignin, settingTemplateMail)

router.get('/email/setting', requireSignin, getSettingMail)

module.exports = router
