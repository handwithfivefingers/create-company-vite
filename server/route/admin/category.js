const express = require('express')
const { upload, requireSignin } = require('@middleware')

const router = express.Router()

const AdminCategoryController = require('@controller/v1/admin/category.controller')

router.get('/category', requireSignin, new AdminCategoryController().onHandleGetCategory)

router.post('/category', requireSignin, new AdminCategoryController().onHandleCreateCategory)

router.post('/category/:_id', requireSignin, new AdminCategoryController().onHandleUpdateCategory)

router.delete('/category/:_id', requireSignin, new AdminCategoryController().onHandleDeleteCategory)

module.exports = router
