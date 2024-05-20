const PROVINCE = require('../../../../uploads/mockdata/province.json')
const { sortBy } = require('lodash')
module.exports = class ProvinceService {
  getProvince = async (req, res) => {
    try {
      const newProvince = JSON.parse(JSON.stringify(PROVINCE))
      let data = newProvince.map(({ districts, ...item }) => ({ ...item }))
      let { code, wards } = req.query
      if (code) {
        data = this.getDistrict(PROVINCE, code)
        if (wards) {
          let wardData = this.getDistrict(PROVINCE, code, true)
          data = this.getWards(wardData, wards)
        }
      }
      return res.status(200).json({
        data,
        count: data.length,
      })
    } catch (err) {
      console.log(err)
      // return res.sendStatus(500)
      throw err
    }
  }
  /**
   * Lấy thông tin Quận huyện
   */
  getDistrict = (data, disCode = null, getWards = false) => {
    let result = []

    let [_districts] = data.filter((item) => item.code === Number(disCode))

    let { districts } = _districts

    result = districts?.map(({ wards, ...item }) => ({
      ...item,
      wards: getWards ? [...wards] : [],
    }))

    return sortBy(result, 'codename')
  }

  /**
   * Lấy thông tin Phường Xã
   */
  getWards = (_districts, wardCode = null) => {
    let result = []

    let [_wards] = _districts?.filter((item) => item.code === Number(wardCode))

    if (_wards && _wards.wards) {
      result = _wards.wards
    }
    return result
  }
}
