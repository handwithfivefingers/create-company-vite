const express = require('express')

const AppRouter = express()

const AuthRoute = require('./auth')
const ProductRoute = require('./product')
const CategoryRoute = require('./category')
const CareerRoute = require('./career')
const OrderRoute = require('./order')
const ServiceRoute = require('./service')
const UserRoute = require('./user')
// const SettingRoute = require('./admin/setting')

// Admin Routes
const AdminRoute = require('./admin')

// console.log(AdminRoute)

// Default User
AppRouter.use('/', AuthRoute) // /register
AppRouter.use('/', ProductRoute)
AppRouter.use('/', CategoryRoute)
AppRouter.use('/', CareerRoute)
AppRouter.use('/', OrderRoute)
AppRouter.use('/', ServiceRoute)
AppRouter.use('/', UserRoute)

AppRouter.use('/', AdminRoute.MailRoute)

// Admin
AppRouter.use('/admin', AdminRoute.SettingRoute)
AppRouter.use('/admin', AdminRoute.LogRoute)
AppRouter.use('/admin', AdminRoute.AdminOrderRoute)
AppRouter.use('/admin', AdminRoute.FileRoute)
// AppRouter.use('/admin', TemplateRoute)

module.exports = AppRouter
