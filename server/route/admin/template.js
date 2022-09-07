const express = require('express')

const { upload, requireSignin } = require('@middleware')

// const { fetchTemplate, editTemplate, createTemplate, deleteTemplate } = require('@controller/admin')
const TemplateAdmin = require('@controller/admin/Template')

const TemplateMail = new TemplateAdmin()

const router = express.Router()

router.get('/admin/template', requireSignin, upload.none(), TemplateMail.fetchTemplate)

router.post('/admin/template', requireSignin, upload.none(), TemplateMail.createTemplate)

router.post('/admin/template/edit/:id', requireSignin, upload.none(), TemplateMail.editTemplate)

router.post('/admin/template/delete/:id', requireSignin, upload.none(), TemplateMail.deleteTemplate)

module.exports = router
