const { Product, Category, Career } = require('@model')
const { errHandler, successHandler } = require('@response')
// Fetch data

module.exports = class CategoryClass {
  getCategories = async (req, res) => {
    try {
      let _cate = await Category.find({ parentCategory: { $exists: false } })
      // let newCate = this.filterCaregories(_career)
      return successHandler(_cate, res)
    } catch (err) {
      console.log('getCategories error')
      return errHandler(err, res)
    }
  }

  // updateCate = async (req, res) => {
  //   try {
  //     const { id } = req.params
  //     const obj = {
  //       name: req.body.name,
  //       price: req.body.price,
  //       type: req.body.type,
  //     }

  //     const cate = await Category.updateOne(
  //       {
  //         _id: id,
  //       },
  //       obj,
  //       { new: true },
  //     )

  //     return successHandler(cate, res)
  //   } catch (err) {
  //     console.log('getCategories error')
  //     return errHandler(err, res)
  //   }
  // }

  // filterCaregories = (categories, parentId = null) => {
  //   let data = []
  //   let category
  //   if (parentId == null) {
  //     category = categories.filter((cat) => cat.parentId == undefined)
  //   } else {
  //     category = categories.filter((cat) => cat.parentId == parentId)
  //   }
  //   // console.log(category)
  //   for (let cate of category) {
  //     data.push({
  //       _id: cate._id,
  //       name: cate.name,
  //       price: cate.price,
  //       slug: cate.slug,
  //       parentId: cate.parentId,
  //       type: cate.type,
  //       children: this.filterCaregories(categories, cate._id),
  //     })
  //   }
  //   return data
  // }
}
