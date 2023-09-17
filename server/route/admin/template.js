const express = require('express')

const { upload, requireSignin } = require('@middleware')
const TemplateController = require('@controller/v1/admin/template.controller')

const router = express.Router()

router.get('/admin/template', new TemplateController().onGetTemplate)

router.post('/admin/template', new TemplateController().onCreateTemplate)

router.post('/admin/template/edit/:id', new TemplateController().onUpdateTemplate)

router.post('/admin/template/delete/:id', new TemplateController().onDeleteTemplate)

module.exports = router
