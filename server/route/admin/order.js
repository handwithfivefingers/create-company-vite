const express = require('express')
const router = express.Router()
const OrderAdmin = require('@controller/v1/admin/order.controller')

// Admin Router

router.get('/', new OrderAdmin().getOrders)

router.get('/:id', new OrderAdmin().getOrderByID)

router.delete('/:id', new OrderAdmin().deleteOrder)

module.exports = router
