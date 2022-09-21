const express = require('express')

const { upload, requireSignin } = require('@middleware')

const router = express.Router()

const Logs = require('@controller/admin/Logs')

const LogsFunc = new Logs()
//Get
router.get('/logs', requireSignin, upload.none(), LogsFunc.getLogs)

module.exports = router
