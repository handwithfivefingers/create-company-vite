const { errHandler, successHandler } = require('../../../response')
const { AdminCareerService } = require('../../../service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TelegramBot = new BotService()
module.exports = class AdminCareerController {
  onHandleGet = async (req, res) => {
    try {
      const data = await new AdminCareerService(req).getCareer()
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

  onHandleCreate = async (req, res) => {
    try {
      const data = await new AdminCareerService(req).createCareer(req)
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
  onHandleUpdate = async (req, res) => {
    try {
      const data = await new AdminCareerService(req).updateCareer(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onHandleDelete = async (req, res) => {
    try {
      const data = await new AdminCareerService(req).deleteCareer(req)
      return successHandler(data, res)
    } catch (error) {
      TelegramBot.onHandleErrorMsg({
        remoteAddress: req.remoteAddress,
        originalUrl: req.originalUrl,
        data: error,
        method: req.method,

      })
      return errHandler(error, res)
    }
  }
}

// backup

// "data":
