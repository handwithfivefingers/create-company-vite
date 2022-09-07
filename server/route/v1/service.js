const express = require('express')

const { upload, requireSignin } = require('@middleware/index')

// const { checkingOrder, testPayment, getUrlReturn } = require('@server/controller/Service')

const Province = require('@controller/Service/Province')

const MailService = require('@controller/user/Sendmail')

const PaymentService = require('@controller/Service/Payment')

const FileTemplateService = require('@controller/Service/FileTemplate')

const { checkingOrder } = new FileTemplateService()

const { testPayment, getUrlReturn } = new PaymentService()

const { getProvince } = new Province()

const { sendmailWithAttachments } = new MailService()

const router = express.Router()

router.post('/sendmail', upload.array('attachments', 5), sendmailWithAttachments)

router.post('/payment', requireSignin, upload.none(), testPayment)

router.get('/return_vnp', requireSignin, upload.none(), getUrlReturn)

router.post('/service/order', checkingOrder)

router.get('/service/province', getProvince)

module.exports = router
