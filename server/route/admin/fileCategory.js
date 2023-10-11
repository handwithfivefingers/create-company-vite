const express = require('express')
const AdminFileCategoryController = require('../../controller/v1/admin/fileCategory.controller')

const router = express.Router()

router.get('/', new AdminFileCategoryController().onHandleGet)

// router.get('/:id', new AdminFileCategoryController().onHandleGetById)

router.post('/', new AdminFileCategoryController().onHandleCreate)

// router.post('/:id', new AdminFileCategoryController().onHandleUpdate)

// router.delete('/:id', new AdminFileCategoryController().onHandleDelete)

module.exports = router
