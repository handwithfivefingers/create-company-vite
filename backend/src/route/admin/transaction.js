const express = require('express')
const router = express.Router()
const AdminTransactionController = require('../../controller/v1/admin/transaction.controller')

router.get('/', new AdminTransactionController().onGetTransactions)
router.post('/:_id', new AdminTransactionController().onUpdateTransaction)

module.exports = router
