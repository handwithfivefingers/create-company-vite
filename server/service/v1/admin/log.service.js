const BaseAdminService = require('@common/baseService')
const { Log } = require('@model')
module.exports = class LogService extends BaseAdminService {
  getLogs = async (req) => {
    try {
      const logs = await Log.find()
      return logs
    } catch (error) {
      throw error
    }
  }
}
