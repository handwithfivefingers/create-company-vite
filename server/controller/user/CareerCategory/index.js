const { CareerCategory, Career } = require('@server/model')
const { successHandler } = require('@server/response')
const { errHandler } = require('@server/response')

module.exports = class CareerCategoryClass {
  constructor() {}

  fetchCareer = async (req, res) => {
    try {
      let _cate = await CareerCategory.find({ delete_flag: { $ne: 1 } })
      return successHandler(_cate, res)
    } catch (err) {
      console.log(err);
      return errHandler(err, res)
    }
  }

  fetchSingleCareerCate = async (req, res) => {
    try {
      let { id } = req.params

      let _cate = await Career.find({
        category: { $all: id },
      })

      return successHandler(_cate, res)
    } catch (err) {
      return errHandler(err, res)
    }
  }

  createCareer = async (req, res) => {
    try {
      let { name, category } = req.body

      let _cate = await CareerCategory.findOne({ name })

      if (_cate) throw 'Category already exists'

      let _cateObj = new CareerCategory({
        name,
      })

      let _cateSaved = await _cateObj.save()

      if (category && category.length > 0) {
        let parentId = _cateSaved._id
        await this.updateCareer(category, parentId)
      }
      return successHandler(_cateSaved, res)
    } catch (err) {
      console.log(err)
      return errHandler(err, res)
    }
  }

  updateCareerCate = async (req, res) => {
    try {
      let { id } = req.params

      let { category } = req.body
      // step 1: Clear all item have _id

      const obj = {
        name: req.body.name,
      }
      // let objCate = await CareerCategory.findById({ _id: id })

      let data = await CareerCategory.updateOne({ _id: id }, obj, { new: true })

      await Career.updateMany(
        {
          category: {
            $in: id,
          },
        },
        {
          $pull: {
            category: { $in: [id] },
          },
        },
      )

      // Step 2: Update item to _id in list category

      await this.updateCareer(category, id)

      return successHandler(data, res)
    } catch (err) {
      console.log(err)

      return errHandler(err, res)
    }
  }

  deleteCareerCate = async (req, res) => {
    try {
      let { id: _id } = req.params

      await CareerCategory.updateOne({ _id }, { delete_flag: 1 })
      await this.deleteCareerParent(_id)

      return successHandler([], res)
    } catch (err) {
      console.log(err)

      return errHandler(err, res)
    }
  }

  updateCareer = async (category, parentId) => {
    try {
      await Career.updateMany(
        {
          _id: {
            $in: category,
          },
        },
        {
          $addToSet: {
            category: { $each: [parentId] },
          },
        },
      )
    } catch (err) {
      throw err
    }
  }

  deleteCareerParent = async (parentId) => {
    try {
      await Career.updateMany(
        {
          category: {
            $in: [parentId],
          },
        },
        {
          $pull: {
            category: { $in: [parentId] },
          },
        },
      )
    } catch (err) {
      throw err
    }
  }
}
