const express = require('express')
const router = express.Router()
const TestController = require('../../controller/v1/user/test.controller')

router.post('/order-processing', new TestController().testOrderProcessSuccess)


module.exports = router