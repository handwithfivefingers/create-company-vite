module.exports = class BaseAdminService {
  constructor({ role }) {
    console.log('role', role)
    if (role !== 'admin') throw { message: 'Bạn không có quyền truy cập' }
    return this
  }
}
