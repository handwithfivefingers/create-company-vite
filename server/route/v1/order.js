const express = require('express')
const { upload, requireSignin } = require('@middleware')

const router = express.Router()

const OrderUser = require('@controller/user/Order')
const PaymentService = require('@controller/Service/Payment')

const { getOrdersFromUser, createOrders, orderWithPayment, updateOrder, updateAndPayment } = new OrderUser()

const { getUrlReturn } = new PaymentService()

// USER

//get order
router.get('/order', requireSignin, upload.none(), getOrdersFromUser)

//create order
router.post('/order/create', requireSignin, upload.none(), createOrders)

//create and payment
router.post('/order/payment', requireSignin, upload.none(), orderWithPayment)

// return url -> update db
router.get('/order/payment/url_return', getUrlReturn)

//update
router.post('/order/payment/:_id', requireSignin, upload.none(), updateAndPayment)

//create order
router.post('/order/:_id', requireSignin, upload.none(), updateOrder)

module.exports = router
