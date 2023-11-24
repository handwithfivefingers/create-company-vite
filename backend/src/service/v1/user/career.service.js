const { Career } = require('../../../model')

module.exports = class CareerService {
  constructor() {}

  onGetCareer = async (req) => {
    try {
      let _career = await Career.find().select('-__v -createdAt -updatedAt')
      return _career
    } catch (err) {
      console.log('CareerService onGetCareer error :::', err)
      throw err
    }
  }
}
