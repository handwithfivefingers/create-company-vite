const cron = require('node-cron')
const { Order, Setting } = require('@model')

const MailService = require('@controller/user/Sendmail')

const { flattenObject, convertFile, removeListFiles } = require('@common/helper')
const { uniqBy } = require('lodash')
const { createLog } = require('@response')

const path = require('path')
const mongoose = require('mongoose')
const fs = require('fs')
const exec = require('child_process').execSync
const moment = require('moment')
const { cronMail } = new MailService()
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

  backupDB = cron.schedule('0 0 12 * *', async () => {
    let { Log, ...collection } = mongoose.models

    let folderBackup = path.resolve(global.__basedir, 'uploads', 'mockdata', 'database')

    let folderName = moment().format('DDMMYYYY-HHmm')

    if (!fs.existsSync(`${folderBackup}/${folderName}`)) {
      fs.mkdirSync(`${folderBackup}/${folderName}`)
    }

    for (let col in collection) {
      let jsonData = await collection[col].find({})
      fs.writeFile(`${folderBackup}/${folderName}/${col}.json`, JSON.stringify(jsonData, null, 2), 'utf8', () => {
        console.log(`${col} stored successfully`)
      })
    }
  })

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
