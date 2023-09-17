const express = require('express')
const router = express.Router()
// const CategoryClass = require('@controller/user/Category')
// const { getCategories, getCategoriesBySlug } = new CategoryClass()
const CategoryController = require('@controller/v1/user/category.controller')
router.get('/', new CategoryController().onGetCategory)

router.get('/:slug', new CategoryController().onGetCategoriesBySlug)

module.exports = router
