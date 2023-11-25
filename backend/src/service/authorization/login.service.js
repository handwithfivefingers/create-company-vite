const { generateOTP, generateToken } = require('../../common/helper')
const { OTP, User } = require('../../model')
const SMSService = require('../v1/third-connect/sms.service')
const MailService = require('../v1/user/mail.service')
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
        if ((currentTime - createDate) / 1000 < 60)
          throw { message: 'OTP đã được tạo gửi qua, vui lòng thử lại sau ít phút' }
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
        message = 'Chúng tôi đã gửi mã OTP qua số điện thoại, vui lòng kiểm tra tin nhắn !'
      } else if (type === OTP_TYPE[2]) {
        let mailTemplate = {
          html: `Mã xác thực của bạn là: ${otpObj.otp}`,
          subject: '[App Thành lập công ty] Xác thực tài khoản',
        }
        let mailParams = {
          to: _user.email,
          ...mailTemplate,
        }
        const resp = await new MailService().sendMail(mailParams)
        logs.request = mailParams
        logs.response = resp
        message = 'Chúng tôi đã gửi mã OTP qua email, vui lòng kiểm tra hộp thư !'
      }

      return { message, email: _user.email, phone: _user.phone }
    } catch (error) {
      logs.response = error
      console.log('getUserOTPForLogin error', error)
      throw error
    } finally {
      await new LogService().createLogs(logs)
    }
  }

  onLoginAsAdmin = async (req, res) => {
    try {
      const { phone, password } = req.body

      // const _user = await User.findOne({ phone: phone, role: 'admin' })
      // Will remove after BCT test
      const _user = await User.findOne({ phone })

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
