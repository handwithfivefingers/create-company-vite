const { Order, Setting } = require('@server/model')

const libre = require('libreoffice-convert')

const MailService = require('@service/v1/user/mail.service')

const { errHandler } = require('@server/response')

const { flattenObject, convertFile } = require('@common/helper')

const { generateDocs } = require('@common/odt.template')

const { uniqBy } = require('lodash')

libre.convertAsync = require('util').promisify(libre.convert)

const { sendWithAttachments } = new MailService()
const moment = require('moment')
const indexString = {
  0: 'a.',
  1: 'b.',
  2: 'c.',
}

module.exports = class TestService {
  testOrderProcessSuccess = async (req, res) => {
    if (process.env.NODE_ENV !== 'development') return res.status(200).json({ message: 'ngonnn' })

    try {
      let _order = await Order.findOne({ _id: req.body._id }).populate('orderOwner', 'email')

      if (_order) return this.handleConvertFile({ order: _order, req, res })

      return res.status(200).json({ data: [] })
    } catch (err) {
      console.log('checkingOrder err', err)

      return errHandler(err, res)
    }
  }

  handleConvertFile = async ({ order, req, res }) => {
    // handle Single File
    let attachments = []

    try {
      let { files, data } = order

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

      if (files) {
        for (let file of files) {
          const fileSplit = file.path.split('.')
          const ext = fileSplit.splice(-1)
          const filePath = [...fileSplit, 'odt'].join('.')
          await generateDocs({ filePath: filePath, data: nextData, fileName: file.name })
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
}
