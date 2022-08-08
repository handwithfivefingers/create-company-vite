const { findNestedObj } = require('../../common/helper')
const PROVINCE = require('../../../uploads/mockdata/province.json')
const { sortBy } = require('lodash')

const getProvince = async (req, res) => {
  try {
    let data = PROVINCE.map(({ districts, ...item }) => ({ ...item }))

    let { code, wards } = req.query

    if (code) {
      data = getDistrict(PROVINCE, code)
      if (wards) {
        let wardData = getDistrict(PROVINCE, code, true)
        data = getWards(wardData, wards)
      }
    }

    return res.status(200).json({
      data,
      count: data.length,
      // log,
    })
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
}
/**
 * Lấy thông tin Quận huyện
 */
const getDistrict = (data, disCode = null, getWards = false) => {
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
const getWards = (_districts, wardCode = null) => {
  let result = []

  let [_wards] = _districts?.filter((item) => item.code === Number(wardCode))

  if (_wards && _wards.wards) {
    result = _wards.wards
  }
  return result
}

module.exports = { getProvince }
