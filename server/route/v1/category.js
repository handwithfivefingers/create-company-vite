const express = require('express')
const router = express.Router()

const { upload, requireSignin } = require('@middleware')
// const { getCategories, updateCate } = require('../controller')

const CategoryClass = require('@controller/user/Category')
// const CategoryAdmin = require('@controller/admin/Category')

const { getCategories } = new CategoryClass()

// const { createCategory, getCategory, hardDelete, updateCategory, reforceCategoriesData } = new CategoryAdmin()
//Get

router.get('/category', requireSignin, upload.none(), getCategories)

// router.get('/admin/category', getCategory)

// router.post('/admin/category', createCategory)

// router.post('/admin/category/:_id', updateCategory)

// router.delete('/admin/category/:_id', hardDelete)

// router.post('/admin/force', reforceCategoriesData)

module.exports = router
