const { RegisterService } = require('@service')

module.exports = class RegisterController {
  constructor() {}

  onHandleRegister = async (req, res) => {
    try {
      const { role, message } = await new RegisterService().registerUser(req, res)
      return res.status(200).json({
        role,
        message,
      })
    } catch (error) {
      return res.status(400).json({
        error,
      })
    }
  }
}
