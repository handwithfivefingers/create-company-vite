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
    this.oAuth2Client = new auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REFRESH_URI)
    this.oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

    this.mailConfig = {
      service: 'gmail',
      auth: {
        type: 'OAUTH2',
        user: MAIL_NAME,
        pass: MAIL_PASSWORD,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
      },
    }
  }

  createTransport = async () => {
    const accessToken = await this.oAuth2Client.getAccessToken()

    this.mailConfig.auth = {
      ...this.mailConfig.auth,
      accessToken,
    }
    return nodeMailer.createTransport(this.mailConfig)
  }

  sendmailWithAttachments = async (req, res, { type = 'attachments', ...rest }) => {
    try {
      let params = {
        adminEmail: MAIL_NAME,
      }

      switch (type) {
        case 'attachments':
          params = { ...params, ...req.body }
          return this.withAttachments(req, res, params)
        case 'path':
          params = { ...params, ...rest }

          return this.withFilesPath(params)

        default:
          params = {
            ...params,
            email: rest.email,
            subject: rest.subject,
            content: rest.content,
            ...rest,
          }

          return this.sendMail(req, res, params)
      }
    } catch (err) {
      console.log('sendmailWithAttachments error ', err)
      throw err
    }

    // validate file
  }

  sendMailService = async (params) => {
    try {


      
    }

    catch(error) {
      console.log('sendMailService error ', err)
      throw err
    }
  }

  cronMail = async ({ ...rest }) => {
    try {
      let params = {
        adminEmail: MAIL_NAME,
        type: 'path',
        ...rest,
      }
      await this.withFilesPath(params)
    } catch (err) {
      console.log('cronMail error', err)
    }
  }

  withAttachments = async (req, res, { adminEmail, email, subject, content }) => {
    try {
      //sending
      let attachments = validateFile(req.files) || []

      let params = {
        from: adminEmail, // sender address
        attachments,
        to: email,
        subject: subject, // Subject line
        html: content, // html body,
      }

      await this.sendMailOnly(params)
    } catch (err) {
      throw err
    } finally {
      await removeListFiles(attachments, true)
    }
  }

  sendMail = async (req, res, { adminEmail, email, subject, content, ...rest }) => {
    try {
      let params = {
        from: adminEmail, // sender address
        to: email,
        subject: subject, // Subject line
        html: content, // html body,
      }
      await this.sendMailOnly(params)
    } catch (err) {
      console.log('sendMail failed')
      throw err
    }
  }

  withFilesPath = async (params) => {
    let { adminEmail, email, subject, content, filesPath, removeFiles, ...rest } = params

    let attachments = this.convertPath(filesPath)

    try {
      let params = {
        from: adminEmail, // sender address
        to: email,
        attachments,
        subject: subject, // Subject line
        html: content, // html body,
      }

      await this.sendMailOnly(params)
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

  sendMailOnly = async (params) => {
    try {
      let transport = await this.createTransport()
      return transport.sendMail({ ...params })
    } catch (err) {
      console.log('sendMailOnly error', err)
      throw err
    }
  }
}
