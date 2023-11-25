const express = require('express')
const SMSController = require('../../controller/v1/admin/sms.controller')
const router = express.Router()

router.get('/balance', new SMSController().getBalance)


module.exports = router