const express = require('express')

const { upload, requireSignin } = require('../../middleware/index')

const CareerCategoryClass = require('../../controller/user/careerCategory')

const { fetchCareer, createCareer, fetchSingleCareerCate, updateCareerCate, deleteCareerCate } = new CareerCategoryClass()

const router = express.Router()

router.get('/nganhnghe/category', upload.none(), fetchCareer)

router.post('/nganhnghe/category', upload.none(), createCareer)

router.get('/nganhnghe/category/:id', upload.none(), fetchSingleCareerCate)

router.post('/nganhnghe/category/:id', upload.none(), updateCareerCate)

router.delete('/nganhnghe/category/:id', upload.none(), deleteCareerCate)

module.exports = router
