const { permisHandler, errHandler } = require('../response')
const { Setting } = require('../model')

const settingTemplateMail = async (req, res) => {
  try {
    let { mailRegister, mailPayment, mailPaymentSuccess } = req.body
    let _setting = await Setting.findOne({
      userOwner: req.id,
    })
    let data
    if (_setting) {
      data = await Setting.updateOne(
        { userOwner: req.id },
        { mailRegister, mailPayment, mailPaymentSuccess },
        { new: true },
      )
    } else {
      let _obj = new Setting({
        mailRegister,
        mailPayment,
        mailPaymentSuccess,
        userOwner: req.id,
      })
      data = await _obj.save()
    }

    return res.status(200).json({
      message: 'Cài đặt thành công',
    })
  } catch (err) {
    console.log('settingTemplateMail error')

    return errHandler(err, res)
  }
}

const getSettingMail = async (req, res) => {
  if (req.role !== 'admin') return permisHandler(res)
  try {

    let _setting = await Setting.findOne({ userOwner: req.id })
      .populate('mailRegister mailPayment mailPaymentSuccess')
      .select('mailRegister mailPayment mailPaymentSuccess')

    return res.status(200).json({
      message: 'ok',
      data: _setting,
    })
  } catch (err) {
    console.log('getSettingMail error', err)
    return errHandler(err, res)
  }
}

module.exports = {
  settingTemplateMail,
  getSettingMail,
}
