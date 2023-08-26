const express = require('express')
const { upload, requireSignin } = require('@middleware')

const router = express.Router()

const OrderUser = require('@controller/user/Order')
const PaymentService = require('@controller/Service/Payment')

const OrderController = require('@controller/v1/user/order.controller')

const { getOrdersFromUser, createOrders, orderWithPayment, updateOrder, updateAndPayment } = new OrderUser()

const { getUrlReturn } = new PaymentService()

// // USER
// router.post('/payment/url_return', getUrlReturn)

//get order
router.get('/', upload.none(), new OrderController().onHandleGet)

router.get('/:_id', upload.none(), new OrderController().onHandleGetById)

//create order
router.post('/', new OrderController().onHandleCreate)

//Update order
router.post('/:_id', new OrderController().onHandleUpdate)

module.exports = router
