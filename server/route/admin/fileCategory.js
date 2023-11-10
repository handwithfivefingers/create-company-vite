const express = require('express')
const AdminFileCategoryController = require('../../controller/v1/admin/fileCategory.controller')

const router = express.Router()

router.get('/', new AdminFileCategoryController().onHandleGet)
router.post('/', new AdminFileCategoryController().onHandleCreate)


module.exports = router
