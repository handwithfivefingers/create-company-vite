const express = require('express')

const router = express.Router()

const PaymentController = require('@controller/v1/user/payment.controller')

router.get('/url_return', new PaymentController().getURLReturn)

router.get('/', new PaymentController().getTransaction)

router.post('/', new PaymentController().createTransaction)

module.exports = router
