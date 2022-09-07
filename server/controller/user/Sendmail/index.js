const fs = require('fs')
const { removeFile, errHandler } = require('../../../response')
const { TemplateMail, Order } = require('../../../model')
const { auth } = require('googleapis').google
const nodeMailer = require('nodemailer')
const dotenv = require('dotenv')
const { removeListFiles } = require('../../../common/helper')

// *Useful for getting environment vairables
dotenv.config()

const { GG_REFRESH_TOKEN: REFRESH_TOKEN, GG_REFRESH_URI: REFRESH_URI, GG_EMAIL_CLIENT_ID: CLIENT_ID, GG_EMAIL_CLIENT_SECRET: CLIENT_SECRET, MAIL_NAME, MAIL_PASSWORD } = process.env

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
    // transporter = nodeMailer.createTransport()
  }

  createTransport = async () => {
    const accessToken = await this.oAuth2Client.getAccessToken()

    this.mailConfig.auth = {
      ...this.mailConfig.auth,
      accessToken,
    }

    return nodeMailer.createTransport(mailConfig)
  }

  sendmailWithAttachments = async (req, res, { type = 'attachments', ...rest }) => {
    try {
      if (type == 'attachments') {
        let params = {
          adminEmail: MAIL_NAME,
          ...req.body,
        }

        return this.withAttachments(req, res, params)
      } else if (type == 'path') {
        let params = { adminEmail: MAIL_NAME, ...rest }

        return this.withFilesPath(params)
      } else if (type == 'any') {
        let params = {
          adminEmail: MAIL_NAME,
          email: rest.email,
          subject: rest.subject,
          content: rest.content,
          redirect: rest?.redirect,
          ...rest,
        }

        return this.sendMail(req, res, params)
      }
    } catch (err) {
      console.log('error 1', err)
      throw err
    }

    // validate file
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
      console.log('cron failed', err)
    }
  }

  withAttachments = async (req, res, { adminEmail, email, subject, content, redirect }) => {
    let attachments

    try {
      let validFiles = req.files.some((item) => item.mimetype !== 'application/pdf')

      if (validFiles) {
        await req.files.map((file) => removeFile(file.path))
      }

      if (!validFiles) {
        attachments = req.files.map((file) => {
          return { filename: file.originalname, path: file.path }
        })
      }

      //sending

      await this.createTransport().sendMail({
        from: adminEmail, // sender address
        attachments,
        to: email,
        subject: subject, // Subject line
        html: content, // html body,
      })
    } catch (err) {
      throw err
    } finally {
      await removeListFiles(attachments, true)
    }
  }

  sendMail = async (req, res, { adminEmail, email, subject, content, redirect, ...rest }) => {
    try {
      // console.log("send");
      return await this.createTransport().sendMail({
        from: adminEmail, // sender address
        to: email,
        subject: subject, // Subject line
        html: content, // html body,
      })
    } catch (err) {
      console.log('sendMail failed')
      throw err
    }
  }

  withFilesPath = async (params) => {
    let { adminEmail, email, subject, content, filesPath, redirect, removeFiles, ...rest } = params

    let attachments = this.convertPath(filesPath)

    try {
      return await this.createTransport().sendMail({
        from: adminEmail, // sender address
        to: email,
        attachments,
        subject: subject, // Subject line
        html: content, // html body,
      })
    } catch (err) {
      console.log('send mail failed ', err)

      for (let attach of attachments) {
        if (fs.existsSync(attach.pdfFile)) {
          fs.unlinkSync(attach.path)
        }
      }

      throw err
    } finally {
      await Order.updateOne({ _id: rest._id }, { send: 1 })
      console.log('sendmail success')
    }
  }

  convertPath = (filesPath) => {
    let result = filesPath.map((file) => {
      let ext = file.pdfFile.split('.')[file.pdfFile.split('.').length - 1]
      return { path: file.pdfFile, filename: `${file.name}.${ext}` }
    })
    return result
  }
}
