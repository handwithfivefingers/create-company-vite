const express = require('express')
const { upload, requireSignin } = require('@middleware')
// const { fetchCareer, createCareer, deleteCareer, editCareer } = require('../controller')

const router = express.Router()

const AdminCareerController = require('@controller/v1/admin/career.controller')

// //Get
router.get('/', requireSignin, upload.none(), new AdminCareerController().onHandleGet)

// //Post
router.post('/', requireSignin, upload.none(), new AdminCareerController().onHandleCreate)

// //Edit
router.post('/:id', requireSignin, upload.none(), new AdminCareerController().onHandleUpdate)

// //Delete
router.delete('/:id', requireSignin, upload.none(), new AdminCareerController().onHandleDelete)

module.exports = router
