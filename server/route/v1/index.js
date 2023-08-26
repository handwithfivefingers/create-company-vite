const express = require('express')
const router = express.Router()

// List Router
const AuthRoute = require('./auth')
const ProductRoute = require('./product')
const CategoryRoute = require('./category')
const CareerRoute = require('./career')
const ServiceRoute = require('./service')
const UserRoute = require('./user')
const CareerCategoryRoute = require('./careerCategory')
const AdminRoute = require('../admin')

const { requireSignin } = require('@middleware')

const { MailRoute } = AdminRoute

router.use(
  '/',
  AuthRoute,
  ProductRoute,
  CategoryRoute,
  CareerRoute,
  ServiceRoute,
  UserRoute,
  CareerCategoryRoute,
  MailRoute,
)

router.use('/order/payment', require('./payment'))

router.use('/order', requireSignin, require('./order'))


module.exports = router
