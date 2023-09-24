const { CareerCategory, Career } = require('@model')
const { successHandler } = require('@response')
const { errHandler } = require('@response')

module.exports = class CareerCategoryService {
  getCareerCategory = async (req, res) => {
    try {
      let _cate = await CareerCategory.find({ delete_flag: { $ne: 1 } })

      // return successHandler(_cate, res)
      return _cate
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  getSingleCareerCategory = async (req, res) => {
    try {
      let { id } = req.params

      let _cate = await Career.find({
        category: { $all: id },
      })
      return _cate
    } catch (err) {
      throw err
    }
  }
  onGetListCareerCategory = async (req, res) => {
    try {
      const { category } = req.body
      console.log(category)
      let _cate = await Career.find({
        category: { $in: category },
      })
      return _cate
    } catch (err) {
      throw err
    }
  }
}
