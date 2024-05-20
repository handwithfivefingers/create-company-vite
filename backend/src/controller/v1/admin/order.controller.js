const { successHandler, errHandler, deletedHandler } = require('../../../response')
const OrderService = require('../../../service/v1/admin/order.service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()

module.exports = class OrderAdmin {
  PAGE_SIZE = 10

  constructor() {}

  getOrderByID = async (req, res) => {
    try {
      const data = await new OrderService(req).getOrderByID(req)
      return successHandler(data, res)
    } catch (err) {
      console.log('getOrderBySlug error')
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: err,
      })
      return errHandler(err, res)
    }
  }

  getOrders = async (req, res) => {
    try {
      const data = await new OrderService(req).getOrder(req)
      return successHandler(data, res)
    } catch (err) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: err,
      })
      return errHandler(err, res)
    }
  }

  deleteOrder = async (req, res) => {
    try {
      const data = await new OrderService(req).deleteOrder(req)
      return deletedHandler(data, res)
    } catch (err) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: err,
      })
      console.log('deleteOrder error')
      return errHandler(err, res)
    }
  }
  convertOrderToFilesManual = async (req, res, next) => {
    try {
      const data = await new OrderService(req).convertFileManual(req)
      return successHandler(data, res)
    } catch (error) {
      // return errHandler(error, res)
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })
      next(error)
    }
  }

  getFilesPreviewer = async (req, res) => {
    try {
      let { id } = req.params
      const data = await new OrderService(req).onFilesPreviews({ id })
      return successHandler(data, res)
    } catch (err) {
      console.log('getOrderBySlug error')
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
