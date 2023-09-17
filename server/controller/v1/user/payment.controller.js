const PaymentService = require('@service/v1/user/payment.service')
// Will Include more Transfer , Momo
module.exports = class PaymentController {
  getURLReturn = async (req, res) => {
    try {
      await new PaymentService().getUrlReturn(req, res)
    } catch (error) {
      console.log('> getURLReturn', error)
    }
  }

  getIPNUrl = async (req, res) => {
    try {
      const data = new PaymentService().getIPNUrl(req, res)
      return res.status(200).json(data)
    } catch (error) {
      console.log('error')
      return res.status(400).json({
        ...error,
      })
    }
  }

  getTransaction = async (req, res) => {
    try {
      const data = await new PaymentService().getTransaction()
      return res.status(200).json({
        data,
      })
    } catch (error) {
      console.log('getTransaction', error)
      return res.status(400).json({
        error,
      })
    }
  }

  createTransaction = async (req, res) => {
    try {
      const data = await new PaymentService().createTransaction(req)
      return res.status(200).json({
        data,
      })
    } catch (error) {
      console.log('createTransaction', error)
      return res.status(400).json({
        error,
      })
    }
  }
}
