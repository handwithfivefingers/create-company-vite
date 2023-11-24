const { errHandler, successHandler } = require('../../../response')
const { AdminCareerCategoryService } = require('../../../service')

module.exports = class AdminCategoryController {
  onHandleGet = async (req, res) => {
    try {
      const data = await new AdminCareerCategoryService(req).getCareerCate()
      return successHandler(data, res)
    } catch (error) {
        console.log(error)
      return errHandler(error, res)
    }
  }
  onHandleGetById = async (req, res) => {
    try {
      const data = await new AdminCareerCategoryService(req).getCareerCateById(req, res)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onHandleCreate = async (req, res) => {
    try {
      const data = await new AdminCareerCategoryService(req).createCareerCate(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onHandleUpdate = async (req, res) => {
    try {
      const data = await new AdminCareerCategoryService(req).updateCareerCate(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onHandleDelete = async (req, res) => {
    try {
      const data = await new AdminCareerCategoryService(req).deleteCareerCate(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
}

// backup

// "data":
