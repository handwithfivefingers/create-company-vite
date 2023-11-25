const TestService = require('../../../service/v1/user/test.service')
module.exports = class TestController {
  testOrderProcessSuccess = async (req, res) => {
    try {
      const data = await new TestService().testOrderProcessSuccess(req, res)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(400).json({
        error,
      })
    }
  }
}
