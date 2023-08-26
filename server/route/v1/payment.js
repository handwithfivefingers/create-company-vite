const express = require('express')

const router = express.Router()

const PaymentService = require('@controller/Service/Payment')

const { getUrlReturn } = new PaymentService()


router.get('/url_return', getUrlReturn)

module.exports = router
