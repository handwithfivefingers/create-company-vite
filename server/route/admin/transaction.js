const express = require('express')
const AdminTransactionController = require('../../controller/v1/admin/transaction.controller')
const router = express.Router()

router.get('/', new AdminTransactionController().onGetTransactions)

module.exports = router
