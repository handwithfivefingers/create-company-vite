const axios = require('axios')
const http = require('http')
const https = require('https')
module.exports = class SMSService {
  constructor() {
    this.speedSMSToken = 'av6HwCEfUmaLNEGaZxdbZ_XLgyFagIL7'
  }

  sendSMS = function ({ phones, content, type, sender }) {
    var url = 'api.speedsms.vn'
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

    req.on('error', function (e) {
      console.log('send sms failed: ' + e)
    })

    req.write(params)
    req.end()
  }
  // sendSMS = async ({ phone, content, type, sender }) => {
  //   try {
  //     let url = 'https://api.speedsms.vn' + '/index.php/sms/send'
  //     let buf = new Buffer.from(this.speedSMSToken + ':x')
  //     let auth = 'Basic ' + buf.toString('base64')

  //     console.log(auth)
  //     const result = ''
  //     // const result = await axios({
  //     //   method: 'post',
  //     //   url,
  //     //   data: JSON.stringify({
  //     //     phone,
  //     //     content,
  //     //     type,
  //     //     sender,
  //     //   }),
  //     //   headers: {
  //     //     'Content-Type': 'application/json',
  //     //     Authorization: auth,
  //     //   },
  //     // })

  //     // const result = await axios.post(
  //     //   url,
  //     //   { phone, content, type, sender },
  //     //   {
  //     //     headers: {
  //     //       'Content-Type': 'application/json',
  //     //       Authorization: auth,
  //     //     },
  //     //   },
  //     // )
  //     return result
  //   } catch (error) {
  //     console.log('sendSMS error', error)
  //     throw error
  //   }
  // }
}
