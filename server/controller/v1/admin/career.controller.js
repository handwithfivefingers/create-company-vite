const { errHandler, successHandler } = require('@response')
const { AdminCareerService } = require('@service')

module.exports = class AdminCareerController {
  onHandleGet = async (req, res) => {
    try {
      const data = await new AdminCareerService().getCareer()
      return successHandler(data, res)
    } catch (error) {
      console.log(error)
      return errHandler(error, res)
    }
  }
  // onHandleGetById = async (req, res) => {
  //   try {
  //     const data = await new AdminCareerService().getCareerCateById(req, res)
  //     return successHandler(data, res)
  //   } catch (error) {
  //     return errHandler(error, res)
  //   }
  // }
  onHandleCreate = async (req, res) => {
    try {
      const data = await new AdminCareerService().createCareer(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onHandleUpdate = async (req, res) => {
    try {
      const data = await new AdminCareerService().updateCareer(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
  onHandleDelete = async (req, res) => {
    try {
      const data = await new AdminCareerService().deleteCareer(req)
      return successHandler(data, res)
    } catch (error) {
      return errHandler(error, res)
    }
  }
}

// backup

// "data":
