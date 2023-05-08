const { generateOTP } = require('../../common/helper')
const { OTP, User } = require('../../model')
const MailService = require('@server/controller/user/Sendmail')

module.exports = class LoginService {
  constructor() {}

  getUserOTPForLogin = async (req, res) => {
    try {
      let { email } = req.body

      let _user = await User.findOne({ email })

      await OTP.deleteMany({ email: email }) // Clear all OTP

      let otpObj = new OTP({
        otp: generateOTP(),
        email,
        time: new Date(),
      })

      let mailTemplate = {
        content: `Mã xác thực của bạn là: ${otpObj.otp}`,
        subject: '[App Thành lập công ty] Xác thực tài khoản',
      }

      await otpObj.save()

      let mailParams = {
        email: _user.email,
        type: 'any',
        ...mailTemplate,
      }

      await new MailService().sendmailWithAttachments(req, res, mailParams)

      return successHandler({ message: 'OTP đã được gửi qua tài khoản email của bạn !' }, res)
    } catch (error) {
      console.log('getUserOTPForLogin error', error)
      return errHandler(error, res)
    }
  }

  Authenticate = async (req, res) => {
    return res.status(200).json({
      authenticate: true,
      role: req.role,
    })
  }
}
