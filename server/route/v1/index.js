const express = require('express')
const router = express.Router()

// List Router
const AuthRoute = require('./auth')
const ProductRoute = require('./product')
const CategoryRoute = require('./category')
const CareerRoute = require('./career')
const OrderRoute = require('./order')
const ServiceRoute = require('./service')
const UserRoute = require('./user')
const CareerCategoryRoute = require('./careerCategory')

const AdminRoute = require('../admin')
const { MailRoute } = AdminRoute

router.use(
  '/',
  AuthRoute,
  ProductRoute,
  CategoryRoute,
  CareerRoute,
  OrderRoute,
  ServiceRoute,
  UserRoute,
  CareerCategoryRoute,
  MailRoute,
)

module.exports = router
