const express = require('express')
const { upload, requireSignin } = require('@middleware')
const { ReadFile } = require('@controller/admin/FileManager')

const router = express.Router()

//Get
router.get('/', upload.none(), ReadFile)

module.exports = router
