const { errHandler, successHandler } = require('../../../response')
const { AdminCareerCategoryService } = require('../../../service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()
module.exports = class AdminCategoryController {
  onHandleGet = async (req, res) => {
    try {
      const data = await new AdminCareerCategoryService(req).getCareerCate()
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
  onHandleGetById = async (req, res) => {
    try {
      const data = await new AdminCareerCategoryService(req).getCareerCateById(req, res)
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
  onHandleCreate = async (req, res) => {
    try {
      const data = await new AdminCareerCategoryService(req).createCareerCate(req)
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
  onHandleUpdate = async (req, res) => {
    try {
      const data = await new AdminCareerCategoryService(req).updateCareerCate(req)
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
  onHandleDelete = async (req, res) => {
    try {
      const data = await new AdminCareerCategoryService(req).deleteCareerCate(req)
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

// backup

// "data":
