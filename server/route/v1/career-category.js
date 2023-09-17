const express = require('express')

const { upload, requireSignin } = require('@middleware')
const CareerCategoryService = require('@controller/v1/user/career-category.controller');

const router = express.Router()

router.get('/', new CareerCategoryService().onHandleGetCareerCategory)

router.get('/:id', new CareerCategoryService().onHandleGetSingleCareerCategory)

module.exports = router
