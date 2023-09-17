const express = require('express')
const router = express.Router()
const { requireSignin } = require('@middleware')
const AdminRoute = require('../admin')
const { MailRoute } = AdminRoute

router.use('/', require('./auth'))
router.use('/product', requireSignin, require('./product'))
router.use('/category', requireSignin, require('./category'))
router.use('/career', requireSignin, require('./career'))
router.use('/user', requireSignin, require('./user'))
router.use('/career_cate', requireSignin, require('./career-category'))
router.use('/order/payment', require('./payment'))
router.use('/order', requireSignin, require('./order'))
router.use('/', require('./service'))
router.use('/test', require('./test'))

router.use('/', MailRoute)

module.exports = router
