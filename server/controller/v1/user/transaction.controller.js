const { successHandler, errHandler } = require('@response')
const TransactionService = require('@service/v1/user/transaction.service')

module.exports = class TransactionController {
  getTransaction = async (req, res) => {
    try {
      const data = await new TransactionService().getTransaction(req)
      return successHandler(data, res)
    } catch (error) {
      return res.status(400).json({ error })
    }
  }
}
