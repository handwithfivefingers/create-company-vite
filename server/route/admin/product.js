const express = require('express')

const { upload, requireSignin } = require('@middleware')

const SettingClass = require('@controller/user/Setting')
const ProductAdmin = require('@controller/admin/Product')

const { getProduct, getSingleProduct, createProduct, updateProduct, deleteProduct } = new ProductAdmin()

const router = express.Router()

router.get('/product', requireSignin, getProduct)

router.get('/product/:_id', requireSignin, getSingleProduct)

router.post('/product/:_id', requireSignin, updateProduct)

router.post('/product', requireSignin, createProduct)

router.delete('/product/:_id', requireSignin, deleteProduct)

module.exports = router
