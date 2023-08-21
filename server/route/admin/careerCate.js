const express = require('express')

const { upload, requireSignin } = require('@middleware')

const AdminCategoryController = require('@controller/v1/admin/careerCategory.controller')

// const { fetchCareer, createCareer, fetchSingleCareerCate, updateCareerCate, deleteCareerCate } = new CareerCategoryAdmin()

const router = express.Router()

// router.get('/career_cate', upload.none(), fetchCareer)

// router.get('/career_cate/:id', upload.none(), fetchSingleCareerCate)

// router.post('/career_cate/:id', upload.none(), updateCareerCate)

// router.post('/career_cate', upload.none(), createCareer)

// router.delete('/career_cate/:id', upload.none(), deleteCareerCate)
router.get('/career_cate', upload.none(), new AdminCategoryController().onHandleGet)

router.get('/career_cate/:id', upload.none(), new AdminCategoryController().onHandleGetById)

router.post('/career_cate/:id', upload.none(), new AdminCategoryController().onHandleUpdate)

router.post('/career_cate', upload.none(), new AdminCategoryController().onHandleCreate)

router.delete('/career_cate/:id', upload.none(), new AdminCategoryController().onHandleDelete)

module.exports = router
