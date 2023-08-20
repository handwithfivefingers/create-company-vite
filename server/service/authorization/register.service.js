const shortid = require('shortid')
const { User, OTP } = require('../../model')
const bcrypt = require('bcryptjs')
const SMSService = require('../sms.service')
const { generateOTP, generateToken } = require('../../common/helper')
const MailService = require('@server/controller/user/Sendmail')

const OTP_TYPE = {
  1: 'SMS',
  2: 'EMAIL',
}
module.exports = class RegiserService {
  getUserOTPForRegister = async (req, res) => {
    try {
      const { email, phone, type } = req.body

      const msg = {
        phoneError: 'Số điện thoại không chính xác',
        otpError: 'OTP đã được gửi, vui lòng thử lại sau',
      }

      let message, _otp, _user

      if (!phone) throw { message: msg.phoneError }

      _otp = await OTP.findOne({ phone, type, delete_flag: 0 })

      if (_otp) throw { message: msg.otpError }

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
        const TYPE_SENDER = 3
        const SENDER = 'SPEEDSMS'

        await new SMSService().sendSMS({
          phones: [phone],
          content: `Ma xac thuc SPEEDSMS cua ban la ${otpObj.otp}`,
          type: TYPE_SENDER,
          sender: SENDER,
        })

        message = 'OTP đã được gửi qua tài khoản Số điện thoại của bạn !'
      } else if (type === OTP_TYPE[2]) {
        let mailTemplate = {
          content: `Mã xác thực của bạn là: ${otpObj.otp}`,
          subject: '[App Thành lập công ty] Xác thực tài khoản',
        }

        let mailParams = {
          email: email,
          type: 'any',
          ...mailTemplate,
        }

        await new MailService().sendmailWithAttachments(req, res, mailParams)

        message = 'OTP đã được gửi qua tài khoản email của bạn !'
      }

      return { message }
    } catch (error) {
      console.log('getUserOTPForLogin error', error)
      throw error
    }
  }

  registerUser = async (req, res) => {
    try {
      const { phone, email, otp, deleteOldUser } = req.body
      // console.log('register', req.body)
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
