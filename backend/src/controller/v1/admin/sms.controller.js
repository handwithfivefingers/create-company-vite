const SMSService = require('../../../service/v1/third-connect/sms.service')
const { successHandler, errHandler } = require('../../../response')

module.exports = class SMSController {
  getBalance = async (req, res) => {
    try {
      const data = await new SMSService().getESMSBalance()
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
}
