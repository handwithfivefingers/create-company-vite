const { successHandler, errHandler } = require('../../../response')
const FileHandleService = require('../../../service/v1/user/file-handle.service')

module.exports = class FileHandleController {
  onUploadFiles = async (req, res) => {
    try {
      const data = await new FileHandleService().onUploadFiles(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
}
