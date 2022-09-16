const { Career } = require('@model')
const { updatedHandler, errHandler, successHandler, createdHandler, existHandler, deletedHandler } = require('@response')

module.exports = class CareerAdmin {
  createCareer = async (req, res) => {
    try {
      const career = await Career.findOne({
        code: req.body.code,
      })

      if (career) throw 'Career already exists'

      const obj = {
        name: req.body.name,
        code: req.body.code,
      }

      const _career = new Career(obj)
      const data = await _career.save()

      return createdHandler(data, res)
    } catch (err) {
      return errHandler(err, res)
    }
  }

  fetchCareer = async (req, res) => {
    try {
      let _career = await Career.find().select('-__v -createdAt -updatedAt')
      return successHandler(_career, res)
    } catch (err) {
      console.log('fetch error', err)
      return errHandler(err, res)
    }
  }

  editCareer = async (req, res) => {
    try {
      let { id } = req.params
      const _update = {
        name: req.body.name,
        code: req.body.code,
      }

      let _updated = await Career.updateOne({ _id: id }, _update, { new: true })

      return updatedHandler(_updated, res)
    } catch (e) {
      console.log('editCareer error')
      return errHandler(e, res)
    }
  }

  deleteCareer = async (req, res) => {
    try {
      let { id } = req.params

      await Career.findOneAndDelete({ _id: id })

      return deletedHandler('', res)
    } catch (e) {
      console.log('deleteCareer error')
      return errHandler(e, res)
    }
  }
}
