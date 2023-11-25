const express = require('express')
const router = express.Router()
const OrderAdmin = require('../../controller/v1/admin/order.controller')

// Admin Router

router.get('/', new OrderAdmin().getOrders)

router.get('/preview/:id', new OrderAdmin().getFilesPreviewer)

router.get('/:id', new OrderAdmin().getOrderByID)

router.post('/:id', new OrderAdmin().convertOrderToFilesManual)

router.delete('/:id', new OrderAdmin().deleteOrder)

module.exports = router
