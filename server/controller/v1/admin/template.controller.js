const { successHandler, errHandler } = require('@response')
const TemplateService = require('../../../service/v1/admin/template.service')

module.exports = class TemplateController {
  onGetTemplate = async (req, res) => {
    try {
      const data = await new TemplateService().onGetTemplate(req, res)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onCreateTemplate = async (req, res) => {
    try {
      const data = await new TemplateService().onCreateTemplate(req, res)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onUpdateTemplate = async (req, res) => {
    try {
      const data = await new TemplateService().onUpdateTemplate(req, res)

      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onDeleteTemplate = async (req, res) => {
    try {
      const data = await new TemplateService().onDeleteTemplate(req, res)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
}
