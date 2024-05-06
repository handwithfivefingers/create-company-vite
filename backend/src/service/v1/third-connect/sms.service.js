const axios = require('axios')
const curlirize = require('axios-curlirize')
const BotService = require('../third-connect/bot.service')
const TelegramBot = new BotService()
const moment = require('moment-timezone')
const ESMS = {
  API_KEY: 'BB46E3C6BB6D587D4B22A63DE9EEC0',
  SECRET_KEY: 'EDCE522055CFADEEA2A0B165199D59',
}

curlirize(axios)

module.exports = class SMSService {
  apiPath = {
    sendSMS: `http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/`,
    balance: `http://rest.esms.vn/MainService.svc/json/GetBalance_json`,
  }
  constructor() {}

  templateSMS = ({ otp, hotline = '0914990318' }) => {
    return `(TLCT ONLINE) Nhap ma OTP ${otp} de xac thuc tai website app.thanhlapcongtyonline.vn . Chi tiet LH: ${hotline}. Quy khach vui long KHONG chia se ma voi ai.`
  }

  sendESMS = async ({ phone, code, Brandname = 'TLCT ONLINE', Unicode = 0 }) => {
    try {
      const params = {
        ApiKey: ESMS.API_KEY,
        SecretKey: ESMS.SECRET_KEY,
        Sandbox: 0,
        SmsType: 2,
        IsUnicode: Unicode,
        Brandname,
        Content: this.templateSMS({ otp: code }),
        Phone: phone,
      }
      console.log('sendESMS params', params)

      const resp = await axios.post(
        this.apiPath.sendSMS,
        { ...params },
        {
          headers: {
            'Content-Type': 'application/json;',
          },
        },
      )

      if (!resp.data || resp.data.CodeResult !== 200) {
        const msg = `
        <b>${moment().format('YYYY/MM/DD HH:mm:ss')}:</b>
         - IP: <code>${req.remoteAddress?.replace('::ffff:', '')}</code> 
         - URL:<code>${req.originalUrl} </code>
         - Description: <code>${JSON.stringify(resp.data)}</code>
   
         --------------------------------------------------------------------------------
         `

        TelegramBot.onSendMessage({ message: msg })
      }
      return resp.data
    } catch (error) {
      throw error
    }
  }

  getESMSBalance = async () => {
    try {
      const params = {
        ApiKey: ESMS.API_KEY,
        SecretKey: ESMS.SECRET_KEY,
      }
      const resp = await axios.post(this.apiPath.balance, { ...params })
      return resp.data
    } catch (error) {
      throw eror
    }
  }
}
