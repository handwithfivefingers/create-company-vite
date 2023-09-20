const fs = require('fs')
const { removeFile, errHandler } = require('@response')
const { TemplateMail, Order } = require('@model')
const nodeMailer = require('nodemailer')
const dotenv = require('dotenv')
const { removeListFiles } = require('@common/helper')

// *Useful for getting environment vairables
dotenv.config()

const { MAIL_NAME } = process.env

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const EMAIL_FROM_NAME = 'ThanhlapcongtyOnline'
module.exports = class MailService {
  mailConfig = {}
  constructor() {
    this.mailConfig = {
      service: 'gmail',
      auth: this.getAUTHConfig(),
    }
  }

  getAUTHConfig = () => {
    return {
      user: MAIL_NAME,
      pass: process.env.GMAIL_APP_PASSWORD,
    }
    if (process.env.NODE_ENV === 'development') {
      return {
        user: 'handgod1995@gmail.com',
        pass: process.env.APP_PASSWORD,
      }
    } else {
      return {
        user: MAIL_NAME,
        pass: process.env.GMAIL_APP_PASSWORD,
      }
    }
  }

  createTransport = async () => {
    return nodeMailer.createTransport(this.mailConfig)
  }

  sendWithAttachments = async ({ attachments, from, to, subject, html }) => {
    try {
      //sending
      let validatedAttachments = this.validateFile(attachments)
      let params = {
        from: {
          address: from || MAIL_NAME,
          name: EMAIL_FROM_NAME,
        },
        to,
        subject,
        html,
        attachments: validatedAttachments,
      }
      let transport = await this.createTransport()
      return transport.sendMail(params)
    } catch (err) {
      throw err
    }
  }

  sendWithFilesPath = async ({ from, to, subject, filesPath, html }) => {
    let attachmentsPath = this.convertPath(filesPath)

    try {
      let params = {
        from: {
          address: from || MAIL_NAME,
          name: EMAIL_FROM_NAME,
        },
        to,
        attachments: attachmentsPath,
        subject, // Subject line
        html, // html body,
      }

      let transport = await this.createTransport()

      return transport.sendMail(params)
    } catch (err) {
      console.log('sendMail success')
      throw err
    }
  }

  sendMail = async ({ from, to, subject, html }) => {
    try {
      let params = {
        from: {
          address: from || MAIL_NAME,
          name: EMAIL_FROM_NAME,
        },
        to,
        subject,
        html,
      }

      let transport = await this.createTransport()
      return transport.sendMail(params)
    } catch (err) {
      console.log('sendMail failed')
      throw err
    }
  }

  validateFile = async (files) => {
    try {
      if (!files) return []

      let attachments = []

      let isPDF = files?.some((item) => item.mimetype === 'application/pdf')

      if (!isPDF) {
        await files.map(({ path }) => removeFile(path))
      } else {
        attachments = files.map(({ originalname, path }) => {
          return { filename: originalname, path: path }
        })
      }

      return attachments
    } catch (err) {
      console.log('validateFile error', err)
      throw err
    }
  }

  convertPath = (filesPath) => {
    let result = filesPath?.map(({ pdfFile, name }) => {
      let fileSplit = pdfFile.split('.')

      let ext = fileSplit[fileSplit.length - 1]

      return { path: pdfFile, filename: `${name}.${ext}` }
    })

    return result || []
  }
}
