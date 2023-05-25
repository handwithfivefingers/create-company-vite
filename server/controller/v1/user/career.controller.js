const CareerService = require('@service/v1/user/career.service')

module.exports = class CareerController {
  constructor() {}

  onHandleCreateCareer = async (req, res) => {
    try {
      const data = await new CareerService().onCreateCareer(req, res)

      return res.status(200).json({
        data,
      })
    } catch (error) {
      return res.status(400).json({
        error,
      })
    }
  }
  onHandleEditCareer = async (req, res) => {
    try {
      const data = await new CareerService().onEditCareer(req)

      return res.status(200).json({
        data,
      })
    } catch (error) {
      return res.status(400).json({
        error,
      })
    }
  }
  onHandleDeleteCareer = async (req, res) => {
    try {
      const data = await new CareerService().onDeleteCareer(req)
      return res.status(200).json({
        data,
      })
    } catch (error) {
      return res.status(400).json({
        error,
      })
    }
  }
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
