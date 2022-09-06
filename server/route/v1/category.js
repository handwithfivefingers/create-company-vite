const express = require('express')
const { upload, requireSignin } = require('@server/middleware/index')
// const { getCategories, updateCate } = require('../controller')

const router = express.Router()
const CategoryClass = require('@server/controller/user/Category')

const { getCategories, updateCate } = new CategoryClass()
//Get
router.get('/admin/category', requireSignin, upload.none(), getCategories)

router.get('/category', requireSignin, upload.none(), getCategories)

router.post('/admin/category/update/:id', requireSignin, upload.none(), updateCate)

module.exports = router
