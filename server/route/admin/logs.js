const express = require('express')
const { upload, requireSignin } = require('../../middleware/index')
const { getLogs } = require('../../controller/admin/logs')

const router = express.Router()

const Logs = require('../../controller/admin/Logs/index')

const LogsFunc = new Logs()
//Get
router.get('/logs', requireSignin, upload.none(), LogsFunc.getLogs)

module.exports = router
