const { Career } = require('@model')

module.exports = class AdminCareerService {
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

      // return createdHandler(data, res)
      return data
    } catch (err) {
      throw err
      // return errHandler(err, res)
    }
  }

  getCareer = async () => {
    try {
      let _career = await Career.find().select('-__v -createdAt -updatedAt')

      const count = await Career.find({}).countDocuments()

      return { data: _career, count }

      // return successHandler({ data: _career, count }, res)
    } catch (err) {
      console.log('fetch error', err)
      throw err
      // return errHandler(err, res)
    }
  }

  updateCareer = async (req, res) => {
    try {
      let { id } = req.params
      const _update = {
        name: req.body.name,
        code: req.body.code,
      }

      let _updated = await Career.updateOne({ _id: id }, _update, { new: true })

      return _updated

      // return updatedHandler(_updated, res)
    } catch (e) {
      console.log('editCareer error')
      // return errHandler(e, res)
      throw e
    }
  }

  deleteCareer = async (req, res) => {
    try {
      let { id } = req.params

      await Career.findOneAndDelete({ _id: id })
      return {
        message: 'Deleted Success',
      }
      // return deletedHandler('', res)
    } catch (e) {
      console.log('deleteCareer error')
      throw e
      // return errHandler(e, res)
    }
  }

}
