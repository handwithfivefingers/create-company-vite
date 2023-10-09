const AdminTransactionService = require('../../../service/v1/admin/transaction.service')

module.exports = class AdminTransactionController {
  onGetTransactions = async (req, res) => {
    try {
      const data = await new AdminTransactionService(req).getTransaction(req)
      return res.status(200).json({
        data,
      })
    } catch (error) {
      return res.status(400).json({
        error,
      })
    }
  }

  onUpdateTransaction = async (req, res) => {
    try {
      const data = await new AdminTransactionService(req).updateTransaction(req)
      return res.status(200).json({
        data,
      })
    } catch (error) {
      console.log('onUpdateTransaction function error', error)
      return res.status(400).json({
        error,
      })
    }
  }
}
