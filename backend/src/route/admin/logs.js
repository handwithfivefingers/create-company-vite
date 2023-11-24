const express = require('express')
const router = express.Router()
const LogController = require('../../controller/v1/admin/log.controller')
//Get
router.get('/', new LogController().onGetLogs)

module.exports = router
