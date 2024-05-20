const PuppeteerService = require('../../../service/v1/third-connect/puppeteer')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()
module.exports = class PuppeteerController {
  constructor() {}

  onSearch = async (req, res) => {
    try {
      const data = await new PuppeteerService().search(req, res)
      return res.status(200).json(data)
    } catch (error) {
      console.log('Puppeteer Search error', error)
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
