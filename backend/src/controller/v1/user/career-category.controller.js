const CareerCategoryService = require('../../../service/v1/user/career-category.service')
const { successHandler, errHandler } = require('../../../response')

module.exports = class CareerCategoryController {
  constructor() {}

  onHandleGetCareerCategory = async (req, res) => {
    try {
      const data = await new CareerCategoryService().getCareerCategory(req, res)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onHandleGetSingleCareerCategory = async (req, res) => {
    try {
      const data = await new CareerCategoryService().getSingleCareerCategory(req, res)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onHandleGetListCareerCategory = async (req, res) => {
    try {
      const data = await new CareerCategoryService().onGetListCareerCategory(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
}
