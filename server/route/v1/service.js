const express = require('express')

const { upload, requireSignin } = require('@middleware/index')

const Province = require('@controller/Service/Province')

const MailService = require('@controller/user/Sendmail')

const PaymentService = require('@controller/Service/Payment')

const FileTemplateService = require('@controller/Service/FileTemplate')

const PuppeteerController = require('@controller/Service/Puppeteer')

const { validateIPNVnpay } = require('../../middleware')

const router = express.Router()

router.post('/sendmail', upload.array('attachments', 5), new MailService().sendmailWithAttachments)

router.post('/payment', requireSignin, new PaymentService().testPayment)

router.get('/return_vnp', requireSignin, new PaymentService().getUrlReturn)

router.post('/service/order', new FileTemplateService().checkingOrder)

router.get('/service/payment/ipn_url', validateIPNVnpay, new PaymentService().getIPNUrl)

router.get('/service/province', requireSignin, new Province().getProvince)

router.post('/service/search', requireSignin, new PuppeteerController().search)

module.exports = router
