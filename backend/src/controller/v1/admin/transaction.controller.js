const AdminTransactionService = require('../../../service/v1/admin/transaction.service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()
module.exports = class AdminTransactionController {
  onGetTransactions = async (req, res) => {
    try {
      const data = await new AdminTransactionService(req).getTransaction(req)
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

  onUpdateTransaction = async (req, res) => {
    try {
      const data = await new AdminTransactionService(req).updateTransaction(req)
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
      console.log('onUpdateTransaction function error', error)
      return res.status(400).json({
        error,
      })
    }
  }
}
