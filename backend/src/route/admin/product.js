const express = require('express')
const router = express.Router()

const AdminProductController = require('../../controller/v1/admin/product.controller')

router.get('/', new AdminProductController().getProduct)

router.post('/', new AdminProductController().createProduct)

router.post('/:_id', new AdminProductController().updateProduct)

router.delete('/:_id', new AdminProductController().deleteProduct)

module.exports = router
