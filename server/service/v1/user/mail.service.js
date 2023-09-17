const fs = require('fs')
const { removeFile, errHandler } = require('@response')
const { TemplateMail, Order } = require('@model')
const { auth } = require('googleapis').google
const nodeMailer = require('nodemailer')
const dotenv = require('dotenv')
const { removeListFiles } = require('@common/helper')

// *Useful for getting environment vairables
dotenv.config()

const {
  GG_REFRESH_TOKEN: REFRESH_TOKEN,
  GG_REFRESH_URI: REFRESH_URI,
  GG_EMAIL_CLIENT_ID: CLIENT_ID,
  GG_EMAIL_CLIENT_SECRET: CLIENT_SECRET,
  MAIL_NAME,
  MAIL_PASSWORD,
} = process.env

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

module.exports = class MailService {
  oAuth2Client
  mailConfig = {}
  constructor() {
    this.getAUTHConfig().then((res) => {
      this.mailConfig = {
        service: 'gmail',
        auth: res,
      }
    })
  }

  getAUTHConfig = async () => {
    if (process.env.NODE_ENV === 'development') {
      return {
        user: 'handgod1995@gmail.com',
        pass: process.env.APP_PASSWORD,
      }
    } else {
      this.oAuth2Client = new auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REFRESH_URI)
      this.oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
      const accessToken = await this.oAuth2Client.getAccessToken()
      return {
        type: 'OAUTH2',
        user: MAIL_NAME,
        pass: MAIL_PASSWORD,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      }
    }
  }

  createTransport = async () => {
    return nodeMailer.createTransport(this.mailConfig)
  }

  sendWithAttachments = async ({ attachments, from, to, subject, html }) => {
    try {
      //sending
      // let attachments = validateFile(req.files) || []

      let validatedAttachments = this.validateFile(attachments)

      let params = {
        from: from || MAIL_NAME,
        to,
        subject,
        html,
        attachments: validatedAttachments,
      }

      let transport = await this.createTransport()

      return transport.sendMail(params)
    } catch (err) {
      throw err
    } finally {
      // await removeListFiles(attachments, true)
    }
  }

  sendWithFilesPath = async ({ from, to, subject, filesPath, html }) => {
    let attachmentsPath = this.convertPath(filesPath)

    try {
      let params = {
        from: from || MAIL_NAME, // sender address
        to,
        attachments: attachmentsPath,
        subject, // Subject line
        html, // html body,
      }

      let transport = await this.createTransport()

      return transport.sendMail(params)
    } catch (err) {
      console.log('withFilesPath failed ', err)
      for (let attach of attachments) {
        if (fs.existsSync(attach.pdfFile)) {
          fs.unlinkSync(attach.path)
        }
      }
      throw err
    } finally {
      await Order.updateOne({ _id: rest._id }, { send: 1 })
    }
  }

  sendMailWithCron = async ({ ...rest }) => {
    try {
      let params = {
        adminEmail: from || MAIL_NAME,
        ...rest,
      }
      await this.sendWithFilesPath(params)
    } catch (err) {
      console.log('cronMail error', err)
    }
  }

  sendMail = async ({ from, to, subject, html }) => {
    try {
      let params = {
        from: from || MAIL_NAME,
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
      let attachments = []

      let isPDF = files.some((item) => item.mimetype === 'application/pdf')

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
    let result = filesPath.map(({ pdfFile, name }) => {
      let fileSplit = pdfFile.split('.')

      let ext = fileSplit[fileSplit.length - 1]

      return { path: pdfFile, filename: `${name}.${ext}` }
    })

    return result
  }
}
