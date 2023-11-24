const shortid = require('shortid')
const { User, OTP } = require('../../model')
const bcrypt = require('bcryptjs')
const SMSService = require('../v1/third-connect/sms.service')
const { generateOTP, generateToken } = require('../../common/helper')
const MailService = require('../v1/user/mail.service')
const LogService = require('../v1/user/log.service')
const jwt = require('jsonwebtoken')

const OTP_TYPE = {
  1: 'SMS',
  2: 'EMAIL',
}
module.exports = class RegiserService {
  getUserOTPForRegister = async (req, res) => {
    let logs = {
      url: '/v1/register-otp',
      ip: req.remoteAddress,
      request: {},
      response: {},
    }

    try {
      const { email, phone, type, deleteOldUser } = req.body

      const msg = {
        phoneError: 'Số điện thoại không chính xác',
        otpError: 'OTP đã được gửi, vui lòng thử lại sau',
      }

      let message, _otp, _user

      if (!phone) throw { message: msg.phoneError }

      _otp = await OTP.findOne({ phone, type, delete_flag: 0 })

      if (_otp) {
        const createdDate = _otp._doc.createdAt
        const currentTime = new Date().getTime()
        const createDate = new Date(createdDate).getTime()
        if ((currentTime - createDate) / 1000 < 60) throw { message: msg.otpError }
        await _otp.remove()
      }

      let past3Min = new Date(new Date().getTime() - 180 * 1000)

      let time = req.body.type === OTP_TYPE[1] ? past3Min : new Date()

      let otpObj = new OTP({
        otp: generateOTP(),
        email,
        time,
        phone,
        type: req.body.type,
      })

      await otpObj.save()

      if (type === OTP_TYPE[1]) {
        const params = {
          phone,
          code: otpObj.otp,
        }
        const resp = await new SMSService().sendESMS(params)
        logs.request = params
        logs.response = resp
        message = 'OTP đã được gửi qua tài khoản Số điện thoại của bạn !'
      } else if (type === OTP_TYPE[2]) {
        let mailTemplate = {
          html: `Mã xác thực của bạn là: ${otpObj.otp}`,
          subject: '[App Thành lập công ty] Xác thực tài khoản',
        }

        let mailParams = {
          to: email,
          ...mailTemplate,
        }

        const resp = await new MailService().sendMail(mailParams)

        logs.request = mailParams
        logs.response = resp
        console.log('resp', resp)

        message = 'OTP đã được gửi qua tài khoản email của bạn !'
      }

      return { message, email, phone, deleteOldUser }
    } catch (error) {
      console.log('getUserOTPForLogin error', error)
      throw error
    } finally {
      await new LogService().createLogs(logs)
    }
  }

  registerUser = async (req, res) => {
    try {
      const { otp, deleteOldUser } = req.body

      let _OTP
      if (otp) {
        _OTP = await OTP.findOne({ phone, email, otp, delete_flag: 0 })
      }

      if (!_OTP) throw { message: 'Mã xác thực không chính xác' }

      _OTP.delete_flag = 1

      await _OTP.save()

      if (deleteOldUser) {
        await this.handleDeleteUserBeforeRegister({ phone, email })
      }

      var password = Math.random().toString(36).slice(-8)

      const hash_password = await bcrypt.hash(password, 10)

      let userName = shortid()

      const _obj = new User({
        phone,
        email,
        hash_password,
        name: userName,
      })

      const _save = await _obj.save()

      const { role, _id, updatedAt } = _save

      let _tokenObj = { _id, role, updatedAt }

      await generateToken(_tokenObj, res)

      return {
        role,
        message: 'Đăng kí thành công',
      }
    } catch (err) {
      console.log('Register Error', err)
      throw err
    }
  }

  onRegister = async ({ phone, email }) => {
    try {
      const password = Math.random().toString(36).slice(-8)
      const hash_password = await bcrypt.hash(password, 10)
      const userName = shortid()
      const _user = new User({
        phone,
        email,
        hash_password,
        name: userName,
      })
      const _save = await _user.save()
      const { role, _id, updatedAt } = _save
      return { role, _id, updatedAt }
    } catch (error) {
      throw error
    }
  }

  handleDeleteUserBeforeRegister = async ({ phone, email }) => {
    try {
      await User.updateOne(
        {
          phone,
          // email,
          delete_flag: 0,
        },
        {
          delete_flag: 1,
        },
      )
      return true
    } catch (error) {
      return false
    }
  }
}
