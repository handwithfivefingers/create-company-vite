const express = require('express')

const { upload, requireSignin } = require('@middleware')

const router = express.Router()

const ProductClass = require('@controller/user/Product')

const { createProduct, editProduct, fetchProduct, deleteProduct, getProductBySlug } = new ProductClass()

router.post('/product/create', requireSignin, upload.none(), createProduct)

router.get('/product', requireSignin, upload.none(), fetchProduct)

router.get('/product/:slug', requireSignin, upload.none(), getProductBySlug)

module.exports = router
