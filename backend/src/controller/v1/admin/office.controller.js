const { successHandler, errHandler, deletedHandler } = require('../../../response')
const OfficeAdminService = require('../../../service/v1/admin/office.service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()


module.exports = class OfficeAdmin {
  getOfficeFiles = async (req, res) => {
    try {
      const data = await new OfficeAdminService(req).getOfficeFiles(req)
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

  getBrowserToken = async (req, res) => {
    try {
      const data = await new OfficeAdminService(req).getBrowserToken(req)
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
