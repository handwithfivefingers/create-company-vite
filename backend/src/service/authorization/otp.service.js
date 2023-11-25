const { OTP } = require('../../model')
const { generateOTP } = require('../../common/helper')

module.exports = class OTPService {
  constructor() {}

  genOTP = async ({ email, time, phone, type = 'EMAIL' }) => {
    try {
      let timeExpired = new Date(new Date().getTime() - time * 60 * 1000)

      const otpModels = new OTP({
        otp: generateOTP(),
        email,
        time: timeExpired,
        phone,
        type,
      })
      await otpModels.save()

      return { otp: otpModels.otp }
    } catch (error) {
      throw error
    }
  }

  deleteOTP = async (params) => {
    try {
      await OTP.updateOne(params, { delete_flag: 1 })
      return true
    } catch (error) {
      throw error
    }
  }
}
