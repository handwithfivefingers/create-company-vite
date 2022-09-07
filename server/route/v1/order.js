const express = require('express')
const { upload, requireSignin } = require('@middleware')

const router = express.Router()

const OrderUser = require('@controller/user/Order')

const { getOrdersFromUser, createOrders, orderWithPayment, getUrlReturn } = new OrderUser()

// USER

//get order
router.get('/order', requireSignin, upload.none(), getOrdersFromUser)

//create order
router.post('/order/create', requireSignin, upload.none(), createOrders)

//create and payment

router.post('/order/create/payment', requireSignin, upload.none(), orderWithPayment)

// return url -> update db
router.get('/order/payment/url_return', getUrlReturn)

module.exports = router
