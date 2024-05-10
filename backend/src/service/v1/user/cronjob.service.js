const { Order, Setting, Transaction } = require('../../../model')
const { flattenObject, convertFile, removeListFiles, convertStringToID } = require('../../../common/helper')
const { uniqBy } = require('lodash')
const cron = require('node-cron')
const MailService = require('./mail.service')
const mongoose = require('mongoose')
const fs = require('fs')
const moment = require('moment-timezone')
const path = require('path')
const { fork } = require('child_process')
const LogService = require('./log.service')
const { TestService } = require('../third-connect/convert.service')
const FileService = require('../fileService')
const BotService = require('../third-connect/bot.service')
const TELEGRAM_CODE = require('../../../constant/telegramCode')

module.exports = class CronjobService {
  cronConvertFiles = (timing = '* * * * * *') => {
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
    let orderID
    try {
      console.log('Start convert')
      const [_transaction] = await Order.aggregate([
        {
          $match: {
            send: 0,
            delete_flag: {
              $ne: 1,
            },
          },
        },
        {
          $lookup: {
            from: 'transactions',
            localField: 'transactionId',
            foreignField: '_id',
            as: 'trans',
          },
        },
        {
          $match: {
            'trans.isPayment': true,
          },
        },
        {
          $project: {
            _id: 1,
            isPayment: '$trans.isPayment',
            orderId: 1,
            orderOwner: 1,
            // data: 1,
            category: 1,
            products: 1,
            updatedAt: 1,
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
          },
        },

        {
          $lookup: {
            from: 'users',
            localField: 'orderOwner',
            foreignField: '_id',
            as: 'orderOwner',
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'products',
            foreignField: '_id',
            as: 'products',
          },
        },

        {
          $project: {
            _id: 1,
            isPayment: 1,
            orderId: 1,
            orderOwner: {
              name: 1,
              email: 1,
              _id: 1,
            },
            category: {
              name: 1,
              type: 1,
              _id: 1,
            },
            products: {
              name: 1,
              type: 1,
              _id: 1,
            },
            updatedAt: 1,
          },
        },
        {
          $limit: 1,
        },
        {
          $sort: {
            updatedAt: -1,
          },
        },
      ])

      if (!_transaction) return

      orderID = _transaction._id

      const { _id: userID, email: userEmail, name: userName } = _transaction.orderOwner
      const params = {
        userID,
        orderID,
      }

      const resp = await new TestService().testOrderProcessSuccess(params)
      let folder = resp.folder
      let mailParams = await this.getMailContent({ orderID, userEmail, userName })
      const listFiles = new FileService().getListFiles({ dir: folder + '/pdf' })
      mailParams.attachments = listFiles.map((item) => fs.createReadStream(path.join(global.__basedir, item)))
      const mailer = await new MailService().sendMail(mailParams)
      console.log('Mail sent successfully')

      new BotService().onSendMessageFromThread({
        message: `
        <code>   -----------------------------------------------------------------------</code>
        <b>${moment().format()}</b>
        Order ${orderID} have been payment, converted, and sent to email successfully
        <code>-----------------------------------------------------------------------</code>
        `,
        message_thread_id: TELEGRAM_CODE.TOPIC.CONVERT,
      })

      await new LogService().createLog({
        ip: 'Cronjob',
        url: 'Cronjob',
        request: 'Cronjob',
        response: mailer,
      })

      return
    } catch (err) {
      console.log('Cron Start Error', err)
      if (orderID) {
        console.log('Cronjob Convert file error', err)
        new BotService().onSendMessage({
          message: moment.format('YYYY/MM/DD [T] HH:mm:ss') + 'Convert File Error: ' + orderID,
        })
      }
    } finally {
      if (orderID) {
        await Order.updateOne({ _id: orderID, send: 0, delete_flag: { $ne: 1 } }, { send: 1 })
      }
    }
  }

  getMailContent = async ({ orderID, userEmail, userName }) => {
    let _setting = await Setting.find().populate('mailPayment') // -> _setting
    let mailParams
    mailParams = {
      to: userEmail || 'handgod1995@gmail.com',
      _id: orderID,
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
