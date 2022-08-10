const fs = require('fs')
const path = require('path')

const ReadFile = async (req, res) => {

  let folderName = path.resolve(path.join(global.__basedir, 'uploads'))
  
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
    res.status(200).json({
      message: 'created folder',
    })
  } else {
    let folder = fs.readdirSync(folderName)
    res.status(200).json({
      data: folder,
    })
  }
  res.end()
}

module.exports = {
  ReadFile,
}
