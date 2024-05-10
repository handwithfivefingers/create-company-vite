const CronjobService = require('../../../service/v1/user/cronjob.service')
const BotService = require('../../../service/v1/third-connect/bot.service')
const TELEGRAM_CODE = require('../../../constant/telegramCode')

module.exports = class CronjobController {
  constructor() {}

  onConvertFiles = async (req, res) => {
    try {
      await new CronjobService().cronConvertFiles().start()
      console.log(`=> Cron Schedule: onConvertFiles start`)
    } catch (error) {
      console.log('onConvertFiles error ', error)
      new BotService().onSendMessageFromThread({
        message: `<b>JOB: ConvertFile</b><code>${JSON.stringify(err)}</code>`,
        message_thread_id: TELEGRAM_CODE.TOPIC.ERROR,
      })
    }
  }
  onBackupDB = async (req, res) => {
    try {
      await new CronjobService().cronBackupDB().start()
      console.log(`=> Cron Schedule: cronBackupDB start`)
    } catch (error) {
      console.log('onBackupDB error ', error)
    }
  }

  onGenSSL = async (req, res) => {
    try {
      await new CronjobService().cronGenerateSSL().start()
      console.log(`=> Cron Schedule: cronGenerateSSL start`)
    } catch (error) {
      console.log('onGenSSL error ', error)
    }
  }

  // task = cron.schedule(
  //   '* * * * *',
  //   async () => {
  //     try {
  //       let _order = await Order.findOne({ $and: [{ payment: 1, send: 0, delete_flag: { $ne: 1 } }] }).populate(
  //         'orderOwner',
  //         'email',
  //       )
  //       if (_order) return this.handleConvertFile(_order)
  //     } catch (error) {
  //       console.log('error scheduled', error)
  //     }
  //   },
  //   {
  //     scheduled: false,
  //   },
  // )

  // backupDB = cron.schedule('0 0 12 * *', async () => {
  //   let { Log, ...collection } = mongoose.models

  //   let folderBackup = path.resolve(global.__basedir, 'uploads', 'mockdata', 'database')

  //   let folderName = moment().format('DDMMYYYY-HHmm')

  //   if (!fs.existsSync(`${folderBackup}/${folderName}`)) {
  //     fs.mkdirSync(`${folderBackup}/${folderName}`)
  //   }

  //   for (let col in collection) {
  //     let jsonData = await collection[col].find({})
  //     fs.writeFile(`${folderBackup}/${folderName}/${col}.json`, JSON.stringify(jsonData, null, 2), 'utf8', () => {
  //       console.log(`${col} stored successfully`)
  //     })
  //   }
  // })

  // forkSSL = cron.schedule('0 0 1 * *', async () => {
  //   const childProcess = fork(`${global.__basedir}/ssl.js`)
  //   try {
  //     childProcess.on('message', (msg) => {
  //       console.log('forkSSL message >', msg)
  //     })
  //   } catch (err) {
  //     console.log('forkSSL error > ', err)
  //   }
  // })

  // handleConvertFile = async (order) => {
  //   // handle Single File
  //   let attachments = []

  //   try {
  //     let { files, data } = order

  //     let mailParams = await this.getMailContent(order)

  //     files = uniqBy(files, 'name').filter((item) => item)

  //     if (files) {
  //       let _contentOrder = flattenObject(data)

  //       for (let file of files) {
  //         let pdfFile = await convertFile(file, _contentOrder)

  //         attachments.push({ pdfFile, name: file.name })
  //       }

  //       mailParams.filesPath = attachments

  //       await new MailService().cronMail(mailParams)

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

  // getMailContent = async (order) => {
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
}
