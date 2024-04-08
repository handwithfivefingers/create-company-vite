const path = require('path')
const fs = require('fs')
module.exports = class FileService {
  /**
   * @param { string } dirPath : String path without includes base directory
   * @param { string } currentDir : default is pwd
   * @description Will split dirPath by "/" and create folder with current dir + each of path after split
   * @example
   * dirPath = "/path/to/folder"
   * currentDir = "/app"
   * "folder will create sequence" /app/path -> /app/path/to -> /app/path/to/folder
   *
   */
  createFolder = async ({ dir, currentDir = global.__basedir }) => {
    const pathSplit = dir.split('/')
    let saveDir = currentDir
    for (let singleDir of pathSplit) {
      saveDir += '/' + singleDir
      if (!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir)
      }
    }
  }
  createSingleFolder = async ({ dir, currentDir = global.__basedir }) => {
    const targetFolder = path.join(currentDir, dir)
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder)
    }
  }

  getListFolder = async ({ dir, currentDir = global.__basedir }) => {
    try {
      if (!dir) throw new Error('No directory specified')
      const targetFolder = path.join(currentDir, dir)
      if (!fs.existsSync(targetFolder)) {
        return []
      }
      let listFolder = fs.readdirSync(targetFolder)
      return listFolder
    } catch (error) {
      throw error
    }
  }
  getListFiles = ({ dir, files_ }) => {
    console.log('dir', dir)
    files_ = files_ || []
    let files = fs.readdirSync(dir)
    for (let i in files) {
      let name = dir + '/' + files[i]
      if (fs.statSync(name).isDirectory()) {
        this.getListFiles({ dir: name, files_ })
      } else {
        files_.push(name)
      }
    }
    return files_
  }
  saveFile = async ({ filePath, buff, option = {} }) => {
    try {
      fs.writeFileSync(filePath, buff, option)
      return true
    } catch (error) {
      console.log('Save File error', error)
      return false
    }
  }
}
