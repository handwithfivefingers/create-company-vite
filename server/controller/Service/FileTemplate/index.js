const { Order, Setting } = require('@server/model')

const libre = require('libreoffice-convert')

const MailService = require('@server/controller/user/Sendmail')

const { errHandler } = require('@server/response')

const { flattenObject, convertFile, removeListFiles } = require('@server/common/helper')

const { uniqBy } = require('lodash')

libre.convertAsync = require('util').promisify(libre.convert)

const { sendmailWithAttachments } = new MailService()
module.exports = class FileTemplate {
  checkingOrder = async (req, res) => {
    if (process.env.NODE_ENV !== 'development') return res.status(200).json({ message: 'ngonnn' })

    try {
      let _order = await Order.findOne({ _id: req.body._id }).populate('orderOwner', 'email')

      if (_order) return this.handleConvertFile(_order, req, res)

      return res.status(200).json({ data: [] })
    } catch (err) {
      console.log('checkingOrder err')

      return errHandler(err, res)
    }
  }

  handleConvertFile = async (order, req, res) => {
    // handle Single File
    let attachments = []

    try {
      let { files, data } = order

      let mailParams = await this.getMailContent(order)

      files = uniqBy(files, 'name').filter((item) => item)

      if (files) {
        let _contentOrder = flattenObject(data)

        for (let file of files) {
          let pdfFile = await convertFile(file, _contentOrder)

          attachments.push({ pdfFile, name: file.name })
        }

        mailParams.filesPath = attachments


        // await sendmailWithAttachments(req, res, mailParams)

        return res.status(200).json({ message: 'ok' })
      }

      return res.status(400).json({
        error: 'Files not found',
      })
    } catch (err) {
      console.log('handleConvertFile error', err)

      attachments.length > 0 && (await removeListFiles(attachments, true))

      return errHandler(err, res)
    } finally {
      await removeListFiles(attachments)
    }
  }

  getMailContent = async (order) => {
    let _setting = await Setting.find().populate('mailRegister mailPayment') // -> _setting
    let mailParams
    mailParams = {
      email: 'handgod1995@gmail.com',
      removeFiles: true,
      send: 1,
      _id: order._id,
      type: 'path',
    }
    if (_setting) {
      let { mailPayment } = _setting[0]
      let { subject, content } = mailPayment
      mailParams.subject = subject
      mailParams.content = content
      mailParams.email = order.orderOwner?.email
    } else {
      mailParams.subject = 'Testing auto generate files'
      mailParams.content = 'Testing auto generate files'
    }
    return mailParams
  }
}
