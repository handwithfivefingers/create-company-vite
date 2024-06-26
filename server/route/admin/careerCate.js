const express = require('express')

const { upload, requireSignin } = require('@middleware')

const CareerCategoryAdmin = require('@controller/admin/CareerCategory')

const { fetchCareer, createCareer, fetchSingleCareerCate, updateCareerCate, deleteCareerCate } = new CareerCategoryAdmin()

const router = express.Router()

router.get('/career_cate', upload.none(), fetchCareer)

router.get('/career_cate/:id', upload.none(), fetchSingleCareerCate)

router.post('/career_cate/:id', upload.none(), updateCareerCate)

router.post('/career_cate', upload.none(), createCareer)

router.delete('/career_cate/:id', upload.none(), deleteCareerCate)

module.exports = router
