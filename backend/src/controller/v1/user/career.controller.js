const CareerService = require('../../../service/v1/user/career.service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()
module.exports = class CareerController {
  constructor() {}
  onHandleGetCareer = async (req, res) => {
    try {
      const data = await new CareerService().onGetCareer(req)

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
}
