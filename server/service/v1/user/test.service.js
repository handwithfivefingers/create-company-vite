const { Order, Setting } = require('@server/model')

const libre = require('libreoffice-convert')

const MailService = require('@service/v1/user/mail.service')

const { errHandler } = require('@server/response')

const { flattenObject, convertFile } = require('@common/helper')

const { uniqBy } = require('lodash')

libre.convertAsync = require('util').promisify(libre.convert)

const { sendWithAttachments } = new MailService()

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

      let mailParams = await this.getMailContent({ _id: order.id, email: order.orderOwner?.email })

      files = uniqBy(files, 'name').filter((item) => item)

      if (files) {
        let _contentOrder = flattenObject(data)

        for (let file of files) {
          let pdfFile = await convertFile(file, _contentOrder)
          attachments.push({ pdfFile, name: file.name })
        }

        mailParams.filesPath = attachments

        await new MailService().sendWithFilesPath(mailParams)

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
