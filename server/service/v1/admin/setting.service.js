const { Setting } = require('@model')

module.exports = class SettingService {
  updateSetting = async (req, res) => {
    try {
      let { ...rest } = req.body

      let _setting = await Setting.findOne({
        userOwner: req.id,
      })

      if (_setting) {
        await Setting.updateOne({ userOwner: req.id }, { ...rest }, { new: true })
      } else {
        let _obj = new Setting({
          userOwner: req.id,
          ...rest,
        })
        await _obj.save()
      }

      return {
        message: 'Cài đặt thành công',
      }
    } catch (err) {
      console.log('updateSetting error')
      throw err
    }
  }

  getSetting = async (req, res) => {
    if (req.role !== 'admin') return permisHandler(res)
    try {
      const listPopulate = ['mailRegister', 'mailPayment', 'mailPaymentSuccess', 'mailForgotPass']

      let _setting = await Setting.findOne({ userOwner: req.id }).populate(listPopulate).select(listPopulate)
      return _setting
    } catch (err) {
      console.log('getSettingMail error', err)
      throw err
    }
  }
}
