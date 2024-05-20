const CategoryService = require('../../../service/v1/user/category.service')
const { successHandler, errHandler } = require('../../../response')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()
module.exports = class CategoryController {
  onGetCategory = async (req, res) => {
    try {
      const data = await new CategoryService().getCategories(req, res)
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
  onGetCategoriesBySlug = async (req, res) => {
    try {
      const data = await new CategoryService().getCategoriesBySlug(req, res)
      return res.status(200).json(data)
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
