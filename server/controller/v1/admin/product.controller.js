const { Product, Category } = require('@model')
const { successHandler, errHandler } = require('@response')
const slugify = require('slugify')
const ProductService = require('@service/v1/admin/product.service')
module.exports = class ProductAdmin {
  getProduct = async (req, res) => {
    try {
      const data = await new ProductService(req).getProduct()
      return successHandler(data, res)
    } catch (error) {
      console.log(error)
      return errHandler(error, res)
    }
  }

  createProduct = async (req, res) => {
    try {
      const data = await new ProductService(req).createProduct(req)

      return successHandler(data, res)
    } catch (err) {
      console.log('createProduct error', err)
      return errHandler(err, res)
    }
  }

  updateProduct = async (req, res) => {
    try {
      const data = await new ProductService(req).updateProduct(req)
      return res.status(200).json({
        data,
      })
    } catch (error) {
      console.log(error)
      return errHandler(error, res)
    }
  }

  deleteProduct = async (req, res) => {
    try {
      await new ProductService(req).deleteProduct(req)

      return res.status(200).json({ message: 'Xóa sản phẩm thành công', status: 200 })
    } catch (err) {
      console.log('deleteProduct error')

      return errHandler(err, res)
    }
  }
}
