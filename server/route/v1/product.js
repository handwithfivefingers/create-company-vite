const express = require('express')
const { upload, requireSignin } = require('@middleware')

const router = express.Router()

const ProductClass = require('@controller/user/Product')

const { createProduct, editProduct, fetchProduct, deleteProduct, getProductBySlug, demoPuppeteer } = new ProductClass()
// Create
router.post('/product/create', requireSignin, upload.none(), createProduct)

//Edit
router.post('/product/edit/:id', requireSignin, upload.none(), editProduct)

//Get
router.get('/product', requireSignin, upload.none(), fetchProduct)

// Delete
router.delete('/product/:id', requireSignin, upload.none(), deleteProduct)

// get by slug
router.get('/product/:slug', requireSignin, upload.none(), getProductBySlug)

router.post('/product/company-search', upload.none(), demoPuppeteer)

module.exports = router
