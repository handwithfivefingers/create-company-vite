const { CareerCategory } = require('@model')

module.exports = class CareerCategoryService {
  constructor() {}
  onGetCareerCate = async (req, res) => {
    try {
      return await CareerCategory.find({ delete_flag: { $ne: 1 } })
    } catch (err) {
      console.log('CareerCategoryService onGetCareerCate error :::', err)
      //   return errHandler(err, res)
      throw err
    }
  }
}
