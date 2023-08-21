const { errHandler, successHandler } = require('@response')
const { AdminCategoryService } = require('@service')

module.exports = class AdminCategoryController {
  onHandleGetCategory = async (req, res) => {
    try {
      const data = await new AdminCategoryService().getCategory()
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onHandleCreateCategory = async (req, res) => {
    try {
      const data = await new AdminCategoryService().createCategory(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onHandleUpdateCategory = async (req, res) => {
    try {
      const data = await new AdminCategoryService().updateCategory(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onHandleDeleteCategory = async (req, res) => {
    try {
      const data = await new AdminCategoryService().hardDelete(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
}
