const express = require('express')

const { upload, requireSignin } = require('../../middleware/index')

const { getProvince, checkingOrder, testPayment, getUrlReturn } = require('../../controller/Service')


const MailService = require('../../controller/user/Sendmail')

const { sendmailWithAttachments } = new MailService()

const router = express.Router()

router.post('/sendmail', upload.array('attachments', 5), sendmailWithAttachments)

router.post('/payment', requireSignin, upload.none(), testPayment)

router.get('/return_vnp', requireSignin, upload.none(), getUrlReturn)

router.post('/service/order', checkingOrder)

router.get('/service/province', getProvince)

module.exports = router
