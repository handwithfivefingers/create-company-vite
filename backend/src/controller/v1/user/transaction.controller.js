const { successHandler, errHandler } = require('../../../response')
const TransactionService = require('../../../service/v1/user/transaction.service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()
module.exports = class TransactionController {
  getTransaction = async (req, res) => {
    try {
      const data = await new TransactionService().getTransaction(req)
      return successHandler(data, res)
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        method: req.method,
        data: error,
      })
      return res.status(400).json({ error })
    }
  }
}
