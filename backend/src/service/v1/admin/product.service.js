const { Product, Category } = require('../../../model')
const { successHandler, errHandler } = require('../../../response')
const BaseAdminService = require('../../../common/baseService')
const slugify = require('slugify')
const { default: mongoose } = require('mongoose')
const { convertStringToID } = require('../../../common/helper')
module.exports = class ProductAdmin extends BaseAdminService {
  getProduct = async (req, res) => {
    try {
      // let _product = await Product.find({}).populate('categories')
      // .populate('parentId')

      let _product = await Product.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'categories',
            foreignField: '_id',
            as: 'categoryData',
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'parentId',
            foreignField: '_id',
            as: 'parentData',
          },
        },
        {
          $project: {
            name: 1,
            slug: 1,
            type: 1,
            _id: 1,
            price: 1,
            categoryData: {
              name: 1,
              slug: 1,
              type: 1,
              parentCategory: 1,
              _id: 1,
            },
            parentData: {
              name: 1,
              desc: 1,
              slug: 1,
              type: 1,
              _id: 1,
            },
            // categories: 1,
            // parentId: 1,
          },
        },
      ])

      return { _product, count: _product.length }
    } catch (error) {
      console.log(error)
      return errHandler(error, res)
    }
  }

  createProduct = async (req) => {
    try {
      const obj = {
        name: req.body.name.toString(),
        price: Number(req.body.price),
        slug: slugify(req.body.name),
        type: req.body.type,
        categories: req.body?.categories || [],
      }

      const product = await Product.findOne({
        name: req.body.name,
      })

      if (product) throw { message: 'Product already exists' }

      const _product = new Product(obj)

      await _product.save()

      return true
    } catch (err) {
      console.log('createProduct error', err)
      throw err
    }
  }

  updateProduct = async (req, res) => {
    try {
      let { _id } = req.params
      let { categories, parentId, name, price } = req.body
      let _update = {
        name,
        price,
        categories: categories.map((id) => convertStringToID(id)),
        parentId: parentId.map((id) => convertStringToID(id)),
      }
      await Product.updateOne({ _id }, _update, { new: true })

      return true
    } catch (error) {
      throw error
    }
  }

  deleteProduct = async (req, res) => {
    try {
      const { _id } = req.params
      await Product.findOneAndDelete({
        _id,
      })
      return { message: 'Xóa sản phẩm thành công', status: 200 }
    } catch (err) {
      console.log('deleteProduct error')
      throw err
    }
  }

  filterProductCate = (cate) => {
    try {
      let res = []

      res = cate.reduce((result, current) => {
        let [parent, child] = current

        if (child) {
          let index = result.findIndex((item) => item._id === parent)

          if (index !== -1) {
            result[index].child = [...result[index].child, { _id: child }]
          } else {
            result = [...result, { _id: parent, child: [{ _id: child }] }]
          }
        } else {
          result = [...result, { _id: parent }]
        }

        return [...result]
      }, [])

      return res
    } catch (error) {
      throw error
    }
  }
}
