const path = require('path')
const fs = require('fs')
const carbone = require('carbone')

const options = {
  convertTo: 'pdf', //can be docx, txt, ...
}

const generateDocs = async ({ filePath }) => {
  try {
    // const writedPath = path.resolve(default_path, 'uploads', 'template', 'result.pdf')
    console.log('>>>> generateDocs', filePath)
    const data = {
      name: 'Truyen Mai',
      birthday: '07/10/2023',
      gender: 'Nam',
    }
    const pathGet = path.join('./', 'uploads', 'files', 'change_info', '2tv', 'change_info_File_Phuluc_I_6.odt')
    const pathSave = path.join('./', 'uploads', 'template', 'result.pdf')
    await carbonRendering({ file: pathGet, data, options, fileSave: pathSave })
    console.log('convert done')
  } catch (error) {
    console.log('generate error', error)
  }
}
const carbonRendering = async ({ file, data, options, fileSave }) => {
  return new Promise((resolve, reject) => {
    carbone.render(file, data, options, (error, result) => {
      if (error) reject(error)
      fs.writeFile(fileSave, result, () => {
        // process.exit()
        resolve()
      })
    })
  })
}

module.exports = {
  generateDocs,
}
