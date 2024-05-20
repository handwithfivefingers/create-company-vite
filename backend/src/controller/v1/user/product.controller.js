const { errHandler, successHandler } = require('../../../response')
const ProductService = require('../../../service/v1/user/product.service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()
module.exports = class ProductController {
  onGetProduct = async (req, res) => {
    try {
      const data = await new ProductService().getProduct(req, res)
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
  onUpdateProduct = async (req, res) => {
    try {
      const data = await new ProductService().editProduct(req, res)
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
  onCreateProduct = async (req, res) => {
    try {
      const data = await new ProductService().createProduct(req, res)
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
  onDeleteProduct = async (req, res) => {
    try {
      const data = await new ProductService().deleteProduct(req, res)
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
  onGetProductBySlug = async (req, res) => {
    try {
      const data = await new ProductService().getProductBySlug(req, res)
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
