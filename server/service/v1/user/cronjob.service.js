const { Order, Setting } = require('@model')
const { flattenObject, convertFile, removeListFiles } = require('@common/helper')
const { uniqBy } = require('lodash')
const cron = require('node-cron')
const MailService = require('@service/v1/user/mail.service')
const mongoose = require('mongoose')
const fs = require('fs')
const moment = require('moment')
const path = require('path')
const { execSync: exec, fork } = require('child_process')
const LogService = require('./log.service')

module.exports = class CronjobService {
  cronConvertFiles = (timing = '* * * * *') => {
    console.log(`cronConvertFiles Time: ${timing}`)
    return cron.schedule(timing, this.handleConvertFile, {
      scheduled: false,
    })
  }
  cronBackupDB = (timing = '0 0 12 * *') => {
    console.log(`cronBackupDB Time: ${timing}`)
    return cron.schedule(timing, async () => {
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
  }

  cronGenerateSSL = (timing = '0 0 1 * *') => {
    console.log(`cronGenerateSSL Time: ${timing}`)
    return cron.schedule(timing, async () => {
      const childProcess = fork(`${global.__basedir}/ssl.js`)
      try {
        childProcess.on('message', (msg) => {
          console.log('forkSSL message >', msg)
        })
      } catch (err) {
        console.log('forkSSL error > ', err)
      }
    })
  }

  handleConvertFile = async () => {
    // handle Single File
    let attachments = []
    let orderId
    try {
      const order = await Order.findOne({ $and: [{ send: 0, delete_flag: { $ne: 1 } }] })
        .populate('orderOwner', 'email')
        .populate('transactionId', 'isPayment')

      if (!order) throw new Error('No Order Founded')
      orderId = order._id
      let { files, data } = order

      let mailParams = await this.getMailContent(order)

      files = uniqBy(files, 'name').filter((item) => item)

      if (!files.length) throw new Error('Dont have any file')

      let _contentOrder = flattenObject(data)

      for (let file of files) {
        let pdfFile = await convertFile(file, _contentOrder)

        attachments.push({ pdfFile, name: file.name })
      }

      mailParams.filesPath = attachments

      const mailer = await new MailService().sendWithFilesPath(mailParams)

      await new LogService().createLog({
        ip: 'Cronjob',
        url: 'Cronjob',
        request: 'Cronjob',
        response: mailer,
      })

      return console.log('Cronjob success')
    } catch (err) {
      if (orderId) {
        await new LogService().createLog({
          ip: 'Cronjob',
          url: 'Cronjob',
          request: 'Cronjob',
          response: mailer,
        })
        console.log('Cronjob Convert file error', err)
      }
    } finally {
      if (orderId) {
        await Order.updateOne({ _id: order._id }, { send: 1 })
        await removeListFiles(attachments)
      }
    }
  }

  getMailContent = async (order) => {
    let _setting = await Setting.find().populate('mailPayment') // -> _setting
    let mailParams
    mailParams = {
      to: order.orderOwner?.email || 'handgod1995@gmail.com',
      _id: order._id,
    }

    if (_setting) {
      let { mailPayment } = _setting[0]

      let { subject, content } = mailPayment

      mailParams.subject = subject
      mailParams.html = content
    } else {
      mailParams.subject = 'Testing auto generate files'
      mailParams.html = 'Testing auto generate files'
    }
    return mailParams
  }
}
