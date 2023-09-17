const ProvinceService = require('@service/v1/third-connect/province.service')

module.exports = class ProvinceController {
  constructor() {}

  onGetProvince = async (req, res) => {
    try {
      const data = await new ProvinceService().getProvince(req, res)
      return res.status(200).json(data)
    } catch (error) {}
  }
}
