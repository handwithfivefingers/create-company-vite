const { Category } = require('@model')
const { default: slugify } = require('slugify')
// Fetch data

module.exports = class AdminCategoryService {
  createCategory = async (req, res) => {
    try {
      let { name, parentCategory, type, price, desc } = req.body
      let cateObj = {
        name,
        price,
        slug: slugify(req.body.name),
        type,
        desc,
        parentCategory: parentCategory || [],
      }

      const _cateObj = new Category(cateObj)

      await _cateObj.save()
      return _cateObj
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  getCategory = async () => {
    try {
      let _cate = await Category.find({})
      let data = await this.filterCate(_cate)
      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  updateCategory = async (req, res) => {
    try {
      let { _id } = req.params

      await Category.updateOne({ _id }, { ...req.body }, { new: true })

      return {
        message: 'Updated successfully',
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  hardDelete = async (req, res) => {
    try {
      let { _id } = req.params
      await Category.findOneAndDelete({ _id })
      return {
        message: 'Delete Success',
      }
    } catch (error) {
      throw error
    }
  }

  softDelete = async (req, res) => {
    try {
      await Category.updateOne({ _id: req.body._id }, { delete_flag: 1 })

      return {
        message: 'Delete Success',
      }
    } catch (error) {
      throw error
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
}
