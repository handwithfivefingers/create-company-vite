const { verifyToken, generateToken, signToken } = require('../../common/helper')
const { OTP, User } = require('../../model')
const log = require('../../model/log')
const LogService = require('../v1/user/log.service')
const OTPService = require('./otp.service')
const RegiserService = require('./register.service')
const MailService = require('@service/v1/user/mail.service')

const METHOD = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
}
module.exports = class AuthenticateService {
  constructor() {}

  onVerifyToken = async (req, res) => {
    try {
      const token = req.cookies['verifyToken']
      const decoded = await verifyToken(token)

      if (!decoded) throw decoded

      const { email, phone, method, deleteOldUser } = decoded

      console.log('decoded', decoded)

      // throw new Error('Something went wrong')

      const data = {
        email,
        phone,
        deleteOldUser,
        otp: req.body.otp,
      }
      //
      let resp
      if (method === METHOD['REGISTER']) {
        resp = await this.onHandleRegister(req, res, data)
      } else if (method === METHOD['LOGIN']) {
        resp = await this.onHandleLogin(req, res, data)
      }
      return resp
    } catch (error) {
      throw error
    }
  }

  onVerificationResend = async (req, res) => {
    let logs = {
      url: '/v1/verification-resend',
      ip: req.remoteAddress,
      request: {},
      response: {},
    }
    try {
      const token = req.cookies['verifyToken']

      const decoded = await verifyToken(token)

      if (!decoded) throw decoded

      const { email, phone, method, deleteOldUser } = decoded

      await new OTPService().deleteOTP({ phone, delete_flag: 0 })

      const { otp } = await new OTPService().genOTP({ email, phone, time: 0 })

      let mailTemplate = {
        html: `Mã xác thực của bạn là: ${otp}`,
        subject: '[App Thành lập công ty] Xác thực tài khoản',
      }

      let mailParams = {
        to: email,
        ...mailTemplate,
      }

      const resp = await new MailService().sendMail(mailParams)

      const newToken = await signToken({ email, phone, method, deleteOldUser }, { expiresIn: '5m' })

      res.cookie('verifyToken', newToken, {
        maxAge: 1000 * 60 * 5, // 5 Mins
      })
      log.request = mailParams
      log.response = resp
      return resp
    } catch (error) {
      logs.response = error
      throw error
    } finally {
      await new LogService().createLogs(logs)
    }
  }

  onHandleLogin = async (req, res, data) => {
    try {
      const { email, phone, otp } = data

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
        role: result.role,
        callbackUrl: `/${result.role}`,
      }
    } catch (error) {
      console.log('onHandleLogin error', error)
      throw error
    } finally {
    }
  }

  onHandleRegister = async (req, res, data) => {
    try {
      const { otp, email, phone, deleteOldUser } = data
      let _OTP

      if (otp) {
        _OTP = await OTP.findOne({ phone, email, otp, delete_flag: 0 })
      }

      if (!_OTP) throw { message: 'Mã xác thực không chính xác' }

      _OTP.delete_flag = 1

      await _OTP.save()

      if (deleteOldUser) await new RegiserService().handleDeleteUserBeforeRegister({ email, phone })

      const { role, _id, updatedAt } = await new RegiserService().onRegister({ email, phone })

      let _tokenObj = { _id, role, updatedAt }

      await generateToken(_tokenObj, res)

      res.clearCookie('verifyToken')

      return {
        callbackUrl: `/${role}`,
        authenticate: true,
        role,
        message: 'Đăng kí thành công',
      }
    } catch (error) {
      console.log('onHandleRegister error', error)
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
      if (_user) {
        return {
          status: true,
        }
      }

      throw { message: 'User not exists', status: false }
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }
}
