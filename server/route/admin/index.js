/**
 * @List Admin Router
 */
const LogRoute = require('./logs')
const AdminOrderRoute = require('./order')
const MailRoute = require('./template')
const FileRoute = require('./file')
const SettingRoute = require('./setting')
const UserRoute = require('./user')
const ProductAdmin = require('./product')
const CategoryAdmin = require('./category')

const { requireSignin } = require('@middleware')

const express = require('express')
const router = express.Router()

router.use('/', SettingRoute, LogRoute, AdminOrderRoute, FileRoute, UserRoute, ProductAdmin, CategoryAdmin)

router.use('/career_cate', require('./careerCate'))

router.use('/career', require('./career'))

router.use('/category', requireSignin, require('./category'))

module.exports = {
  MailRoute,
  router,
}
