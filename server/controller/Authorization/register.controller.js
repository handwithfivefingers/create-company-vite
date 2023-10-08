const RegisterService = require('@service/authorization/register.service')
const { signToken } = require('@common/helper')
module.exports = class RegisterController {
  constructor() {}

  onHandleGetRegisterOtp = async (req, res) => {
    try {
      const data = await new RegisterService().getUserOTPForRegister(req, res)
      const tokenVerify = await signToken(
        { email: data.email, phone: data.phone, deleteOldUser: data.deleteOldUser, method: 'REGISTER' },
        { expiresIn: '5m' },
      )
      res.cookie('verifyToken', tokenVerify, {
        maxAge: 1000 * 60 * 5, // 5 Mins
      })
      return res.status(200).json({
        data: {
          message: data.message,
        },
      })
    } catch (error) {
      console.log('error', error)
      return res.status(400).json({
        ...error,
      })
    }
  }
}
