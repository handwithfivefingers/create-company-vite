const express = require('express')
const { upload, requireSignin } = require('@middleware')
// const { fetchCareer, createCareer, deleteCareer, editCareer } = require('../controller')

const router = express.Router()

const AdminCareerController = require('@controller/v1/admin/career.controller')

// //Get
// router.get('/career', requireSignin, upload.none(), fetchCareer)

// //Post
// router.post('/career', requireSignin, upload.none(), createCareer)

// //Edit
// router.post('/career/:id', requireSignin, upload.none(), editCareer)

// //Delete
// router.delete('/career/:id', requireSignin, upload.none(), deleteCareer)

// //Get
router.get('/career', requireSignin, upload.none(), new AdminCareerController().onHandleGet)

// //Post
router.post('/career', requireSignin, upload.none(), new AdminCareerController().onHandleCreate)

// //Edit
router.post('/career/:id', requireSignin, upload.none(), new AdminCareerController().onHandleUpdate)

// //Delete
router.delete('/career/:id', requireSignin, upload.none(), new AdminCareerController().onHandleDelete)

module.exports = router
