const { Product, Category, Career } = require('@model')
const { errHandler, successHandler } = require('@response')
const { default: slugify } = require('slugify')
// Fetch data
const { equals, default: mongoose } = require('mongoose')

module.exports = class CategoryAdmin {
  createCategory = async (req, res) => {
    try {
      let { name, parentCategory, type, price, slug } = req.body
      let cateObj = {
        name,
        price,
        slug: slugify(req.body.name),
        type,
        parentCategory,
      }

      const _cateObj = new Category(cateObj)

      await _cateObj.save()

      return successHandler(cateObj, res)
    } catch (error) {
      console.log(error)

      return errHandler(error, res)
    }
  }

  getCategory = async (req, res) => {
    try {
      let _cate = await Category.find({})
      let data = await this.filterCate(_cate)

      return successHandler(data, res)
    } catch (error) {
      console.log(error)
      return errHandler(error, res)
    }
  }

  updateCategory = async (req, res) => {
    try {
      let { _id } = req.params

      let { name, type, price, parentCategory } = req.body

      let _update = {
        name,
        type,
        price,
        parentCategory,
      }

      await Category.updateOne({ _id }, _update, { new: true })

      return successHandler('Updated successfully', res)
    } catch (error) {
      console.log(error)
      return errHandler(error, res)
    }
  }

  hardDelete = async (req, res) => {
    try {
      let { _id } = req.params
      await Category.findOneAndDelete({ _id })

      return successHandler('Delete Success', res)
    } catch (error) {
      return errHandler(error, res)
    }
  }

  softDelete = async (req, res) => {
    try {
      await Category.updateOne({ _id: req.body._id }, { delete_flag: 1 })
      return successHandler('Delete Success', res)
    } catch (error) {
      return errHandler(error, res)
    }
  }

  filterCate = async (cate) => {
    let parent = cate.filter((item) => !item.parentCategory)

    let child = cate.filter((item) => item.parentCategory)

    let result = []

    result = parent.reduce((result, current) => {
      let item = child.filter((item) => current._id.equals(item.parentCategory))

      if (item) {
        let children = item.map(({ _doc }) => _doc)
        current = {
          ...current._doc,
          children,
        }
      }

      return [...result, current]
    }, [])

    return result
  }

  reforceCategoriesData = async (req, res) => {
    try {
      return res.status(200).json({})
      await Category.deleteMany({})

      await Category.insertMany(this.data)

      let data = await Category.find({})

      return res.status(200).json({ data })
    } catch (err) {
      console.log(err)
      return errHandler(err, res)
    } finally {
    }
  }
}

// backup

// "data":
