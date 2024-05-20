const { successHandler, errHandler } = require('../../../response')
const ProductService = require('../../../service/v1/admin/product.service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()
module.exports = class ProductAdmin {
  getProduct = async (req, res) => {
    try {
      const data = await new ProductService(req).getProduct()
      return successHandler(data, res)
    } catch (error) {
      console.log(error)
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })
      return errHandler(error, res)
    }
  }

  createProduct = async (req, res) => {
    try {
      const data = await new ProductService(req).createProduct(req)

      return successHandler(data, res)
    } catch (err) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: err,
      })
      console.log('createProduct error', err)
      return errHandler(err, res)
    }
  }

  updateProduct = async (req, res) => {
    try {
      const data = await new ProductService(req).updateProduct(req)
      return res.status(200).json({
        data,
      })
    } catch (error) {
      console.log(error)
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })
      return errHandler(error, res)
    }
  }

  deleteProduct = async (req, res) => {
    try {
      await new ProductService(req).deleteProduct(req)

      return res.status(200).json({ message: 'Xóa sản phẩm thành công', status: 200 })
    } catch (err) {
      console.log('deleteProduct error')
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: err,
      })
      return errHandler(err, res)
    }
  }
}
