const cron = require('node-cron')
const { Order, Setting } = require('@model')

const MailService = require('@controller/user/Sendmail')

const { cronMail } = new MailService()

const { flattenObject, convertFile, removeListFiles } = require('@common/helper')
const { uniqBy } = require('lodash')
const { createLog } = require('@response')

// exports.task = cron.schedule(
//   '* * * * *',
//   async () => {
//     let _order = await Order.findOne({ $and: [{ payment: 1, send: 0 }] }).populate('orderOwner', 'email')
//     if (_order) return handleConvertFile(_order)
//   },
//   {
//     scheduled: false,
//   },
// )

// const handleConvertFile = async (order) => {
//   // handle Single File
//   let attachments = []

//   try {
//     let { files, data } = order

//     let mailParams = await getMailContent(order)

//     files = uniqBy(files, 'name').filter((item) => item)

//     if (files) {
//       let _contentOrder = flattenObject(data)

//       for (let file of files) {
//         let pdfFile = await convertFile(file, _contentOrder)

//         attachments.push({ pdfFile, name: file.name })
//       }

//       mailParams.filesPath = attachments

//       await cronMail(mailParams)

//       return console.log('Cronjob success')
//     }

//     return console.log('Cronjob error')
//   } catch (err) {
//     console.log('handleConvertFile error', err)

//     await createLog(err)

//     await Order.updateOne({ _id: order._id }, { send: 1 })

//     await removeListFiles(attachments)

//     throw err
//   }
// }

// const getMailContent = async (order) => {
//   let _setting = await Setting.find().populate('mailPayment') // -> _setting
//   let mailParams
//   mailParams = {
//     email: order.orderOwner?.email || 'handgod1995@gmail.com',
//     removeFiles: true,
//     send: 1,
//     _id: order._id,
//     type: 'path',
//   }

//   if (_setting) {
//     let { mailPayment } = _setting[0]

//     let { subject, content } = mailPayment

//     mailParams.subject = subject
//     mailParams.content = content
//   } else {
//     mailParams.subject = 'Testing auto generate files'
//     mailParams.content = 'Testing auto generate files'
//   }
//   return mailParams
// }

module.exports = class CronTab {
  constructor() {
    console.log('Cron loaded')
  }

  task = cron.schedule(
    '* * * * *',
    async () => {

      let _order = await Order.findOne({ $and: [{ payment: 1, send: 0, delete_flag: { $ne: 1 } }] }).populate('orderOwner', 'email')

      if (_order) return this.handleConvertFile(_order)
    },
    {
      scheduled: false,
    },
  )

  handleConvertFile = async (order) => {
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

        await cronMail(mailParams)

        return console.log('Cronjob success')
      }

      return console.log('Cronjob error')
    } catch (err) {
      console.log('handleConvertFile error', err)

      await createLog(err)

      await Order.updateOne({ _id: order._id }, { send: 1 })

      await removeListFiles(attachments)

      throw err
    }
  }

  getMailContent = async (order) => {
    let _setting = await Setting.find().populate('mailPayment') // -> _setting
    let mailParams
    mailParams = {
      email: order.orderOwner?.email || 'handgod1995@gmail.com',
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
    } else {
      mailParams.subject = 'Testing auto generate files'
      mailParams.content = 'Testing auto generate files'
    }
    return mailParams
  }
}
