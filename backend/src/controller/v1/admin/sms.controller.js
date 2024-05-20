const SMSService = require('../../../service/v1/third-connect/sms.service')
const { successHandler, errHandler } = require('../../../response')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()

module.exports = class SMSController {
  getBalance = async (req, res) => {
    try {
      const data = await new SMSService().getESMSBalance()
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
