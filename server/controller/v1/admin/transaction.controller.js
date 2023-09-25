const AdminTransactionService = require('../../../service/v1/admin/transaction.service')

module.exports = class AdminTransactionController {
  onGetTransactions = async (req, res) => {
    try {
      const data = await new AdminTransactionService().getTransaction(req)
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
