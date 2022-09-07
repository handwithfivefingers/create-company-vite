const express = require('express')

const AppRouter = express()

const AuthRoute = require('./v1/auth')
const ProductRoute = require('./v1/product')
const CategoryRoute = require('./v1/category')
const CareerRoute = require('./v1/career')
const CareerCategoryRoute = require('./v1/careerCategory')
const OrderRoute = require('./v1/order')
// const ServiceRoute = require('./v1/service')
const UserRoute = require('./v1/user')

const AdminRoute = require('./admin')

// Default User
AppRouter.use(
  '/',
  AuthRoute,
  ProductRoute,
  CategoryRoute,
  CareerRoute,
  OrderRoute,
  // ServiceRoute,

  UserRoute,
  CareerCategoryRoute,
  AdminRoute.MailRoute,
)

// Admin
AppRouter.use('/admin', AdminRoute.SettingRoute, AdminRoute.LogRoute, AdminRoute.AdminOrderRoute, AdminRoute.FileRoute, AdminRoute.UserRoute)

module.exports = AppRouter
