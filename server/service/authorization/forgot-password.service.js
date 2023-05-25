const { generateOTP, generateToken, getTemplateMail } = require('../../common/helper')
const { OTP, User } = require('../../model')
const bcrypt = require('bcryptjs')
const MailService = require('@server/controller/user/Sendmail')

module.exports = class ForgotPasswordService {
  constructor() {}
  forgotPassword = async (req, res) => {
    try {
      let { email } = req.body

      let _user = await User.findOne({ email })

      if (!_user) throw { message: 'User does not exist' }

      await OTP.deleteMany({ email })

      let otpObj = new OTP({
        otp: generateOTP(),
        email,
      })

      let { content, subject } = await getTemplateMail('mailForgotPass')

      await otpObj.save()

      // try to send mail

      let BASE_URL = process.env.NODE_ENV !== 'development' ? process.env.VITE_BASEHOST_PROD : 'http://localhost:3003'

      let mailParams = {
        email: _user.email,
        content: content
          .replace('{name}', _user.name)
          .replace('{otp}', otpObj.otp)
          .replace('{link}', `${BASE_URL}/forgot-password?step=2&email=${_user.email}`),
        subject,
        type: 'any',
      }

      await new MailService().sendmailWithAttachments(req, res, mailParams)

      return { message: 'OTP đã được gửi qua tài khoản email của bạn !' }
    } catch (error) {
      console.log('ForgotPassword', error)
      throw error
      // return errHandler(error, res)
    }
  }

  ValidateOTP = async (req) => {
    try {
      let { email, otp } = req.body

      if (!otp) throw { message: 'OTP không đúng' }

      let _user = await OTP.findOne({ email: email })

      if (!_user) throw { message: 'OTP đã hết hạn' }

      let _userOTP = _user.otp

      let isOTPValid = String(_userOTP) === String(otp)

      if (!isOTPValid) throw { message: 'OTP không đúng' }

      // res.sendStatus(200)

      return true
    } catch (error) {
      // return errHandler(error, res)
      throw error
    }
  }

  ResetPassword = async (req) => {
    try {
      let { password, confirm_password, email, otp } = req.body

      if (password !== confirm_password) throw { message: 'Mật khẩu không khớp' }

      let [_user] = await User.aggregate([
        {
          $match: {
            email: req.body.email,
          },
        },
        {
          $lookup: {
            from: 'otps',
            localField: 'email',
            foreignField: 'email',
            as: 'otp',
          },
        },
        { $unwind: { path: '$otp' } }, // Extract array to Object
      ])

      let isOTPValid = _user?.otp?.otp === otp || false

      if (!isOTPValid) throw { message: 'OTP không chính xác' }

      const hash_password = await bcrypt.hash(password, 10)

      await User.updateOne({ _id: _user._id }, { hash_password: hash_password })

      await OTP.deleteOne({ email: email })

      return {
        message: 'Thay đổi mật khẩu thành công',
      }
    } catch (error) {
      console.log('ResetPassword error ::', error)
      // return errHandler(error, res)
      throw error
    }
  }
}
