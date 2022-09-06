const express = require('express')
const { upload, requireSignin } = require('@server/middleware/index')
// const { fetchCareer, createCareer, deleteCareer, editCareer } = require('../controller')

const router = express.Router()

const CareerClass = require('@server/controller/user/Career')

const { fetchCareer, createCareer, editCareer, deleteCareer } = new CareerClass()
//Get
router.get('/nganhnghe', requireSignin, upload.none(), fetchCareer)

//Post
router.post('/nganhnghe', requireSignin, upload.none(), createCareer)

//Edit
router.post('/nganhnghe/edit/:id', requireSignin, upload.none(), editCareer)

//Delete
router.post('/nganhnghe/delete/:id', requireSignin, upload.none(), deleteCareer)

module.exports = router
