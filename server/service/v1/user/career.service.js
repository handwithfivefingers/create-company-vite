const { Career } = require('@model')

module.exports = class CareerService {
  constructor() {}

  onCreateCareer = async (req, res) => {
    try {
      const career = await Career.findOne({
        code: req.body.code,
      })

      if (career) throw { message: 'Career already exists' }

      const obj = {
        name: req.body.name,
        code: req.body.code,
      }

      const _career = new Career(obj)
      const data = await _career.save()

      //   return createdHandler(data, res)
      return data
    } catch (err) {
      //   return errHandler(err, res)
      console.log(' onCreateCareer service error', err)
      throw err
    }
  }
  onGetCareer = async (req) => {
    try {
      let _career = await Career.find().select('-__v -createdAt -updatedAt')

      return _career
    } catch (err) {
      console.log('CareerService onGetCareer error :::', err)
      throw err
    }
  }
  onEditCareer = async (req) => {
    try {
      let { id } = req.params
      const _update = {
        name: req.body.name,
        code: req.body.code,
      }

      let _updated = await Career.updateOne({ _id: id }, _update, { new: true })

      return _updated
    } catch (e) {
      console.log('CareerService onEditCareer error', e)
      //   return errHandler(e, res)
      throw e
    }
  }
  onDeleteCareer = async (req) => {
    try {
      let { id } = req.params

      await Career.findOneAndDelete({ _id: id })

      return true
      
    } catch (e) {
      console.log('CareerService onDeleteCareer error', e)
      throw e
    }
  }
}
