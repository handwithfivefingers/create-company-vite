const express = require('express')

const { caching, cachingGroup } = require('@middleware/cache')

const router = express.Router()

const ProductController = require('@controller/v1/user/product.controller')

// const { createProduct, editProduct, fetchProduct, deleteProduct, getProductBySlug } = new ProductClass()

router.get('/', caching('1 day'), cachingGroup, new ProductController().onGetProduct)

router.post('/create', new ProductController().onCreateProduct)

router.get('/:slug', caching('1 day'), cachingGroup, new ProductController().onGetProductBySlug)

module.exports = router
