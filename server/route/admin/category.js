const express = require('express')

const router = express.Router()

const AdminCategoryController = require('@controller/v1/admin/category.controller')

router.get('/', new AdminCategoryController().onHandleGetCategory)

router.post('/', new AdminCategoryController().onHandleCreateCategory)

router.post('/:_id', new AdminCategoryController().onHandleUpdateCategory)

router.delete('/:_id', new AdminCategoryController().onHandleDeleteCategory)

module.exports = router
