const express = require('express')
const TemplateController = require('../../controller/v1/admin/template.controller')

const router = express.Router()

router.get('/', new TemplateController().onGetTemplate)

router.post('/', new TemplateController().onCreateTemplate)

router.post('/:id', new TemplateController().onUpdateTemplate)

router.delete('/:id', new TemplateController().onDeleteTemplate)

module.exports = router
