const express = require('express')
const { upload, requireSignin } = require('@middleware')

const router = express.Router()

const OrderUser = require('@controller/user/Order')
const PaymentService = require('@controller/Service/Payment')

const { getOrdersFromUser, createOrders, orderWithPayment, updateOrder } = new OrderUser()

const { getUrlReturn } = new PaymentService()

// USER

//get order
router.get('/order', requireSignin, upload.none(), getOrdersFromUser)

//create order
router.post('/order/create', requireSignin, upload.none(), createOrders)

//create order
router.post('/order/:_id', requireSignin, upload.none(), updateOrder)

//create and payment

router.post('/order/create/payment', requireSignin, upload.none(), orderWithPayment)

// return url -> update db
router.get('/order/payment/url_return', getUrlReturn)

module.exports = router
