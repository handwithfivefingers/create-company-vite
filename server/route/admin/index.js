const MailRoute = require('./template')
const { requireSignin } = require('@middleware')
const express = require('express')
const router = express.Router()

router.use('/setting', requireSignin, require('./setting'))
router.use('/logs', requireSignin, require('./logs'))
router.use('/order', requireSignin, require('./order'))
// router.use('/file', requireSignin, require('./file'))
router.use('/user', requireSignin, require('./user'))
router.use('/product', requireSignin, require('./product'))
router.use('/career_cate', requireSignin, require('./careerCate'))
router.use('/career', requireSignin, require('./career'))
router.use('/category', requireSignin, require('./category'))
router.use('/transaction', requireSignin, require('./transaction'))
router.use('/template', requireSignin, require('./template'))
router.use('/file_category', requireSignin, require('./fileCategory'))
router.use('/file', requireSignin, require('./file'))
router.use('/sms', requireSignin, require('./sms'))


module.exports = {
  MailRoute,
  router,
}
