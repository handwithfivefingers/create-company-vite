const axios = require('axios')
const http = require('http')
const https = require('https')
const LogService = require('../user/log.service')
const ESMS = {
  API_KEY: 'BB46E3C6BB6D587D4B22A63DE9EEC0',
  SECRET_KEY: 'EDCE522055CFADEEA2A0B165199D59',
}
module.exports = class SMSService {
  constructor() {
    this.speedSMSToken = 'av6HwCEfUmaLNEGaZxdbZ_XLgyFagIL7'
    this.BASE_URL = 'https://api.speedsms.vn'
    this.BASE_PATH = '/index.php/sms/send'
  }

  sendSMS = function ({ phones, content, type, sender }) {
    const url = 'api.speedsms.vn'
    let response
    var params = JSON.stringify({
      to: phones,
      content: content,
      sms_type: type,
      sender: sender,
    })

    var buf = new Buffer.from(this.speedSMSToken + ':x')
    var auth = 'Basic ' + buf.toString('base64')
    const options = {
      hostname: url,
      port: 443,
      path: '/index.php/sms/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
    }

    const req = https.request(options, function (res) {
      res.setEncoding('utf8')
      var body = ''
      res.on('data', function (d) {
        body += d
      })
      res.on('end', function () {
        var json = JSON.parse(body)
        if (json.status == 'success') {
          console.log('send sms success')
        } else {
          console.log('send sms failed ' + body)
        }
      })
    })
    // new LogService().createLogs({ url: 'Send SMS', ip: 'Send SMS', request:  req, response: })
    req.on('error', function (e) {
      console.log('send sms failed: ' + e)
    })

    req.write(params)
    req.end()
  }

  sms = async ({ to, content, sms_type, sender }) => {
    try {
      const params = {
        to,
        content,
        sms_type,
        sender,
      }
      const resp = await axios.post()
    } catch (error) {}
  }

  sendESMS = async ({ phone, code, Brandname = 'Baotrixemay', Unicode = 0 }) => {
    try {
      const params = {
        ApiKey: ESMS.API_KEY,
        SecretKey: ESMS.SECRET_KEY,
        Sandbox: process.env.NODE_ENV !== 'development' ? 0 : 1,
        SmsType: 2,
        Unicode,
        Brandname,
        Content: `${code} la ma xac minh dang ky Baotrixemay cua ban`,
        Phone: phone,
      }
      const url = 'http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/'
      const resp = await axios.post(url, { ...params })
      return resp.data
    } catch (error) {
      throw error
    }
  }
}
