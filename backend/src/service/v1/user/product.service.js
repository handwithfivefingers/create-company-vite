const { Product, Category } = require('../../../model')
const { updatedHandler, errHandler, successHandler } = require('../../../response')
const slugify = require('slugify')
module.exports = class ProductService {
  createProduct = async (req, res) => {
    try {
      const obj = {
        name: req.body.name.toString(),
        price: Number(req.body.price),
        slug: slugify(req.body.name),
        categories: req.body.categories,
        type: req.body.type,
      }

      if (req.body.parentId) {
        obj.parentId = req.body.parentId
      }

      let product = await Product.findOne({
        name: req.body.name,
      })

      if (product) throw 'Product already exists'

      const _product = new Product(obj)

      await _product.save()

      //   return successHandler('', res)
      return {
        message: 'success',
      }
    } catch (err) {
      console.log('createProduct error', err)
      //   return errHandler(err, res)
      throw err
    }
  }

  editProduct = async (req, res) => {
    try {
      const { id } = req.params
      const obj = {
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        categories: req.body.categories,
      }

      if (req.body.parentId) {
        obj.parentId = req.body.parentId
      }

      const product = await Product.updateOne(
        {
          _id: id,
        },
        obj,
        { new: true },
      )

      return product
      return updatedHandler(product, res)
    } catch (err) {
      console.log('editProduct error')
      throw err
      return errHandler(err, res)
    }
  }

  getProduct = async (req, res) => {
    try {
      let { _id, _pId } = req.query

      let _cate = await Category.findOne({ _id }).select('_id')

      let data = []
      let _product = []

      if (_cate) {
        _product = await Product.find({ categories: { $in: [_cate._id] } }).select('name type _id categories')
      } else {
        _product = await Product.find({})
      }

      for (let i = 0; i < _product.length; i++) {
        const element = _product[i]
        let { _id, type, name, categories } = element

        if (categories.length > 1) {
          // -> Only child
          if (categories.includes(_pId)) {
            data = [...data, { _id, type, name }]
          }
        } else {
          data = [...data, { _id, type, name }]
        }
      }

      //  filter Products base on _pId and categories.length > 1
      return data

      return successHandler(data, res)
    } catch (err) {
      console.log('ProductManager fetchProduct error', err)
      throw err
      return errHandler(err, res)
    }
  }

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params
      // return;
      await Product.findOneAndDelete({
        _id: id,
      })
      return { message: 'Xóa sản phẩm thành công' }

      return res.status(200).json({ message: 'Xóa sản phẩm thành công', status: 200 })
    } catch (err) {
      throw err
      console.log('deleteProduct error')
      return errHandler(err, res)
    }
  }

  getProductBySlug = async (req, res) => {
    try {
      let _cate = await Category.findOne({ slug: req.params.slug })

      let _id = _cate._id

      let _listCate = await Category.find({ parentCategory: { $in: [_id] } })

      return {
        data: _listCate,
        type: _cate.type,
        parentId: _cate._id,
      }
      
      return res.status(200).json({
        data: _listCate,
        type: _cate.type,
        parentId: _cate._id,
      })
    } catch (err) {
      console.log('getProductBySlug error', err)

      throw err
      return errHandler(err, res)
    }
  }
}
