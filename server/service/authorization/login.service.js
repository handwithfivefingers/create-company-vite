const { generateOTP, generateToken } = require('../../common/helper')
const { OTP, User } = require('../../model')
const MailService = require('@server/controller/user/Sendmail')
const SMSService = require('../sms.service')
const OTP_TYPE = {
  1: 'SMS',
  2: 'EMAIL',
}
module.exports = class LoginService {
  getUserOTPForLogin = async (req, res) => {
    try {
      let { email, phone, type } = req.body

      let message = ''

      let _otp = await OTP.findOne({ email, phone, type, delete_flag: 0 })

      let _user = await User.findOne({ email, phone })

      if (!_user) throw { message: 'Số điện thoại hoặc email không chính xác' }

      if (_otp) throw { message: 'OTP đã được gửi, vui lòng thử lại sau' }

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
          email: _user.email,
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

  loginUserWithOtp = async (req, res) => {
    try {
      const { email, phone, otp } = req.body

      let _otp = await OTP.findOne({ email, phone, delete_flag: 0, otp })

      if (!_otp) throw { message: 'OTP đã hết hạn' }

      const _user = await User.findOne({ email, phone })

      if (!_user) throw { message: 'Tài khoản không đúng' }

      let _tokenObj = { _id: _user._id, role: _user.role, updatedAt: _user.updatedAt }

      await OTP.updateOne({ _id: _otp._id }, { delete_flag: 1 })

      await generateToken(_tokenObj, res)

      let _userData = {
        _id: _user._id,
        name: _user.name,
        email: _user.email,
        phone: _user.phone,
        role: _user.role,
      }

      return {
        data: _userData,
        authenticate: true,
        callbackUrl: `/${_userData.role}`,
      }
    } catch (error) {
      console.log('loginUserWithOtp error', error)
      throw error
    }
  }

  isUserExist = async (req, res) => {
    try {
      const { phone, email, type } = req.body

      let _user
      if (+type === 1) {
        _user = await User.findOne({ phone, email })
      } else {
        _user = await User.findOne({ phone })
      }

      if (_user)
        return {
          status: true,
        }

      throw { message: 'User not exists', status: false }
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }
}
