const CareerService = require('@service/v1/user/career.service')

module.exports = class CareerController {
  constructor() {}
  onHandleGetCareer = async (req, res) => {
    try {
      const data = await new CareerService().onGetCareer(req)

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
