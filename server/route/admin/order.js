const express = require('express')

const OrderAdmin = require('@controller/admin/Order')

const router = express.Router()

// Admin Router

const OrderAdminRouter = new OrderAdmin()

router.post('/delete/:id', OrderAdminRouter.deleteOrder)

router.post('/delete_all', OrderAdminRouter.reforceDelete)

router.get('/', OrderAdminRouter.getOrders)

router.get('/:id', OrderAdminRouter.getOrderByID)

module.exports = router
