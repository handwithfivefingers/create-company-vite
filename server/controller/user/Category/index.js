const { Product, Category, Career } = require('@model')
const { errHandler, successHandler } = require('@response')
// Fetch data

module.exports = class CategoryClass {
  getCategories = async (req, res) => {
    try {
      // let { slug } = req.query

      let searchParams = {
        parentCategory: { $exists: false },
        // slug: slug,
      }

      // for (let keys in searchParams) {
      //   if (!searchParams[keys]) {
      //     delete searchParams[keys]
      //   }
      // }

      let _cate = await Category.find(searchParams)

      return successHandler(_cate, res)
    } catch (err) {
      console.log('getCategories error')

      return errHandler(err, res)
    }
  }
  getCategoriesBySlug = async (req, res) => {
    try {
      let _cate = await Category.findOne({ slug: req.params.slug })

      let _id = _cate._id

      let _listCate = await Category.find({ parentCategory: { $in: [_id] } })

      return res.status(200).json({
        data: _listCate,
        type: _cate.type,
        parentId: _cate._id,
      })
    } catch (err) {
      console.log('getCategoriesBySlug error', err)

      return errHandler(err, res)
    }
  }
}
