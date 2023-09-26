const express = require('express')
const { upload } = require('@middleware')
const router = express.Router()
const FileController = require('@controller/v1/admin/file.controller')
//Get
router.get('/', upload.none(), new FileController().onReadFile)

module.exports = router
