const express = require('express')
const { upload, requireSignin } = require('@middleware')
// const { fetchCareer, createCareer, deleteCareer, editCareer } = require('../controller')

const router = express.Router()

const CareerAdmin = require('@controller/admin/Career')

const { fetchCareer, createCareer, editCareer, deleteCareer } = new CareerAdmin()
//Get
router.get('/career', requireSignin, upload.none(), fetchCareer)

//Post
router.post('/career', requireSignin, upload.none(), createCareer)

//Edit
router.post('/career/:id', requireSignin, upload.none(), editCareer)

//Delete
router.delete('/career/:id', requireSignin, upload.none(), deleteCareer)

module.exports = router
