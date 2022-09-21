const { existHandler, successHandler, errHandler, permisHandler, deletedHandler } = require('../../../response')
const { User } = require('../../../model')
const _ = require('lodash')

module.exports = class UserManageAdmin {
  PAGE_SIZE = 10

  constructor() {}

  fetchUser = async (req, res) => {
    try {
      const { page, ...condition } = req.body

      let current_page = (parseInt(page) - 1) * this.PAGE_SIZE

      let _user = await User.find({ delete_flag: { $ne: 1 }, _id: { $ne: req.id } })
        .select('-hash_password')
        .skip(current_page)
        .limit(this.PAGE_SIZE)
        .sort('-createdAt')

      let count = await User.find({ delete_flag: { $ne: 1 }, _id: { $ne: req.id } }).countDocuments()

      return successHandler({ _user, count, current_page: page || 1 }, res)
    } catch (e) {
      console.log('error stack', e)
      return errHandler(e, res)
    }
  }

  deleteUser = async (req, res) => {
    let { id } = req.params

    try {
      let _user = await User.findOneAndUpdate({ _id: id }, { delete_flag: 1 })

      if (_user) return deletedHandler(_user, res)
    } catch (err) {
      console.log(err)
      return errHandler(err, res)
    }
  }
}
