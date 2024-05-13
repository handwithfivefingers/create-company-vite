const { generateDocs } = require('../../../common/odt.template')
const moment = require('moment-timezone')
const { Order, Setting } = require('../../../model')
const { uniqBy } = require('lodash')
const { getListFiles } = require('../../../constant/File')
const { isFunction, convertFile, flattenObject, applyContent, convertStringToID } = require('../../../common/helper')
const path = require('path')
const fs = require('fs')
const { default: axios } = require('axios')
const shortid = require('shortid')
const FileService = require('../fileService')
const jwt = require('jsonwebtoken')
const indexString = {
  0: 'a.',
  1: 'b.',
  2: 'c.',
}

const errorMessage = {
  '-1': 'Unknown error',
  '-2': 'Conversion timeout error',
  '-3': 'Conversion error',
  '-4': 'Error while downloading the document file to be converted',
  '-5': 'Incorrect password',
  '-6': 'Error while accessing the conversion result database',
  '-7': 'Input error',
  '-8': 'Invalid token',
  '-9': 'Error when the converter cannot automatically determine the output file format. This error means that the client must explicitly specify in which format the file should be converted (text document or spreadsheet). It is used to convert XML to OOXML in case the XML type is unknown',
}
class ConvertService {
  onConvert = async ({ _id: docId, products, data, category, files }) => {
    try {
      console.log('files', data)
      let nextData = {
        ...data,
        date: moment().format('DD'),
        month: moment().format('MM'),
        year: moment().format('YYYY'),
      }

      if (nextData?.create_company) {
        nextData = this.getCreateCompanyData(nextData)
      }
      console.log('nextData', JSON.stringify(nextData, null, 4))
      for (let file of files) {
        const { fileName, fileOriginalName, path: filePath } = file
        await generateDocs({ filePath: filePath, data: nextData, fileName: fileOriginalName, docId: docId })
      }

      return true
    } catch (error) {
      throw error
    }
  }
  getCreateCompanyData = (data) => {
    const result = { ...data }
    const getDocString = (item, isPersonal) => {
      if (isPersonal) {
        return `${item.doc_code} Ngày cấp: ${moment(item.doc_time_provide).format('DD/MM/YYYY')} Nơi cấp: ${
          item.doc_place_provide
        }`
      }
      return `${item.organization.mst}   Ngày cấp: ${moment(item.organization.doc_time_provide).format(
        'DD/MM/YYYY',
      )}   Nơi cấp: Sở kế hoạch và đầu tư ${item.organization.doc_place_provide.city}`
    }

    if (result?.create_company?.approve) {
      result.create_company.approve.company_opt_career = result?.create_company?.approve?.company_opt_career?.map(
        (item, i) => {
          return {
            i: i + 2,
            name: item.name,
            code: item.code,
            content: '',
          }
        },
      )
    }

    if (result?.create_company?.approve?.origin_person) {
      result.create_company.approve.origin_person = result?.create_company?.approve?.origin_person?.map((item, i) => {
        const isPersonal = item.present_person === 'personal'
        const isOrg = item.present_person === 'organization'
        return {
          ...item,
          index: i + 1,
          originName: isPersonal ? item.name : isOrg ? item.organization?.name : '',
          originGender: isPersonal ? item.gender : '',
          originBirthday: isPersonal ? item.birth_day : '',
          originNational: isPersonal ? 'Việt Nam' : '',
          originPertype: isPersonal ? item.per_type : '',
          originContact: isPersonal ? item.contact : isOrg ? item.organization.doc_place_provide : '',
          originDocCode: getDocString(item, isPersonal),
          originCapitalQuantity: item.capital / 10000,
          originCapitalPercent: `${(item.capital / result?.create_company?.approve?.base_val?.num) * 100}%`,
          originTimeProvide: isOrg ? moment(item.organization.doc_time_provide).format('DD/MM/YYYY') : '',
        }
      })
    }

    if (result?.create_company?.approve?.legal_respon) {
      const len = result.create_company.approve.legal_respon.length
      result.create_company.approve.legal_respon = result.create_company.approve.legal_respon?.map((item, i) => {
        return {
          ...item,
          index: i + 1,
          indexString: len > 1 ? indexString[i] : '',
        }
      })
      result.create_company.approve.legalLength = result.create_company.approve.legal_respon.length
    }
    return result
  }
}
class TestService {
  testOrderProcessSuccess = async ({ orderID, userID }) => {
    // if (process.env.NODE_ENV !== 'development') return res.status(200).json({ message: 'ngonnn' })
    try {
      const id = convertStringToID(orderID)
      let _order = await Order.findById(id).populate('orderOwner', 'email').populate('category', 'type')
      if (!_order) throw new Error('Order not found')

      const { data, category } = _order
      let { files, result, msg } = this.findKeysByObject(data, category?.type)
      if (!files) throw new Error('Files not found')
      const resp = await this.handleConvertFile({ data, files, userID, orderID })
      return { ...resp, orderID }
    } catch (err) {
      console.log('checkingOrder err', err)
      throw err.toString()
    }
  }

  handleConvertFile = async ({ data, files, userID, orderID }) => {
    try {
      // let mailParams = await this.getMailContent({ _id: order.id, email: order.orderOwner?.email })
      files = uniqBy(files, 'name').filter((item) => item)
      let nextData = {
        ...data,
        date: moment().format('DD'),
        month: moment().format('MM'),
        year: moment().format('YYYY'),
      }

      if (nextData?.create_company) {
        nextData = this.getCreateCompanyData(nextData)
      }
      let _contentOrder = flattenObject(nextData)
      const currentTime = moment(new Date()).unix()

      // console.log('files', _contentOrder)
      // return
      if (files) {
        const baseDir = `uploads/userData/${orderID}/${currentTime}`
        const docFolder = `${baseDir}/doc`
        const pdfFolder = `${baseDir}/pdf`
        // Create DOC Folder
        await new FileService().createFolder({
          dir: docFolder,
        })
        // Create PDF Folder
        await new FileService().createFolder({
          dir: pdfFolder,
        })
        for (let file of files) {
          console.log('file', file)
          const zipBuffer = await applyContent(file, _contentOrder)
          const docxFile = path.join(docFolder, `${file.name}.docx`)
          await new FileService().saveFile({ filePath: docxFile, buff: zipBuffer })

          await this.convertPDFService({
            from: docFolder.replace('uploads/', ''),
            to: pdfFolder,
            fileName: file.name,
            fileType: 'docx',
            extension: 'pdf',
          })
        }
        return { message: 'ok', folder: baseDir }
      }
      throw new Error('Files not found')
    } catch (err) {
      console.log('handleConvertFile error', err)
      throw err
    }
  }

  getCreateCompanyData = (data) => {
    const result = { ...data }

    const getDocString = (item, isPersonal) => {
      if (isPersonal) {
        return `${item.doc_code} Ngày cấp: ${moment(item.doc_time_provide).format('DD/MM/YYYY')} Nơi cấp: ${
          item.doc_place_provide
        }`
      }
      return `${item.organization.mst}   Ngày cấp: ${moment(item.organization.doc_time_provide).format(
        'DD/MM/YYYY',
      )}   Nơi cấp: Sở kế hoạch và đầu tư ${item.organization.doc_place_provide.city}`
    }

    if (result?.create_company?.approve) {
      result.create_company.approve.company_opt_career = result?.create_company?.approve?.company_opt_career?.map(
        (item, i) => {
          return {
            i: i + 2,
            name: item.name,
            code: item.code,
            content: '',
          }
        },
      )
    }

    if (result?.create_company?.approve?.origin_person) {
      result.create_company.approve.origin_person = result?.create_company?.approve?.origin_person?.map((item, i) => {
        const isPersonal = item.present_person === 'personal'
        const isOrg = item.present_person === 'organization'
        return {
          ...item,
          index: i + 1,
          originName: isPersonal ? item.name : isOrg ? item.organization?.name : '',
          originGender: isPersonal ? item.gender : '',
          originBirthday: isPersonal ? item.birth_day : '',
          originNational: isPersonal ? 'Việt Nam' : '',
          originPertype: isPersonal ? item.per_type : '',
          originContact: isPersonal ? item.contact : isOrg ? item.organization.doc_place_provide : '',
          originDocCode: getDocString(item, isPersonal),
          originCapitalQuantity: item.capital / 10000,
          originCapitalPercent: `${(item.capital / result?.create_company?.approve?.base_val?.num) * 100}%`,
        }
      })
    }

    if (result?.create_company?.approve?.legal_respon) {
      const len = result.create_company.approve.legal_respon.length
      result.create_company.approve.legal_respon = result.create_company.approve.legal_respon?.map((item, i) => {
        return {
          ...item,
          index: i + 1,
          indexString: len > 1 ? indexString[i] : '',
        }
      })
      result.create_company.approve.legalLength = result.create_company.approve.legal_respon.length
    }
    return result
  }

  getMailContent = async ({ _id, email }) => {
    let _setting = await Setting.find().populate('mailRegister mailPayment') // -> _setting
    let mailParams
    mailParams = {
      email: 'handgod1995@gmail.com',
      removeFiles: true,
      send: 1,
      _id: _id,
    }
    if (_setting) {
      let { mailPayment } = _setting[0]
      let { subject, content } = mailPayment
      mailParams.subject = subject
      mailParams.html = content
      mailParams.to = email
    } else {
      mailParams.subject = 'Testing auto generate files'
      mailParams.html = 'Testing auto generate files'
    }
    return mailParams
  }

  /**
   * @param {_ obj: data Object such as create_company, change_info ....}
   * @param {_ number: type of category }
   */
  findKeysByObject = (obj, type = null) => {
    let msg = ''
    let result = true
    if (!type) {
      result = false
      msg = `Missing ['type'] property`
    }
    if (!obj) {
      result = false
      msg = `Missing ['data'] property`
    }
    let files = []
    try {
      for (let props in obj) {
        let list = getListFiles(props)
        if (!obj?.[props]) continue
        let keys = Object.keys(obj?.[props]).map((key) => key)
        if (keys && list && result) {
          for (let i = 0, len = keys.length; i < len; i++) {
            let key = keys[i]
            let objProperty = list?.[key]
            if (isFunction(objProperty)) {
              // explicit property
              if (props === 'create_company') {
                let origin_person = obj[props][key]?.origin_person
                let opt = ''
                if (origin_person) {
                  let organization = origin_person.some((item) => item.present_person === 'organization')
                  organization ? (opt = 'organization') : (opt = 'personal')
                }
                if (!opt) {
                  result = false
                  msg = `Missing Key ['present_person']`
                } else {
                  files = [...files, ...objProperty(type, props, key, opt)]
                }
              } else {
                files = [...files, ...objProperty(type, props, key)]
              }
            }
            if (!result) break
          }
        }
      }

      files = uniqBy(files, 'path').filter((item) => item)

      return { files, result, msg }
    } catch (err) {
      console.log('findKeysByObject', err)
      throw err
    }
  }

  convertPDFService = async ({ from, to, fileName, fileType, extension }) => {
    try {
      const key = shortid()
      const options = { algorithm: 'HS256', expiresIn: '15m' }
      const payload = {
        url: `https://app.thanhlapcongtyonline.vn/public/${from}/${fileName}.${fileType}`,
        key,
        fileType: 'docx',
        outputtype: 'pdf',
      }
      const token = jwt.sign(payload, 'Hdme1995', options)
      let data = JSON.stringify(payload)
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        // url: `${process.env.OFFICE_URL}:${process.env.OFFICE_PORT}` +  '/ConvertService.ashx',
        url: `https://office.truyenmai.com/ConvertService.ashx`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data,
      }
      const resp = await axios.request(config)
      const errorCode = resp.data?.error
      if (errorCode) {
        return errorMessage[errorCode] || 'Error: ' + errorCode
      }

      if (resp.data.fileUrl) {
        return await this.downloadFile(resp.data.fileUrl, `${to}/${fileName}.${extension}`)
      }
    } catch (error) {
      console.log('Convert file failed: ', error)
      throw error
    }
  }

  downloadFile = async (fileUrl, outputLocationPath) => {
    return axios({
      method: 'get',
      url: fileUrl,
      responseType: 'stream',
    }).then((response) => {
      response.data.pipe(fs.createWriteStream(outputLocationPath))
    })
  }

}

module.exports = {
  ConvertService,
  TestService,
}
