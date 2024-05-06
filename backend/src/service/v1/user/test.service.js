const { Order, Setting } = require('../../../model')
const libre = require('libreoffice-convert')
// const { errHandler } = require('../../../response')
// const { generateDocs } = require('../../../common/odt.template')
const { uniqBy } = require('lodash')
libre.convertAsync = require('util').promisify(libre.convert)
const { getListFiles } = require('../../../constant/File')
const { isFunction, flattenObject, convertFile } = require('../../../common/helper')
const path = require('path')
const moment = require('moment-timezone')
const fs = require('fs')
const { default: axios } = require('axios')
const shortid = require('shortid')
const indexString = {
  0: 'a.',
  1: 'b.',
  2: 'c.',
}

module.exports = class TestService {
  testOrderProcessSuccess = async (req, res) => {
    // if (process.env.NODE_ENV !== 'development') return res.status(200).json({ message: 'ngonnn' })

    try {
      let _order = await Order.findOne({ _id: req.body._id })
        .populate('orderOwner', 'email')
        .populate('category', 'type')
      const id = req.id

      if (!_order) throw new Error('Order not found')

      const { data, category } = _order
      let { files, result, msg } = this.findKeysByObject(data, category?.type)
      if (!files) throw new Error('Files not found')
      const resp = await this.handleConvertFile({ data, files, userID: id })
      console.log('resp', resp)
      return { files, _order }
    } catch (err) {
      console.log('checkingOrder err', err)
      throw err.toString()
    }
  }

  handleConvertFile = async ({ data, files, userID }) => {
    // handle Single File
    let attachments = []

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

      console.log('files', _contentOrder)
      // return
      if (files) {
        const key = moment(new Date()).unix()
        for (let file of files) {
          console.log('file', file)
          const zipBuffer = await convertFile(file, _contentOrder)
          const baseDir = `userData/${userID}/${currentTime}`
          let docSavePath = `${global.__basedir}/uploads`
          let pdfSavePath = `${global.__basedir}/uploads`
          for (let dirFolder of `${baseDir}/doc`.split('/')) {
            docSavePath += '/' + dirFolder
            if (!fs.existsSync(docSavePath)) {
              fs.mkdirSync(docSavePath)
            }
          }
          if (!fs.existsSync(pdfSavePath + '/' + baseDir + '/pdf')) {
            fs.mkdirSync(pdfSavePath + '/' + baseDir + '/pdf')
          }

          const localPath = path.join(docSavePath, `${file.name}.docx`)
          // Store docx
          fs.writeFileSync(localPath, zipBuffer)
          // Convert

          let data = JSON.stringify({
            url: `https://ebcd-27-74-247-118.ngrok-free.app/public/${baseDir}/doc/${file.name}.docx`,
            key: shortid(),
            fileType: 'docx',
            outputtype: 'pdf',
          })
          console.log('data', data)
          const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://172.16.52.56:6969/ConvertService.ashx',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            data: data,
          }
          const resp = await axios.request(config)
          console.log('resp', resp.data)
          if (resp.data.fileUrl) {
            await this.downloadFile(resp.data.fileUrl, `${pdfSavePath}/${baseDir}/pdf/${file.name}.pdf`)
          }
        }
        return { message: 'ok' }
      }

      throw new Error('Files not found')
    } catch (err) {
      console.log('handleConvertFile error', err)
      // attachments.length > 0 && (await removeListFiles(attachments, true))
      throw err
    } finally {
      // await removeListFiles(attachments)
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

  downloadFile = async (fileUrl, outputLocationPath) => {
    const writer = fs.createWriteStream(outputLocationPath)

    return axios({
      method: 'get',
      url: fileUrl,
      responseType: 'stream',
    }).then((response) => {
      return new Promise((resolve, reject) => {
        response.data.pipe(writer)
        let error = null
        writer.on('error', (err) => {
          error = err
          writer.close()
          reject(err)
        })
        writer.on('close', () => {
          if (!error) {
            resolve(true)
          }
        })
      })
    })
  }
}
