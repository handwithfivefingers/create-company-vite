const { LoginService } = require('@service')
const { ForgotPasswordService } = require('../../service')

module.exports = class ForgotPasswordController {
  constructor() {}

  onHandleValiteOTP = async (req, res) => {
    try {
      const responseStatus = await new ForgotPasswordService().ValidateOTP(req)

      if (responseStatus) {
        return res.status(200).json({
          message: 'Validate OTP successully',
          status: true,
        })
      } else {
        throw { message: 'Some thing went wrong' }
      }
    } catch (error) {
      return res.status(400).json({
        error,
      })
    }
  }

  onHandleForgotPassword = async (req, res) => {
    try {
      const data = await new ForgotPasswordService().forgotPassword(req, res)
      return res.status(200).json({
        data,
      })
    } catch (error) {
      return res.status(400).json({
        error,
      })
    }
  }
  
  onHandleResetPassword = async (req, res) => {
    try {
      const data = await new ForgotPasswordService().ResetPassword(req)

      return res.status(200).json({
        data,
      })
    } catch (error) {
      return res.status(400).json({
        error,
      })
    }
  }
}
