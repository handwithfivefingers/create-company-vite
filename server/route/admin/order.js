const express = require('express')

const {  requireSignin } = require('../../middleware/index')

const OrderAdmin = require('../../controller/admin/Order/index')

const router = express.Router()

// Admin Router

const OrderAdminRouter = new OrderAdmin()

router.get('/order/:id', requireSignin, OrderAdminRouter.getOrderByID)

router.get('/order', requireSignin, OrderAdminRouter.getAllOrder)

router.post('/order/delete/:id', requireSignin, OrderAdminRouter.deleteOrder)

module.exports = router
