const express = require('express')

const ProductAdmin = require('@controller/admin/Product')

const { getProduct, getSingleProduct, createProduct, updateProduct, deleteProduct } = new ProductAdmin()

const router = express.Router()

router.get('/', getProduct)

router.post('/', createProduct)

router.delete('/:_id', deleteProduct)

router.get('/:_id', getSingleProduct)

router.post('/:_id', updateProduct)
module.exports = router
