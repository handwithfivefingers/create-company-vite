const { successHandler, errHandler } = require('@response')
const UserService = require('@service/v1/admin/user.service')

module.exports = class UserManageAdmin {
  PAGE_SIZE = 10

  constructor() {}

  onGetUser = async (req, res) => {
    try {
      const data = await new UserService(req).getUser(req)
      return successHandler(data, res)
    } catch (e) {
      console.log('error stack', e)
      return errHandler(e, res)
    }
  }

  onDeleteUser = async (req, res) => {
    try {
      const data = await new UserService(req).deleteUser(req)
      return successHandler(data, res)
    } catch (err) {
      console.log(err)
      return errHandler(err, res)
    }
  }
}
