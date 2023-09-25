const { generateOTP, generateToken } = require('@common/helper')
const { OTP, User } = require('@model')
const SMSService = require('@service/v1/third-connect/sms.service')
const MailService = require('@service/v1/user/mail.service')
const bcrypt = require('bcryptjs')
const LogService = require('../v1/user/log.service')

const OTP_TYPE = {
  1: 'SMS',
  2: 'EMAIL',
}
module.exports = class LoginService {
  getUserOTPForLogin = async (req, res) => {
    let logs = {
      url: '/v1/login-otp',
      ip: req.remoteAddress,
      request: {},
      response: {},
    }
    try {
      const { email, phone, type } = req.body

      let message, _otp, _user

      if (phone) {
        _otp = await OTP.findOne({ phone, type, delete_flag: 0 })
        _user = await User.findOne({ phone })
      } else {
        _otp = await OTP.findOne({ email, phone, type, delete_flag: 0 })
        _user = await User.findOne({ email, phone })
      }

      if (!_user) throw { message: 'Số điện thoại hoặc email không chính xác' }

      if (_otp) {
        const createdDate = _otp._doc.createdAt
        const currentTime = new Date().getTime()
        const createDate = new Date(createdDate).getTime()
        if ((currentTime - createDate) / 1000 < 60) throw { message: 'OTP đã được gửi, vui lòng thử lại sau' }
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
          to: 'truyenmai95@gmail.com' || _user.email,
          ...mailTemplate,
        }

        const resp = await new MailService().sendMail(mailParams)

        logs.request = mailParams
        logs.response = resp

        message = 'OTP đã được gửi qua tài khoản email của bạn !'
      }

      return { message }
    } catch (error) {
      logs.response = error
      console.log('getUserOTPForLogin error', error)
      throw error
    } finally {
      await new LogService().createLogs(logs)
    }
  }

  loginUserWithOtp = async (req, res) => {
    try {
      const { email, phone, otp } = req.body
      let _otp, _user, _tokenObj, result

      if (phone) {
        _otp = await OTP.findOne({ phone, delete_flag: 0, otp })

        _user = await User.findOne({ phone, delete_flag: 0 })
      }

      if (!_otp) throw { message: 'OTP không chính xác hoặc đã hết hạn' }

      if (!_user) throw { message: 'Tài khoản không đúng' }

      _tokenObj = { _id: _user._id, role: _user.role, updatedAt: _user.updatedAt }

      await OTP.updateOne({ _id: _otp._id }, { delete_flag: 1 })

      await generateToken(_tokenObj, res)

      result = {
        _id: _user._id,
        name: _user.name,
        email: _user.email,
        phone: _user.phone,
        role: _user.role,
      }

      return {
        data: result,
        authenticate: true,
        callbackUrl: `/${result.role}`,
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

  onLoginAsAdmin = async (req, res) => {
    try {
      const { phone, password } = req.body

      const _user = await User.findOne({ phone: phone, role: 'admin' })

      if (!_user) throw { message: 'User doesnt exist' }

      if (!_user.hash_password) throw { message: 'User not config' }

      const isMatchPassword = await bcrypt.compare(password, _user.hash_password)

      if (!isMatchPassword) throw { message: 'Password doesnt correct' }

      await generateToken({ _id: _user._id, role: _user.role, updatedAt: _user.updatedAt }, res)

      const nextState = { ..._user._doc }

      delete nextState.hash_password

      return nextState
    } catch (error) {
      throw error
    }
  }
}
