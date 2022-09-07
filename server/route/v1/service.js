const express = require('express')

const { upload, requireSignin } = require('../../middleware/index')

// const { getProvince, checkingOrder, testPayment, getUrlReturn } = require('@server/controller/Service/index')

const { getUrlReturn, testPayment } = require('@server/controller/Service/payment')
const { checkingOrder } = require('@server/controller/Service/ReadAndWrite')
const { getProvince } = require('@server/controller/Service/province')

const MailService = require('../../controller/user/Sendmail')

const { sendmailWithAttachments } = new MailService()

const router = express.Router()

router.post('/sendmail', upload.array('attachments', 5), sendmailWithAttachments)

router.post('/payment', requireSignin, upload.none(), testPayment)

router.get('/return_vnp', requireSignin, upload.none(), getUrlReturn)

router.post('/service/order', checkingOrder)

router.get('/service/province', getProvince)

module.exports = router
