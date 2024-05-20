const { successHandler, errHandler } = require('../../../response')
const TemplateService = require('../../../service/v1/admin/template.service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()


module.exports = class TemplateController {
  onGetTemplate = async (req, res) => {
    try {
      const data = await new TemplateService(req).onGetTemplate(req, res)
      return successHandler(data, res)
    } catch (error) {
      console.log('error', error)
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })

      return errHandler(error, res)
    }
  }
  onCreateTemplate = async (req, res) => {
    try {
      const data = await new TemplateService(req).onCreateTemplate(req, res)
      return successHandler(data, res)
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })
      return errHandler(error, res)
    }
  }
  onUpdateTemplate = async (req, res) => {
    try {
      const data = await new TemplateService(req).onUpdateTemplate(req, res)

      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onDeleteTemplate = async (req, res) => {
    try {
      const data = await new TemplateService(req).onDeleteTemplate(req, res)
      return successHandler(data, res)
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })
      return errHandler(error, res)
    }
  }
}
