const path = require('path')
const fs = require('fs')
const carbone = require('carbone')
const shortid = require('shortid')
const { convertString } = require('./helper')
const options = {
  convertTo: 'pdf', //can be docx, txt, ...
}

const generateDocs = async ({ filePath, data, fileName, docId }) => {
  try {
    // const writedPath = path.resolve(default_path, 'uploads', 'template', 'result.pdf')
    console.log('>>>> generateDocs', filePath)
    const pathGet = path.join('./', 'uploads', filePath)

    const pathSave = convertFileName({ ext: 'pdf', fileName, docId })
    console.log('pathSave', pathSave)
    await carbonRendering({ file: pathGet, data: data, options, fileSave: pathSave })

    console.log('convert done')
  } catch (error) {
    console.log('generate error', error.toString())
  }
}

const carbonRendering = async ({ file, data, options, fileSave }) => {
  try {
    const result = await new Promise((resolve, reject) => {
      try {
        carbone.render(file, data, options, (error, result) => {
          if (error) {
            // console.log('file Error', file)
            // console.log('carbone Error', error.toString())
            reject(error)
          }
          fs.writeFile(path.join('./', fileSave), result, resolve)
        })
      } catch (error) {
        throw error
      }
    })
    return result
  } catch (error) {
    console.log('carbonRendering error', error)
    throw error
  }
}

const convertFileName = ({ ext, fileName, docId }) => {
  let nameTrim = fileName.replace(/\s/g, '')
  let name = convertString(nameTrim)
  if (!fs.existsSync(path.join('./', '/uploads', `${docId}`))) {
    fs.mkdirSync(path.join('./', '/uploads', `${docId}`))
  }
  let filePath = path.join('./', '/uploads', `${docId}`, `${shortid.generate()}-${name}.${ext}`)
  return filePath
}

module.exports = {
  generateDocs,
}
