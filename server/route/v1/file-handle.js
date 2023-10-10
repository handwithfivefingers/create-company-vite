const express = require('express')
const FileHandleController = require('../../controller/v1/user/file-handle.controller')
const router = express.Router()
const upload = require('@middleware/storage')

router.post('/', upload.fields([{ name: 'uploadFiles', maxCount: 5 }]), new FileHandleController().onUploadFiles)
module.exports = router
