const express = require('express')

const AppRouter = express()

const AuthRoute = require('./v1/auth')
const ProductRoute = require('./v1/product')
const CategoryRoute = require('./v1/category')
const CareerRoute = require('./v1/career')
const CareerCategoryRoute = require('./v1/careerCategory')
const OrderRoute = require('./v1/order')
const ServiceRoute = require('./v1/service')
const UserRoute = require('./v1/user')
const AdminRoute = require('./admin')

const { TrackingApi } = require('@middleware')

const { MailRoute, ...AdminRouter } = AdminRoute
// Default User
AppRouter.use('/', TrackingApi, AuthRoute, ProductRoute, CategoryRoute, CareerRoute, OrderRoute, ServiceRoute, UserRoute, CareerCategoryRoute, MailRoute)

// Admin
AppRouter.use(
  '/admin',
  TrackingApi,
  AdminRouter.SettingRoute,
  AdminRouter.LogRoute,
  AdminRouter.AdminOrderRoute,
  AdminRouter.FileRoute,
  AdminRouter.UserRoute,
  AdminRouter.ProductAdmin,
  AdminRouter.CategoryAdmin,
  AdminRouter.CareerCate,
  AdminRouter.CareerAdmin,
)

module.exports = AppRouter
