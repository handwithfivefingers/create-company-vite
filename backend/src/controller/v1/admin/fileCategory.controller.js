const { errHandler, successHandler } = require('../../../response')
const AdminFileCategoryService = require('../../../service/v1/admin/fileCategory.service')

module.exports = class AdminFileCategoryController {
  onHandleGet = async (req, res) => {
    try {
      const data = await new AdminFileCategoryService(req).getFileCategory()
      return successHandler(data, res)
    } catch (error) {
      console.log(error)
      return errHandler(error, res)
    }
  }

  onHandleCreate = async (req, res) => {
    try {
      const data = await new AdminFileCategoryService(req).createFileCategory(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }

  // onHandleUpdate = async (req, res) => {
  //   try {
  //     const data = await new AdminFileCategoryService(req).updateCareerCate(req)
  //     return successHandler(data, res)
  //   } catch (error) {
  //     return errHandler(error, res)
  //   }
  // }
  // onHandleDelete = async (req, res) => {
  //   try {
  //     const data = await new AdminFileCategoryService(req).deleteCareerCate(req)
  //     return successHandler(data, res)
  //   } catch (error) {
  //     return errHandler(error, res)
  //   }
  // }
}

// backup

// "data":
