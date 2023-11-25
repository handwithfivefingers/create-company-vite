const { FileCategory } = require('../../../model')
const { errHandler, successHandler } = require('../../../response')
const BaseAdminService = require('../../../common/baseService')
// Fetch data

module.exports = class AdminFileCategoryService extends BaseAdminService {
  getFileCategory = async () => {
    try {
      let _cate = await FileCategory.find({ delete_flag: { $ne: 1 } })

      const count = await FileCategory.find({ delete_flag: { $ne: 1 } }).countDocuments()
      const data = this.sortCategory(_cate)
      console.log('data', data)
      return {
        data: data,
        count,
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  createFileCategory = async (req) => {
    try {
      let { name, parentId } = req.body

      const queryParams = {
        name: req.body.name,
        delete_flag: 0,
      }
      if (parentId) {
        queryParams.parentId = parentId
      }

      let _cate = await FileCategory.findOne(queryParams)

      if (_cate) throw 'Category already exists'

      let _cateObj = new FileCategory({
        name,
        parentId: parentId || null,
      })

      let _cateSaved = await _cateObj.save()

      return _cateSaved
    } catch (err) {
      throw err

      console.log(err)

      return errHandler(err, res)
    }
  }

  sortCategory = (items) => {
    try {
      const parents = items.filter((item) => !item.parentId)
      const childs = items.filter((item) => item.parentId)
      const result = []
      for (let parent of parents) {
        const obj = {
          ...parent._doc,
        }
        const children = childs.filter((child) => child.parentId.equals(parent._id))
        obj['children'] = children
        result.push(obj)
      }
      return result
    } catch (error) {}
  }

  // updateCareerCate = async (req, res) => {
  //   try {
  //     let { id } = req.params

  //     let { category } = req.body
  //     // step 1: Clear all item have _id

  //     const obj = {
  //       name: req.body.name,
  //     }
  //     // let objCate = await CareerCategory.findById({ _id: id })

  //     let data = await CareerCategory.updateOne({ _id: id }, obj, { new: true })

  //     await Career.updateMany(
  //       {
  //         category: {
  //           $in: id,
  //         },
  //       },
  //       {
  //         $pull: {
  //           category: { $in: [id] },
  //         },
  //       },
  //     )

  //     // Step 2: Update item to _id in list category

  //     await this.updateCareer(category, id)
  //     return data
  //     return successHandler(data, res)
  //   } catch (err) {
  //     console.log(err)
  //     throw err
  //     return errHandler(err, res)
  //   }
  // }

  // deleteCareerCate = async (req, res) => {
  //   try {
  //     let { id: _id } = req.params

  //     await CareerCategory.updateOne({ _id }, { delete_flag: 1 })
  //     await this.deleteCareerParent(_id)
  //     return {
  //       message: 'Delete Success',
  //     }
  //     return successHandler([], res)
  //   } catch (err) {
  //     console.log(err)
  //     throw err
  //     return errHandler(err, res)
  //   }
  // }

  // updateCareer = async (category, parentId) => {
  //   try {
  //     await Career.updateMany(
  //       {
  //         _id: {
  //           $in: category,
  //         },
  //       },
  //       {
  //         $addToSet: {
  //           category: { $each: [parentId] },
  //         },
  //       },
  //     )
  //   } catch (err) {
  //     throw err
  //   }
  // }

  // deleteCareerParent = async (parentId) => {
  //   try {
  //     await Career.updateMany(
  //       {
  //         category: {
  //           $in: [parentId],
  //         },
  //       },
  //       {
  //         $pull: {
  //           category: { $in: [parentId] },
  //         },
  //       },
  //     )
  //   } catch (err) {
  //     throw err
  //   }
  // }
}
