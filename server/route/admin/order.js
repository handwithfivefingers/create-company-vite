const express = require('express')

const { requireSignin } = require('@middleware')

const OrderAdmin = require('@controller/admin/Order')

const router = express.Router()

// Admin Router

const OrderAdminRouter = new OrderAdmin()

router.post('/order/delete/:id', requireSignin, OrderAdminRouter.deleteOrder)

router.post('/order/delete_all', requireSignin, OrderAdminRouter.reforceDelete)

router.get('/order', requireSignin, OrderAdminRouter.getAllOrder)

router.get('/order/:id', requireSignin, OrderAdminRouter.getOrderByID)

module.exports = router
