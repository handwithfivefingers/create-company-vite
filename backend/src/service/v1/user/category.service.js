const { Category } = require('../../../model')
// Fetch data
module.exports = class CategoryService {
  getCategories = async (req, res) => {
    try {
      let searchParams = {
        parentCategory: { $exists: false },
      }

      let _cate = await Category.find(searchParams)

      //   return successHandler(_cate, res)
      return _cate
    } catch (err) {
      console.log('getCategories error')
      //   return errHandler(err, res)
      throw err
    }
  }
  getCategoriesBySlug = async (req, res) => {
    try {
      let _cate = await Category.findOne({ slug: req.params.slug })

      let _id = _cate._id

      let _listCate = await Category.find({ parentCategory: { $in: [_id] } })

      //   return res.status(200).json({
      //     data: _listCate,
      //     type: _cate.type,
      //     parentId: _cate._id,
      //   })
      return {
        data: _listCate,
        type: _cate.type,
        parentId: _cate._id,
      }
    } catch (err) {
      console.log('getCategoriesBySlug error', err)

      //   return errHandler(err, res)
      throw err
    }
  }
}
