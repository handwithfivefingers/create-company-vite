const express = require('express')

const { upload, requireSignin } = require('@middleware/index')

const Province = require('@controller/Service/Province')

const MailService = require('@controller/user/Sendmail')

const PaymentService = require('@controller/Service/Payment')

const FileTemplateService = require('@controller/Service/FileTemplate')

const PuppeteerController = require('@controller/Service/Puppeteer')

const { checkingOrder } = new FileTemplateService()

const { testPayment, getUrlReturn, getIPNUrl } = new PaymentService()

const { getProvince } = new Province()

const { sendmailWithAttachments } = new MailService()

const { search } = new PuppeteerController()

const router = express.Router()

router.post('/sendmail', upload.array('attachments', 5), sendmailWithAttachments)

router.post('/payment', requireSignin, testPayment)

router.get('/return_vnp', requireSignin, getUrlReturn)

// router.get('/return_vnp', requireSignin, getUrlReturn)

router.post('/service/order', checkingOrder)

router.get('/service/payment/ipn_url', getIPNUrl)

router.get('/service/province', requireSignin, getProvince)

router.post('/service/search', requireSignin, search)

module.exports = router
