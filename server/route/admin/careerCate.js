const express = require('express')

const { upload } = require('@middleware')

const AdminCategoryController = require('@controller/v1/admin/careerCategory.controller')

const router = express.Router()

router.get('/', upload.none(), new AdminCategoryController().onHandleGet)

router.get('/:id', upload.none(), new AdminCategoryController().onHandleGetById)

router.post('/', upload.none(), new AdminCategoryController().onHandleCreate)

router.post('/:id', upload.none(), new AdminCategoryController().onHandleUpdate)

router.delete('/:id', upload.none(), new AdminCategoryController().onHandleDelete)

module.exports = router
