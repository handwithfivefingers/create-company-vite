const LogService = require('../../../service/v1/admin/log.service')

module.exports = class LogsController {
  onGetLogs = async (req, res) => {
    try {
      const data = await new LogService(req).getLogs()
      return res.status(200).json({
        data,
      })
    } catch (error) {
      return res.status(400).json({
        error,
      })
    }
  }
}
