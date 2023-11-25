const express = require('express')

const CareerCategoryService = require('../../controller/v1/user/career-category.controller')

const router = express.Router()

router.get('/', new CareerCategoryService().onHandleGetCareerCategory)

router.get('/:id', new CareerCategoryService().onHandleGetSingleCareerCategory)

router.post('/', new CareerCategoryService().onHandleGetListCareerCategory)

module.exports = router
