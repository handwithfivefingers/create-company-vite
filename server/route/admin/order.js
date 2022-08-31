const express = require('express')

const { upload, requireSignin } = require('../../middleware/index')

// const {
//   getOrderBySlug,
//   getOrders,
//   deleteOrder,
// } = require('../../controller/admin/order')
const OrderAdmin = require('../../controller/admin/Order/index.js')

const router = express.Router()

// Admin Router
// router.get('/order/:id', requireSignin, upload.none(), getOrderBySlug)

// router.post('/order', requireSignin, upload.none(), getOrders)

// router.post('/order/delete/:id', requireSignin, upload.none(), deleteOrder)

const OrderAdminRouter = new OrderAdmin()

router.get('/order/:id', requireSignin, OrderAdminRouter.getOrderByID)

router.get('/order', requireSignin, OrderAdminRouter.getAllOrder)

router.post('/order/delete/:id', requireSignin, OrderAdminRouter.deleteOrder)

module.exports = router
