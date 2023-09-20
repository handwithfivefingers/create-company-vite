const { Log } = require('@model')
module.exports = class LogService {
  createLogs = async ({ url, ip, response, request }) => {
    try {
      const models = new Log({ url, ip, response, request })
      await models.save()
    } catch (error) {
      console.log('Save log error', error)
      throw error
    }
  }
}
