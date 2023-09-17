const express = require('express')

const AdminCategoryController = require('@controller/v1/admin/careerCategory.controller')

const router = express.Router()

router.get('/', new AdminCategoryController().onHandleGet)

router.get('/:id', new AdminCategoryController().onHandleGetById)

router.post('/', new AdminCategoryController().onHandleCreate)

router.post('/:id', new AdminCategoryController().onHandleUpdate)

router.delete('/:id', new AdminCategoryController().onHandleDelete)

module.exports = router
