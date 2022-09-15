const express = require('express')
const { upload, requireSignin } = require('@middleware')

const router = express.Router()

const CategoryAdmin = require('@controller/admin/Category')

const { createCategory, getCategory, hardDelete, updateCategory, reforceCategoriesData } = new CategoryAdmin()

router.get('/category', requireSignin, getCategory)

router.post('/category', requireSignin, createCategory)

router.post('/category/:_id', requireSignin, updateCategory)

router.delete('/category/:_id', requireSignin, hardDelete)

router.post('/force', requireSignin, reforceCategoriesData)

module.exports = router
