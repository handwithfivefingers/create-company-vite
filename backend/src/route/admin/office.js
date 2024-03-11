const express = require('express')
const OfficeAdmin = require('../../controller/v1/admin/office.controller')
const router = express.Router()
router.get('/files', new OfficeAdmin().getOfficeFiles)

module.exports = router
