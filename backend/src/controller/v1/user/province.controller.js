const ProvinceService = require('../../../service/v1/third-connect/province.service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()
module.exports = class ProvinceController {
  constructor() {}

  onGetProvince = async (req, res) => {
    try {
      const data = await new ProvinceService().getProvince(req, res)
      return res.status(200).json(data)
    } catch (error) {
      console.log('error', error)
      // TelegramBot.onHandleErrorMsg({
      //   remoteAddress: req.remoteAddress,
      //   originalUrl: req.originalUrl,
      //   method: req.method,
      //   data: error,
      // })
    }
  }
}
