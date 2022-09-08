const express = require('express')
const { upload, requireSignin } = require('@middleware')
// const { fetchCareer, createCareer, deleteCareer, editCareer } = require('../controller')

const router = express.Router()

const CareerClass = require('@controller/user/Career')

const { fetchCareer, createCareer, editCareer, deleteCareer } = new CareerClass()
//Get
router.get('/nganhnghe', requireSignin, upload.none(), fetchCareer)

//Post
router.post('/nganhnghe', requireSignin, upload.none(), createCareer)

//Edit
router.post('/nganhnghe/:id', requireSignin, upload.none(), editCareer)

//Delete
router.delete('/nganhnghe/:id', requireSignin, upload.none(), deleteCareer)

module.exports = router
