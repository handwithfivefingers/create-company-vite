const express = require('express')
const router = express.Router()
const Logs = require('@controller/admin/Logs')

const LogsFunc = new Logs()
//Get
router.get('/', LogsFunc.getLogs)

module.exports = router
