const CategoryService = require('@service/v1/user/category.service')
const { successHandler, errHandle } = require('@response')
module.exports = class CategoryController {
  onGetCategory = async (req, res) => {
    try {
      const data = await new CategoryService().getCategories(req, res)
      return successHandler(data, res)
    } catch (error) {
      return errHandle(error, res)
    }
  }
  onGetCategoriesBySlug = async (req, res) => {
    try {
      const data = await new CategoryService().getCategoriesBySlug(req, res)
      return res.status(200).json(data)
    } catch (error) {
      return errHandle(error, res)
    }
  }
}
