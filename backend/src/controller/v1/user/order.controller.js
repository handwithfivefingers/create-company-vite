const { OrderService } = require('../../../service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()
module.exports = class OrderController {
  constructor() {}

  onHandleGet = async (req, res) => {
    try {
      const data = await new OrderService().getOrder(req, res)
      return res.status(200).json(data)
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })
      return res.status(400).json({
        error,
      })
    }
  }

  onHandleGetById = async (req, res) => {
    try {
      const data = await new OrderService().getOrderById(req)
      return res.status(200).json(data)
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })
      return res.status(400).json({
        ...error,
      })
    }
  }
  onHandleUpdate = async (req, res) => {
    try {
      const data = await new OrderService().updateOrder(req)

      return res.status(200).json({
        data,
      })
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })
      return res.status(400).json({
        error,
      })
    }
  }

  onHandleCreate = async (req, res) => {
    try {
      const data = await new OrderService().createOrder(req)
      return res.status(200).json({
        data,
      })
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })
      console.log('error', error)
      return res.status(400).json({
        error,
      })
    }
  }

  onHandleDelete = async (req, res) => {
    try {
      await new OrderService().deleteOrder(req)

      return res.status(200).json({
        message: 'Xóa thành công',
      })
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })
      return res.status(400).json({
        error,
      })
    }
  }
}
