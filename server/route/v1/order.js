const express = require('express')
const router = express.Router()
const OrderController = require('@controller/v1/user/order.controller')

//get order
router.get('/', new OrderController().onHandleGet)

router.get('/:_id', new OrderController().onHandleGetById)

//create order
router.post('/', new OrderController().onHandleCreate)

//Update order
router.post('/:_id', new OrderController().onHandleUpdate)

router.delete('/:_id', new OrderController().onHandleDelete)

module.exports = router
