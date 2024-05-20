const { errHandler, successHandler } = require('../../../response')
const { AdminCategoryService } = require('../../../service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()

module.exports = class AdminCategoryController {
  onHandleGetCategory = async (req, res) => {
    try {
      const data = await new AdminCategoryService(req).getCategory()
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
  onHandleCreateCategory = async (req, res) => {
    try {
      const data = await new AdminCategoryService(req).createCategory(req)
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
  onHandleUpdateCategory = async (req, res) => {
    try {
      const data = await new AdminCategoryService(req).updateCategory(req)
      return successHandler(data, res)
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: err,
      })
      return errHandler(error, res)
    }
  }
  onHandleDeleteCategory = async (req, res) => {
    try {
      const data = await new AdminCategoryService(req).hardDelete(req)
      return successHandler(data, res)
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: err,
      })
      return errHandler(error, res)
    }
  }
}
