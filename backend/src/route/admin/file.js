const express = require('express')
const router = express.Router()
const FileController = require('../../controller/v1/admin/file.controller')
const upload = require('../../middleware/storage')
//Get

router.get('/', new FileController().onGetFiles)

router.post('/', upload.fields([{ name: 'uploadFiles', maxCount: 1 }]), new FileController().onUploadFiles)
router.post('/:_id', upload.fields([{ name: 'uploadFiles', maxCount: 1 }]), new FileController().onEditFiles)
router.delete('/:_id', new FileController().onDeleteFiles)

module.exports = router
