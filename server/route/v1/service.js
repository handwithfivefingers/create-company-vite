const express = require('express')
const { upload, requireSignin, validateIPNVnpay } = require('@middleware')
const MailService = require('@service/v1/user/mail.service')
const PaymentController = require('@controller/v1/user/payment.controller')
// const FileTemplateService = require('@controller/Service/FileTemplate')
const PuppeteerController = require('@controller/v1/user/puppeteer.controller')
const ProvinceController = require('@controller/v1/user/province.controller')

const router = express.Router()

router.post('/sendmail', upload.array('attachments', 5), new MailService().sendWithAttachments)

// router.post('/payment', requireSignin, new PaymentService().testPayment)
router.get('/return_vnp', requireSignin, new PaymentController().getURLReturn)

router.get('/service/payment/ipn_url', validateIPNVnpay, new PaymentController().getIPNUrl)

router.get('/service/province', requireSignin, new ProvinceController().onGetProvince)

router.post('/service/search', requireSignin, new PuppeteerController().onSearch)

module.exports = router
