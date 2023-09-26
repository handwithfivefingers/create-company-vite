module.exports = class BaseAdminService {
  constructor(req) {
    if (req.role !== 'admin') throw { message: 'Bạn không có quyền truy cập' }
    return this
  }
}
