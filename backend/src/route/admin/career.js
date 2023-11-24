const express = require('express')

const router = express.Router()

const AdminCareerController = require('../../controller/v1/admin/career.controller')

// //Get
router.get('/', new AdminCareerController().onHandleGet)

// //Post
router.post('/', new AdminCareerController().onHandleCreate)

// //Edit
router.post('/:id', new AdminCareerController().onHandleUpdate)

// //Delete
router.delete('/:id', new AdminCareerController().onHandleDelete)

module.exports = router
