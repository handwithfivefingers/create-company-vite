const express = require('express')
const AppRouter = express()
const v1Router = require('./v1')
const { router: adminRouter } = require('./admin')

// Default User

AppRouter.use('/v1', v1Router)

// Admin

AppRouter.use('/admin', adminRouter)

module.exports = AppRouter
