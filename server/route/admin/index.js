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
const CareerCate = require('./careerCate')
const CareerAdmin = require('./career')

const express = require('express')
const router = express.Router()

router.use(
  '/',
  SettingRoute,
  LogRoute,
  AdminOrderRoute,
  FileRoute,
  UserRoute,
  ProductAdmin,
  CategoryAdmin,
  CareerCate,
  CareerAdmin,
)

module.exports = {
  MailRoute,
  router,
}
