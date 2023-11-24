const { Product, Category } = require('../../../model')
const { successHandler, errHandler } = require('../../../response')
const BaseAdminService = require('../../../common/baseService')
const slugify = require('slugify')
module.exports = class ProductAdmin extends BaseAdminService {
  getProduct = async (req, res) => {
    try {
      let _product = await Product.find({}).populate('categories')

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
      let { categories, name, price } = req.body
      let _update = {
        name,
        price,
        categories,
      }
      await Product.updateOne({ _id }, _update, { new: true })

      return true
    } catch (error) {
      throw err
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
