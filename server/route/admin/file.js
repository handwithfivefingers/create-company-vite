const express = require('express')
const { upload, requireSignin } = require('../../middleware/index')
const { ReadFile } = require('../../controller/admin/FileManager')

const router = express.Router()

//Get
router.get('/file', upload.none(), ReadFile)

module.exports = router
