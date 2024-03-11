const BaseAdminService = require('../../../common/baseService')
const fs = require('fs')
const path = require('path')
module.exports = class OfficeAdminService extends BaseAdminService {
  constructor(req) {
    super(req)
  }
  getOfficeFiles = async (req) => {
    try {
      const officeFiles = path.join(global.__basedir, 'uploads', 'files')
      const list = this.getFiles(officeFiles)
      return list
    } catch (error) {
      throw error
    }
  }
  getFiles = (dir, files_) => {
    files_ = files_ || []
    var files = fs.readdirSync(dir)
    for (var i in files) {
      var name = dir + '/' + files[i]
      if (fs.statSync(name).isDirectory()) {
        this.getFiles(name, files_)
      } else {
        files_.push(name)
      }
    }
    return files_
  }

  getFilesSaved = async (req) => {
    try {
        
    } catch (error) {
      
    }
  }
}
