const express = require('express')
const router = express.Router()

const SettingController = require('../../controller/v1/admin/setting.controller')

router.get('/', new SettingController().onGetSetting)

router.post('/', new SettingController().onUpdateSetting)

module.exports = router
