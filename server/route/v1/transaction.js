const express = require('express')
const router = express.Router()
const TransactionController = require('@controller/v1/user/transaction.controller')

router.get('/', new TransactionController().getTransaction)

module.exports = router
